import { type PluginObj, types as t } from '@babel/core';

const injectDustImportPlugin = (): PluginObj => ({
  visitor: {
    Program: {
      enter(path): void {
        let hasJSX = false;
        path.traverse({
          JSXElement() { hasJSX = true; },
          JSXFragment() { hasJSX = true; },
        });
        if (!hasJSX) return;

        const alreadyImported = path.node.body.some(
          (node) =>
            t.isImportDeclaration(node) &&
            node.source.value === 'dust' &&
            node.specifiers.some(
              (s) => t.isImportDefaultSpecifier(s) && s.local.name === 'Dust',
            ),
        );
        if (alreadyImported) return;

        path.unshiftContainer(
          'body',
          t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier('Dust'))],
            t.stringLiteral('dust'),
          ),
        );
      },
    },
  },
});

export default injectDustImportPlugin;
