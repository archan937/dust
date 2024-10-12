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

const isArray = (value: unknown): boolean => Array.isArray(value);
const isFunction = (value: unknown): boolean => typeof value === "function";
const isNull = (value: unknown): boolean => value === null;
const isUndefined = (value: unknown): boolean => typeof value === "undefined";

const isDomNode = (value: unknown): value is Element | DocumentFragment => {
  if (isUndefined(value)) return false;
  return (
    value instanceof Element ||
    (typeof DocumentFragment !== "undefined" &&
      value instanceof DocumentFragment)
  );
};

const isObject = (value: unknown): boolean =>
  Boolean(value) && Object.prototype.toString.call(value) === "[object Object]";

export {
  isArray,
  isDomNode,
  isFunction,
  isNull,
  isObject,
  isUndefined,
  randomHash,
};
