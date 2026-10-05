import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Node by default: the architecture suite inspects files on disk, and
    // Icon is non-interactive, so `react-dom/server` asserts its contract
    // without a DOM.
    //
    // BottomSheet is the first INTERACTIVE primitive and does need one. It
    // opts in per file with a `@vitest-environment jsdom` docblock rather
    // than switching the whole suite: twenty-eight file-inspecting tests
    // have no use for a DOM, and paying for one in each of them would be
    // slower and would hide a real dependency behind a global default.
    environment: "node",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
  },
});
