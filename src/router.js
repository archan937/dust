const intercept = () => {
  window.addEventListener("popstate", () => {
    renderRoute(window.location);
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("a");

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

  history.pushState = (...args) => {
    historyPushState.apply(history, args);
    renderRoute(args[2]);
  };

  history.replaceState = (...args) => {
    historyReplaceState.apply(history, args);
    renderRoute(args[2]);
  };
};

let currentPath;
let routes = {};
const handlers = [];

const matchRoute = (handler) => handlers.push(handler);

const registerRoutes = (newRoutes) => {
  Object.entries(newRoutes).forEach(([path, route]) => {
    routes[resolvePath(path)] = route;
  });
  renderRoute(window.location);
};

const renderRoute = (url, handler) => {
  const path = resolvePath(url);

  if (currentPath === path) return;
  currentPath = path;
  console.log(`* Navigating to: ${path}`);

  const page = routes[path] || (() => {});
  [handler || handlers].flat().forEach((handler) => {
    handler(path, page);
  });
};

const resolvePath = (arg) => {
  const url = arg.toString();
  const path = (url.match(/^\//) ? url : new URL(url).pathname).replace(
    /\/+$/,
    "",
  );
  return path || "/";
};

intercept();

export { matchRoute, registerRoutes };
