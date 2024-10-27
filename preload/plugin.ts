import Bun, { plugin, type PluginBuilder } from "bun";

import { transpileJsx } from "src/transpiler";

const transpilePlugin = {
  name: "jsx-transpiler",
  setup(build: PluginBuilder): void {
    build.onLoad({ filter: /\.(j|t)sx$/ }, async ({ path }) => {
      const jsx = await Bun.file(path).text();
      const contents = transpileJsx(jsx);
      return {
        contents,
        loader: "jsx",
      };
    });
  },
};

plugin(transpilePlugin);
