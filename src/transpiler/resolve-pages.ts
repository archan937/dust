import path from "path";
import * as ts from "typescript";

import { ROOT } from "src/utils";

type Attributes = Record<string, string>;

interface ResolvedPages {
  contents: string;
  pages: string[];
}

const extractAttributes = (
  node: ts.JsxSelfClosingElement | ts.JsxOpeningElement,
): Attributes => {
  const attributes: Attributes = {};
  node.attributes.properties.forEach((prop) => {
    if (ts.isJsxAttribute(prop)) {
      attributes[(prop.name as ts.Identifier).text] = getAttributeValue(prop);
    }
  });
  return attributes;
};

const getAttributeValue = (prop: ts.JsxAttribute): string => {
  if (!prop.initializer) return "true";
  if (ts.isStringLiteral(prop.initializer)) return prop.initializer.text;
  if (ts.isJsxExpression(prop.initializer))
    return prop.initializer.expression?.getText() ?? "";
  return "";
};

export const resolvePages = (dirname: string, jsx: string): ResolvedPages => {
  const pagesDirs: string[] = [];

  const contents = ts.transpileModule(jsx, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2015,
    },
    transformers: {
      before: [
        (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> =>
          (sourceFile: ts.SourceFile) => {
            const visit = (node: ts.Node): ts.Node => {
              if (ts.isJsxSelfClosingElement(node)) {
                const { tagName } = node;
                if (
                  ts.isIdentifier(tagName) &&
                  tagName.text === "DirectoryRouter"
                ) {
                  const { pages: pagesDir } = extractAttributes(node);
                  if (pagesDir)
                    pagesDirs.push(
                      pagesDir.match(/^\./)
                        ? path
                            .resolve(dirname, "..", pagesDir)
                            .replace(path.join(ROOT, ""), "")
                        : pagesDir,
                    );
                }
              }
              return ts.visitEachChild(node, visit, context);
            };
            return ts.visitNode(sourceFile, visit) as ts.SourceFile;
          },
      ],
    },
  }).outputText;

  const glob = new Bun.Glob("**/*.{js,jsx,ts,tsx}");
  const pages = pagesDirs.flatMap((pages) =>
    Array.from(glob.scanSync(`${ROOT}/${pages}`)).map(
      (file) => `${pages}>${file}`,
    ),
  );

  return { contents, pages };
};
