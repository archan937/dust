import { describe, expect, test } from 'bun:test';

import { css } from '../../src/core/css';

// The css module maintains a single <style> element across all calls.
// Tests use unique CSS strings to avoid cross-test interference.

const getDustStyleEl = (): HTMLStyleElement | null => {
  const styles = Array.from(document.head.getElementsByTagName('style'));
  return (
    (styles.find((el) =>
      el.hasAttribute('data-dust-css'),
    ) as HTMLStyleElement) ?? null
  );
};

describe('css', () => {
  test('returns a string class name prefixed with d', () => {
    const cls = css`
      color: red;
    `;
    expect(typeof cls).toBe('string');
    expect(cls.startsWith('d')).toBe(true);
  });

  test('same input always returns the same class name', () => {
    const cls1 = css`
      color: blue;
    `;
    const cls2 = css`
      color: blue;
    `;
    expect(cls1).toBe(cls2);
  });

  test('different inputs return different class names', () => {
    const cls1 = css`
      color: green;
    `;
    const cls2 = css`
      color: orange;
    `;
    expect(cls1).not.toBe(cls2);
  });

  test('injects a style element with data-dust-css into document.head', () => {
    const _cls = css`
      font-size: 14px;
    `;
    void _cls;
    expect(getDustStyleEl()).not.toBeNull();
  });

  test('CSS rule is present in the style element text', () => {
    const _cls = css`
      margin: 8px;
    `;
    void _cls;
    const text = getDustStyleEl()?.textContent ?? '';
    expect(text).toContain('margin: 8px;');
  });

  test('same class is not injected twice (deduplication)', () => {
    const _cls1 = css`
      padding: 1rem;
    `;
    const _cls2 = css`
      padding: 1rem;
    `;
    void _cls1;
    void _cls2;
    const text = getDustStyleEl()?.textContent ?? '';
    const occurrences = text.split('padding: 1rem;').length - 1;
    expect(occurrences).toBe(1);
  });

  test('interpolated values are included in the CSS text', () => {
    const color = 'purple';
    const _cls = css`
      color: ${color};
    `;
    void _cls;
    const text = getDustStyleEl()?.textContent ?? '';
    expect(text).toContain('color: purple;');
  });
});
