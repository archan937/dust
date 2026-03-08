import type { Getter } from 'src/types';
import { tracking } from 'src/utils/reactive';

import { ReactiveList } from './reactive-list';

export type Child =
  | (() => unknown)
  | DocumentFragment
  | Node
  | ReactiveList<unknown>
  | boolean
  | null
  | number
  | string
  | undefined;

type Props = Record<string, unknown> | null;

// ── Cleanup registry ──────────────────────────────────────────────────────────

const cleanups = new WeakMap<Node, (() => void)[]>();

export const registerCleanup = (node: Node, fn: () => void): void => {
  const existing = cleanups.get(node);
  if (existing) {
    existing.push(fn);
  } else {
    cleanups.set(node, [fn]);
  }
};

export const cleanupNode = (node: Node): void => {
  cleanups.get(node)?.forEach((fn) => fn());
  cleanups.delete(node);
  Array.from(node.childNodes).forEach(cleanupNode);
};

// ── Mount ─────────────────────────────────────────────────────────────────────

const mountChild = (parent: Node, child: Child): void => {
  if (child === null || child === undefined || child === false) return;

  if (child instanceof Node) {
    parent.appendChild(child);
    return;
  }

  if (child instanceof ReactiveList) {
    const anchor = document.createComment('');
    parent.appendChild(anchor);
    const rl = child as ReactiveList<unknown>;

    interface Entry {
      item: unknown;
      node: Node;
    }
    let entries: Entry[] = rl.getItems().map((item) => {
      const node = rl.render(item);
      parent.insertBefore(node, anchor);
      return { item, node };
    });

    const unsubscribe = rl.subscribe(() => {
      const newItems = rl.getItems();
      const used = new Set<number>();
      const newEntries: Entry[] = newItems.map((item) => {
        const idx = entries.findIndex(
          (e, i) => !used.has(i) && e.item === item,
        );
        if (idx >= 0) {
          used.add(idx);
          return entries[idx];
        }
        return { item, node: rl.render(item) };
      });
      entries.forEach((e, i) => {
        if (!used.has(i)) {
          cleanupNode(e.node);
          e.node.parentNode?.removeChild(e.node);
        }
      });
      newEntries.forEach(({ node }) =>
        anchor.parentNode?.insertBefore(node, anchor),
      );
      entries = newEntries;
    });

    registerCleanup(anchor, unsubscribe);
    return;
  }

  if (typeof child === 'function') {
    // Run with tracking to detect reactive state dependencies.
    const trackedDeps: ((fn: () => void) => () => void)[] = [];
    const prevTracker = tracking.current;
    tracking.current = (registerFn): void => {
      trackedDeps.push(registerFn);
    };
    let value: unknown;
    try {
      value = child();
    } finally {
      tracking.current = prevTracker;
    }

    const getter = value as Getter<unknown>;

    // child returned a state getter directly (e.g. `() => count`) → reactive text.
    if (typeof getter === 'function' && getter.__register__) {
      const text = document.createTextNode(String(getter()));
      const unsubscribe = getter.__register__(() => {
        text.textContent = String(getter());
      });
      registerCleanup(text, unsubscribe);
      parent.appendChild(text);
      return;
    }

    // child has reactive deps (e.g. `() => count()`, `() => show() && <p/>`).
    if (trackedDeps.length > 0) {
      // Use an anchor comment for in-place replacement.
      // Tracks an array of nodes because a DocumentFragment transfers (and
      // empties) its children on insertion — we must track the children
      // themselves, not the fragment, so we can remove them on the next update.
      const anchor = document.createComment('');
      parent.appendChild(anchor);

      const commit = (v: unknown): Node[] => {
        const p = anchor.parentNode!;
        if (v === null || v === undefined || typeof v === 'boolean') return [];
        if (v instanceof DocumentFragment) {
          const nodes = Array.from(v.childNodes);
          nodes.forEach((n) => p.insertBefore(n, anchor));
          return nodes;
        }
        const node =
          v instanceof Node ? v : document.createTextNode(String(v));
        p.insertBefore(node, anchor);
        return [node];
      };

      const remove = (nodes: Node[]): void => {
        nodes.forEach((n) => {
          cleanupNode(n);
          n.parentNode?.removeChild(n);
        });
      };

      let current = commit(value);

      const update = (): void => {
        remove(current);
        current = commit(child() as unknown);
      };
      const unsubscribers = trackedDeps.map((reg) => reg(update));
      registerCleanup(anchor, () => unsubscribers.forEach((fn) => fn()));
      return;
    }

    mountChild(parent, value as Child);
    return;
  }

  parent.appendChild(document.createTextNode(String(child)));
};

export const Fragment = (
  _props: Props,
  ...children: Child[]
): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  children.forEach((child) => mountChild(fragment, child));
  return fragment;
};

export const createElement = (
  type: string | ((...args: never[]) => Node),
  props: Props,
  ...children: Child[]
): Node => {
  if (typeof type === 'function') {
    return (type as (props: Props, ...children: Child[]) => Node)(
      props ?? {},
      ...children,
    );
  }

  const el = document.createElement(type);

  const rawRef = props?.ref as { current: Element } | null | undefined;

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
      } else if (key === 'className') {
        el.className = String(value);
      } else if (key === 'htmlFor') {
        el.setAttribute('for', String(value));
      } else if (typeof value === 'boolean') {
        if (value) el.setAttribute(key, '');
      } else if (key !== 'ref' && value !== null && value !== undefined) {
        el.setAttribute(key, String(value));
      }
    });
  }

  children.forEach((child) => mountChild(el, child));

  if (rawRef) rawRef.current = el;

  return el;
};
