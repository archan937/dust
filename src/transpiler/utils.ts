import * as ts from "typescript";

const HOOK_NAMES = new Set([
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
      if (
        ts.isIdentifier(node.expression) &&
        HOOK_NAMES.has(node.expression.text)
      ) {
        hooks.add(node.expression.text);
      } else if (
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === "Dust" &&
        HOOK_NAMES.has(node.expression.name.text)
      ) {
        hooks.add(node.expression.name.text);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(node);

  return Array.from(hooks);
};

export const getJsxElementTagName = (
  node: ts.JsxElement | ts.JsxSelfClosingElement,
): string => {
  if (ts.isJsxElement(node)) {
    const { tagName } = node.openingElement;
    return ts.isIdentifier(tagName) ? tagName.text : tagName.getText();
  } else {
    const { tagName } = node;
    return ts.isIdentifier(tagName) ? tagName.text : tagName.getText();
  }
};

export const getJsxElementAttributes = (
  node: ts.JsxElement | ts.JsxSelfClosingElement,
): ts.JsxAttribute[] => {
  if (ts.isJsxElement(node)) {
    return node.openingElement.attributes.properties.filter(ts.isJsxAttribute);
  } else {
    return node.attributes.properties.filter(ts.isJsxAttribute);
  }
};
