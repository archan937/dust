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

export const build = async (): Promise<void> => {
  const index = await Bun.file(`${ROOT}/index.html`).text();
  if (!index) {
    console.error("index.html not found");
    return;
  }

  const src = index.match(/script src=['"](.*\.(j|t)sx)['"]/)?.[1];
  if (!src) {
    return;
  }

  const entryPoint = path.join(ROOT, src);
  const js = await bundle(entryPoint, { minify: true });

  fs.mkdirSync(path.join(ROOT, "dist"), { recursive: true });
  fs.writeFileSync(entryPoint.replace(/\.(j|t)sx/, ".js"), js);
  fs.writeFileSync(path.join(ROOT, "dist", "sw.js"), "function SW() {}");
  fs.writeFileSync(
    path.join(ROOT, "dist", "index.html"),
    index.replace(
      src,
      path.join("/", path.basename(src).replace(/\.(j|t)sx/, ".js")),
    ),
  );
};
