import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const manifest: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

describe("root export — Validation Helpers (ADR 0002)", () => {
  it("resolves and imports as an ES module through the package's own name", async () => {
    // Same mechanism a real consumer's `import ... from "@zakhmban/ui"`
    // resolves through — Node's self-reference resolution via the
    // package.json `exports` map, not a relative path into dist/
    // (exports-contract.test.ts already checks the map itself).
    const entry = await import("@zakhmban/ui");
    expect(entry).toBeDefined();
  });

  it("exports exactly the two ADR 0002 capabilities, and nothing else", async () => {
    const entry = await import("@zakhmban/ui");
    expect(Object.keys(entry).sort()).toEqual(
      ["isValidIranianNationalId", "normalizeIranianMobile"].sort(),
    );
  });

  it("produces correct, real output when called through that same import", async () => {
    // Proves the *built* artifact behind the root entry behaves correctly,
    // not just the TypeScript source (tests/validation/*.test.ts covers
    // that half already).
    const { normalizeIranianMobile, isValidIranianNationalId } =
      await import("@zakhmban/ui");

    expect(normalizeIranianMobile("09123456789")).toBe("09123456789");
    expect(normalizeIranianMobile("not a phone number")).toBeNull();
    expect(isValidIranianNationalId("1274977411")).toBe(true);
    expect(isValidIranianNationalId("1234567890")).toBe(false);
  });

  it("declares no validation deep entry in package.json", () => {
    // ADR 0002 "Public Export Decision": root-only. A "./utils/validation"
    // (or any other validation subpath) here would be exactly the
    // unreviewed widening the exports allow-list exists to prevent.
    const exportsMap = manifest["exports"] as Record<string, unknown>;
    for (const subpath of Object.keys(exportsMap)) {
      expect(subpath.toLowerCase()).not.toContain("valid");
    }
  });

  it("does not leak the private digit-normalisation helper", async () => {
    // ADR 0002: digit-script conversion is an internal implementation
    // detail, never a public export, at either the root or a subpath.
    const entry: Record<string, unknown> = await import("@zakhmban/ui");
    expect(entry["toAsciiDigits"]).toBeUndefined();

    const serialisedExports = JSON.stringify(manifest["exports"] ?? {});
    expect(serialisedExports).not.toContain("digits");
  });
});
