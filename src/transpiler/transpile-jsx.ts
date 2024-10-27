import * as ts from "typescript";

export const transpileJsx = (jsx: string): string => {
  const { outputText } = ts.transpileModule(jsx, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      jsxFactory: "Dust.createElement",
      jsxFragmentFactory: "Dust.Fragment",
      target: ts.ScriptTarget.ES2015,
    },
    transformers: {
      before: [transformJsx],
    },
  });

  return outputText;
};

const transformJsx =
  (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> =>
  (sourceFile: ts.SourceFile) => {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const input = printer.printFile(sourceFile);

    const visit = (node: ts.Node): ts.Node => {
      if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
        const visitChildren = (
          children: ts.NodeArray<ts.JsxChild>,
        ): ts.NodeArray<ts.JsxChild> =>
          ts.factory.createNodeArray(
            children.map((child) => {
              if (ts.isJsxExpression(child)) {
                return transformJsxExpression(child);
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

    const output = printer.printFile(
      ts.visitNode(sourceFile, visit) as ts.SourceFile,
    );

    console.log(
      `\n\n\n\n==============================================================================================================================\n\n\n\n\n\n// Input\n\n${input}\n\n// Output\n\n${output}`,
    );

    return ts.visitNode(sourceFile, visit) as ts.SourceFile;
  };

const transformJsxExpression = (node: ts.JsxExpression): ts.JsxExpression => {
  const { expression } = node;
  if (expression) {
    if (ts.isFunctionExpression(expression) || ts.isArrowFunction(expression)) {
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
