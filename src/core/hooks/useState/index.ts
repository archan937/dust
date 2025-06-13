import { getType, isIndex } from 'src/utils';
import type { Getter, SetterFunction, State } from 'types';

import { replace } from './modify';

const builtins: (
  | ArrayConstructor
  | DateConstructor
  | FunctionConstructor
  | MapConstructor
  | ObjectConstructor
  | SetConstructor
)[] = [Array, Date, Function, Map, Object, Set];

const useState = <T>(initialValue: T): State<T> => {
  let current = initialValue;
  const consumers: (() => void)[] = [];

  const register = consumers.push.bind(consumers);

  const setter = (value: T | SetterFunction<T>): void => {
    let newValue = value;

    if (typeof value === 'function') {
      newValue = (value as SetterFunction<T>)(current);
    }

    current = replace(current, newValue) as T;
    consumers.forEach((fn) => fn());
  };

  const read = (value: unknown): unknown => {
    const type = getType(value);

    if (
      typeof value === 'object' &&
      value !== null &&
      value.constructor &&
      !builtins.includes(value.constructor as never)
    ) {
      return value;
    }

    if (
      !(
        [
          'array',
          'date',
          'function',
          'map',
          'object',
          'regexp',
          'set',
        ].includes(type) && typeof value === 'object'
      )
    ) {
      return value;
    }

    if (type === 'array') {
      return (value as unknown[]).map(read);
    }

    if (type === 'object') {
      const object = Object.assign({}, value) as Record<string, unknown>;
      Object.entries(object).forEach(([key, val]) => {
        if ((val as Getter<unknown>)?.__setter__) {
          object[key] = (val as Getter<unknown>)();
        }
      });
      return object;
    }

    return value;
  };

  const getter = new Proxy((): T => read(current) as T, {
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
          return value.bind ? value.bind(current) : value;
        }

        if (isIndex(current, prop)) {
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
