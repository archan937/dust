import Dust from 'dust';

import {
  pageWrap, hero, pageTitle, pageSub, toc, tocLink,
  section, sectionTitle, apiName, desc, codeBlock, rule, callout,
} from './styles';

function Docs() {
  return (
    <div className={pageWrap}>

      <div className={hero}>
        <h1 className={pageTitle}>Documentation</h1>
        <p className={pageSub}>
          Dust is a minimalistic reactive UI library with no virtual DOM.
          Components run once — state updates flow surgically to the exact DOM nodes that depend on them.
        </p>
        <nav className={toc}>
          <a href="#core" className={tocLink}>Core concepts</a>
          <a href="#usestate" className={tocLink}>useState</a>
          <a href="#useeffect" className={tocLink}>useEffect</a>
          <a href="#useref" className={tocLink}>useRef</a>
          <a href="#context" className={tocLink}>Context</a>
          <a href="#router" className={tocLink}>Router</a>
          <a href="#jsx" className={tocLink}>JSX reactivity</a>
        </nav>
      </div>

      {/* ── Core concepts ─────────────────────────────── */}
      <div className={section} id="core">
        <h2 className={sectionTitle}>Core concepts</h2>
        <p className={desc}>
          In React, a state change re-renders the component and React diffs the virtual DOM to decide
          what to update. In Dust, <strong>there is no virtual DOM and no re-rendering</strong>.
          A component function runs exactly once. Every reactive expression in JSX
          subscribes directly to the state it depends on, and updates only that DOM node when the state changes.
        </p>
        <div className={callout}>
          <strong>No useMemo, no useCallback, no keys, no reconciliation.</strong> There is nothing
          to optimise because nothing is ever re-computed unnecessarily. State changes are O(1) —
          they reach only the subscribed DOM nodes.
        </div>
        <p className={desc}>
          State is created with <code>useState</code>, which returns a reactive <strong>Getter</strong> —
          a Proxy-wrapped function. Calling it (<code>count()</code>) reads the current value
          and, when called inside a tracked JSX expression, registers a subscription automatically.
        </p>
      </div>

      <div className={rule} />

      {/* ── useState ──────────────────────────────────── */}
      <div className={section} id="usestate">
        <h2 className={sectionTitle}>useState</h2>

        <p className={apiName}>useState&lt;T&gt;(initialValue)</p>
        <p className={desc}>
          Returns a <code>[getter, setter]</code> tuple.
          The getter is a callable Proxy — <code>count()</code> reads the value,
          <code>count.__register__(fn)</code> subscribes manually.
        </p>
        <pre className={codeBlock}>{`const [count, setCount] = useState(0);

count()              // read current value → 0
setCount(1)          // set directly
setCount(n => n + 1) // functional update`}</pre>

        <p className={apiName}>Object & array state</p>
        <p className={desc}>
          Object properties and array items are accessed through the Proxy.
          Nested properties become reactive Getters automatically on first access.
        </p>
        <pre className={codeBlock}>{`const [user, setUser] = useState({ name: 'Alice', age: 30 });

user.name()   // reactive Getter — updates only nodes using .name
user()        // plain snapshot → { name: 'Alice', age: 30 }

const [items, setItems] = useState(['a', 'b', 'c']);
setItems(['x', 'y']) // mutates in-place, trims length`}</pre>

        <p className={apiName}>ReactiveList — items.map()</p>
        <p className={desc}>
          Calling <code>.map()</code> on an array Getter returns a <strong>ReactiveList</strong>
          — a live-reconciled list that adds, removes, and reorders DOM nodes by identity,
          without re-rendering existing items.
        </p>
        <pre className={codeBlock}>{`const [notes, setNotes] = useState([]);

const noteItems = notes.map(note => (
  <li>{note.text}</li>
));

// In JSX:
<ul>{noteItems}</ul>

// Add a note — only the new <li> is inserted, nothing else re-renders:
setNotes(n => [...n, { text: 'Buy milk' }])`}</pre>
      </div>

      <div className={rule} />

      {/* ── useEffect ─────────────────────────────────── */}
      <div className={section} id="useeffect">
        <h2 className={sectionTitle}>useEffect</h2>

        <p className={apiName}>useEffect(callback, deps[])</p>
        <p className={desc}>
          Runs the callback immediately, then re-runs it whenever any dep changes.
          Deps must be state Getters. Return a cleanup function to run before the next call.
        </p>
        <pre className={codeBlock}>{`const [running, setRunning] = useState(false);

useEffect(() => {
  if (!running()) return;
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id); // cleanup on next run or unmount
}, [running])`}</pre>

        <div className={callout}>
          Unlike React, <code>useEffect</code> in Dust does not need an exhaustive
          deps list to prevent stale closures — it subscribes to the Getter objects
          themselves, not their values at call time.
        </div>
      </div>

      <div className={rule} />

      {/* ── useRef ────────────────────────────────────── */}
      <div className={section} id="useref">
        <h2 className={sectionTitle}>useRef</h2>

        <p className={apiName}>useRef&lt;T&gt;(initialValue)</p>
        <p className={desc}>
          Returns a plain <code>{'{ current: T }'}</code> object. Assign a DOM element
          via the <code>ref</code> prop and read or mutate it imperatively.
          Does not trigger re-renders.
        </p>
        <pre className={codeBlock}>{`const inputRef = useRef<HTMLInputElement | null>(null);

// In JSX:
<input ref={inputRef} type="text" />

// Imperative access:
inputRef.current?.focus()
inputRef.current?.select()`}</pre>

        <p className={desc}>
          A common pattern is using <code>useRef</code> with <code>useEffect</code>
          to imperatively update a DOM node's class without a reactive expression:
        </p>
        <pre className={codeBlock}>{`const btnRef = useRef<HTMLButtonElement | null>(null);

useEffect(() => {
  if (btnRef.current)
    btnRef.current.className = cx(btn, active() ? btnActive : '');
}, [active])`}</pre>
      </div>

      <div className={rule} />

      {/* ── Context ───────────────────────────────────── */}
      <div className={section} id="context">
        <h2 className={sectionTitle}>Context</h2>

        <p className={apiName}>createContext(defaultValue)</p>
        <p className={desc}>
          Creates a context object with a <code>Provider</code> component.
          The default value is used when no Provider is above the consumer in the tree.
          Pass a state Getter as the default value to make it reactive everywhere.
        </p>
        <pre className={codeBlock}>{`const [theme, setTheme] = useState('dark');
const ThemeCtx = createContext(theme); // Getter as default → always reactive`}</pre>

        <p className={apiName}>useContext(ctx)</p>
        <p className={desc}>
          Reads the nearest Provider value, or the context's default value.
          If the value is a state Getter, calling it in JSX is reactive as usual.
        </p>
        <pre className={codeBlock}>{`function ThemedButton() {
  const theme = useContext(ThemeCtx); // returns the Getter

  return (
    <button className={theme() === 'dark' ? darkBtn : lightBtn}>
      Click me
    </button>
  );
}

// Wrap in a Provider to override:
<ThemeCtx.Provider value={theme}>
  <ThemedButton />
</ThemeCtx.Provider>`}</pre>
      </div>

      <div className={rule} />

      {/* ── Router ────────────────────────────────────── */}
      <div className={section} id="router">
        <h2 className={sectionTitle}>Router</h2>

        <p className={apiName}>useParams()</p>
        <p className={desc}>
          Returns the current route params as a plain object.
          Access individual params as reactive Getters via the Proxy:
        </p>
        <pre className={codeBlock}>{`// Route: /blog/:id
const { id } = useParams();  // plain string, read once
useParams.id()               // reactive Getter — updates when route changes`}</pre>

        <p className={apiName}>BrowserRouter + Route</p>
        <p className={desc}>
          Declarative routing. Supports static paths, dynamic segments, index routes, and redirects.
        </p>
        <pre className={codeBlock}>{`<BrowserRouter>
  <Route path="/"        component={Home}  index />
  <Route path="/docs"    component={Docs} />
  <Route path="/blog/:id" component={Post} />
  <Route path="/old"     redirect="/new" />
</BrowserRouter>`}</pre>

        <p className={apiName}>DirectoryRouter</p>
        <p className={desc}>
          File-system routing. Drop <code>{'<DirectoryRouter />'}</code> in your app
          and the dev server automatically discovers pages in <code>src/pages/</code>
          and registers their routes. A page at <code>src/pages/blog/:id/index.tsx</code>
          maps to <code>/blog/:id</code>.
        </p>
        <pre className={codeBlock}>{`// App.tsx
<DirectoryRouter />

// src/pages/ layout → routes
// pages/index/index.tsx   → /
// pages/docs/index.tsx    → /docs
// pages/blog/:id/index.tsx → /blog/:id`}</pre>
      </div>

      <div className={rule} />

      {/* ── JSX reactivity ────────────────────────────── */}
      <div className={section} id="jsx">
        <h2 className={sectionTitle}>JSX reactivity</h2>
        <p className={desc}>
          Dust's Babel plugin (<code>jsx-getter-consumer</code>) automatically wraps
          reactive expressions in JSX children so <code>mountChild</code> can track
          their dependencies. Write bare Getters everywhere in JSX — no need to call them.
        </p>
        <pre className={codeBlock}>{`// What you write:
<p>{count}</p>
<p>{running ? '⏸ Pause' : '▶ Start'}</p>
<p>{name || 'Anonymous'}</p>

// What the plugin emits (roughly):
<p>{() => count}</p>
<p>{() => Dust.call(running) ? '⏸ Pause' : '▶ Start'}</p>
<p>{() => Dust.call(name) || 'Anonymous'}</p>`}</pre>

        <p className={desc}>
          <code>Dust.call(getter)</code> auto-unwraps a Getter inside expression
          positions (conditionals, logical operators, binary/unary expressions) so
          the actual value is used as the truthy/falsy operand. Plain values pass
          through unchanged.
        </p>

        <div className={callout}>
          <strong>One exception:</strong> when passing a Getter's value as an
          argument to a regular function, call it explicitly —{' '}
          <code>{'fmt(elapsed())'}</code> — because the plugin can't know the
          function expects a number, not the Getter object.
        </div>

        <div className={callout}>
          <strong>Rule:</strong> expressions in JSX children that call or reference
          state are wrapped automatically. Expressions in <strong>props</strong> are
          not wrapped — use <code>useEffect</code> + <code>useRef</code> to
          imperatively update a prop that depends on state.
        </div>
      </div>

    </div>
  );
}

export default Docs;
