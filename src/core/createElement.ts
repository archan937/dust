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
      if (
        value instanceof Node ||
        value === null ||
        value === undefined ||
        typeof value === 'boolean'
      ) {
        // Reactive DOM: use an anchor comment for in-place replacement.
        const anchor = document.createComment('');
        parent.appendChild(anchor);
        let current: Node | null = value instanceof Node ? value : null;
        if (current) parent.insertBefore(current, anchor);
        const update = (): void => {
          const next = child() as Child;
          const nextNode = next instanceof Node ? next : null;
          if (current) {
            cleanupNode(current);
            if (current.parentNode) current.parentNode.removeChild(current);
          }
          current = nextNode;
          if (current && anchor.parentNode)
            anchor.parentNode.insertBefore(current, anchor);
        };
        const unsubscribers = trackedDeps.map((reg) => reg(update));
        registerCleanup(anchor, () => unsubscribers.forEach((fn) => fn()));
        return;
      }

      // Reactive primitive (number, string).
      const text = document.createTextNode(String(value));
      const update = (): void => {
        text.textContent = String(child());
      };
      const unsubscribers = trackedDeps.map((reg) => reg(update));
      registerCleanup(text, () => unsubscribers.forEach((fn) => fn()));
      parent.appendChild(text);
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
