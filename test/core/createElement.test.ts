import { describe, expect, test } from 'bun:test';
import { cleanupNode, createElement, Fragment, useState } from 'dust';

describe('Core', () => {
  describe('Fragment', () => {
    test('returns a DocumentFragment', () => {
      const frag = Fragment(null);
      expect(frag instanceof DocumentFragment).toBe(true);
    });

    test('appends children', () => {
      const frag = Fragment(null, 'hello', ' ', 'world');
      expect(frag.textContent).toBe('hello world');
    });

    test('appends Node children', () => {
      const span = document.createElement('span');
      const frag = Fragment(null, span);
      expect(frag.firstChild).toBe(span);
    });
  });

  describe('createElement', () => {
    // ── Props ────────────────────────────────────────────────────────────────────

    test('creates element with tag name', () => {
      const el = createElement('div', null) as HTMLElement;
      expect(el.tagName).toBe('DIV');
    });

    test('calls function component with props', () => {
      const Comp = (props: Record<string, unknown>): Node => {
        const el = document.createElement('span');
        el.setAttribute('data-id', String(props.id));
        return el;
      };
      const el = createElement(Comp, { id: 'test' }) as HTMLElement;
      expect(el.tagName).toBe('SPAN');
      expect(el.getAttribute('data-id')).toBe('test');
    });

    test('sets className', () => {
      const el = createElement('div', { className: 'foo bar' }) as HTMLElement;
      expect(el.className).toBe('foo bar');
    });

    test('sets attribute', () => {
      const el = createElement('div', {
        'data-x': 'y',
        id: 'main',
      }) as HTMLElement;
      expect(el.getAttribute('data-x')).toBe('y');
      expect(el.getAttribute('id')).toBe('main');
    });

    test('sets htmlFor as for attribute', () => {
      const el = createElement('label', { htmlFor: 'inp' }) as HTMLElement;
      expect(el.getAttribute('for')).toBe('inp');
    });

    test('sets boolean true attribute', () => {
      const el = createElement('input', { disabled: true }) as HTMLElement;
      expect(el.getAttribute('disabled')).toBe('');
    });

    test('omits boolean false attribute', () => {
      const el = createElement('input', { disabled: false }) as HTMLElement;
      expect(el.hasAttribute('disabled')).toBe(false);
    });

    test('skips null and undefined attributes', () => {
      const el = createElement('div', {
        foo: null,
        bar: undefined,
      }) as HTMLElement;
      expect(el.hasAttribute('foo')).toBe(false);
      expect(el.hasAttribute('bar')).toBe(false);
    });

    test('attaches event listener', () => {
      let fired = false;
      const el = createElement('button', {
        onClick: () => {
          fired = true;
        },
      }) as HTMLElement;
      el.dispatchEvent(new MouseEvent('click'));
      expect(fired).toBe(true);
    });

    // ── Static children ──────────────────────────────────────────────────────────

    test('appends Node child', () => {
      const span = document.createElement('span');
      const el = createElement('div', null, span) as HTMLElement;
      expect(el.firstChild).toBe(span);
    });

    test('appends string child', () => {
      const el = createElement('div', null, 'hello') as HTMLElement;
      expect(el.textContent).toBe('hello');
    });

    test('appends number child', () => {
      const el = createElement('div', null, 42) as HTMLElement;
      expect(el.textContent).toBe('42');
    });

    test('skips null child', () => {
      const el = createElement('div', null, null) as HTMLElement;
      expect(el.childNodes.length).toBe(0);
    });

    test('skips undefined child', () => {
      const el = createElement('div', null, undefined) as HTMLElement;
      expect(el.childNodes.length).toBe(0);
    });

    test('skips false child', () => {
      const el = createElement('div', null, false) as HTMLElement;
      expect(el.childNodes.length).toBe(0);
    });

    test('non-reactive function child (no tracked deps)', () => {
      const el = createElement('div', null, () => 'static') as HTMLElement;
      expect(el.textContent).toBe('static');
    });

    // ── Reactive: getter passthrough ─────────────────────────────────────────────

    test('reactive getter passthrough (arrow-wrapped state)', () => {
      const [count, setCount] = useState(0);
      // () => count returns the getter itself (has __register__)
      const el = createElement('div', null, () => count) as HTMLElement;
      expect(el.textContent).toBe('0');
      setCount(7);
      expect(el.textContent).toBe('7');
    });

    // ── Reactive: tracked primitive ──────────────────────────────────────────────

    test('reactive primitive child updates on state change', () => {
      const [count, setCount] = useState(3);
      // () => count() calls the getter → tracked dep, returns a primitive
      const el = createElement('div', null, () => count()) as HTMLElement;
      expect(el.textContent).toBe('3');
      setCount(9);
      expect(el.textContent).toBe('9');
    });

    // ── Reactive: tracked Node ───────────────────────────────────────────────────

    test('reactive node child swaps on state change', () => {
      const [show, setShow] = useState(true);
      const el = createElement('div', null, () => {
        const visible = show();
        return visible ? document.createElement('span') : null;
      }) as HTMLElement;

      expect(el.firstElementChild?.tagName).toBe('SPAN');

      setShow(false);
      expect(el.firstElementChild).toBeNull();

      setShow(true);
      expect(el.firstElementChild?.tagName).toBe('SPAN');
    });

    // ── Cleanup ──────────────────────────────────────────────────────────────────

    test('cleanupNode stops reactive updates', () => {
      const [count, setCount] = useState(0);
      const el = createElement('div', null, () => count()) as HTMLElement;
      const text = el.firstChild as Text;

      cleanupNode(el);
      setCount(42);
      expect(text.textContent).toBe('0'); // not updated after cleanup
    });

    test('cleanupNode recurses into child nodes', () => {
      const [count, setCount] = useState(0);
      const child = createElement('span', null, () => count()) as HTMLElement;
      const parent = createElement('div', null, child) as HTMLElement;

      cleanupNode(parent);
      setCount(42);
      expect((child.firstChild as Text).textContent).toBe('0');
    });

    test('cleanupNode is safe to call on non-reactive nodes', () => {
      const el = document.createElement('div');
      expect(() => cleanupNode(el)).not.toThrow();
    });
  });
});
