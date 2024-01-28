const state = require("./state");
const transformer = require("./transformer");

const components = {};

const register = (name, fn) => {
  components[name] = fn;
};

const transpileCode = () => {
  [...document.getElementsByTagName("script")].forEach((script) => {
    if (script.type.match(/text\/(babel|hydrogen)/)) {
      const { code, components } = transformer.transform(script.innerText);
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
      console.log(element.tagName);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  transpileCode();
  renderElements();
  console.log({ components });
});

window.Hydrogen = {
  createElement: (name, props, children) => {
    console.log("createElement", { name, props, children });
  },
  register,
  components,
  ...state,
  ...transformer,
};
