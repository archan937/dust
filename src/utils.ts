const CHARS = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
].join("");

const randomHash = (): string => {
  let hash = "";
  for (let i = 0; i < 6; i++) {
    hash += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return hash;
};

const isArray = (value): boolean => Array.isArray(value);
const isFunction = (value): boolean => typeof value === "function";
const isNull = (value): boolean => value === null;
const isUndefined = (value): boolean => typeof value === "undefined";

const isDomNode = (value): boolean =>
  value &&
  (value instanceof Element || value.constructor.name === "DocumentFragment");

const isObject = (value): boolean =>
  value && Object.prototype.toString.call(value) === "[object Object]";

export {
  isArray,
  isDomNode,
  isFunction,
  isNull,
  isObject,
  isUndefined,
  randomHash,
};
