(function () {
  const { assert, test } = QUnit;

  let transform;

  try {
    transform = require("../src/transformer").transform;
  } catch (error) {
    transform = Hydrogen.transform;
  }

  const trim = (code) =>
    code
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .trim();

  QUnit.module("transform", () => {
    test("basic javascript", () => {
      assert.equal(
        trim(
          transform(`
            function Hello() {
              return 'Hello';
            }
          `).code
        ),
        trim(`
          function Hello() {
            return 'Hello';
          }
        `)
      );
    });

    test("simple component", () => {
      assert.equal(
        trim(
          transform(`
            function Hello() {
              return <h2>Hello</h2>;
            }
          `).code
        ),
        trim(`
          function Hello() {
            return Hydrogen.createElement("h2", {}, ["Hello"]);
          }
        `)
      );
    });

    test("simple component with single prop", () => {
      assert.equal(
        trim(
          transform(`
            function Hello({ name }) {
              return <h2>Hello {name()}</h2>;
            }
          `).code
        ),
        trim(`
          function Hello({name}) {
            return Hydrogen.createElement("h2", {}, ["Hello ", () => name()]);
          }
        `)
      );
    });
  });
})();
