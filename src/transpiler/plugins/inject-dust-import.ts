import { type PluginObj, types as t } from '@babel/core';

const injectDustImportPlugin = (): PluginObj => ({
  visitor: {
    Program: {
      enter(path): void {
        let hasJSX = false;
        path.traverse({
          JSXElement() {
            hasJSX = true;
          },
          JSXFragment() {
            hasJSX = true;
          },
        });
        if (!hasJSX) return;

        // Check for any existing import from 'dust', regardless of local name.
        const alreadyImported = path.node.body.some(
          (node) =>
            t.isImportDeclaration(node) && node.source.value === 'dust',
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
