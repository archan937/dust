export const getType = (value: unknown): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof Map) return 'map';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Set) return 'set';
  return typeof value;
};

export const isReactiveProperty = (value: unknown, prop: PropertyKey): boolean =>
  !Array.isArray(value) && Object.prototype.hasOwnProperty.call(value, prop);
