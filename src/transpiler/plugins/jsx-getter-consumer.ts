import { NodePath, type PluginObj, types as t } from '@babel/core';

const isDustCreateElement = (node: t.Node): node is t.CallExpression =>
  t.isCallExpression(node) &&
  t.isMemberExpression(node.callee) &&
  t.isIdentifier(node.callee.object, { name: 'Dust' }) &&
  t.isIdentifier(node.callee.property, { name: 'createElement' });

const jsxGetterConsumerPlugin = (): PluginObj => ({
  visitor: {
    CallExpression(path: NodePath<t.CallExpression>): void {
      if (path.node.arguments.length !== 0) return;
      const parent = path.parentPath;
      if (!isDustCreateElement(parent.node)) return;
      const argIndex = parent.node.arguments.indexOf(path.node);
      if (argIndex >= 2) {
        path.replaceWith(t.arrowFunctionExpression([], path.node));
      }
    },
    Identifier(path: NodePath<t.Identifier>): void {
      const parent = path.parentPath;

      // Direct child (index >= 2) of Dust.createElement
      if (isDustCreateElement(parent.node)) {
        const argIndex = parent.node.arguments.indexOf(path.node);
        if (argIndex >= 2) {
          path.replaceWith(t.arrowFunctionExpression([], path.node));
        }
        return;
      }

      // Value in ObjectProperty inside Dust.createElement props
      if (t.isObjectProperty(parent.node) && parent.node.value === path.node) {
        const grandParent = parent.parentPath;
        const greatGrandParent = grandParent?.parentPath;
        if (
          grandParent &&
          greatGrandParent &&
          t.isObjectExpression(grandParent.node) &&
          isDustCreateElement(greatGrandParent.node)
        ) {
          path.replaceWith(t.arrowFunctionExpression([], path.node));
        }
      }
    },
  },
});

export default jsxGetterConsumerPlugin;
