import path from "node:path";

import esbuild from "esbuild";

import { ROOT } from "src/utils";

import { compileMain } from "./compile-main";
import { jsxTranspiler } from "./plugins";

export const bundle = async (
  entryPoint: string,
  options?: esbuild.BuildOptions,
): Promise<string> => {
  const { outputFiles } = await esbuild.build({
    stdin: {
      contents: await compileMain(entryPoint),
      resolveDir: ROOT,
      loader: "jsx",
    },
    bundle: true,
    minify: false,
    plugins: [jsxTranspiler],
    write: false,
    ...options,
  });

  return outputFiles?.[0].text ?? "";
};

export const build = async (): Promise<void> => {
  const index = await Bun.file(`${ROOT}/index.html`).text();
  if (!index) {
    console.error("index.html not found");
    return;
  }

  const source = index.match(/script src=['"](.*\.(j|t)sx)['"]/)?.[1];
  if (!source) {
    return;
  }

  const entryPoint = path.basename(source).replace(/\.(j|t)sx/, ".js");
  const js = await bundle(entryPoint, { minify: true });

  await Bun.write(`${ROOT}/dist/${entryPoint}`, js);
  await Bun.write(
    `${ROOT}/dist/index.html`,
    index.replace(source, `/${entryPoint}`),
  );
  await Bun.write(`${ROOT}/dist/sw.js`, "function SW() {}");
};
