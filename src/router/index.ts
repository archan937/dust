import type { Params, Route, RouteHandler, Routes } from "types";

import { useState } from "src/state";

const intercept = (): void => {
  window.addEventListener("popstate", () => {
    renderRoute(window.location);
  });

  document.addEventListener("click", (event: MouseEvent) => {
    const target = (event.target as Element).closest("a");

    if (target && target.tagName === "A") {
      if (target.origin !== window.location.origin || target.hash) {
        return;
      }
      event.preventDefault();
      history.pushState({}, "", target.href);
    }
  });

  const historyPushState = history.pushState;
  const historyReplaceState = history.replaceState;

  history.pushState = (...args: [unknown, string, string | URL]): void => {
    historyPushState.apply(history, args);
    renderRoute(args[2]);
  };

  history.replaceState = (...args: [unknown, string, string | URL]): void => {
    historyReplaceState.apply(history, args);
    renderRoute(args[2]);
  };
};

let currentPath: string | undefined;
const routes: Routes = {};
const handlers: RouteHandler[] = [];

const matchRoute = (handler: RouteHandler): void => void handlers.push(handler);

const registerRoutes = (newRoutes: Routes): void => {
  Object.entries(newRoutes).forEach(([path, route]) => {
    routes[resolvePath(path)] = route;
  });
  currentPath = undefined;
  console.log(`* Routes registered`);
  renderRoute(window.location);
};

const renderRoute = (
  url: string | Location | URL,
  handler?: RouteHandler | RouteHandler[],
): void => {
  const path = resolvePath(url);

  if (currentPath === path) return;
  currentPath = path;
  console.log(`* Navigating to: ${path}`);

  let params: Params = {};
  let page: Route = () => {};

  Object.entries(routes).forEach(([key, value]) => {
    const regexp = new RegExp(
      "^" +
        key.replace(/:[^/]+/g, (param) => {
          const name = param.slice(1);
          return `(?<${name}>[^/]+)`;
        }) +
        "$",
    );
    const match = regexp.exec(path);
    if (match) {
      params = match.groups ?? {};
      page = value;
    }
  });

  useParams.__detach__?.();
  setParams(params);

  [handler ?? handlers].flat().forEach((handler) => {
    handler(path, page);
  });
};

const resolvePath = (arg: string | Location | URL): string => {
  const url = arg.toString();
  const path = (url.match(/^\//) ? url : new URL(url).pathname).replace(
    /\/+$/,
    "",
  );
  return path || "/";
};

const [useParams, setParams] = useState({});

intercept();

export { matchRoute, registerRoutes, useParams };
