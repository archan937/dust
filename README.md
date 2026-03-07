# Dust

A minimalistic reactive JavaScript library for building dynamic, state-driven component-based interfaces.

## Features

- Reactive `useState` with Proxy-based nested reactivity
- `useEffect` for side-effect subscriptions
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

## License

MIT
