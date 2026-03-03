import useState from 'src/core/hooks/useState';

type Component = (...args: unknown[]) => Node;
type Routes = Record<string, Component>;
type RouteHandler = (path: string, page: Component) => void;

// ── History interception ───────────────────────────────────────────────────────

const intercept = (): void => {
  window.addEventListener('popstate', () => renderRoute(window.location));

  document.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as Element).closest('a');
    if (target?.tagName === 'A') {
      if (target.origin !== window.location.origin || target.hash) return;
      event.preventDefault();
      history.pushState({}, '', target.href);
    }
  });

  const { pushState, replaceState } = history;

  history.pushState = (...args: Parameters<typeof history.pushState>): void => {
    pushState.apply(history, args);
    renderRoute(args[2] as string | URL);
  };

  history.replaceState = (...args: Parameters<typeof history.replaceState>): void => {
    replaceState.apply(history, args);
    renderRoute(args[2] as string | URL);
  };
};

// ── Route registry ─────────────────────────────────────────────────────────────

let currentPath: string | undefined;
let currentPage: Component = () => document.createDocumentFragment();
const routes: Routes = {};
const handlers: RouteHandler[] = [];

export const matchRoute = (handler: RouteHandler): void => {
  handlers.push(handler);
  // If routes have already been rendered (e.g. DirectoryRouter preamble ran
  // before the component mounted), fire the handler immediately.
  if (currentPath !== undefined) {
    handler(currentPath, currentPage);
  }
};

export const registerRoutes = (newRoutes: Routes): void => {
  Object.assign(
    routes,
    Object.fromEntries(
      Object.entries(newRoutes).map(([path, route]) => [resolvePath(path), route]),
    ),
  );
  currentPath = undefined;
  renderRoute(window.location);
};

// ── Route resolution ───────────────────────────────────────────────────────────

const renderRoute = (url: string | Location | URL): void => {
  const path = resolvePath(url);
  if (currentPath === path) return;
  currentPath = path;

  let params: Record<string, string> = {};
  let page: Component = () => document.createDocumentFragment();

  for (const [pattern, component] of Object.entries(routes)) {
    const regexp = new RegExp(
      `^${pattern.replace(/:[^/]+/g, (param) => `(?<${param.slice(1)}>[^/]+)`)}$`,
    );
    const match = regexp.exec(path);
    if (match) {
      params = match.groups ?? {};
      page = component;
      break;
    }
  }

  currentPage = page;
  setParams(params);
  handlers.forEach((handler) => handler(path, page));
};

const resolvePath = (arg: string | Location | URL): string => {
  const url = String(arg);
  const path = (url.startsWith('/') ? url : new URL(url).pathname).replace(/\/+$/, '');
  return path || '/';
};

// ── Params state ───────────────────────────────────────────────────────────────

const [useParams, setParams] = useState<Record<string, string>>({});

if (typeof window !== 'undefined') {
  intercept();
}

export { useParams };
