import * as ts from "typescript";

const HOOKS = new Set([
  "useState",
  "useEffect",
  "useContext",
  "useReducer",
  "useCallback",
  "useMemo",
  "useRef",
  "useImperativeHandle",
  "useLayoutEffect",
  "useDebugValue",
]);

export const findHooks = (node: ts.Node): string[] => {
  const hooks = new Set<string>();

  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node)) {
      if (ts.isIdentifier(node.expression) && HOOKS.has(node.expression.text)) {
        hooks.add(node.expression.text);
      } else if (
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === "Dust" &&
        HOOKS.has(node.expression.name.text)
      ) {
        hooks.add(node.expression.name.text);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(node);

  return Array.from(hooks);
};

export const findZeroArgsFunctions = (node: ts.Node): string[] => {
  const functions = new Set<string>();

  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node) && !node.arguments.length) {
      if (ts.isIdentifier(node.expression)) {
        functions.add(node.expression.text);
      } else if (ts.isPropertyAccessExpression(node.expression)) {
        functions.add(node.expression.getText());
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(node);

  return Array.from(functions);
};

export const isComponent = (node: ts.Node): boolean => {
  let foundJsx = false;

  function visit(node: ts.Node): void {
    if (
      ts.isJsxElement(node) ||
      ts.isJsxSelfClosingElement(node) ||
      ts.isJsxFragment(node)
    ) {
      foundJsx = true;
    }
    if (!foundJsx) {
      ts.forEachChild(node, visit);
    }
  }

  visit(node);

  return foundJsx;
};
