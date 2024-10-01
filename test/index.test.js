import { describe, expect, it } from "bun:test";

import Dust from "src";

describe("Dust", () => {
  it("provides the useState hook", () => {
    const [counter, setCounter] = Dust.useState(1);

    expect(counter()).toBe(1);
    setCounter(5);
    expect(counter()).toBe(5);
  });
});
