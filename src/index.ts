import * as core from './core';
import * as types from './types';

const Dust = {
  ...core,
  ...types,
} as const;

export default Dust;
export * from './core';
export * from './types';
