import { describe, expect, mock, test } from 'bun:test';
import { useEffect, useState } from 'dust';

describe('Hooks', () => {
  describe('useEffect', () => {
    test('calls callback immediately', () => {
      const fn = mock(() => undefined);
      const [count] = useState(0);
      useEffect(fn, [count]);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('calls callback when dependency changes', () => {
      const fn = mock(() => undefined);
      const [count, setCount] = useState(0);
      useEffect(fn, [count]);
      expect(fn).toHaveBeenCalledTimes(1);
      setCount(1);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('calls callback for each dependency change', () => {
      const fn = mock(() => undefined);
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
      const fn = mock(() => undefined);
      const [count, setCount] = useState(0);
      const cleanup = useEffect(fn, [count]);
      expect(fn).toHaveBeenCalledTimes(1);
      cleanup();
      setCount(1);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('ignores non-getter deps', () => {
      const fn = mock(() => undefined);
      useEffect(fn, [null, undefined, 42, 'string']);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles empty deps array', () => {
      const fn = mock(() => undefined);
      useEffect(fn, []);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('calls cleanup returned by callback before re-running', () => {
      const order: string[] = [];
      const [count, setCount] = useState(0);
      useEffect(() => {
        order.push('effect');
        return (): void => {
          order.push('cleanup');
        };
      }, [count]);
      setCount(1);
      expect(order).toEqual(['effect', 'cleanup', 'effect']);
    });

    test('calls cleanup returned by callback on unsubscribe', () => {
      const order: string[] = [];
      const [count] = useState(0);
      const stop = useEffect(() => {
        order.push('effect');
        return (): void => {
          order.push('cleanup');
        };
      }, [count]);
      stop();
      expect(order).toEqual(['effect', 'cleanup']);
    });
  });
});
