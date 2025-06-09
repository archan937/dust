interface GetterProperties<T> {
  [Symbol.toPrimitive](hint: string): string | number | T;
  __setter__: Setter<T>;
  toJSON(): T;
  toString(): string;
  valueOf(): T;
}

export type Getter<T> = (() => T) & GetterProperties<T> & T;
export type Setter<T> = (value: T | SetterFunction<T>) => void;
export type SetterFunction<T> = (prev: T) => T;
export type State<T> = [Getter<T>, Setter<T>];
