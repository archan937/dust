import * as ts from "typescript";

const extractAttributes = (node) => {
  const attributes = {};
  node.attributes.properties.forEach((prop) => {
    if (ts.isJsxAttribute(prop)) {
      attributes[prop.name.text] = getAttributeValue(prop);
    }
  });
  return attributes;
};

const getAttributeValue = (prop) => {
  if (!prop.initializer) return "true";
  if (ts.isStringLiteral(prop.initializer)) return prop.initializer.text;
  if (ts.isJsxExpression(prop.initializer))
    return prop.initializer.expression?.getText();
};

export const resolveNextPages = (jsx) => {
  const nextPages = [];

  const contents = ts.transpileModule(jsx, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2015,
    },
    transformers: {
      before: [
        (context) => {
          const visit = (node) => {
            if (ts.isJsxSelfClosingElement(node)) {
              const tagName = node.tagName;
              if (
                ts.isIdentifier(tagName) &&
                tagName.text === "DirectoryRouter"
              ) {
                const pages = extractAttributes(node).pages;
                pages && nextPages.push(pages);
              }
            }
            return ts.visitEachChild(node, visit, context);
          };
          return (node) => ts.visitNode(node, visit);
        },
      ],
    },
  }).outputText;

  return { contents, nextPages };
};

export const transpile = (jsx) =>
  ts.transpileModule(jsx, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      jsxFactory: "Dust.createElement",
      jsxFragmentFactory: "Dust.Fragment",
      target: ts.ScriptTarget.ES2015,
    },
    transformers: {
      before: [
        (context) => {
          const visit = (node) => {
            if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
              const visitChildren = (children) =>
                ts.factory.createNodeArray(
                  children.map((child) => {
                    if (ts.isJsxExpression(child)) {
                      return processJsxExpression(child);
                    }
                    return ts.visitNode(child, visit);
                  }),
                );
              if (ts.isJsxElement(node)) {
                return ts.factory.updateJsxElement(
                  node,
                  node.openingElement,
                  visitChildren(node.children),
                  node.closingElement,
                );
              } else {
                return ts.factory.updateJsxFragment(
                  node,
                  node.openingFragment,
                  visitChildren(node.children),
                  node.closingFragment,
                );
              }
            }
            return ts.visitEachChild(node, visit, context);
          };

          const processJsxExpression = (node) => {
            const expression = node.expression;
            if (expression) {
              if (
                ts.isFunctionExpression(expression) ||
                ts.isArrowFunction(expression)
              ) {
                return node;
              }
              return ts.factory.createJsxExpression(
                undefined,
                ts.factory.createArrowFunction(
                  undefined,
                  undefined,
                  [],
                  undefined,
                  ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                  ts.factory.createBlock(
                    [
                      ts.factory.createReturnStatement(
                        ts.factory.createParenthesizedExpression(expression),
                      ),
                    ],
                    true,
                  ),
                ),
              );
            }
            return node;
          };

          return (node) => ts.visitNode(node, visit);
        },
      ],
    },
  }).outputText;
