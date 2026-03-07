# Dust — Implementation Reference

Minimalistic reactive JS library. Runtime: Bun. JSX: Babel. No VDOM.

## Quick commands

```sh
bun dev       # start dev server (default port 3000)
bun build     # production bundle → dist/
bun preview   # serve dist/ statically
bun test      # 60 tests
bun typecheck # tsc --noEmit
```

---

## Source layout

```
src/
  index.ts                  — public re-exports (core + components + router + types)
  config.ts                 — NAME, VERSION, PORT=3000, CWD, ROOT
  core/
    createElement.ts        — createElement, Fragment, mountChild, cleanupNode
    createRoot.ts           — createRoot(container) → { render(node) }
    context.ts              — createContext, useContext
    hooks/
      useState.ts           — useState<T>(init) → [Getter<T>, Setter<T>]
      useEffect.ts          — useEffect(cb, deps[]) → unsubscribe
      index.ts              — re-exports
    index.ts                — re-exports all core
  router/
    index.ts                — matchRoute, registerRoutes, useParams, intercept
  components/
    BrowserRouter.tsx       — <BrowserRouter>, <Route>
    DirectoryRouter.tsx     — <DirectoryRouter>
    index.ts                — re-exports
  transpiler/
    index.ts                — transpile(src, filename) → JS; clearCache()
    plugins/
      jsx-getter-consumer.ts — Babel plugin: wraps reactive identifiers in () =>
      inject-dust-import.ts  — Babel plugin: auto-inserts `import Dust from 'dust'`
    resolve-pages.ts        — resolvePages(dir, src), buildPagesPreamble(pages, cwd)
  bundler/
    index.ts                — bundle(entry, opts?), build(outdir?)
    plugins.ts              — esbuild plugins: jsxTranspiler, reactDust
  server/
    dev.ts                  — dev() → Bun.serve (HMR + transpile on demand)
    preview.ts              — preview() → Bun.serve (static dist/)
    index.ts                — re-exports dev, preview
  utils/
    reactive.ts             — tracking, getType, isReactiveProperty  [browser-safe]
  react/index.ts            — re-export shim → src/index
  react-dom/index.ts        — re-export shim → src/index
  types/
    index.ts                → hooks/index
    hooks/useState.ts       — Getter<T>, SetterFunction<T>, State<T>
bin/dust                    — CLI (chalk): dev | build | preview
```

---

## Types

```ts
// src/types/hooks/useState.ts
type SetterFunction<T> = (current: T) => T;
type Getter<T> = {
  (): T;
  __register__(fn: () => void): () => void; // subscribe, returns unsubscribe
  __setter__: (value: T | SetterFunction<T>) => void;
  // Proxy: getter.prop → nested Getter for object/array properties
};
type State<T> = [Getter<T>, (value: T | SetterFunction<T>) => void];
```

---

## Core API

### useState

```ts
const [count, setCount] = useState(0);
count(); // read value (also registers as consumer when inside tracking)
setCount(1); // set directly
setCount((n) => n + 1); // functional update
count.__register__(fn); // subscribe manually → returns unsubscribe()
count.__setter__; // raw setter reference

// Object state — nested properties become reactive Getters automatically
const [user, setUser] = useState({ name: 'Alice', age: 30 });
user.name(); // reactive Getter for the 'name' property
user(); // plain object snapshot { name: 'Alice', age: 30 }

// Array state
const [items, setItems] = useState([1, 2, 3]);
setItems([4, 5]); // mutates in-place, trims length
```

**Internals:**

- `tracking.current` is set by `mountChild` during function-child evaluation to auto-collect deps
- `replace()` mutates arrays/objects in-place instead of swapping references
- Object property access via Proxy: non-array own properties become nested `useState`
- `read()` strips `__setter__` getters to plain values before returning snapshot

### useEffect

```ts
const cleanup = useEffect(callback, [dep1, dep2]);
// - Calls callback() immediately
// - Re-calls on each dep change (deps must be Getters with __register__)
// - Returns unsubscribe function
```

### createRoot

```ts
const root = createRoot(document.getElementById('app'));
root.render(<App />);
// Calls cleanupNode(container) before replacing children
```

### createElement / Fragment

```ts
createElement(type, props, ...children);
// type: string tag or function component
// props: { onClick, className, htmlFor, disabled(bool), ...attrs }
// Event: onXxx → addEventListener('xxx', handler)
// className → el.className
// htmlFor → setAttribute('for', ...)
// boolean true → setAttribute(key, '')
// boolean false / null / undefined → skipped

Fragment(null, ...children); // → DocumentFragment
```

**mountChild reactive logic:**

1. `child` is a function → run with `tracking.current` set to collect deps
2. If result is a `Getter` (has `__register__`) → reactive text node, subscribe directly
3. If `trackedDeps.length > 0` and result is Node/null/bool → anchor comment + in-place replacement
4. If `trackedDeps.length > 0` and result is primitive → reactive text node via tracked deps
5. Otherwise → recurse with resolved value

### cleanupNode

```ts
cleanupNode(node: Node): void
// Runs all registered cleanup fns for node (unsubscribers, etc.)
// Recurses into childNodes
// Called by: createRoot.render, BrowserRouter/DirectoryRouter before replaceChildren,
//            reactive DOM update() before replacing a node
```

---

## Context

```ts
interface Context<T> {
  defaultValue: T;
  Provider: (props: { value: T }, ...children) => Node;
}

const ThemeCtx = createContext('light');

// In JSX:
<ThemeCtx.Provider value="dark">
  <Child />
</ThemeCtx.Provider>

// In component:
const theme = useContext(ThemeCtx); // 'dark' or 'light' (default)
```

**Internals:** WeakMap of `Context → stack[]`. Provider pushes before rendering children (Fragment call), pops after. Synchronous — works because JSX renders eagerly (no VDOM diffing).

---

## Router

```ts
// Registration
registerRoutes({ '/': Home, '/about': About, '/user/:id': UserPage });

// Route params — useParams IS the Getter (first element of useState tuple)
useParams()     // { id: '42' } — current params snapshot
useParams.id()  // reactive Getter for 'id'

// Listen for route changes
matchRoute((path, PageComponent) => { ... });
// Fires immediately if routes already rendered, otherwise on next renderRoute

// Pattern matching: /user/:id → named group regex (?<id>[^/]+)
// Trailing slashes stripped; empty path → '/'
// intercept() patches history.pushState/replaceState + click delegation
// Guard: typeof window !== 'undefined' (safe in Bun server context)
```

---

## Components

### BrowserRouter

```tsx
<BrowserRouter>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} index />
  <Route path="/old" redirect="/new" />
</BrowserRouter>
```

- `Route` stores its props in a `WeakMap<DocumentFragment, RouteProps>`
- `collectRoutes(fragment)` recursively walks fragment children to build route map
- Calls `registerRoutes()` then `matchRoute()` to swap rendered page
- Calls `cleanupNode` + `replaceChildren` on the outlet before each render

### DirectoryRouter

```tsx
<DirectoryRouter />
```

- Relies on dev server injection: when serving a file containing `DirectoryRouter`,
  `resolvePages()` discovers `src/pages/**/*.{jsx,tsx}` and prepends:
  ```js
  import Page1 from '/src/pages/index.jsx';
  registerRoutes({ '/': Page1, ... });
  ```
- Import paths are root-relative (`/src/pages/foo.jsx`) for browser fetch

---

## Transpiler

```ts
transpile(source: string, filename: string): string
// Babel pipeline:
//   1. inject-dust-import   — adds `import Dust from 'dust'` if any `import from 'dust'` absent
//   2. jsx-getter-consumer  — wraps reactive expressions in JSX with () =>
//   3. transform-react-jsx  — JSX → Dust.createElement calls
//   4. transform-typescript — strips types (onlyRemoveTypeImports: true)
// Results cached by (filename, hash(source)) — hash uses unsigned int (h >>> 0).toString(36)

clearCache(): void  // evict all transpiler cache entries (called on file change)
```

### jsx-getter-consumer plugin rules

Wraps in `() =>` when argument index >= 2 of `Dust.createElement(...)` (i.e., children or prop values):

| Node type                         | Wrapped? | Exception                         |
| --------------------------------- | -------- | --------------------------------- |
| `Identifier`                      | yes      | PascalCase names (component refs) |
| `MemberExpression` (non-computed) | yes      | object is PascalCase identifier   |
| `CallExpression` (0 args)         | yes      | —                                 |
| `LogicalExpression`               | yes      | —                                 |
| `ConditionalExpression`           | yes      | —                                 |

**Note:** Prop values (index 1 in createElement) are not wrapped — only children (index >= 2).

### inject-dust-import plugin

Adds `import Dust from 'dust'` at top of file unless any `import ... from 'dust'` already present. Checks `ImportDeclaration` source values.

---

## Dev Server

```
GET /_dust/hmr          → SSE stream (TransformStream, idleTimeout: 0)
GET /@dust              → Bun.build of src/index.ts (cached as dustBundle)
GET /*.{jsx,tsx,ts,js}  → transpile(preamble + source, filePath)
GET /*.html             → inject importmap + HMR <script> into <head>/<body>
GET /*                  → static file, or try appending JS extensions, else index.html
```

- Import map: `{ imports: { dust: '/@dust' } }` injected into every HTML response
- HMR: 50ms debounce, `data: reload\n\n` SSE event → `location.reload()`
- File watchers: `ROOT/src` → invalidate `dustBundle` + `clearCache()`; `CWD` → `clearCache()`
- Path traversal guard: `path.relative(CWD, filePath).startsWith('..')` → 403

---

## Bundler (production)

```ts
build((outdir = 'dist/'));
// 1. Reads index.html, extracts <script src="*.jsx/tsx">
// 2. esbuild.build({ bundle: true, minify: true, plugins: [jsxTranspiler, reactDust] })
//    - jsxTranspiler: esbuild plugin that calls transpile() for jsx/tsx/ts files
//    - reactDust: resolves 'react'/'react-dom' imports → dust src/index.ts
// 3. Writes dist/{entry}.js + dist/index.html (src updated to ./entry.js)
```

---

## Reactivity model

No VDOM. DOM nodes are created once and updated in-place via subscriptions.

```
useState → Getter (Proxy)
         ↓
mountChild detects function children → runs with tracking.current set
         ↓
trackedDeps collected → each dep's __register__ called with update()
         ↓
On state change → consumers[] forEach(fn) → update() → mutate DOM node directly
```

Cleanup chain: every subscription's unsubscribe is stored in `cleanups WeakMap<Node, fn[]>`.
`cleanupNode` must be called before any node subtree is discarded.

---

## tsconfig paths (for imports)

```json
"paths": {
  "src/*": ["./src/*"],
  "types": ["./src/types/index.ts"]
}
```

- Use `src/core/hooks/useState` not relative paths in source files
- `types` alias resolves to `src/types/index.ts`

---

## ESLint config notes

- `server/`, `bundler/`, `transpiler/` files get `globals.node + Bun` overrides
- Browser files must not import `node:*` modules (breaks browser bundle)
- `src/utils/reactive.ts` is browser-safe (no node imports) — used by core

---

## Behaviors to note

- `useParams` is the `Getter<Record<string,string>>` itself — use `useParams()` or `useParams.id()` (reactive)
- `useState` object properties become nested Getters lazily on first access via Proxy
- `replace()` for arrays mutates the existing array (preserves object identity for subscriptions)
- Provider rendering is synchronous — context only available during same render call tree
- `history.pushState` patched globally when `typeof window !== 'undefined'`
- `sw.js` requests always return a no-op function (prevents SW interference in dev)
