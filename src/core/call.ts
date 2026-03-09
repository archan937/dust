import type { Getter } from '../types/hooks/useState';

export const call = <T>(v: Getter<T> | T): T =>
  typeof v === 'function' && '__register__' in (v as object)
    ? (v as Getter<T>)()
    : (v as T);
