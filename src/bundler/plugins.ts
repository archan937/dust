import fs from 'node:fs';
import path from 'node:path';

import type { Plugin, PluginBuild } from 'esbuild';
import { ROOT } from 'src/config';
import { transpile } from 'src/transpiler';
import { buildPagesPreamble, resolvePages } from 'src/transpiler/resolve-pages';

// ── JSX transpiler ─────────────────────────────────────────────────────────────

export const jsxTranspiler: Plugin = {
  name: 'jsx-transpiler',
  setup(build: PluginBuild): void {
    build.onLoad({ filter: /\.(j|t)sx$/ }, (arg) => {
      const source = fs.readFileSync(arg.path, 'utf8');
      const pages = resolvePages(path.dirname(arg.path), source);
      const preamble = buildPagesPreamble(pages);
      return { contents: transpile(preamble + source, arg.path), loader: 'js' };
    });

    build.onResolve({ filter: /.*/ }, (arg) => {
      if (arg.path === 'dust') {
        return { path: path.join(ROOT, 'src/index.ts'), namespace: 'file' };
      }
    });
  },
};

// ── React → Dust shim ──────────────────────────────────────────────────────────

export const reactDust: Plugin = {
  name: 'react-dust',
  setup(build: PluginBuild): void {
    build.onResolve({ filter: /^react(-dom)?$/ }, (arg) => ({
      path: path.join(ROOT, 'src', arg.path, 'index.ts'),
      namespace: 'file',
    }));
  },
};
