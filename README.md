# Dust

A minimalistic reactive JavaScript library for building dynamic, state-driven component-based interfaces.

## Features

- Reactive `useState` with Proxy-based nested reactivity
- `useEffect` for side-effect subscriptions
- `useRef` for mutable DOM references
- `createContext` / `useContext` for prop-drilling-free state sharing
- `ReactiveList` — identity-based list reconciliation via `items.map()`
- `css` tagged template literal and `cx` utility for zero-cost CSS-in-JS
- JSX support via a custom Babel transpiler (`Dust.createElement`)
- File-system routing (`DirectoryRouter`) like Next.js and declarative JSX routing (`BrowserRouter`) like React Router DOM
- Dev server with HMR, production bundler, and preview server — all via the `dust` CLI

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

## CLI

```sh
dust dev      # start dev server with HMR (default port 3000)
dust build    # bundle to dist/
dust preview  # serve dist/
```

## How reactivity works

`useState` returns a **Getter** — a callable object that doubles as a live subscription handle. Calling it (`count()`) reads the current value and, when called inside a reactive context, registers the caller as a dependent that re-runs whenever the value changes.

No virtual DOM, no diffing. Each reactive expression owns one real DOM node. When state changes, only that node is updated in place.

### JSX auto-wiring

Writing `{count()}` by hand in every JSX expression would be tedious, so the Babel transpiler handles it automatically. A bare identifier or zero-argument call in JSX children is wrapped in an arrow function before `Dust.createElement` sees it:

```jsx
// What you write:
<p>Count: {count}</p>

// What the transpiler emits:
createElement('p', null, 'Count: ', () => count)
```

The runtime detects the function child, calls it with dependency tracking enabled, and subscribes the resulting DOM text node to `count` directly. When `setCount` fires, only that text node updates — the component function is never called again.

This is why:

- In **JSX**, write `{count}` or `{count()}` — both work, the transpiler wraps them
- Outside JSX (event handlers, `useEffect`, plain JS), call `count()` explicitly to read the value

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

// Read value (also tracks as dependency inside JSX)
count()

// Update
setCount(1);
setCount((n) => n + 1);

// Nested object state — properties become reactive Getters automatically
const [user, setUser] = useState({ name: 'Alice' });
user.name() // reactive Getter
```

### useEffect

```jsx
const [running, setRunning] = useState(false);

useEffect(() => {
  if (!running()) return;
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id); // cleanup on next run or unmount
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

### ReactiveList — reactive lists via `items.map()`

Calling `.map()` on a state Getter returns a `ReactiveList` that reconciles DOM nodes by item identity when the list changes. Each item's render function can create its own local state.

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

// Use in JSX — nodes are reused when item references stay the same
<ul>{list}</ul>
```

### css / cx

`css` injects scoped styles into a single `<style>` tag and returns a stable class name. `cx` joins truthy class names.

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

Place pages under `src/pages/`. The dev server injects imports automatically.

```
src/pages/index.jsx       → /
src/pages/about.jsx       → /about
src/pages/blog/:id.jsx    → /blog/:id
```

```jsx
import Dust, { createRoot, DirectoryRouter } from 'dust';
createRoot(document.getElementById('root')).render(<DirectoryRouter />);
```

### BrowserRouter (JSX based)

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

## Contact me

For support, remarks and requests, please mail me at [pm_engel@icloud.com](mailto:pm_engel@icloud.com).

## License

Copyright (c) 2026 Paul Engel, released under the MIT License

http://github.com/archan937 – [pm_engel@icloud.com](mailto:pm_engel@icloud.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
