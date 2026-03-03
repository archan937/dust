export type Getter<T> = (() => T) & {
  __register__: (fn: () => void) => () => void;
  __setter__: (value: T | ((prev: T) => T)) => void;
} & {
  [K in keyof T]: T[K] extends (...args: never[]) => unknown
    ? T[K]
    : K extends keyof unknown[]
      ? T[K]
      : Getter<T[K]>;
};

export type Setter<T> = (value: T | SetterFunction<T>) => void;
export type SetterFunction<T> = (prev: T) => T;
export type State<T> = [Getter<T>, Setter<T>];
