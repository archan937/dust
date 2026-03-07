import babelPluginTransformReactJsx from '@babel/plugin-transform-react-jsx';
import babelPluginTransformTypescript from '@babel/plugin-transform-typescript';
import * as babel from '@babel/standalone';

import tsconfig from '../../tsconfig.json' with { type: 'json' };
import injectDustImportPlugin from './plugins/inject-dust-import';
import jsxGetterConsumerPlugin from './plugins/jsx-getter-consumer';

babel.registerPlugin(
  '@babel/plugin-transform-react-jsx',
  babelPluginTransformReactJsx,
);

babel.registerPlugin(
  '@babel/plugin-transform-typescript',
  babelPluginTransformTypescript,
);

const cache = new Map<string, string>();

const hash = (str: string): string => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    h = (h << 5) - h + char;
    h = h & h;
  }
  return (h >>> 0).toString(36);
};

export const clearCache = (): void => {
  cache.clear();
};

export const transpile = (code: string, filename = 'virtual.jsx'): string => {
  const cacheKey = `${filename}:${hash(code)}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) ?? '';
  }

  try {
    const result = babel.transform(code, {
      filename,
      plugins: [
        injectDustImportPlugin,
        [
          '@babel/plugin-transform-react-jsx',
          {
            pragma: tsconfig.compilerOptions.jsxFactory,
            pragmaFrag: tsconfig.compilerOptions.jsxFragmentFactory,
            throwIfNamespace: false,
          },
        ],
        [
          '@babel/plugin-transform-typescript',
          { isTSX: true, allExtensions: true, onlyRemoveTypeImports: true },
        ],
        jsxGetterConsumerPlugin,
      ],
    });

    const transpiled = result.code ?? '';
    cache.set(cacheKey, transpiled);

    return transpiled;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`JSX transpilation failed: ${message}`);
  }
};
