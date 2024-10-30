import fs from "node:fs";
import path from "node:path";

import esbuild from "esbuild";

import { resolvePages, transpileJsx } from "src/transpiler";

import pkg from "../../package.json";

export const pagesResolver = (acc: string[]): esbuild.Plugin => ({
  name: "pages-resolver",
  setup(build: esbuild.PluginBuild): void {
    build.onLoad({ filter: /\.(j|t)sx$/ }, async (arg) => {
      const jsx = fs.readFileSync(arg.path, "utf8");
      const { contents, pages } = resolvePages(path.resolve(arg.path), jsx);
      acc.splice(acc.length, 0, ...pages);
      return {
        contents,
        loader: "jsx",
      };
    });
    build.onResolve({ filter: /.*/ }, (arg) => {
      if (arg.path === pkg.name) {
        return {
          path: path.join(__dirname, "..", "index.ts"),
          namespace: "file",
        };
      }
    });
  },
});

export const reactDust = {
  name: "react-dust",
  setup(build: esbuild.PluginBuild): void {
    build.onResolve({ filter: /.*/ }, (arg) => {
      if (["react", "react-dom"].includes(arg.path)) {
        return {
          path: path.join(__dirname, "..", arg.path, "index.ts"),
          namespace: "file",
        };
      }
    });
  },
};

export const jsxTranspiler = {
  name: "jsx-transpiler",
  setup(build: esbuild.PluginBuild): void {
    build.onLoad({ filter: /\.(j|t)sx$/ }, async (arg) => {
      const jsx = fs.readFileSync(arg.path, "utf8");
      const contents = transpileJsx(jsx);
      return {
        contents,
        loader: "jsx",
      };
    });
    build.onResolve({ filter: /.*/ }, (arg) => {
      if (arg.path === pkg.name) {
        return {
          path: path.join(__dirname, "..", "index.ts"),
          namespace: "file",
        };
      }
    });
  },
};
