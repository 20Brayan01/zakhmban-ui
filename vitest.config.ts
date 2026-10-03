import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Node only. The architecture suite inspects files on disk, and Icon —
    // the first React-bearing module — is non-interactive, so its contract is
    // the rendered markup and `react-dom/server` asserts that without a DOM.
    // A jsdom project is added by the commit that introduces the first
    // INTERACTIVE primitive, which has something to simulate.
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
