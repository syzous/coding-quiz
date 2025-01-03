import { getShuffledArr } from "../array";

describe("getShuffledArr", () => {
  test("Should return an array", () => {
    const input = [1];
    const output = [1];

    expect(getShuffledArr(input)).toStrictEqual(output);
  });
});
