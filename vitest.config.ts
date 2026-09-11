import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Node only. Nothing in this package renders yet, and the architecture
    // suite inspects files on disk rather than a DOM. A jsdom project is
    // added by the commit that introduces the first primitive.
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
