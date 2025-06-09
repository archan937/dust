import type { Getter, SetterFunction, State } from 'types';

const useState = <T>(initialValue: T): State<T> => {
  let current = initialValue;

  const toPrimitive = (hint: string): string | number | T => {
    if (hint === 'string') {
      return String(current);
    }
    if (hint === 'number') {
      return Number(current);
    }
    return typeof current === 'object' ? String(current) : current;
  };

  const setter = (value: T | SetterFunction<T>): void => {
    if (typeof value === 'function') {
      current = (value as SetterFunction<T>)(current);
    } else {
      current = value;
    }
  };

  const getter = new Proxy((): T => current, {
    get(target, prop, receiver): unknown {
      switch (prop) {
        case Symbol.toPrimitive:
          return toPrimitive;
        case '__setter__':
          return setter;
        case 'constructor':
          return (current as object).constructor;
        case 'toString':
          return (): string => String(current);
        case 'toJSON':
        case 'valueOf':
          return (): T => current;
      }

      if (prop === Symbol.toStringTag) {
        if (Array.isArray(current)) return 'Array';
        if (current instanceof Date) return 'Date';
        if (current instanceof RegExp) return 'RegExp';
        if (current === null) return 'Null';
        if (current === undefined) return 'Undefined';
        return Object.prototype.toString.call(current).slice(8, -1);
      }

      if (current && typeof current === 'object' && prop in current) {
        const value = (current as Record<PropertyKey, unknown>)[prop];
        return typeof value === 'function' ? value.bind(current) : value;
      }

      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value): boolean {
      if (current && typeof current === 'object' && !Array.isArray(current)) {
        (current as Record<PropertyKey, unknown>)[prop] = value;
        return true;
      }
      return false;
    },

    getPrototypeOf(): ReturnType<typeof Object.getPrototypeOf> {
      return Object.getPrototypeOf(current);
    },

    has(target, prop): ReturnType<typeof Reflect.has> {
      return Reflect.has(current as object, prop);
    },

    ownKeys(): ReturnType<typeof Reflect.ownKeys> {
      const object =
        current && typeof current === 'object' ? current : Object(current);
      return Reflect.ownKeys(object);
    },

    getOwnPropertyDescriptor(
      target,
      prop,
    ): ReturnType<typeof Reflect.getOwnPropertyDescriptor> {
      if (!current) {
        return;
      }

      const object =
        current && typeof current === 'object' ? current : Object(current);

      const descriptor = Reflect.getOwnPropertyDescriptor(object, prop);

      if (!descriptor) {
        return undefined;
      }

      return {
        ...descriptor,
        configurable: true,
      };
    },
  }) as Getter<T>;

  return [getter, setter];
};

export default useState;
