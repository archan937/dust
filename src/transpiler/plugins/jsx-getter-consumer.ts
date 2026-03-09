import { NodePath, type PluginObj, types as t } from '@babel/core';

const isDustCreateElement = (node: t.Node): node is t.CallExpression =>
  t.isCallExpression(node) &&
  t.isMemberExpression(node.callee) &&
  t.isIdentifier(node.callee.object, { name: 'Dust' }) &&
  t.isIdentifier(node.callee.property, { name: 'createElement' });

const isComponentRef = (name: string): boolean => /^[A-Z]/.test(name);

const isChildOfDustCreateElement = (path: NodePath): number => {
  const parent = path.parentPath;
  if (!parent || !isDustCreateElement(parent.node)) return -1;
  return parent.node.arguments.indexOf(path.node as t.Expression);
};

const wrapInArrow = (path: NodePath): void => {
  path.replaceWith(t.arrowFunctionExpression([], path.node as t.Expression));
};

const makeDustCall = (arg: t.Expression): t.CallExpression =>
  t.callExpression(
    t.memberExpression(t.identifier('Dust'), t.identifier('call')),
    [arg],
  );

// Wraps a bare Identifier or non-computed MemberExpression with Dust.call(...)
// so Getters are auto-called in expression positions (test, operand, etc.)
const callWrapIdent = (nodePath: NodePath): void => {
  const node = nodePath.node;
  if (t.isIdentifier(node) && !isComponentRef(node.name)) {
    nodePath.replaceWith(makeDustCall(node));
  } else if (
    t.isMemberExpression(node) &&
    !node.computed &&
    t.isIdentifier(node.object) &&
    !isComponentRef(node.object.name)
  ) {
    nodePath.replaceWith(makeDustCall(node));
  }
};

const jsxGetterConsumerPlugin = (): PluginObj => ({
  visitor: {
    CallExpression(path: NodePath<t.CallExpression>): void {
      if (path.node.arguments.length !== 0) return;
      if (isChildOfDustCreateElement(path) >= 2) {
        wrapInArrow(path);
      }
    },
    MemberExpression(path: NodePath<t.MemberExpression>): void {
      if (path.node.computed) return;
      const obj = path.node.object;
      if (t.isIdentifier(obj) && isComponentRef(obj.name)) return;
      if (isChildOfDustCreateElement(path) >= 2) {
        wrapInArrow(path);
      }
    },
    LogicalExpression(path: NodePath<t.LogicalExpression>): void {
      if (isChildOfDustCreateElement(path) < 2) return;
      callWrapIdent(path.get('left'));
      callWrapIdent(path.get('right'));
      wrapInArrow(path);
    },
    ConditionalExpression(path: NodePath<t.ConditionalExpression>): void {
      if (isChildOfDustCreateElement(path) < 2) return;
      callWrapIdent(path.get('test'));
      wrapInArrow(path);
    },
    BinaryExpression(path: NodePath<t.BinaryExpression>): void {
      if (isChildOfDustCreateElement(path) < 2) return;
      callWrapIdent(path.get('left'));
      callWrapIdent(path.get('right'));
      wrapInArrow(path);
    },
    UnaryExpression(path: NodePath<t.UnaryExpression>): void {
      if (isChildOfDustCreateElement(path) < 2) return;
      callWrapIdent(path.get('argument'));
      wrapInArrow(path);
    },
    Identifier(path: NodePath<t.Identifier>): void {
      if (isComponentRef(path.node.name)) return;
      if (isChildOfDustCreateElement(path) >= 2) {
        wrapInArrow(path);
      }
    },
  },
});

export default jsxGetterConsumerPlugin;
