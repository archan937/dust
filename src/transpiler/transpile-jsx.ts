import { highlight } from "cli-highlight";
import * as ts from "typescript";

import { findHooks, findZeroArgsFunctions } from "./utils";

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
    const visited = visitNode(sourceFile, context) as ts.SourceFile;
    const output = printer.printFile(visited);

    (async (): Promise<void> => {
      console.log(
        "\n\n\n\n==============================================================================================================================\n\n\n\n\n\n",
      );
      console.log("// Input\n");
      console.log(highlight(input));
      console.log("\n// Output\n");
      console.log(highlight(output));
    })();

    return visited;
  };

const transformFunctionDeclaration = (
  node: ts.FunctionDeclaration,
  context: ts.TransformationContext,
): ts.FunctionDeclaration | ts.VariableStatement => {
  if (!node.body) {
    return node;
  }

  const hooks = findHooks(node);
  if (!hooks.length || !node.name) {
    return ts.factory.updateFunctionDeclaration(
      node,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.typeParameters,
      node.parameters,
      node.type,
      visitNode(node.body, context) as ts.Block,
    );
  }

  const innerFunction = ts.factory.createArrowFunction(
    undefined,
    undefined,
    node.parameters,

    undefined,
    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    visitNode(node.body, context) as ts.ConciseBody,
  );

  const outerFunction = ts.factory.createArrowFunction(
    undefined,
    undefined,
    ["Dust", ...hooks].map((param) =>
      ts.factory.createParameterDeclaration(undefined, undefined, param),
    ),
    undefined,
    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    innerFunction,
  );

  return ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          node.name,
          undefined,
          undefined,
          ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(
              ts.factory.createIdentifier("Dust"),
              ts.factory.createIdentifier("c"),
            ),
            undefined,
            [
              outerFunction,
              ts.factory.createArrayLiteralExpression(
                hooks.map(ts.factory.createIdentifier),
                true,
              ),
            ],
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
};

const transformJsxExpression = (node: ts.JsxExpression): ts.JsxExpression => {
  const zeroArgsFunctions = findZeroArgsFunctions(node);
  if (!zeroArgsFunctions.length) {
    return node;
  }

  const { expression } = node;
  if (expression) {
    return ts.factory.createJsxExpression(
      undefined,
      ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(
          ts.factory.createIdentifier("Dust"),
          "e",
        ),
        undefined,
        [
          ts.factory.createArrowFunction(
            undefined,
            undefined,
            zeroArgsFunctions.map((fn) =>
              ts.factory.createParameterDeclaration(undefined, undefined, fn),
            ),
            undefined,
            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            ts.factory.createParenthesizedExpression(expression),
          ),
          ts.factory.createArrayLiteralExpression(
            zeroArgsFunctions.map(ts.factory.createIdentifier),
            true,
          ),
        ],
      ),
    );
  }

  return node;
};

const visitNode = (
  node: ts.Node,
  context: ts.TransformationContext,
): ts.Node => {
  const visitor = (node: ts.Node): ts.Node => {
    if (ts.isFunctionDeclaration(node) && node.name) {
      return transformFunctionDeclaration(node, context);
    }
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      const visitChildren = (
        children: ts.NodeArray<ts.JsxChild>,
      ): ts.NodeArray<ts.JsxChild> =>
        ts.factory.createNodeArray(
          children.map((child) => {
            if (ts.isJsxExpression(child)) {
              return transformJsxExpression(child);
            }
            return ts.visitNode(child, visitor) as ts.JsxChild;
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
    return ts.visitEachChild(node, visitor, context);
  };
  return ts.visitNode(node, visitor);
};
