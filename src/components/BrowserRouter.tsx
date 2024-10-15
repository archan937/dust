import type { Component, Props, Routes } from "types";

import Dust, { NoElement, useState } from "src";
import { matchRoute, registerRoutes } from "src/router";

interface RouteDefinition {
  index?: boolean;
  path: string;
  redirect?: string;
  component?: Component;
  children?: RouteDefinition[];
}

export const Route = NoElement;

const resolveRoutes = (routes: RouteDefinition[], prefix = "/"): Routes =>
  routes.reduce((acc, { index, path, component, redirect, children }) => {
    path = `${prefix}${index ? "" : `/${path}`}`.replace(/\/+/g, "/");
    if (component) {
      return { ...acc, [path]: component };
    }
    if (redirect) {
      return { ...acc, [path]: () => (window.location.href = redirect) };
    }
    return { ...acc, ...resolveRoutes(children ?? [], path) };
  }, {});

function BrowserRouter({ children }: Props): Component {
  const [route, setRoute] = useState();
  const [page, setPage] = useState();

  registerRoutes(resolveRoutes(children as unknown as RouteDefinition[]));

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
