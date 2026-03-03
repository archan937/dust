import type { Getter } from 'src/types';

type Child =
  | (() => unknown)
  | DocumentFragment
  | Node
  | boolean
  | null
  | number
  | string
  | undefined;

type Props = Record<string, unknown> | null;

const mountChild = (parent: Node, child: Child): void => {
  if (child === null || child === undefined || child === false) return;

  if (child instanceof Node) {
    parent.appendChild(child);
    return;
  }

  if (typeof child === 'function') {
    const value = child();
    const getter = value as Getter<unknown>;

    if (typeof getter === 'function' && getter.__register__) {
      const text = document.createTextNode(String(getter()));
      getter.__register__(() => {
        text.textContent = String(getter());
      });
      parent.appendChild(text);
      return;
    }

    mountChild(parent, value as Child);
    return;
  }

  parent.appendChild(document.createTextNode(String(child)));
};

export const Fragment = (_props: Props, ...children: Child[]): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  children.forEach((child) => mountChild(fragment, child));
  return fragment;
};

export const createElement = (
  type: string | ((...args: unknown[]) => Node),
  props: Props,
  ...children: Child[]
): Node => {
  if (typeof type === 'function') {
    return type(props ?? {}, ...children);
  }

  const el = document.createElement(type);

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
      } else if (key === 'className') {
        el.className = String(value);
      } else if (value !== null && value !== undefined && value !== false) {
        el.setAttribute(key, String(value));
      }
    });
  }

  children.forEach((child) => mountChild(el, child));

  return el;
};
