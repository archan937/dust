import fs from "node:fs";
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

export const build = async (
  outdir = path.join(ROOT, "dist"),
): Promise<void> => {
  const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  if (!index) {
    console.error("index.html not found");
    return;
  }

  const src = index.match(/script src=['"](.*\.(j|t)sx)['"]/)?.[1];
  if (!src) {
    return;
  }

  const main = path.basename(src).replace(/\.(j|t)sx/, ".js");
  const js = await bundle(path.join(ROOT, src), { minify: true });

  fs.mkdirSync(outdir, { recursive: true });
  fs.writeFileSync(path.join(outdir, main), js);
  fs.writeFileSync(
    path.join(outdir, "index.html"),
    index.replace(src, `./${main}`),
  );
};
