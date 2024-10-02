import Bun, { plugin } from "bun";

import { transpile } from "src/transpiler";

const transpilePlugin = {
  name: "jsx-transpiler",
  setup(build) {
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
