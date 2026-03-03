import path from 'node:path';
import { watch } from 'node:fs';

import { transpile } from 'src/transpiler';
import { CWD, PORT, ROOT } from 'src/utils';

const IMPORT_MAP = JSON.stringify({ imports: { dust: '/@dust' } });
const JS_EXTENSIONS = ['.jsx', '.tsx', '.ts', '.js'] as const;
const encoder = new TextEncoder();

// ── HMR ──────────────────────────────────────────────────────────────────────

const hmrClients = new Set<WritableStreamDefaultWriter<Uint8Array>>();

let reloadTimer: ReturnType<typeof setTimeout> | null = null;

const scheduleReload = (): void => {
  if (reloadTimer) clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    reloadTimer = null;
    for (const writer of hmrClients) {
      writer.write(encoder.encode('data: reload\n\n')).catch(() => {
        hmrClients.delete(writer);
      });
    }
  }, 50);
};

// ── Bundle cache ──────────────────────────────────────────────────────────────

let dustBundle: string | null = null;

const buildDust = async (): Promise<string> => {
  if (dustBundle) return dustBundle;
  const result = await Bun.build({
    entrypoints: [path.join(ROOT, 'src/index.ts')],
    target: 'browser',
    format: 'esm',
  });
  if (!result.success) throw new Error('Failed to build dust library');
  dustBundle = await result.outputs[0].text();
  return dustBundle;
};

// Watch Dust source — invalidate bundle and trigger reload
watch(path.join(ROOT, 'src'), { recursive: true }, (_, filename) => {
  if (filename?.match(/\.(j|t)sx?$/)) {
    dustBundle = null;
    scheduleReload();
  }
});

// Watch user's app — trigger reload on any file change
watch(CWD, { recursive: true }, (_, filename) => {
  if (filename && !filename.includes('node_modules')) {
    scheduleReload();
  }
});

// ── Response helpers ──────────────────────────────────────────────────────────

const HMR_SCRIPT = `<script>new EventSource('/_dust/hmr').onmessage = () => location.reload();</script>`;

const injectDevScripts = (html: string): string =>
  html
    .replace('<head>', `<head>\n  <script type="importmap">${IMPORT_MAP}</script>`)
    .replace('</body>', `  ${HMR_SCRIPT}\n</body>`);

const serveHtml = async (filePath: string): Promise<Response> =>
  new Response(injectDevScripts(await Bun.file(filePath).text()), {
    headers: { 'Content-Type': 'text/html' },
  });

const serveScript = async (filePath: string): Promise<Response> => {
  try {
    const js = transpile(await Bun.file(filePath).text(), filePath);
    return new Response(js, {
      headers: { 'Content-Type': 'application/javascript' },
    });
  } catch (error) {
    const pathname = filePath.replace(CWD, '');
    console.error(`Error transpiling ${pathname}:`, error);
    return new Response('Error processing file', { status: 500 });
  }
};

// ── Server ────────────────────────────────────────────────────────────────────

export const dev = (): number =>
  Bun.serve({
    port: Number(Bun.env.PORT ?? PORT),
    hostname: '0.0.0.0',
    idleTimeout: 0,
    async fetch(req: Request): Promise<Response> {
      const url = new URL(req.url);
      const pathname = url.pathname.replaceAll('..', '');
      const filePath = path.join(CWD, pathname);

      if (pathname === '/sw.js') {
        return new Response('function SW() {}', {
          headers: { 'Content-Type': 'application/javascript' },
        });
      }

      if (pathname === '/_dust/hmr') {
        const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
        const writer = writable.getWriter();
        hmrClients.add(writer);
        writer.write(encoder.encode(': connected\n\n'));
        req.signal.addEventListener('abort', () => {
          hmrClients.delete(writer);
          writer.close().catch(() => {});
        });
        return new Response(readable, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        });
      }

      if (pathname === '/@dust') {
        try {
          return new Response(await buildDust(), {
            headers: { 'Content-Type': 'application/javascript' },
          });
        } catch (error) {
          console.error('Error building dust:', error);
          return new Response('Error building dust library', { status: 500 });
        }
      }

      // Explicit JS extension — transpile or 404
      if (/\.(j|t)sx?$/.test(pathname)) {
        const file = Bun.file(filePath);
        return (await file.exists())
          ? serveScript(filePath)
          : new Response('Not found', { status: 404 });
      }

      // Static file
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return file.type.startsWith('text/html')
          ? serveHtml(filePath)
          : new Response(file);
      }

      // Extension resolution for bare module imports (e.g. './App' → './App.jsx')
      for (const ext of JS_EXTENSIONS) {
        const candidate = `${filePath}${ext}`;
        if (await Bun.file(candidate).exists()) {
          return serveScript(candidate);
        }
      }

      // SPA fallback
      return serveHtml(path.join(CWD, 'index.html'));
    },
  }).port ?? 0;
