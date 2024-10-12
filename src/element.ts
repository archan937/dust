import type {
  Child,
  Children,
  Component,
  Props,
  Root,
  StateHandler,
} from "types";

import { isDomNode, isFunction, isNull, isUndefined } from "utils";

const addAttributes = (el: HTMLElement, props: Props): void => {
  Object.entries(props || {}).forEach(([key, value]) => {
    const attr = key.toLowerCase();
    const event = attr.match(/on([a-z]+)/)?.[1];

    if (event && isFunction(value)) {
      el.addEventListener(event, value as EventListener, false);
    } else {
      el.setAttribute(attr, value as string);
    }
  });
};

const addChild = (parent: Node, child: Child): void => {
  if (isNull(child) || isUndefined(child)) {
    return;
  }

  let node: Node;

  if (
    child &&
    (child instanceof Element || child.constructor.name === "DocumentFragment")
  ) {
    node = child as Node;
  } else {
    node = document.createTextNode("");

    if (isFunction(child)) {
      (child as StateHandler).__handler__ = (): void => {
        const value = (child as StateHandler)();
        if (isDomNode(value)) {
          node = value as Node;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (parent as any).replaceChildren(node);
        } else {
          if (isDomNode(node)) {
            node = document.createTextNode("");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (parent as any).replaceChildren(node);
          }
        }
        (node as Text).nodeValue =
          isNull(value) || isUndefined(value) || value === false
            ? ""
            : String(value);
      };
      (child as StateHandler).__handler__?.();
    } else {
      (node as Text).nodeValue = String(child);
    }
  }

  parent.appendChild(node);
};

const createElement = (
  componentOrTagNameOrNode: string | Component | Node | null,
  props: Props,
  ...rest: Children
): Node | Record<string, unknown> => {
  if (isDomNode(componentOrTagNameOrNode)) {
    return componentOrTagNameOrNode as Node;
  }

  const children = rest.flat();

  if (isFunction(componentOrTagNameOrNode)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    if ((componentOrTagNameOrNode as Function)?.name === "NoElement") {
      return { ...props, children };
    }
    return (componentOrTagNameOrNode as Component)({ ...props, children });
  }

  const isFragment = !componentOrTagNameOrNode;
  const el = isFragment
    ? document.createDocumentFragment()
    : document.createElement(componentOrTagNameOrNode as string);

  if (!isFragment) {
    addAttributes(el as HTMLElement, props);
  }

  children.forEach((child) => addChild(el, child));

  return el;
};

const createRoot = (root: HTMLElement): Root => ({
  render: (component: Component): void => {
    root.innerHTML = "";
    root.appendChild(createElement(component, {}) as Node);
  },
});

const Fragment = "" as const;

function NoElement(props: Props): Props {
  return props;
}

export { createElement, createRoot, Fragment, NoElement };
