const { describe, expect, test } = require("bun:test");
const Hydrogen = require("src");

describe("Hydrogen", () => {
  test("provides the useState hook", () => {
    const [counter, setCounter] = Hydrogen.useState(1);

    expect(counter()).toBe(1);
    setCounter(5);
    expect(counter()).toBe(5);
  });
});
