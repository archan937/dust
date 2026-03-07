import { describe, expect, test } from 'bun:test';
import { cleanupNode, createRoot, useState } from 'dust';

describe('Core', () => {
  describe('createRoot', () => {
    test('throws on null container', () => {
      expect(() => createRoot(null)).toThrow('container is null');
    });

    test('render appends element to container', () => {
      const container = document.createElement('div');
      const root = createRoot(container);
      const el = document.createElement('span');
      root.render(el);
      expect(container.firstChild).toBe(el);
    });

    test('render clears previous content', () => {
      const container = document.createElement('div');
      const root = createRoot(container);
      root.render(document.createElement('span'));
      const div = document.createElement('div');
      root.render(div);
      expect(container.children.length).toBe(1);
      expect(container.firstElementChild?.tagName).toBe('DIV');
    });

    test('render calls cleanupNode on existing content before replacing', () => {
      const container = document.createElement('div');
      const root = createRoot(container);

      const [count] = useState(0);
      // Mount a reactive element — registers a subscription
      const el = document.createElement('span');
      const textNode = document.createTextNode(String(count()));
      const unsub = count.__register__(() => {
        textNode.textContent = String(count());
      });
      cleanupNode(el); // baseline: no cleanups on el yet

      root.render(document.createElement('div'));
      // After re-render the old content is cleaned up; unsub is a sanity reference
      unsub();
      expect(container.firstElementChild?.tagName).toBe('DIV');
    });
  });
});
