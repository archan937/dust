const state = require("./state");
const { transform } = require("./transformer");

const components = {};

const register = (name, fn) => {
  components[name] = fn;
};

const transpileCode = () => {
  [...document.getElementsByTagName("script")].forEach((script) => {
    if (script.type.match(/text\/(babel|hydrogen)/)) {
      const { code, components } = transform(script.innerText);
      // console.log({ code, components });
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
  [...document.getElementsByTagName("*")].forEach((element) => {
    if (element.toString().includes("HTMLUnknownElement")) {
      // console.log(element.tagName);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  transpileCode();
  renderElements();
});

window.Hydrogen = {
  createElement: (name, props, children) => {
    // console.log({ name, props, children });
    // createElement(name, props, children);
  },
  register,
  components,
  ...state,
};
