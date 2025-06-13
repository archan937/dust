import { types as t } from '@babel/core';
import { generate } from '@babel/generator';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const getType = (
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
): t.StringLiteral | t.MemberExpression => {
  if (t.isJSXIdentifier(name)) {
    return t.stringLiteral(name.name);
  } else if (t.isJSXMemberExpression(name)) {
    const object = t.isJSXIdentifier(name.object)
      ? t.identifier(name.object.name)
      : (getType(name.object) as t.MemberExpression);
    return t.memberExpression(object, t.identifier(name.property.name));
  } else if (t.isJSXNamespacedName(name)) {
    return t.stringLiteral(`${name.namespace.name}:${name.name.name}`);
  }
  throw new Error('Unknown JSX element type');
};

export const transpile = (code: string): string => {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  traverse(ast, {
    JSXElement(path) {
      const createElement = t.memberExpression(
        t.identifier('Dust'),
        t.identifier('createElement'),
      );

      const jsxToCreateElement = (node: t.JSXElement): t.Expression => {
        if (t.isJSXElement(node)) {
          const type = getType(node.openingElement.name);
          const props = node.openingElement.attributes.length
            ? t.objectExpression(
                node.openingElement.attributes
                  .map((attr) => {
                    if (t.isJSXSpreadAttribute(attr)) {
                      return t.spreadElement(attr.argument);
                    }
                    if (
                      t.isJSXAttribute(attr) &&
                      t.isJSXIdentifier(attr.name)
                    ) {
                      let value: t.Expression;
                      if (!attr.value) {
                        value = t.booleanLiteral(true);
                      } else if (t.isJSXExpressionContainer(attr.value)) {
                        value = t.isJSXEmptyExpression(attr.value.expression)
                          ? t.identifier('undefined')
                          : attr.value.expression;
                      } else if (t.isStringLiteral(attr.value)) {
                        // eslint-disable-next-line @typescript-eslint/prefer-destructuring
                        value = attr.value;
                      } else {
                        value = t.identifier('undefined');
                      }
                      return t.objectProperty(
                        t.identifier(attr.name.name),
                        value,
                      );
                    }
                    return null;
                  })
                  .filter((x): x is t.ObjectProperty | t.SpreadElement => !!x),
              )
            : t.nullLiteral();

          const children = node.children
            .filter((child) => !(t.isJSXText(child) && !child.value.trim()))
            .map((child) =>
              t.isJSXElement(child)
                ? jsxToCreateElement(child)
                : t.isJSXText(child)
                  ? t.stringLiteral(child.value.trim())
                  : t.isJSXExpressionContainer(child)
                    ? child.expression
                    : null,
            );

          return t.callExpression(createElement, [
            type,
            props,
            ...children.filter(
              (c): c is t.Expression => !!c && t.isExpression(c),
            ),
          ]);
        }

        return node;
      };

      path.replaceWith(jsxToCreateElement(path.node));
    },
  });

  return generate(ast, {}, code).code;
};
