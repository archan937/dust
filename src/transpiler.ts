import * as ts from "typescript";

type Attributes = Record<string, string>;

interface ResolvedNextPages {
  contents: string;
  nextPages: string[];
}

const extractAttributes = (
  node: ts.JsxSelfClosingElement | ts.JsxOpeningElement,
): Attributes => {
  const attributes: Attributes = {};
  node.attributes.properties.forEach((prop) => {
    if (ts.isJsxAttribute(prop)) {
      attributes[(prop.name as ts.Identifier).text] = getAttributeValue(prop);
    }
  });
  return attributes;
};

const getAttributeValue = (prop: ts.JsxAttribute): string => {
  if (!prop.initializer) return "true";
  if (ts.isStringLiteral(prop.initializer)) return prop.initializer.text;
  if (ts.isJsxExpression(prop.initializer))
    return prop.initializer.expression?.getText() ?? "";
  return "";
};

export const resolveNextPages = (jsx: string): ResolvedNextPages => {
  const nextPages: string[] = [];

  const contents = ts.transpileModule(jsx, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2015,
    },
    transformers: {
      before: [
        (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> =>
          (sourceFile: ts.SourceFile) => {
            const visit = (node: ts.Node): ts.Node => {
              if (ts.isJsxSelfClosingElement(node)) {
                const { tagName } = node;
                if (
                  ts.isIdentifier(tagName) &&
                  tagName.text === "DirectoryRouter"
                ) {
                  const { pages } = extractAttributes(node);
                  if (pages) nextPages.push(pages);
                }
              }
              return ts.visitEachChild(node, visit, context);
            };
            return ts.visitNode(sourceFile, visit) as ts.SourceFile;
          },
      ],
    },
  }).outputText;

  return { contents, nextPages };
};

export const transpile = (jsx: string): string =>
  ts.transpileModule(jsx, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      jsxFactory: "Dust.createElement",
      jsxFragmentFactory: "Dust.Fragment",
      target: ts.ScriptTarget.ES2015,
    },
    transformers: {
      before: [
        (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> =>
          (sourceFile: ts.SourceFile) => {
            const visit = (node: ts.Node): ts.Node => {
              if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
                const visitChildren = (
                  children: ts.NodeArray<ts.JsxChild>,
                ): ts.NodeArray<ts.JsxChild> =>
                  ts.factory.createNodeArray(
                    children.map((child) => {
                      if (ts.isJsxExpression(child)) {
                        return processJsxExpression(child);
                      }
                      return ts.visitNode(child, visit) as ts.JsxChild;
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

            const processJsxExpression = (
              node: ts.JsxExpression,
            ): ts.JsxExpression => {
              const { expression } = node;
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
                    ts.factory.createToken(
                      ts.SyntaxKind.EqualsGreaterThanToken,
                    ),
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

            return ts.visitNode(sourceFile, visit) as ts.SourceFile;
          },
      ],
    },
  }).outputText;
