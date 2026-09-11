import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const manifest: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

/**
 * Every devDependency must earn its place, because each one is a supply-chain
 * entry in the build path of an artifact four applications trust. Adding one is
 * a reviewed diff here.
 */
const ALLOWED_DEV_DEPENDENCIES = [
  "@eslint/js",
  "@types/node",
  "eslint",
  "prettier",
  "typescript",
  "typescript-eslint",
  "vitest",
];

describe("dependency policy", () => {
  it("has zero runtime dependencies", () => {
    // UI System Specification v0.2 §7 ("Dependency policy") and §7.2: zero
    // runtime dependencies. Every entry here would become a transitive
    // dependency that four applications cannot resolve independently.
    expect(manifest["dependencies"]).toEqual({});
  });

  it("declares no optional or bundled dependencies", () => {
    expect(manifest["optionalDependencies"]).toBeUndefined();
    expect(manifest["bundledDependencies"]).toBeUndefined();
    expect(manifest["bundleDependencies"]).toBeUndefined();
  });

  it("keeps the devDependency set to the reviewed list", () => {
    const dev = Object.keys(
      (manifest["devDependencies"] ?? {}) as Record<string, string>,
    );
    expect(dev.sort()).toEqual([...ALLOWED_DEV_DEPENDENCIES].sort());
  });

  it("pins every devDependency exactly", () => {
    // The committed artifact must be reproducible byte-for-byte. A caret on
    // `typescript` alone would make `pnpm verify:dist` unreliable in CI.
    const dev = (manifest["devDependencies"] ?? {}) as Record<string, string>;
    for (const [name, range] of Object.entries(dev)) {
      expect(range, `${name} is "${range}" — pin exactly, no range`).toMatch(
        /^\d+\.\d+\.\d+$/,
      );
    }
  });

  it("declares no install lifecycle script", () => {
    // Frozen Technical Architecture v1.1 §2.2: "dist/ is committed; no prepare
    // step at install." Any of these keys is install-time code execution in
    // four consumer repositories and inside their Docker builds.
    const scripts = (manifest["scripts"] ?? {}) as Record<string, string>;
    for (const forbidden of [
      "prepare",
      "prepack",
      "prepublish",
      "prepublishOnly",
      "postinstall",
      "preinstall",
      "install",
    ]) {
      expect(
        scripts[forbidden],
        `package.json declares a "${forbidden}" script — consumers must install a ready artifact and run nothing`,
      ).toBeUndefined();
    }
  });
});
