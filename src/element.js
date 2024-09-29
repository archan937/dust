const { isFunction, isNull, isUndefined } = require("utils");

const addAttributes = (el, props) => {
  Object.entries(props || {}).forEach(([key, value]) => {
    const attr = key.toLowerCase();
    el.setAttribute(attr, value);
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
      const updateNode = () => (node.nodeValue = child());
      updateNode();
    } else {
      node.nodeValue = child;
    }
  }

  parent.appendChild(node);
};

const createElement = (componentOrTagName, props, children) => {
  if (isFunction(componentOrTagName)) {
    return componentOrTagName({ ...props, children });
  }

  const isFragment = !componentOrTagName;
  const el = isFragment
    ? document.createDocumentFragment()
    : document.createElement(componentOrTagName);

  if (!isFragment) {
    addAttributes(el, props);
  }

  [children].flat().forEach((child) => addChild(el, child));

  return el;
};

const createRoot = (root) => ({
  render: (component) => {
    root.innerHTML = "";
    root.appendChild(createElement(component));
  },
});

module.exports = {
  createElement,
  createRoot,
};
