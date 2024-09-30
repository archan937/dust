import { describe, expect, it } from "bun:test";

import Hydrogen from "src";

describe("Hydrogen", () => {
  it("provides the useState hook", () => {
    const [counter, setCounter] = Hydrogen.useState(1);

    expect(counter()).toBe(1);
    setCounter(5);
    expect(counter()).toBe(5);
  });
});
