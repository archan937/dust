import { globSync } from 'glob';
import path from 'node:path';

const DIRECTORY_ROUTER_RE =
  /<DirectoryRouter[^>]*\bpages=["']([^"']+)["'][^/>]*(?:\/>|>)/;

export type PageEntry = {
  route: string;
  importPath: string;
};

export const resolvePages = (baseDir: string, source: string): PageEntry[] => {
  const match = source.match(DIRECTORY_ROUTER_RE);
  if (!match) return [];

  const pagesDir = path.resolve(baseDir, match[1]);
  const files = globSync('**/*.{jsx,tsx}', { cwd: pagesDir });

  return files.map((file) => {
    const route =
      '/' +
      file
        .replace(/\.(jsx|tsx)$/, '')
        .replace(/\/index$/, '')
        .replace(/^index$/, '');

    return {
      route: route || '/',
      importPath: path.join(pagesDir, file),
    };
  });
};

export const buildPagesPreamble = (pages: PageEntry[], rootDir?: string): string => {
  if (pages.length === 0) return '';

  const imports = pages
    .map((p, i) => {
      const importPath = rootDir
        ? '/' + path.relative(rootDir, p.importPath)
        : p.importPath;
      return `import Page${i + 1} from '${importPath}';`;
    })
    .join('\n');

  const routes = pages
    .map((p, i) => `  '${p.route}': Page${i + 1}`)
    .join(',\n');

  return `${imports}\nimport { registerRoutes } from 'dust';\nregisterRoutes({\n${routes}\n});\n`;
};
