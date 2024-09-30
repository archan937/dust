import { describe, expect, it } from "bun:test";
import { format } from "prettier";

import { createElement, createRoot } from "src/element";

const f = async (code) =>
  (await format(code, { semi: false, parser: "babel" })).replace(
    /(^;|\n,?$)/g,
    "",
  );

describe("createElement", () => {
  describe("instantiation", () => {
    it("creates an HTML element ", () => {
      const element = createElement("h1");
      expect(element instanceof HTMLElement).toBeTruthy();
      expect(element.tagName).toBe("H1");
      expect(element.outerHTML).toBe("<h1></h1>");
    });

    it("creates a document fragment", () => {
      const element = createElement("");
      expect(element.constructor.name).toBe("DocumentFragment");
      expect(element.outerHTML).toBeUndefined();
    });

    it("renders a Hydrogen component", () => {
      function Component() {
        return createElement("div");
      }

      const element = createElement(Component);
      expect(element instanceof HTMLElement).toBeTruthy();
      expect(element.tagName).toBe("DIV");
      expect(element.outerHTML).toBe("<div></div>");
    });
  });

  describe("attributes", () => {
    it("applies passed attributes", () => {
      expect(createElement("h1", {}).outerHTML).toBe("<h1></h1>");
      expect(createElement("div", { id: "root" }).outerHTML).toBe(
        '<div id="root"></div>',
      );
      expect(createElement("div", { CLASS: "content" }).outerHTML).toBe(
        '<div class="content"></div>',
      );
    });
  });

  describe("children", () => {
    it("renders primitives", () => {
      expect(createElement("h1", {}, ["Hello world!", ""]).outerHTML).toBe(
        "<h1>Hello world!</h1>",
      );

      expect(createElement("h1", {}, "Hello world!", "").outerHTML).toBe(
        "<h1>Hello world!</h1>",
      );

      expect(
        createElement("h1", {}, ["Hello world!", "How are you?"]).outerHTML,
      ).toBe("<h1>Hello world!How are you?</h1>");

      expect(createElement("div", {}, [0, 123]).outerHTML).toBe(
        "<div>0123</div>",
      );

      expect(createElement("div", {}, [true, false]).outerHTML).toBe(
        "<div>truefalse</div>",
      );
    });

    it("renders document fragments", () => {
      expect(
        createElement("div", {}, [document.createDocumentFragment()]).outerHTML,
      ).toBe("<div></div>");
    });

    it("renders HTML elements", () => {
      expect(
        createElement("div", {}, [document.createElement("h1")]).outerHTML,
      ).toBe("<div><h1></h1></div>");
    });

    it("renders functions", () => {
      expect(
        createElement("div", {}, [() => `Sum: 1 + 1 = ${1 + 1}`]).outerHTML,
      ).toBe("<div>Sum: 1 + 1 = 2</div>");
    });

    it("ignores 'nothings'", () => {
      expect(createElement("a", {}, null).outerHTML).toBe("<a></a>");
      expect(createElement("a", {}, undefined).outerHTML).toBe("<a></a>");
      expect(createElement("a", {}, [null, undefined]).outerHTML).toBe(
        "<a></a>",
      );
    });
  });
});

describe("createRoot", () => {
  it("renders an element within the root element", async () => {
    document.body.innerHTML = `<div id="root"></div>`;

    function App() {
      return createElement("h1", {}, ["Hello world!"]);
    }

    const root = createRoot(document.getElementById("root"));
    root.render(App);

    const rootElement = document.querySelector("#root");
    expect(await f(rootElement.innerHTML)).toBe(
      await f(`
        <h1>Hello world!</h1>
      `),
    );
  });
});
