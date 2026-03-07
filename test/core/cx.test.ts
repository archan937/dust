import { describe, expect, test } from 'bun:test';

import { cx } from '../../src/core/cx';

describe('cx', () => {
  test('joins multiple class names with a space', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c');
  });

  test('filters out false', () => {
    expect(cx('a', false, 'b')).toBe('a b');
  });

  test('filters out null', () => {
    expect(cx('a', null, 'b')).toBe('a b');
  });

  test('filters out undefined', () => {
    expect(cx('a', undefined, 'b')).toBe('a b');
  });

  test('filters out 0', () => {
    expect(cx('a', 0, 'b')).toBe('a b');
  });

  test('single truthy class returns just that class', () => {
    expect(cx('only')).toBe('only');
  });

  test('all falsy returns empty string', () => {
    expect(cx(false, null, undefined, 0)).toBe('');
  });

  test('mixed truthy/falsy returns only truthy classes joined', () => {
    const nope = false as const;
    expect(cx('base', nope && 'nope', null, 'active')).toBe('base active');
  });
});
