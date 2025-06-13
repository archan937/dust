import type { Getter } from 'src/types';

const useEffect = (callback: () => void, deps: unknown[]): void => {
  deps.forEach((dep) => {
    if (dep) {
      (dep as unknown as Getter<unknown>).__register__?.(callback);
    }
  });
  callback();
};

export default useEffect;
