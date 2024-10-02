import Dust, { NoElement, useState } from "src";

import { matchRoute, registerRoutes } from "src/router";

export const Route = NoElement;

const resolveRoutes = (routes, prefix = "/") => {
  return routes.reduce(
    (acc, { index, path, component, redirect, children }) => {
      path = `${prefix}${index ? "" : `/${path}`}`.replace("//", "/");
      if (component) {
        return { ...acc, [path]: component };
      }
      if (redirect) {
        return { ...acc, [path]: () => (window.location = redirect) };
      }
      return { ...acc, ...resolveRoutes(children, path) };
    },
    {},
  );
};

function BrowserRouter({ children }) {
  const [route, setRoute] = useState();
  const [page, setPage] = useState();

  registerRoutes(resolveRoutes(children));

  matchRoute((route, page) => {
    setRoute(route);
    setPage(page());
  });

  console.log("Rendering <BrowserRouter/>");

  return (
    <>
      <h1>Hi, my name is BrowserRouter! :) </h1>
      <p>Route: {route()}</p>
      <div>{page()}</div>
    </>
  );
}

export default BrowserRouter;
