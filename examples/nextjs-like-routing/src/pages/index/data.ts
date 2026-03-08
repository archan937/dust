export interface Feature {
  icon: string;
  name: string;
  desc: string;
}

export const features: Feature[] = [
  {
    icon: '⚡',
    name: 'useState',
    desc: 'Proxy-based reactive state. Only the exact DOM nodes that read a getter update — zero diffing, zero re-renders.',
  },
  {
    icon: '🔁',
    name: 'useEffect',
    desc: 'Dependency-aware side effects with cleanup. Perfect for timers, subscriptions, and DOM measurements.',
  },
  {
    icon: '📌',
    name: 'useRef',
    desc: 'Stable mutable refs. Pass ref={r} to any element — current is set after mount, usable forever.',
  },
  {
    icon: '🌐',
    name: 'createContext',
    desc: 'Stack-based Provider/consumer. No prop drilling, no wrappers, no wasted renders.',
  },
  {
    icon: '📋',
    name: 'ReactiveList',
    desc: 'Identity-based DOM reconciliation via items.map(). Moves, inserts, and deletes map directly to minimal DOM ops.',
  },
  {
    icon: '🎨',
    name: 'css / cx',
    desc: 'Tagged-template CSS-in-JS. Hashed, deduplicated, injected once. Native CSS nesting. Zero runtime overhead.',
  },
];
