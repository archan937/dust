# Why Dust's Reactivity Model Is Superior

> No virtual DOM. No re-renders. No memoization tax. Just state → DOM, directly.

---

## The React Problem

React's mental model is seductive: describe your UI as a pure function of state, and React figures out how to update the DOM. Simple in theory. Expensive in practice.

Here is what actually happens when you call `setState` in React:

1. The **entire component function re-executes** — every expression, every conditional, every child component call.
2. A **new virtual DOM tree** is allocated in memory.
3. That tree is **diffed** against the previous one, node by node.
4. The diff result is **reconciled** into the real DOM.
5. `useEffect` cleanups run. Then effects run again. Then layout effects.
6. Any child that didn't get memoized **re-renders too** — recursively.

All of this to update a single text node that says `"42"` instead of `"41"`.

To fight this, React gives you `useMemo`, `useCallback`, `useRef`, `React.memo`, `useTransition`, `useDeferredValue`. An entire ecosystem of escape hatches to claw back the performance that the model threw away. You pay a complexity tax to recover from a cost the framework imposed.

---

## The Dust Model

Dust takes a different premise: **state changes should update only what depends on them — nothing more, nothing less.**

There is no virtual DOM. There is no reconciler. There is no scheduler. Component functions run exactly **once**, at mount. From that point forward, the only code that runs on state change is the minimal closure needed to update the specific DOM node that depends on that state.

```jsx
const [count, setCount] = useState(0);

return (
  <div>
    <p>{count}</p>
    <button onClick={() => setCount(count() + 1)}>+</button>
  </div>
);
```

The component function runs once. The `<p>` gets a text node. That text node is subscribed directly to `count`. When `setCount` is called, **only `text.textContent` changes**. The component function never runs again. The button is untouched. The `<div>` is untouched. Nothing is diffed. Nothing is reallocated.

---

## How It Works

### State is a Getter + Setter pair

```ts
const [count, setCount] = useState(0);
// count() → reads current value
// setCount(n) → updates and notifies all consumers
```

`count` is a Proxy-wrapped function. Calling it returns the current value. Accessing `count.someProperty` lazily creates a nested reactive state for that property. Every piece of state in Dust is independently subscribable with zero extra boilerplate.

### JSX is auto-instrumented

The Dust transpiler rewrites JSX children and props at compile time:

```jsx
// You write:
<p>{count}</p>;

// Transpiler produces:
Dust.createElement('p', null, () => count);
```

Reactive expressions become arrow functions before the code ever runs in the browser. No runtime scanning. No dependency tracking loops. The structure of reactivity is determined **at compile time**.

### mountChild does the surgical work

When `createElement` processes a child function, it:

1. Evaluates it with `tracking.current` set — recording any getters touched.
2. If the result is a getter: creates a text node, subscribes directly.
3. If reactive deps were touched: creates a comment anchor node. On state change, only the fragment between anchors is swapped.
4. Registers cleanup on each node so subscriptions are released when the node is removed.

The update path for a reactive text node:

```ts
const text = document.createTextNode(String(getter()));
getter.__register__(() => {
  text.textContent = String(getter());
});
```

That is the entire update mechanism. A single property assignment. No diffing. No allocation. No traversal.

---

## The Hooks Dust Does Not Need

React's hook API is large because most of it exists to compensate for the re-render model. Dust eliminates the problem, not just the symptom.

| Hook                                 | React needs it because…                                | Dust                                                                         |
| ------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `useRef`                             | Local vars are discarded on re-render; refs survive    | Component functions run once. Local vars are closures. Refs are unnecessary. |
| `useCallback`                        | Functions are recreated on every render, breaking memo | Functions are created once at mount. There is no render to recreate them.    |
| `useMemo`                            | Expensive computations re-run on every render          | Computations run once. State-derived values use reactive getters.            |
| `useReducer`                         | Convenience over `useState` for complex state          | `useState` handles it. Optional pattern, not structural need.                |
| `useLayoutEffect`                    | Must fire synchronously after VDOM flush               | Dust's DOM updates are direct synchronous mutations. There is no flush.      |
| `useTransition` / `useDeferredValue` | Concurrent scheduler for deferring expensive renders   | There is no scheduler. Updates are immediate and already minimal.            |
| `useImperativeHandle`                | Expose imperative handles via ref                      | Refs don't exist as a concept. DOM nodes are just nodes.                     |

Dust needs exactly **three hooks**:

- **`useState`** — the reactive primitive for all state.
- **`useEffect`** — side effects that react to state changes, with cleanup.
- **`useContext`** — dependency injection through the component tree, with full Provider nesting and automatic stack cleanup.

`useParams` is not a separate primitive — it is a `useState<Record<string,string>>({})` instance managed by the router. The hook model is that clean.

---

## Proportional Cost

In React, update cost scales with **component tree size** — every ancestor between the state and the DOM is implicated in reconciliation unless you manually memoize it.

In Dust, update cost scales with **the number of reactive bindings that changed**. If one piece of state has three subscribers, exactly three closures execute. The rest of the application is completely silent.

```
React:  setCount → re-render component → re-render children → diff → patch
Dust:   setCount → text.textContent = newValue
```

---

## Nested and Object State, Handled Automatically

Dust's `useState` Proxy handles nested reactive access transparently:

```ts
const [user, setUser] = useState({ name: 'Alice', age: 30 });

// user.name is itself a reactive getter — lazily created on first access
<p>{user.name}</p>   // subscribes only to name changes
<p>{user.age}</p>    // subscribes only to age changes
```

Setting `setUser({ name: 'Bob', age: 30 })` calls the nested setter for `name` only if `name` changed — notifying only the consumers of `name`. The `age` binding is not touched.

Object identity is preserved by mutating in-place via the `replace` function. Arrays are mutated by index. Subscriptions are never torn down and rebuilt on object update — they stay wired to the same reactive slots.

---

## Cleanup Without a Framework

Every reactive binding in Dust registers a cleanup function on the DOM node it controls, via a `WeakMap<Node, cleanup[]>`. When a node is removed — by route change, conditional rendering, or parent replacement — `cleanupNode(node)` walks the subtree and unsubscribes every binding recursively.

No memory leaks. No stale subscriptions. No effect cleanup boilerplate spread across `useEffect` return values. The cleanup is structural — it follows the DOM.

---

## Two Routing Flavours

Dust ships with two routers that cover the two patterns developers already know from the React ecosystem — one from Next.js, one from React Router DOM.

### DirectoryRouter — the Next.js flavour

Drop a `pages/` directory next to your app entry point. Dust's dev server scans it, maps file paths to URL patterns, and injects the route registrations automatically. You never write a route table.

```
src/
  pages/
    index.jsx        → /
    about.jsx        → /about
    posts/
      [id].jsx       → /posts/:id
```

```jsx
// App.jsx — no route config needed
import { DirectoryRouter } from 'dust';

export default function App() {
  return <DirectoryRouter />;
}
```

This is the same file-system convention Next.js popularised. Routes are discovered from the directory tree at build time. Adding a page means adding a file, not editing a route table.

### BrowserRouter + Route — the React Router DOM flavour

Declare routes in JSX, co-located with the rest of your component tree. Familiar to anyone who has used `<Route>` components.

```jsx
import { BrowserRouter, Route } from 'dust';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';

export default function App() {
  return (
    <BrowserRouter>
      <Route index component={Home} />
      <Route path="about" component={About} />
      <Route path="posts/:id" component={Post} />
    </BrowserRouter>
  );
}
```

Supports nested routes, index routes, and redirects. Route params are reactive via `useParams` — a plain `useState` getter updated on every navigation. Components reading params re-render surgically, just like any other reactive binding.

### What both share

Neither router triggers component re-renders on navigation. When the URL changes, the router calls `cleanupNode` on the outgoing component's subtree (releasing every reactive subscription), then mounts the incoming component fresh. There is no VDOM diff across route transitions — the old tree is discarded and the new one is built once from scratch.

---

## Summary

Dust is not a stripped-down React. It is a different model built on a better premise.

React describes UI as a function re-evaluated on every state change, then works to make that tolerable. Dust describes UI as a graph wired at mount time, where state changes flow directly to the nodes that care — and nowhere else.

The result:

- **No virtual DOM** — zero allocation, zero diffing on update.
- **No re-renders** — component functions run once.
- **No memoization tax** — `useMemo`, `useCallback`, `useRef` are not concepts.
- **No scheduler** — updates are immediate, synchronous, and already minimal.
- **Proportional updates** — cost is determined by what changed, not by tree depth.
- **Three hooks** — `useState`, `useEffect`, `useContext`. That is the complete model.
- **Two routing flavours** — file-system routing like Next.js, or declarative `<Route>` trees like React Router DOM. Pick whichever fits the project.

State changes in Dust do exactly as much work as the change requires. Nothing more.
