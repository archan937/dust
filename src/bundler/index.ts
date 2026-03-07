import fs from 'node:fs';
import path from 'node:path';

import esbuild from 'esbuild';
import { CWD } from 'src/utils';

import { jsxTranspiler, reactDust } from './plugins';

const plugins = [jsxTranspiler, reactDust];

export const bundle = async (
  entryPoint: string,
  options?: esbuild.BuildOptions,
): Promise<string> => {
  const { outputFiles } = await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    write: false,
    plugins,
    ...options,
  });

  if (!outputFiles?.length) throw new Error('esbuild produced no output');
  return outputFiles[0].text;
};

export const build = async (outdir = path.join(CWD, 'dist')): Promise<void> => {
  const indexPath = path.join(CWD, 'index.html');
  const index = fs.readFileSync(indexPath, 'utf8');

  const src = index.match(/script\s+src=["']([^"']*\.(j|t)sx)["']/)?.[1];
  if (!src) {
    console.error('No JSX entry point found in index.html');
    return;
  }

  const entryPoint = path.join(CWD, src);
  const outFile = path.basename(src).replace(/\.(j|t)sx$/, '.js');
  const js = await bundle(entryPoint, { minify: true });

  fs.mkdirSync(outdir, { recursive: true });
  fs.writeFileSync(path.join(outdir, outFile), js);
  fs.writeFileSync(
    path.join(outdir, 'index.html'),
    index.replace(src, `./${outFile}`),
  );
};
