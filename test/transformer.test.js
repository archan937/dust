(function () {
  const { assert, test } = QUnit;

  let transform;

  if (typeof window === "undefined") {
    transform = require("../src/transformer").transform;
  } else {
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

    test("simple fragment", () => {
      assert.equal(
        trim(
          transform(`
            function Hello() {
              return <><strong>Hello</strong></>;
            }
          `).code
        ),
        trim(`
          function Hello() {
            return Hydrogen.createElement("", {}, [Hydrogen.createElement("strong", {}, ["Hello"])]);
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

    test("simple component with a nested HTML element", () => {
      assert.equal(
        trim(
          transform(`
            function Hello({ name }) {
              return <h2>Hello <span>{name()}</span></h2>;
            }
          `).code
        ),
        trim(`
          function Hello({name}) {
            return Hydrogen.createElement("h2", {}, ["Hello ", Hydrogen.createElement("span", {}, [() => name()])]);
          }
        `)
      );
    });

    test("index example code", () => {
      assert.equal(
        trim(
          transform(`
            const { useState } = Hydrogen;

            function Counter() {
              console.log("Rendering: <Counter/>");
              const [counter, setCounter] = useState(0);
      
              return (
                <>
                  <p>
                    Counter: <strong>{counter()}</strong>
                  </p>
                  <button onClick={() => setCounter((counter) => counter + 1)}>
                    Up
                  </button>
                  <button onClick={() => setCounter((counter) => counter - 1)}>
                    Down
                  </button>
                </>
              );
            }
      
            function App() {
              console.log("Rendering: <App/>");
              return <Counter />;
            }
          `).code
        ),
        trim(`
          const {useState} = Hydrogen;
          function Counter() {
            console.log("Rendering: <Counter/>");
            const [counter, setCounter] = useState(0);
            return Hydrogen.createElement("", {}, ["\\n                  ", Hydrogen.createElement("p", {}, ["\\n                    Counter: ", Hydrogen.createElement("strong", {}, [() => counter()]), "\\n                  "]), "\\n                  ", Hydrogen.createElement("button", {
              onClick: () => setCounter(counter => counter + 1)
              }, ["\\n                    Up\\n                  "]), "\\n                  ", Hydrogen.createElement("button", {
              onClick: () => setCounter(counter => counter - 1)
              }, ["\\n                    Down\\n                  "]), "\\n                "]);
            }
          function App() {
            console.log("Rendering: <App/>");
            return Hydrogen.createElement(Counter, {}, []);
          }
        `)
      );
    });
  });
})();
