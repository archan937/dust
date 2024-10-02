import { isDomNode, isFunction, isNull, isUndefined } from "utils";

const addAttributes = (el, props) => {
  Object.entries(props || {}).forEach(([key, value]) => {
    const attr = key.toLowerCase();
    const event = attr.match(/on([a-z]+)/)?.[1];

    if (event && isFunction(value)) {
      el.addEventListener(event, value, false);
    } else {
      el.setAttribute(attr, value);
    }
  });
};

const addChild = (parent, child) => {
  if (isNull(child) || isUndefined(child)) {
    return;
  }

  let node;

  if (
    child instanceof Element ||
    child.constructor.name === "DocumentFragment"
  ) {
    node = child;
  } else {
    node = document.createTextNode("");

    if (isFunction(child)) {
      child.__handler__ = () => {
        const value = child();
        if (isDomNode(value)) {
          node = value;
          parent.replaceChildren(node);
        } else {
          if (isDomNode(node)) {
            node = document.createTextNode("");
            parent.replaceChildren(node);
          }
        }
        node.nodeValue =
          isNull(value) || isUndefined(value) || value === false ? "" : value;
      };
      child.__handler__();
    } else {
      node.nodeValue = child;
    }
  }

  parent.appendChild(node);
};

const createElement = (componentOrTagNameOrNode, props, ...rest) => {
  if (isDomNode(componentOrTagNameOrNode)) {
    return componentOrTagNameOrNode;
  }

  const children = rest.flat();

  if (componentOrTagNameOrNode?.name === "NoElement") {
    return { ...props, children };
  }

  if (isFunction(componentOrTagNameOrNode)) {
    return componentOrTagNameOrNode({ ...props, children });
  }

  const isFragment = !componentOrTagNameOrNode;
  const el = isFragment
    ? document.createDocumentFragment()
    : document.createElement(componentOrTagNameOrNode);

  if (!isFragment) {
    addAttributes(el, props);
  }

  children.forEach((child) => addChild(el, child));

  return el;
};

const createRoot = (root) => ({
  render: (component) => {
    root.innerHTML = "";
    root.appendChild(createElement(component));
  },
});

const Fragment = "";

function NoElement(props) {
  return props;
}

export { createElement, createRoot, Fragment, NoElement };
