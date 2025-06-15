import path from 'node:path';

import pkg from '../../package.json' with { type: 'json' };

export const NAME = pkg.name.replace(/^./, (m) => m.toUpperCase());
export const VERSION = pkg.version;
export const PORT = 3000;
export const CWD = typeof process !== 'undefined' ? process.cwd() : '';
export const ROOT = path.resolve(import.meta.dirname, '..', '..');

export const getType = (value: unknown): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof Map) return 'map';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Set) return 'set';
  return typeof value;
};

export const isIndex = (value: unknown, prop: PropertyKey): boolean =>
  Array.isArray(value)
    ? typeof prop === 'number'
    : Object.prototype.hasOwnProperty.call(value, prop);
