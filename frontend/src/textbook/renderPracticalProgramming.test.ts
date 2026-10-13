import { describe, expect, it } from "vitest";
import { pageFrameUrls } from "./renderPracticalProgramming";

describe("pageFrameUrls", () => {
  it("points the viewer at each printed page", () => {
    expect(pageFrameUrls("/textbooks/practical-programming.pdf", 19, 21)).toEqual([
      "/textbooks/practical-programming.pdf#page=19",
      "/textbooks/practical-programming.pdf#page=20",
      "/textbooks/practical-programming.pdf#page=21",
    ]);
  });
});
