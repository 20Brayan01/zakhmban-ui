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
  // Icon Foundation (ADR 0005). `lucide` is the generator's input and is read
  // at build time only; `react`, `react-dom` and their types exist so the
  // first React-bearing module can typecheck and render in tests. None is a
  // runtime dependency, and the assertion above keeps it that way.
  "@types/react",
  "@types/react-dom",
  "lucide",
  "react",
  "react-dom",
];

/**
 * The peer contract. UI System Specification v0.2 §7 and §7.2 state it
 * unconditionally — "React and react-dom are peers" — and the Icon Foundation
 * Implementation Authorization landed it with the first React-bearing module.
 * A peer is not a runtime dependency: `dependencies` stays `{}` above.
 *
 * The range admits every React 19.2 and later 19.x, which is what the
 * consumers run (`zakhmban-therapists` pins 19.2.8), and excludes a future
 * major that could change the ref-as-prop contract this component relies on.
 */
const EXPECTED_PEERS = {
  react: "^19.2.0",
  "react-dom": "^19.2.0",
};

describe("dependency policy", () => {
  it("has zero runtime dependencies", () => {
    // UI System Specification v0.2 §7 ("Dependency policy") and §7.2: zero
    // runtime dependencies. Every entry here would become a transitive
    // dependency that four applications cannot resolve independently.
    expect(manifest["dependencies"]).toEqual({});
  });

  it("declares react and react-dom as peers, and nothing else", () => {
    expect(manifest["peerDependencies"]).toEqual(EXPECTED_PEERS);
  });

  it("keeps the glyph source out of every runtime surface", () => {
    // ADR 0005 §3: Lucide is a build-time input. It must never reach
    // `dependencies` or `peerDependencies`, where it would become something
    // four applications resolve, and Phase 7's wholesale swap would stop
    // being a regeneration and become a breaking dependency change.
    const runtime = {
      ...((manifest["dependencies"] ?? {}) as Record<string, string>),
      ...((manifest["peerDependencies"] ?? {}) as Record<string, string>),
    };
    for (const name of Object.keys(runtime)) {
      expect(name.startsWith("lucide"), `${name} is a runtime entry`).toBe(
        false,
      );
    }
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
