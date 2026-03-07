import { Window } from 'happy-dom';

const win = new Window({ url: 'http://localhost/' });
const g = globalThis as unknown as Record<string, unknown>;

g.window = win;
g.document = win.document;
g.history = win.history;
g.location = win.location;

const w = win as unknown as Record<string, unknown>;
for (const name of [
  'Node',
  'Element',
  'HTMLElement',
  'DocumentFragment',
  'Text',
  'Comment',
  'Event',
  'MouseEvent',
  'CustomEvent',
  'MutationObserver',
]) {
  if (w[name] !== undefined) g[name] = w[name];
}
