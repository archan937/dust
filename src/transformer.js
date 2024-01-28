const parser = require("@babel/parser");
const generator = require("@babel/generator");

const isArray = Array.isArray;
const isObject = (value) => value === Object(value);

const parse = (hydrogen) =>
  strip(
    parser.parse(hydrogen, {
      sourceType: "module",
      plugins: ["jsx"],
    }).program.body
  );

const generate = (ast) =>
  generator.default({
    type: "Program",
    body: [ast].flat(),
  }).code;

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
          computed: false,
          property: {
            type: "Identifier",
            name: "createElement",
          },
        },
        arguments: [
          {
            type: "StringLiteral",
            extra: {
              rawValue: name,
              raw: `'${name}'`,
            },
            value: name,
          },
          {
            type: "ObjectExpression",
            properties: attributes.map((attribute) => ({
              type: "ObjectProperty",
              method: false,
              key: {
                type: "Identifier",
                name: attribute.name.name,
              },
              computed: false,
              shorthand: false,
              value:
                attribute.value.type === "JSXExpressionContainer"
                  ? attribute.value.expression
                  : attribute.value,
            })),
          },
          {
            type: "ArrayExpression",
            elements: children.map((child) => {
              switch (child.type) {
                case "JSXExpressionContainer":
                  return {
                    type: "ArrowFunctionExpression",
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      ...child.expression,
                      extra: {
                        parenthesized: true,
                      },
                    },
                  };
                case "JSXText":
                  return {
                    type: "StringLiteral",
                    extra: {
                      rawValue: child.value,
                      raw: JSON.stringify(child.value),
                    },
                    value: child.value,
                  };
                default:
                  return child;
              }
            }),
          },
        ],
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
  // console.log(hydrogen);

  const ast = parse(hydrogen);
  // console.log(JSON.stringify(ast, null, 2));

  const modified = modify(ast);
  // console.log(JSON.stringify(modified, null, 2));

  return {
    code: generate(modified),
    components: ast.reduce(
      (acc, { type, id }) =>
        type === "FunctionDeclaration" ? [...acc, id.name] : acc,
      []
    ),
  };
};
