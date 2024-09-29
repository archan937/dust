const { describe, expect, test } = require("bun:test");

const {
  isArray,
  isFunction,
  isObject,
  isUndefined,
  randomHash,
} = require("utils");

describe("randomHash", () => {
  test("generates a string containing 6 random characters and integer", () => {
    const regex = /^[A-Za-z0-9]{6}$/;

    expect(randomHash().match(regex)).toBeTruthy();
    expect(randomHash().match(regex)).toBeTruthy();
    expect(randomHash().match(regex)).toBeTruthy();
    expect(randomHash().match(regex)).toBeTruthy();
    expect(randomHash().match(regex)).toBeTruthy();
  });

  test("generates unique random hashes", () => {
    const hashes = new Set();
    for (let i = 0; i < 5000; i++) {
      hashes.add(randomHash());
    }

    expect(hashes.size).toBe(5000);
  });
});

describe("isArray", () => {
  test("indicates whether passed value is an array", () => {
    expect(isArray(undefined)).not.toBeTruthy();
    expect(isArray(null)).not.toBeTruthy();
    expect(isArray(true)).not.toBeTruthy();
    expect(isArray(false)).not.toBeTruthy();
    expect(isArray(1)).not.toBeTruthy();
    expect(isArray("a")).not.toBeTruthy();
    expect(isArray([1, 2])).toBeTruthy();
    expect(isArray({ a: 1, b: 2 })).not.toBeTruthy();
    expect(isArray(function () {})).not.toBeTruthy();
    expect(isArray(() => {})).not.toBeTruthy();
  });
});

describe("isFunction", () => {
  test("indicates whether passed value is a function", () => {
    expect(isFunction(undefined)).not.toBeTruthy();
    expect(isFunction(null)).not.toBeTruthy();
    expect(isFunction(true)).not.toBeTruthy();
    expect(isFunction(false)).not.toBeTruthy();
    expect(isFunction(1)).not.toBeTruthy();
    expect(isFunction("a")).not.toBeTruthy();
    expect(isFunction([1, 2])).not.toBeTruthy();
    expect(isFunction({ a: 1, b: 2 })).not.toBeTruthy();
    expect(isFunction(function () {})).toBeTruthy();
    expect(isFunction(() => {})).toBeTruthy();
  });
});

describe("isObject", () => {
  test("indicates whether passed value is an object", () => {
    expect(isObject(undefined)).not.toBeTruthy();
    expect(isObject(null)).not.toBeTruthy();
    expect(isObject(true)).not.toBeTruthy();
    expect(isObject(false)).not.toBeTruthy();
    expect(isObject(1)).not.toBeTruthy();
    expect(isObject("a")).not.toBeTruthy();
    expect(isObject([1, 2])).not.toBeTruthy();
    expect(isObject({ a: 1, b: 2 })).toBeTruthy();
    expect(isObject(function () {})).not.toBeTruthy();
    expect(isObject(() => {})).not.toBeTruthy();
  });
});

describe("isUndefined", () => {
  test("indicates whether passed value is undefined", () => {
    expect(isUndefined(undefined)).toBeTruthy();
    expect(isUndefined(null)).not.toBeTruthy();
    expect(isUndefined(true)).not.toBeTruthy();
    expect(isUndefined(false)).not.toBeTruthy();
    expect(isUndefined(1)).not.toBeTruthy();
    expect(isUndefined("a")).not.toBeTruthy();
    expect(isUndefined([1, 2])).not.toBeTruthy();
    expect(isUndefined({ a: 1, b: 2 })).not.toBeTruthy();
    expect(isUndefined(function () {})).not.toBeTruthy();
    expect(isUndefined(() => {})).not.toBeTruthy();
  });
});
