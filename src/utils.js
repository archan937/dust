const CHARS = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
].join("");

export const randomHash = () => {
  let hash = "";
  for (let i = 0; i < 6; i++) {
    hash += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return hash;
};

export const isArray = Array.isArray;
export const isFunction = (value) => typeof value === "function";
export const isObject = (value) =>
  value && typeof value === "object" && !isArray(value);
export const isUndefined = (value) => typeof value === "undefined";
