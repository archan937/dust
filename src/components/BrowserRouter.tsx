import { matchRoute, registerRoutes } from 'src/router';

type Component = (...args: unknown[]) => Node;
type Routes = Record<string, Component>;

interface RouteDefinition {
  path?: string;
  index?: boolean;
  component?: Component;
  redirect?: string;
  children: Node[];
}

// ── Route ──────────────────────────────────────────────────────────────────────

const routeData = new WeakMap<object, RouteDefinition>();

export const Route = (
  props: Omit<RouteDefinition, 'children'>,
  ...children: Node[]
): DocumentFragment => {
  const frag = document.createDocumentFragment();
  routeData.set(frag, { ...props, children });
  return frag;
};

// ── Route collection ───────────────────────────────────────────────────────────

const collectRoutes = (nodes: Node[], prefix = '/'): Routes =>
  nodes.reduce<Routes>((acc, node) => {
    const def = routeData.get(node as object);
    if (!def) return acc;

    const path =
      `${prefix}${def.index ? '' : `/${def.path ?? ''}`}`
        .replace(/\/+/g, '/')
        .replace(/\/$/, '') || '/';

    if (def.component) return { ...acc, [path]: def.component };

    if (def.redirect) {
      const target = def.redirect;
      return {
        ...acc,
        [path]: (): DocumentFragment => {
          window.location.href = target;
          return document.createDocumentFragment();
        },
      };
    }

    return { ...acc, ...collectRoutes(def.children, path) };
  }, {});

// ── BrowserRouter ──────────────────────────────────────────────────────────────

const BrowserRouter = (
  _props: Record<string, unknown>,
  ...routeNodes: Node[]
): Node => {
  const container = document.createElement('div');

  // Register handler BEFORE registerRoutes so the initial route renders immediately.
  matchRoute((_path, component) =>
    container.replaceChildren(component() as Node),
  );
  registerRoutes(collectRoutes(routeNodes));

  return container;
};

export default BrowserRouter;
