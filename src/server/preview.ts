import path from 'node:path';

import { CWD, PORT } from 'src/utils';

const distDir = path.join(CWD, 'dist');

export const preview = (): number =>
  Bun.serve({
    port: Number(Bun.env.PORT ?? PORT),
    hostname: '0.0.0.0',
    async fetch(req: Request): Promise<Response> {
      const url = new URL(req.url);
      const pathname = url.pathname.replaceAll('..', '');

      const file = Bun.file(path.join(distDir, pathname));

      if (await file.exists()) {
        return new Response(file);
      }

      // SPA fallback
      return new Response(Bun.file(path.join(distDir, 'index.html')), {
        headers: { 'Content-Type': 'text/html' },
      });
    },
  }).port ?? 0;
