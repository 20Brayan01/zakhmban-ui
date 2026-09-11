import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const srcDir = fileURLToPath(new URL("../../src", import.meta.url));

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = `${dir}/${entry.name}`;
    return entry.isDirectory() ? walk(full) : [full];
  });
}

describe("source entry", () => {
  it("has exactly one public entry file", () => {
    // UI System Specification v0.2 §7: "One public entry (@zakhmban/ui) with
    // named exports only". src/index.ts is that entry.
    expect(existsSync(`${srcDir}/index.ts`)).toBe(true);
  });

  it("resolves and imports as an ES module", async () => {
    const entry = await import("../../dist/index.js");
    expect(entry).toBeDefined();
  });

  it("exports nothing yet, and says so honestly", () => {
    // C1 is the foundation commit. An empty public surface is the correct state
    // and makes every later widening a visible diff in exports-contract.test.ts
    // and in this file.
    const source = readFileSync(`${srcDir}/index.ts`, "utf8");
    expect(source).toContain("export {}");
    expect(source).not.toMatch(/^export (const|function|class|default)\b/m);
  });

  it("ships no component, token, icon or stylesheet at this commit", () => {
    // The C1 scope boundary, enforced rather than trusted. Each of these
    // arrives in its own commit with its own tests; none may ride along in a
    // foundation change.
    const files = walk(srcDir);

    for (const forbidden of [
      "Button",
      "TextField",
      "Select",
      "OtpInput",
      "BottomSheet",
      "Icon",
      "tokens",
      "tailwind",
    ]) {
      expect(
        files.some((file) =>
          file.toLowerCase().includes(forbidden.toLowerCase()),
        ),
        `src/ contains a file matching "${forbidden}" — that belongs to a later commit`,
      ).toBe(false);
    }

    for (const file of files) {
      expect(
        file.endsWith(".css"),
        `${file} is a stylesheet — styles land in their own commit`,
      ).toBe(false);
      expect(
        file.endsWith(".tsx"),
        `${file} is a component — primitives land in their own commit`,
      ).toBe(false);
    }
  });
});
