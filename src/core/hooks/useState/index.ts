import { getType, isReactiveProperty, tracking } from 'src/utils/reactive';
import type { Getter, SetterFunction, State } from 'types';

import { replace } from './modify';

const useState = <T>(initialValue: T): State<T> => {
  let current = initialValue;
  const consumers: (() => void)[] = [];

  const register = (fn: () => void): (() => void) => {
    consumers.push(fn);
    return (): void => {
      const index = consumers.indexOf(fn);
      if (index !== -1) {
        consumers.splice(index, 1);
      }
    };
  };

  const setter = (value: T | SetterFunction<T>): void => {
    let newValue = value;
    if (typeof value === 'function') {
      newValue = (value as SetterFunction<T>)(current);
    }
    current = replace(current, newValue) as T;
    consumers.forEach((fn) => fn());
  };

  const read = (value: unknown): unknown => {
    if (typeof value !== 'object' || value === null) return value;
    if (Array.isArray(value)) return (value as unknown[]).map(read);
    if (getType(value) !== 'object') return value;
    const { constructor } = value as { constructor?: new (...args: never[]) => unknown };
    if (constructor && constructor !== Object) return value;
    const object = Object.assign({}, value) as Record<string, unknown>;
    Object.entries(object).forEach(([key, val]) => {
      if ((val as Getter<unknown>)?.__setter__) {
        object[key] = (val as Getter<unknown>)();
      }
    });
    return object;
  };

  const getter = new Proxy((): T => {
    if (tracking.current) tracking.current(register);
    return read(current) as T;
  }, {
    get(target, prop, receiver): unknown {
      const currentType = getType(current);

      switch (prop) {
        case '__register__':
          return register;
        case '__setter__':
          return setter;
        case 'toString':
        case 'valueOf':
          return () => read(current);
      }

      if (currentType === 'array' || currentType === 'object') {
        const value = (current as Record<PropertyKey, unknown>)[prop];

        if (typeof value === 'function') {
          return (value as Getter<unknown>).__setter__ ? value : value.bind(current);
        }

        if (isReactiveProperty(current, prop)) {
          const [nestedGetter] = useState(value);
          (current as Record<PropertyKey, unknown>)[prop] = nestedGetter;
          return nestedGetter;
        }

        return value;
      }

      return Reflect.get(target, prop, receiver);
    },
    ownKeys(): ReturnType<typeof Object.keys> {
      return Object.keys(current as Record<string, unknown>);
    },
    getOwnPropertyDescriptor(target, prop): PropertyDescriptor | undefined {
      const type = getType(current);
      if (
        (type === 'array' || type === 'object') &&
        current !== null &&
        typeof current === 'object' &&
        prop in current
      ) {
        return {
          enumerable: true,
          configurable: true,
        };
      }
      return undefined;
    },
  }) as Getter<T>;

  return [getter, setter];
};

export default useState;
