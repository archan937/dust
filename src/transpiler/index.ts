import babelPluginTransformReactJsx from '@babel/plugin-transform-react-jsx';
import babelPluginTransformTypescript from '@babel/plugin-transform-typescript';
import * as babel from '@babel/standalone';

import tsconfig from '../../tsconfig.json' with { type: 'json' };

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
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
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
          { isTSX: true, allExtensions: true },
        ],
      ],
    });

    const transpiled = result.code ?? '';
    cache.set(cacheKey, transpiled);

    return transpiled;
  } catch (error) {
    throw new Error(`JSX transpilation failed: ${(error as Error).message}`);
  }
};
