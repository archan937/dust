import { describe, expect, mock, test } from 'bun:test';
import { useEffect, useState } from 'dust';

describe('Hooks', () => {
  describe('useEffect', () => {
    test('calls callback immediately', () => {
      const fn = mock(() => {});
      const [count] = useState(0);
      useEffect(fn, [count]);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('calls callback when dependency changes', () => {
      const fn = mock(() => {});
      const [count, setCount] = useState(0);
      useEffect(fn, [count]);
      expect(fn).toHaveBeenCalledTimes(1);
      setCount(1);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('calls callback for each dependency change', () => {
      const fn = mock(() => {});
      const [a, setA] = useState(0);
      const [b, setB] = useState(0);
      useEffect(fn, [a, b]);
      expect(fn).toHaveBeenCalledTimes(1);
      setA(1);
      expect(fn).toHaveBeenCalledTimes(2);
      setB(1);
      expect(fn).toHaveBeenCalledTimes(3);
    });

    test('unsubscribes on returned cleanup call', () => {
      const fn = mock(() => {});
      const [count, setCount] = useState(0);
      const cleanup = useEffect(fn, [count]);
      expect(fn).toHaveBeenCalledTimes(1);
      cleanup();
      setCount(1);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('ignores non-getter deps', () => {
      const fn = mock(() => {});
      useEffect(fn, [null, undefined, 42, 'string']);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles empty deps array', () => {
      const fn = mock(() => {});
      useEffect(fn, []);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
