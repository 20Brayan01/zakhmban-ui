import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const manifest: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

describe("package metadata", () => {
  it("is a well-formed manifest", () => {
    expect(typeof manifest).toBe("object");
    expect(manifest).not.toBeNull();
  });

  it("is named @zakhmban/ui", () => {
    // Frozen Technical Architecture v1.1 §2, repository #3 of 8. Consumers
    // import this exact specifier; the scope also maps directly onto a package
    // registry should the registry migration ever be approved by ADR.
    expect(manifest["name"]).toBe("@zakhmban/ui");
  });

  it("carries a semver version", () => {
    expect(manifest["version"]).toMatch(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);
  });

  it("is private, so it can never be published to a public registry", () => {
    // Consumption is by exact git tag (frozen §2.2), never by registry. A
    // failed `pnpm publish` is the intended outcome, not an inconvenience.
    expect(manifest["private"]).toBe(true);
  });

  it("declares the repository it is consumed from", () => {
    const repository = manifest["repository"] as { url?: string } | undefined;
    expect(repository?.url).toContain("zakhmban-ui");
  });

  it("pins the toolchain the committed artifact is built with", () => {
    // dist/ is committed. A developer on a different Node or pnpm can produce a
    // different artifact, so the toolchain is part of the contract and .npmrc
    // sets engine-strict=true to enforce it.
    expect(manifest["packageManager"]).toBe("pnpm@9.15.9");

    const engines = manifest["engines"] as Record<string, string> | undefined;
    expect(engines?.["node"]).toBe(">=22 <23");
    expect(engines?.["pnpm"]).toBe(">=9.15.9 <10");
  });

  it("marks only CSS as side-effectful, so the barrel stays tree-shakeable", () => {
    expect(manifest["sideEffects"]).toEqual(["**/*.css"]);
  });
});
