const isFunction = (value) => typeof value === "function";

let document = typeof window === "undefined" ? null : window.document;

const setDocument = (doc) => (document = doc);

const addAttributes = (el, props) => {
  Object.entries(props || {}).forEach(([key, value]) => {
    el[key.toLowerCase()] = value;
  });
};

const addChildren = (el, children) => {
  (children || []).forEach((child) => {
    if (child.toString().match(/DocumentFragment|HTML.*Element/)) {
      el.appendChild(child);
      return;
    }

    let node = document.createTextNode("");

    if (isFunction(child)) {
      child.__handler__ = () => {
        node.nodeValue = child();
      };
      child.__handler__();
    } else {
      node.nodeValue = child;
    }

    el.appendChild(node);
  });
};

const createElement = (componentOrTagName, props, children) => {
  if (isFunction(componentOrTagName)) {
    return componentOrTagName({ ...props, children });
  } else {
    const fragment = !componentOrTagName;

    const parent = fragment
      ? document.createDocumentFragment()
      : document.createElement(componentOrTagName);

    if (!fragment) {
      addAttributes(parent, props);
    }

    addChildren(parent, children);
    return parent;
  }
};

const replaceElement = (
  currentElement,
  componentOrTagName,
  props,
  children
) => {
  const newElement = createElement(componentOrTagName, props, children);
  currentElement.parentNode.replaceChild(newElement, currentElement);
};

exports.setDocument = setDocument;
exports.createElement = createElement;
exports.replaceElement = replaceElement;
