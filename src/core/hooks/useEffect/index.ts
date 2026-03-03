import type { Getter } from 'src/types';

const useEffect = (callback: () => void, deps: unknown[]): (() => void) => {
  const unsubscribers: (() => void)[] = [];

  deps.forEach((dep) => {
    if (dep) {
      const unsubscribe = (dep as unknown as Getter<unknown>).__register__?.(
        callback,
      );
      if (unsubscribe) {
        unsubscribers.push(unsubscribe);
      }
    }
  });

  callback();

  return (): void => unsubscribers.forEach((fn) => fn());
};

export default useEffect;
