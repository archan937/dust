(function () {
  const { assert, test } = QUnit;

  let document;
  let createElement;
  let useState;

  if (typeof window === "undefined") {
    const element = require("../src/element");
    const JSDOM = require("jsdom").JSDOM;
    document = new JSDOM("<!DOCTYPE html>").window.document;
    createElement = element.createElement;
    element.setDocument(document);
    useState = require("../src/state").useState;
  } else {
    document = window.document;
    createElement = Hydrogen.createElement;
    useState = Hydrogen.useState;
  }

  QUnit.module("createElement", () => {
    test("basic HTML element", () => {
      const element = createElement("h1", {}, ["Hello ", "world!"]);
      assert.equal(element.tagName, "H1");
      assert.equal(element.textContent, "Hello world!");
    });

    test("basic HTML element with simple state", () => {
      const [counter, setCounter] = useState(0);

      const element = createElement("div", {}, ["Count: ", () => counter()]);
      assert.equal(element.tagName, "DIV");
      assert.equal(element.textContent, "Count: 0");

      setCounter(1);
      assert.equal(element.textContent, "Count: 1");

      setCounter((counter) => counter + 2);
      assert.equal(element.textContent, "Count: 3");
    });
  });
})();
