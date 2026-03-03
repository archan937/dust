import { NodePath, type PluginObj, types as t } from '@babel/core';

const isDustCreateElement = (node: t.Node): node is t.CallExpression =>
  t.isCallExpression(node) &&
  t.isMemberExpression(node.callee) &&
  t.isIdentifier(node.callee.object, { name: 'Dust' }) &&
  t.isIdentifier(node.callee.property, { name: 'createElement' });

// PascalCase identifiers are component references, not state getters — skip them.
const isComponentRef = (name: string): boolean => /^[A-Z]/.test(name);

const isChildOfDustCreateElement = (path: NodePath): number => {
  const parent = path.parentPath;
  if (!parent || !isDustCreateElement(parent.node)) return -1;
  return parent.node.arguments.indexOf(path.node as t.Expression);
};

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
    LogicalExpression(path: NodePath<t.LogicalExpression>): void {
      if (isChildOfDustCreateElement(path) >= 2) {
        path.replaceWith(t.arrowFunctionExpression([], path.node));
      }
    },
    ConditionalExpression(path: NodePath<t.ConditionalExpression>): void {
      if (isChildOfDustCreateElement(path) >= 2) {
        path.replaceWith(t.arrowFunctionExpression([], path.node));
      }
    },
    Identifier(path: NodePath<t.Identifier>): void {
      if (isComponentRef(path.node.name)) return;

      const parent = path.parentPath;

      // Direct child (index >= 2) of Dust.createElement
      if (isDustCreateElement(parent.node)) {
        const argIndex = parent.node.arguments.indexOf(path.node);
        if (argIndex >= 2) {
          path.replaceWith(t.arrowFunctionExpression([], path.node));
        }
        return;
      }

    },
  },
});

export default jsxGetterConsumerPlugin;
