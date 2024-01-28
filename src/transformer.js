const acorn = require("acorn");
const jsx = require("acorn-jsx");
const astring = require("@barelyhuman/astring-jsx");

const isArray = Array.isArray;
const isObject = (value) => value === Object(value);

const strip = (node) => {
  if (isArray(node)) {
    return node.map(strip);
  }
  if (isObject(node)) {
    const { start, end, loc, ...n } = node;
    return Object.entries(n).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: strip(value) }),
      {}
    );
  }
  return node;
};

const parse = (hydrogen) =>
  strip(
    acorn.Parser.extend(jsx()).parse(hydrogen, {
      ecmaVersion: 6,
    })
  );

const generate = (ast) => astring.generate(ast);

const modify = (node) => {
  if (isArray(node)) {
    return node.map(modify);
  }
  switch (node?.type) {
    case "JSXElement":
      const name = node.openingElement.name.name;
      const attributes = node.openingElement.attributes;
      const children = node.children;
      return {
        type: "CallExpression",
        callee: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "Hydrogen",
          },
          property: {
            type: "Identifier",
            name: "createElement",
          },
          computed: false,
        },
        arguments: [
          {
            type: "Literal",
            value: name,
            raw: name.match(/^[A-Z]/) ? name : JSON.stringify(name),
          },
          {
            type: "ObjectExpression",
            properties: attributes.map((attribute) => ({
              type: "Property",
              method: false,
              shorthand: false,
              computed: false,
              key: {
                type: "Identifier",
                name: attribute.name.name,
              },
              value:
                attribute.value.type === "JSXExpressionContainer"
                  ? attribute.value.expression
                  : attribute.value,
              kind: "init",
            })),
          },
          {
            type: "ArrayExpression",
            elements: children.map(modify),
          },
        ],
      };
    case "JSXExpressionContainer":
      return {
        type: "ArrowFunctionExpression",
        id: null,
        generator: false,
        async: false,
        params: [],
        body: {
          ...node.expression,
          extra: {
            parenthesized: true,
          },
        },
      };
    case "JSXText":
      return {
        type: "Literal",
        value: node.value,
        raw: JSON.stringify(node.value),
      };
    default:
      break;
  }
  if (isObject(node)) {
    return Object.entries(node).reduce((acc, [key, value]) => {
      return { ...acc, [key]: modify(value) };
    }, {});
  }
  return node;
};

exports.transform = (hydrogen) => {
  // console.log("hydrogen:", hydrogen);

  let ast = parse(hydrogen);
  // console.log("ast:", JSON.stringify(ast, null, 2));

  ast = modify(ast);
  // console.log("modified:", JSON.stringify(ast, null, 2));

  const code = generate(ast);
  // console.log("code:", code);

  return {
    code,
    components: ast.body.reduce(
      (acc, { type, id }) =>
        type === "FunctionDeclaration" ? [...acc, id.name] : acc,
      []
    ),
  };
};
