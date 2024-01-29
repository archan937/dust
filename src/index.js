const element = require("./element");
const state = require("./state");
const transformer = require("./transformer");

const components = {};

const register = (name, fn) => {
  components[name.toUpperCase()] = fn;
};

const transpileCode = () => {
  [...document.getElementsByTagName("script")].forEach((script) => {
    if (script.type.match(/text\/(babel|hydrogen)/)) {
      const { code, components } = transformer.transform(script.innerText);
      Object.entries(
        new Function(`
        ${code}
        return {${components.join(", ")}};
      `)()
      ).forEach(([name, fn]) => register(name, fn));
    }
  });
};

const renderElements = () => {
  [...document.getElementsByTagName("*")].forEach((el) => {
    if (el.toString().includes("HTMLUnknownElement")) {
      element.replaceElement(el, components[el.tagName]);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  transpileCode();
  renderElements();
  console.log({ components });
});

window.Hydrogen = {
  ...element,
  ...state,
  ...transformer,
};
