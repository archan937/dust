import type { Getter } from 'src/types';

const useEffect = (callback: () => unknown, deps: unknown[]): (() => void) => {
  let cleanup: (() => void) | undefined;

  const run = (): void => {
    cleanup?.();
    const result = callback();
    cleanup = typeof result === 'function' ? (result as () => void) : undefined;
  };

  const unsubscribers = deps
    .map((dep) => (dep as unknown as Getter<unknown>)?.__register__?.(run))
    .filter((fn): fn is () => void => typeof fn === 'function');

  run();

  return (): void => {
    cleanup?.();
    unsubscribers.forEach((fn) => fn());
  };
};

export default useEffect;
