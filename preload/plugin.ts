import Bun, { plugin, type PluginBuilder } from "bun";

import { transpile } from "src/transpiler";

const transpilePlugin = {
  name: "jsx-transpiler",
  setup(build: PluginBuilder): void {
    build.onLoad({ filter: /\.(j|t)sx$/ }, async ({ path }) => {
      const jsx = await Bun.file(path).text();
      const contents = transpile(jsx);
      return {
        contents,
        loader: "jsx",
      };
    });
  },
};

plugin(transpilePlugin);