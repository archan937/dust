import Bun, { plugin } from "bun";

import { transpile } from "src/transpiler";

const transpilePlugin = {
  name: "jsx-transpiler",
  setup(build) {
    build.onLoad({ filter: /\.jsx$/ }, async ({ path }) => {
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
