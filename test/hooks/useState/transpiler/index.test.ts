import { afterEach, describe, expect, spyOn, test } from 'bun:test';
import { clearCache, transpile } from 'src/transpiler';

describe('Transpiler', () => {
  afterEach(clearCache);

  describe('JSX & TSX support', () => {
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
        import Dust from "dust";
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
              () => count()
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
        import Dust from "dust";
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
              () => count()
            )
          );
        }
      `);
    });
  });

  describe('fundamentals', () => {
    test('transpiles JSXMemberExpression as element type', () => {
      const jsx = `
        function App() {
          return <Some.Namespace.Component />;
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        import Dust from "dust";
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
        import Dust from "dust";
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
  });

  describe('JSX getter consumption', () => {
    test('does not wrap state getter used as JSX attribute', () => {
      const jsx = `
        function App() {
          const [count, setCount] = useState(0);
          return <div onClick={count} />;
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        import Dust from "dust";
        function App() {
          const [count, setCount] = useState(0);
          return Dust.createElement("div", {
            onClick: count
          });
        }
      `);
    });

    test('does not wrap multiple state getters used as JSX attributes', () => {
      const jsx = `
        function App() {
          const [count, setCount] = useState(0);
          const [name, setName] = useState('');
          return <div onClick={count} onMouseOver={name} />;
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        import Dust from "dust";
        function App() {
          const [count, setCount] = useState(0);
          const [name, setName] = useState('');
          return Dust.createElement("div", {
            onClick: count,
            onMouseOver: name
          });
        }
      `);
    });

    test('wraps state getter in nested JSX elements', () => {
      const jsx = `
        function App() {
          const [count, setCount] = useState(0);
          return (
            <div>
              <span onClick={count}>
                <button onMouseDown={count} />
              </span>
            </div>
          );
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        import Dust from "dust";
        function App() {
          const [count, setCount] = useState(0);
          return Dust.createElement("div", null,
            Dust.createElement("span", {
              onClick: count
            },
              Dust.createElement("button", {
                onMouseDown: count
              })
            )
          );
        }
      `);
    });

    test('wraps state getter in JSX children', () => {
      const jsx = `
        function App() {
          const [count, setCount] = useState(0);
          return <div>{count}</div>;
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        import Dust from "dust";
        function App() {
          const [count, setCount] = useState(0);
          return Dust.createElement("div", null, () => count);
        }
      `);
    });

    test('wraps state getter in complex nested structure', () => {
      const jsx = `
        function App() {
          const [user, setUser] = useState({ name: 'John' });
          return (
            <div>
              <header onClick={user}>
                <nav>
                  <ul>
                    <li onHover={user}>Item</li>
                  </ul>
                </nav>
              </header>
              <main>
                <section>{user}</section>
              </main>
            </div>
          );
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        import Dust from "dust";
        function App() {
          const [user, setUser] = useState({ name: 'John' });
          return Dust.createElement("div", null,
            Dust.createElement("header", {
              onClick: user
            },
              Dust.createElement("nav", null,
                Dust.createElement("ul", null,
                  Dust.createElement("li", {
                    onHover: user
                  }, "Item")
                )
              )
            ),
            Dust.createElement("main", null,
              Dust.createElement("section", null, () => user)
            )
          );
        }
      `);
    });

    test('does not wrap function calls that already have arguments', () => {
      const jsx = `
        function App() {
          const [count, setCount] = useState(0);
          return <div onClick={count()} />;
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        import Dust from "dust";
        function App() {
          const [count, setCount] = useState(0);
          return Dust.createElement("div", {
            onClick: count()
          });
        }
      `);
    });

    test('does not wrap non-Dust.createElement calls', () => {
      const jsx = `
        function App() {
          const [count, setCount] = useState(0);
          return React.createElement('div', { onClick: count });
        }
      `;
      const js = transpile(jsx);
      expect(js).toEqualIgnoringWhitespace(`
        function App() {
          const [count, setCount] = useState(0);
          return React.createElement('div', {
            onClick: count
          });
        }
      `);
    });

    test('does not wrap PascalCase component references in props or children', () => {
      const jsx = `
        function App() {
          return (
            <BrowserRouter>
              <Route path="/" component={Home} />
              <Route path="/about" component={AboutMe} />
              {SomeWidget}
            </BrowserRouter>
          );
        }
      `;
      const js = transpile(jsx);
      expect(js).toContain('component: Home');
      expect(js).toContain('component: AboutMe');
      expect(js).not.toContain('() => Home');
      expect(js).not.toContain('() => AboutMe');
      expect(js).not.toContain('() => SomeWidget');
    });
  });

  describe('caching', () => {
    test('caches transpiled code', () => {
      const key = 'virtual.jsx:-tockvm';

      const hasSpy = spyOn(Map.prototype, 'has').mockImplementation(
        (k: string) => k === key,
      );

      const getSpy = spyOn(Map.prototype, 'get').mockImplementation(
        (k: string) => {
          if (k === key) return 'CACHED';
        },
      );

      const jsx = `
        function App() {
          return <><div foo="bar" /></>;
        }
      `;

      const js = transpile(jsx);
      expect(js).toEqual('CACHED');

      hasSpy.mockRestore();
      getSpy.mockRestore();
    });
  });

  describe('errors', () => {
    test('throws on unknown JSX element type', () => {
      expect(() => {
        transpile('function App() { return <[object Object] />; }');
      }).toThrow('JSX transpilation failed');
    });
  });
});
