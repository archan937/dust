import { describe, expect, test } from 'bun:test';
import { transpile } from 'src/transpiler';

describe('Transpiler', () => {
  test('transpiles JSX to JS', () => {
    const jsx = `
      function Counter({ count, setCount }) {
        return (
          <div>
            <h1>Counter</h1>
            <button onClick={() => setCount(count() + 1)}>Increment</button>
            <span>{count()}</span>
          </div>
        );
      }
    `;

    const js = transpile(jsx);

    expect(js).toEqualIgnoringWhitespace(`
      function Counter({count, setCount}) {
        return Dust.createElement(
          "div", 
          null, 
          Dust.createElement(
            "h1", 
            null,
            "Counter"
          ), 
          Dust.createElement(
            "button", 
            {
              onClick: () => setCount(count() + 1)
            }, 
            "Increment"
          ), 
          Dust.createElement(
            "span", 
            null, 
            count()
          )
        );
      }
    `);
  });

  test('transpiles TSX to JS', () => {
    const tsx = `
      type CounterProps = {
        count: number;
        setCount: (n: number) => void;
      };

      function Counter({ count, setCount }: CounterProps) {
        return (
          <div>
            <h1>Counter</h1>
            <button onClick={() => setCount(count() + 1)}>Increment</button>
            <span>{count()}</span>
          </div>
        );
      }
    `;

    const js = transpile(tsx);

    expect(js).toEqualIgnoringWhitespace(`
      function Counter({count, setCount}) {
        return Dust.createElement(
          "div", 
          null, 
          Dust.createElement(
            "h1", 
            null,
            "Counter"
          ), 
          Dust.createElement(
            "button", 
            {
              onClick: () => setCount(count() + 1)
            }, 
            "Increment"
          ), 
          Dust.createElement(
            "span", 
            null, 
            count()
          )
        );
      }
    `);
  });

  test('transpiles JSXMemberExpression as element type', () => {
    const jsx = `
      function App() {
        return <Some.Namespace.Component />;
      }
    `;
    const js = transpile(jsx);
    expect(js).toEqualIgnoringWhitespace(`
      function App() {
        return Dust.createElement(Some.Namespace.Component, null);
      }
    `);
  });

  test('transpiles JSXNamespacedName as element type', () => {
    const jsx = `
      function App() {
        return <svg:rect />;
      }
    `;
    const js = transpile(jsx);
    expect(js).toContain('Dust.createElement("svg:rect", null)');
  });

  test('transpiles spread attributes', () => {
    const jsx = `
      function App(props) {
        return <div {...props} />;
      }
    `;
    const js = transpile(jsx);
    expect(js).toEqualIgnoringWhitespace(`
      function App(props) {
        return Dust.createElement("div", props);
      }
    `);
  });

  test('transpiles boolean attribute', () => {
    const jsx = `
      function App() {
        return <input disabled />;
      }
    `;
    const js = transpile(jsx);
    expect(js).toContain('disabled: true');
  });

  test('transpiles string literal attribute', () => {
    const jsx = `
      function App() {
        return <div foo="bar" />;
      }
    `;
    const js = transpile(jsx);
    expect(js).toContain('foo: "bar"');
  });

  test('transpiles fragments', () => {
    const jsx = `
      function App() {
        return <><div foo="bar" /></>;
      }
    `;
    const js = transpile(jsx);
    expect(js).toContain('foo: "bar"');
  });

  test('throws on unknown JSX element type', () => {
    expect(() => {
      transpile('function App() { return <[object Object] />; }');
    }).toThrow('JSX transpilation failed');
  });
});
