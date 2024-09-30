const CHARS = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
].join("");

const randomHash = () => {
  let hash = "";
  for (let i = 0; i < 6; i++) {
    hash += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return hash;
};

const isArray = Array.isArray;
const isFunction = (value) => typeof value === "function";
const isNull = (value) => value === null;
const isUndefined = (value) => typeof value === "undefined";

const isDomNode = (value) =>
  value instanceof Element || value.constructor.name === "DocumentFragment";

const isObject = (value) =>
  value && typeof value === "object" && !isArray(value);

export {
  isArray,
  isDomNode,
  isFunction,
  isNull,
  isObject,
  isUndefined,
  randomHash,
};
