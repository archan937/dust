import esbuild from "esbuild";

import { ROOT } from "src/utils";

import { pagesResolver } from "./plugins";

export const compileMain = async (entryPoint: string): Promise<string> => {
  const pages: string[] = [];

  await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    write: false,
    plugins: [pagesResolver(pages)],
  });

  const imports = pages.map(
    (page, index) =>
      `import Page${index + 1} from '${ROOT}/${page
        .replace(/^\//, "")
        .replace(">", "/")}';`,
  );

  const routes = pages.map(
    (page, index) =>
      `'/${page
        .split(">")[1]
        .replace(/\..*?$/, "")
        .replace(/\bindex$/, "")}': Page${index + 1}`,
  );

  return `
    import { registerRoutes } from 'dust';
    import * as entryPoint from '${entryPoint}';

    ${imports.join("\n    ")}

    registerRoutes({
      ${routes.join(",\n      ")}
    });
  `;
};
