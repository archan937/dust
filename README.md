# Dust

**A minimalistic reactive UI library — React's API, no virtual DOM.**

Dust gives you `useState`, `useEffect`, `useRef`, `createContext`, JSX, and routing — all the patterns you know — but without a virtual DOM or diffing engine. When state changes, only the exact DOM node that depends on it updates. No re-renders, no reconciliation, no overhead.

## Why Dust?

Most reactive frameworks re-render components on state change and reconcile a virtual DOM tree to figure out what to update. Dust skips that entirely.

`useState` returns a **Getter** — a callable proxy that records which DOM nodes depend on it. When you update state, those nodes update directly. A component function runs once to build the initial DOM; it never runs again.

```jsx
const [count, setCount] = useState(0);

// Each of these is a live, independently-updating DOM text node:
<p>Total: {count}</p>
<p>Double: {count() * 2}</p>
```

The transpiler automatically wraps bare JSX expressions in arrow functions, so writing `{count}` works out of the box — no `.value`, no `$`, no magic syntax to learn.

## Features

- **Surgical DOM updates** — state change → one node updates, nothing else touches the DOM
- **Proxy-based nested reactivity** — `user.name()` is reactive automatically, no selectors needed
- **Familiar API** — `useState`, `useEffect`, `useRef`, `createContext` / `useContext`
- **ReactiveList** — identity-based list reconciliation via `.map()`, each item gets its own local state
- **`css` tagged template + `cx` utility** — zero-cost scoped styles, no build plugin needed
- **JSX auto-wiring** — bare identifiers in JSX are wrapped by the transpiler; write `{count}`, not `{count()}`
- **File-system routing** (`DirectoryRouter`) and declarative JSX routing (`BrowserRouter`)
- **Batteries-included CLI** — dev server with HMR, production bundler, preview server

## Requirements

[Bun](https://bun.sh) runtime.

## Getting started

Create a project that depends on Dust:

```json
{
  "dependencies": {
    "dust": "^1.0.0"
  }
}
```

Add an `index.html` with a JSX entry point:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/jsx" src="./src/main.jsx"></script>
  </body>
</html>
```

```jsx
// src/main.jsx
import Dust, { createRoot, useState } from 'dust';

const App = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((n) => n + 1)}>Count: {count}</button>;
};

createRoot(document.getElementById('root')).render(<App />);
```

```sh
dust dev      # start dev server with HMR at http://localhost:3000
dust build    # bundle to dist/
dust preview  # serve dist/
```

## How reactivity works

`useState` returns a **Getter** — a callable Proxy that doubles as a subscription handle. Calling it (`count()`) reads the current value. When called inside a reactive context (a DOM text node, a reactive attribute, a `useEffect`), Dust records the dependency. On the next `setCount`, only the DOM nodes that read `count` are updated — in place, with no diffing.

### JSX auto-wiring

The Babel transpiler wraps bare identifiers and zero-argument calls in JSX children in an arrow function before `Dust.createElement` sees them:

```jsx
// What you write:
<p>Count: {count}</p>

// What the transpiler emits:
createElement('p', null, 'Count: ', () => count)
```

The runtime detects the function child, calls it with tracking enabled, and subscribes the resulting text node to `count` directly. When `setCount` fires, only that text node updates — the component function is never called again.

| Context | How to read state |
|---|---|
| JSX children / attributes | `{count}` or `{count()}` — both work |
| `useEffect`, event handlers, plain JS | `count()` — call explicitly |

```jsx
// JSX — transpiler handles it
<p>{count}</p>

// Outside JSX — call explicitly
useEffect(() => {
  document.title = `Count: ${count()}`;
}, [count]);
```

## API

### useState

```jsx
const [count, setCount] = useState(0);

count()              // read value (tracks as dependency inside JSX / useEffect)
setCount(1)          // set directly
setCount((n) => n + 1) // set via updater

// Nested objects — each property becomes a reactive Getter automatically
const [user, setUser] = useState({ name: 'Alice', age: 30 });
<p>{user.name}</p>   // updates only when user.name changes
```

### useEffect

Runs the callback when any listed dependency changes. The optional return value is a cleanup function called before the next run or on unmount.

```jsx
const [running, setRunning] = useState(false);

useEffect(() => {
  if (!running()) return;
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id);
}, [running]);
```

### useRef

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />

// Later:
inputRef.current.focus();
```

### createContext / useContext

```jsx
const ThemeCtx = createContext('light');

function App() {
  return (
    <ThemeCtx.Provider value="dark">
      <Child />
    </ThemeCtx.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeCtx); // 'dark'
  return <p>{theme}</p>;
}
```

### ReactiveList

Calling `.map()` on a state Getter returns a `ReactiveList`. DOM nodes are reconciled by item identity when the array changes — nodes for unchanged items are reused, not recreated. Each item's render function can create its own independent local state.

```jsx
const [items, setItems] = useState([{ id: 1, text: 'Buy milk' }]);

const list = items.map((item) => {
  const [done, setDone] = useState(false);
  return (
    <li onClick={() => setDone((v) => !v)}>
      {done() ? <s>{item.text}</s> : item.text}
    </li>
  );
});

<ul>{list}</ul>
```

### css / cx

`css` injects scoped styles into a single `<style>` tag and returns a stable class name. `cx` joins class names, skipping falsy values — useful for conditional styling without string interpolation.

```jsx
import Dust, { css, cx } from 'dust';

const btn = css`
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

const btnPrimary = css`
  background: royalblue;
  color: white;
`;

const Button = ({ primary, label }) => (
  <button className={cx(btn, primary && btnPrimary)}>{label}</button>
);
```

## Routing

### DirectoryRouter (file-system based)

Place pages under `src/pages/`. The dev server discovers and injects them automatically — no imports to write.

```
src/pages/index.jsx       → /
src/pages/about.jsx       → /about
src/pages/blog/:id.jsx    → /blog/:id
```

```jsx
import Dust, { createRoot, DirectoryRouter } from 'dust';
createRoot(document.getElementById('root')).render(<DirectoryRouter />);
```

### BrowserRouter (declarative)

```jsx
import Dust, { createRoot, BrowserRouter, Route } from 'dust';
import Home from './pages/Home';
import About from './pages/About';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </BrowserRouter>,
);
```

Both routers use the History API — navigation is SPA-style with no full-page reloads. Use `useParams()` to read dynamic path segments.

## Examples

Two full example apps live in `examples/`:

- **`nextjs-like-routing`** — `DirectoryRouter` with file-system pages
- **`reactrouter-like-routing`** — `BrowserRouter` with declarative routes

Each example includes a Playground page that demonstrates `useState`, `useEffect`, `useRef`, `createContext` / `useContext`, `ReactiveList`, `css`, and `cx` side-by-side.

## Contact

For support, remarks, and requests: [pm_engel@icloud.com](mailto:pm_engel@icloud.com)

## License

Copyright (c) 2026 Paul Engel, released under the MIT License

http://github.com/archan937 — [pm_engel@icloud.com](mailto:pm_engel@icloud.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
