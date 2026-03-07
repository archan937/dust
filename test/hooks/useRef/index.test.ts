import { describe, expect, test } from 'bun:test';
import { createElement, useRef } from 'dust';

describe('useRef', () => {
  test('returns object with current set to initialValue', () => {
    const ref = useRef(42);
    expect(ref.current).toBe(42);
  });

  test('current is mutable', () => {
    const ref = useRef<string | null>(null);
    ref.current = 'hello';
    expect(ref.current).toBe('hello');
  });

  test('ref prop sets current to created element', () => {
    const ref = useRef<HTMLElement | null>(null);
    createElement('div', { ref });
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  test('ref prop is set after children are mounted', () => {
    const ref = useRef<HTMLElement | null>(null);
    createElement('div', { ref }, 'child1', 'child2');
    expect(ref.current?.childNodes.length).toBe(2);
  });
});
