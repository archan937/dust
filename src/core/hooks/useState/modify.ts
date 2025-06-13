import type { Getter } from 'src/types';
import { getType } from 'src/utils';

export const replace = (current: unknown, newValue: unknown): unknown => {
  const type = getType(current);

  if (type === 'array') {
    const currentArray = current as unknown[];
    const newArray = newValue as unknown[];
    const length = Math.max(currentArray.length, newArray.length);

    for (let i = 0; i < length; i++) {
      if (i < newArray.length) {
        currentArray[i] = newArray[i];
      }
    }

    currentArray.length = newArray.length;

    return currentArray;
  }

  if (type === 'object') {
    const currentObject = current as Record<string, unknown>;
    const newObject = newValue as Record<string, unknown>;
    const currentKeys = new Set(Object.keys(currentObject));
    const newKeys = new Set(Object.keys(newObject));

    newKeys.forEach((key) => {
      const currentVal = currentObject[key];
      const newVal = newObject[key];
      const setter = (currentVal as Getter<unknown>)?.__setter__;

      if (setter) {
        setter(newVal);
      } else {
        currentObject[key] = newVal;
      }
    });

    currentKeys.difference(newKeys).forEach((key) => {
      currentObject[key] = undefined;
    });

    return currentObject;
  }

  return newValue;
};
