import path from 'node:path';

import pkg from '../../package.json' with { type: 'json' };

export { getType, isReactiveProperty } from './reactive';

export const NAME = pkg.name.replace(/^./, (m) => m.toUpperCase());
export const VERSION = pkg.version;
export const PORT = 3000;
export const CWD = typeof process !== 'undefined' ? process.cwd() : '';
export const ROOT = path.resolve(import.meta.dirname, '..', '..');
