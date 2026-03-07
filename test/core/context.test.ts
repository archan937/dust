import { describe, expect, test } from 'bun:test';
import { createContext, useContext } from 'dust';

describe('Core', () => {
  describe('context', () => {
    // ── createContext ─────────────────────────────────────────────────────────

    test('createContext stores primitive defaultValue', () => {
      const ctx = createContext(42);
      expect(ctx.defaultValue).toBe(42);
    });

    test('createContext stores object defaultValue', () => {
      const ctx = createContext({ name: 'John' });
      expect(ctx.defaultValue).toEqual({ name: 'John' });
    });

    test('createContext stores null defaultValue', () => {
      const ctx = createContext<string | null>(null);
      expect(ctx.defaultValue).toBeNull();
    });

    test('createContext exposes a Provider function', () => {
      const ctx = createContext('hello');
      expect(typeof ctx.Provider).toBe('function');
    });

    // ── useContext without Provider ────────────────────────────────────────────

    test('useContext returns primitive defaultValue when no Provider', () => {
      const ctx = createContext('hello');
      expect(useContext(ctx)).toBe('hello');
    });

    test('useContext returns numeric defaultValue when no Provider', () => {
      const ctx = createContext(0);
      expect(useContext(ctx)).toBe(0);
    });

    test('useContext returns null defaultValue when no Provider', () => {
      const ctx = createContext<string | null>(null);
      expect(useContext(ctx)).toBeNull();
    });

    test('useContext returns object defaultValue when no Provider', () => {
      const ctx = createContext({ theme: 'light' });
      expect(useContext(ctx)).toEqual({ theme: 'light' });
    });

    // ── Provider propagation ──────────────────────────────────────────────────

    test('Provider propagates primitive value to function children', () => {
      const ctx = createContext('default');
      let captured: string | undefined;

      ctx.Provider({ value: 'provided' }, (): Node => {
        captured = useContext(ctx);
        return document.createTextNode('');
      });

      expect(captured).toBe('provided');
    });

    test('Provider propagates numeric value', () => {
      const ctx = createContext(0);
      let captured: number | undefined;

      ctx.Provider({ value: 99 }, (): Node => {
        captured = useContext(ctx);
        return document.createTextNode('');
      });

      expect(captured).toBe(99);
    });

    test('Provider propagates object value', () => {
      const ctx = createContext({ theme: 'light' });
      let captured: { theme: string } | undefined;

      ctx.Provider({ value: { theme: 'dark' } }, (): Node => {
        captured = useContext(ctx);
        return document.createTextNode('');
      });

      expect(captured).toEqual({ theme: 'dark' });
    });

    test('Provider renders children and returns a DocumentFragment', () => {
      const ctx = createContext('x');
      const span = document.createElement('span');
      span.textContent = 'hello';

      const result = ctx.Provider({ value: 'provided' }, span);
      expect(result).toBeInstanceOf(DocumentFragment);
      expect((result as DocumentFragment).firstChild).toBe(span);
    });

    test('Provider renders multiple children', () => {
      const ctx = createContext('x');
      const a = document.createElement('span');
      const b = document.createElement('em');

      const frag = ctx.Provider({ value: 'v' }, a, b) as DocumentFragment;
      expect(frag.childNodes.length).toBe(2);
      expect(frag.childNodes[0]).toBe(a);
      expect(frag.childNodes[1]).toBe(b);
    });

    // ── Stack cleanup ─────────────────────────────────────────────────────────

    test('useContext returns defaultValue after Provider finishes', () => {
      const ctx = createContext('default');

      ctx.Provider({ value: 'provided' }, document.createTextNode(''));

      expect(useContext(ctx)).toBe('default');
    });

    test('stack is correctly unwound even with multiple sequential Providers', () => {
      const ctx = createContext('default');

      ctx.Provider({ value: 'first' }, document.createTextNode(''));
      ctx.Provider({ value: 'second' }, document.createTextNode(''));

      expect(useContext(ctx)).toBe('default');
    });

    // ── Nested Providers ──────────────────────────────────────────────────────

    test('inner Provider shadows outer Provider', () => {
      const ctx = createContext('default');
      let outerVal: string | undefined;
      let innerVal: string | undefined;

      ctx.Provider({ value: 'outer' }, (): Node => {
        outerVal = useContext(ctx);

        ctx.Provider({ value: 'inner' }, (): Node => {
          innerVal = useContext(ctx);
          return document.createTextNode('');
        });

        return document.createTextNode('');
      });

      expect(outerVal).toBe('outer');
      expect(innerVal).toBe('inner');
    });

    test('outer Provider value is restored after inner Provider finishes', () => {
      const ctx = createContext('default');
      let duringInner: string | undefined;
      let afterInner: string | undefined;

      ctx.Provider({ value: 'outer' }, (): Node => {
        ctx.Provider({ value: 'inner' }, (): Node => {
          duringInner = useContext(ctx);
          return document.createTextNode('');
        });

        afterInner = useContext(ctx);
        return document.createTextNode('');
      });

      expect(duringInner).toBe('inner');
      expect(afterInner).toBe('outer');
    });

    test('deeply nested Providers unwind correctly', () => {
      const ctx = createContext('default');
      const captured: string[] = [];

      ctx.Provider({ value: 'level-1' }, (): Node => {
        captured.push(useContext(ctx));

        ctx.Provider({ value: 'level-2' }, (): Node => {
          captured.push(useContext(ctx));

          ctx.Provider({ value: 'level-3' }, (): Node => {
            captured.push(useContext(ctx));
            return document.createTextNode('');
          });

          captured.push(useContext(ctx));
          return document.createTextNode('');
        });

        captured.push(useContext(ctx));
        return document.createTextNode('');
      });

      expect(captured).toEqual([
        'level-1',
        'level-2',
        'level-3',
        'level-2',
        'level-1',
      ]);
    });

    // ── Independent contexts ───────────────────────────────────────────────────

    test('multiple independent contexts do not interfere', () => {
      const themeCtx = createContext('light');
      const langCtx = createContext('en');
      let capturedTheme: string | undefined;
      let capturedLang: string | undefined;

      themeCtx.Provider({ value: 'dark' }, (): Node => {
        langCtx.Provider({ value: 'fr' }, (): Node => {
          capturedTheme = useContext(themeCtx);
          capturedLang = useContext(langCtx);
          return document.createTextNode('');
        });
        return document.createTextNode('');
      });

      expect(capturedTheme).toBe('dark');
      expect(capturedLang).toBe('fr');
    });

    test('one context Provider does not affect an unrelated context', () => {
      const ctxA = createContext('a-default');
      const ctxB = createContext('b-default');
      let capturedB: string | undefined;

      ctxA.Provider({ value: 'a-provided' }, (): Node => {
        capturedB = useContext(ctxB);
        return document.createTextNode('');
      });

      expect(capturedB).toBe('b-default');
    });

    test('each createContext call produces an independent context', () => {
      const ctx1 = createContext('ctx1-default');
      const ctx2 = createContext('ctx2-default');
      let c1: string | undefined;
      let c2: string | undefined;

      ctx1.Provider({ value: 'ctx1-provided' }, (): Node => {
        ctx2.Provider({ value: 'ctx2-provided' }, (): Node => {
          c1 = useContext(ctx1);
          c2 = useContext(ctx2);
          return document.createTextNode('');
        });
        return document.createTextNode('');
      });

      expect(c1).toBe('ctx1-provided');
      expect(c2).toBe('ctx2-provided');
    });
  });
});
