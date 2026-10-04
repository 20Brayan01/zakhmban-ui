import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The generation half of ADR 0005 §2: the registry is derived, not authored,
 * and the notice is copied, not written. These assertions are about the
 * artifact's provenance; `tests/icons/icon.test.ts` covers behaviour.
 */
const root = fileURLToPath(new URL("../../", import.meta.url));
const registryPath = `${root}src/icons/registry.ts`;
const noticePath = `${root}src/icons/LUCIDE-LICENSE.txt`;
const upstreamNotice = `${root}node_modules/lucide/LICENSE`;

/** The version the generator is verified against, asserted in three places. */
const PINNED = "1.51.0";

describe("icon registry generation", () => {
  it("regenerates byte-identically from the pinned upstream", () => {
    // The parity check that makes a committed artifact trustworthy: a
    // hand-edit, or a different upstream version, fails here.
    const result = execFileSync(
      process.execPath,
      ["scripts/generate-icons.mjs", "--check"],
      { cwd: root, encoding: "utf8" },
    );
    expect(result).toContain("--check OK");
    expect(result).toContain(`lucide@${PINNED}`);
  });

  it("pins the upstream exactly, in the manifest and the generator", () => {
    const manifest = JSON.parse(
      readFileSync(`${root}package.json`, "utf8"),
    ) as { devDependencies: Record<string, string> };
    expect(manifest.devDependencies["lucide"]).toBe(PINNED);

    const generator = readFileSync(`${root}scripts/generate-icons.mjs`, "utf8");
    expect(generator).toContain(`const EXPECTED_VERSION = "${PINNED}"`);
  });

  it("reads canonical upstream names, never the deprecated aliases", () => {
    // At 1.51.0 `alert-circle` and `trash-2` have no file of their own and
    // survive only as alias exports of `circle-alert` and `trash`. Reading an
    // alias would work today and break on a bump, silently.
    const generator = readFileSync(`${root}scripts/generate-icons.mjs`, "utf8");
    expect(generator).toContain('upstream: "circle-alert"');
    expect(generator).toContain('upstream: "trash"');
    expect(generator).not.toContain('upstream: "alert-circle"');
    expect(generator).not.toContain('upstream: "trash-2"');
  });

  it("marks the registry as generated so nobody hand-edits it", () => {
    expect(readFileSync(registryPath, "utf8")).toContain(
      "GENERATED FILE — do not edit",
    );
  });

  it("imports no glyph library from src/", () => {
    // ADR 0005 §3: Lucide reaches src/ as data, never as an import, so Phase
    // 7's swap stays a regeneration. The lint rule says the same thing; this
    // says it where a lint override cannot reach.
    expect(readFileSync(registryPath, "utf8")).not.toMatch(
      /^\s*import\b[\s\S]*?["']lucide/m,
    );
    expect(readFileSync(`${root}src/icons/icon.tsx`, "utf8")).not.toContain(
      "lucide",
    );
  });
});

describe("glyph notice", () => {
  it("is byte-identical to the notice in the pinned package", () => {
    expect(readFileSync(noticePath).equals(readFileSync(upstreamNotice))).toBe(
      true,
    );
  });

  it("carries both the ISC grant and the Feather MIT attribution", () => {
    // One file covers the whole set: nine of the eleven glyphs are
    // Feather-derived and two are Lucide-only. Neither notice may be trimmed.
    const notice = readFileSync(noticePath, "utf8");
    expect(notice).toContain("ISC License");
    expect(notice).toContain("Lucide Icons and Contributors");
    expect(notice).toContain("derived from the Feather project");
    expect(notice).toContain("The MIT License (MIT)");
    expect(notice).toContain("Cole Bemis");
  });
});
