export interface Section {
  heading: string;
  body: string;
}

export interface Post {
  title: string;
  lead: string;
  sections: Section[];
}

export const posts: Record<string, Post> = {
  '1': {
    title: 'Why Dust runs components once',
    lead: 'Traditional frameworks re-render components whenever state changes. Dust takes a different path: your component function runs exactly once, and reactive primitives handle all future DOM updates.',
    sections: [
      {
        heading: 'The problem with re-renders',
        body: "Every time state changes in React, the entire component tree re-evaluates. Even with memoization and diffing, you're fighting the framework to avoid unnecessary work. Dust eliminates the problem at the root.",
      },
      {
        heading: 'How Dust works instead',
        body: 'When you call useState(), you get a Proxy-wrapped getter. When that getter is read inside a reactive context (a JSX child wrapped in () => ...), Dust records the dependency. When state changes, only that exact DOM text node or subtree updates — nothing else.',
      },
      {
        heading: 'Zero diffing, zero VDOM',
        body: "There's no virtual DOM, no reconciliation algorithm, and no fiber scheduler. State change → subscriber callback → DOM mutation. Three steps. Direct. Fast.",
      },
    ],
  },
  '2': {
    title: 'Reactive state without a virtual DOM',
    lead: "Dust's useState returns a Proxy-wrapped function. Reading it registers a subscription. Writing it fires all subscribers. No VDOM layer in between — state flows directly to DOM nodes.",
    sections: [
      {
        heading: 'Proxies as reactive primitives',
        body: 'The getter returned by useState is a Proxy. Accessing .someProperty on it creates a derived reactive value for that property path. This enables patterns like user.name directly in JSX without any special compiler magic beyond the jsx-getter-consumer plugin.',
      },
      {
        heading: 'Subscriptions are surgical',
        body: "Each reactive DOM location — a text node, an attribute, a child subtree — independently subscribes to exactly the state it reads. A counter changing doesn't touch your nav, your header, or anything else on the page.",
      },
      {
        heading: 'useEffect integrates naturally',
        body: "Effects receive the same getter-based dep array. When a dep changes, the cleanup runs, then the effect re-runs. It's the same subscription model, applied to side effects instead of DOM nodes.",
      },
    ],
  },
  '3': {
    title: 'CSS-in-JS that costs nothing at runtime',
    lead: 'The css tagged template hashes its content, injects the class once into a <style> tag, and returns the class name. Deduplication is automatic. Nesting is native CSS. Runtime cost is a Set lookup.',
    sections: [
      {
        heading: 'How the css tag works',
        body: 'css`color: red` computes a hash of the template string, checks a Set for duplicates, appends .dXXXXXX { color: red } to a shared <style> element, and returns the class name string. After the first call, subsequent calls with the same styles are a no-op.',
      },
      {
        heading: 'Native CSS nesting',
        body: 'Because the output is real CSS injected into a <style> tag, you can use any modern CSS syntax including nesting with &, container queries, and :has(). No PostCSS required — the browser handles it natively.',
      },
      {
        heading: 'cx for conditional classes',
        body: 'cx(base, isActive && activeClass, isFocused && focusClass) filters falsy values and joins with a space. Pair it with useRef + useEffect to update className imperatively when reactive state changes.',
      },
    ],
  },
};
