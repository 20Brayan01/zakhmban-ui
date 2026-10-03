import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * IA-5 — the mechanical Raw Palette usage guard.
 *
 * The Incidental Accessibility Findings Ruling of 2026-09-18 requires that
 * "a mechanical Raw Palette usage guard must be introduced with the first
 * component implementation commit" and records that it "is not implemented
 * now". The Icon Foundation is that commit, and this is that guard.
 *
 * What it forbids: a reference to one of the thirty internal raw palette
 * entries from anywhere in src/ except the one file that declares them.
 * ADR 0003 §5 makes the raw palette internal — "components and consuming
 * applications never reference it" — and Decision 1 constraint 2 is the
 * value-side rule behind that.
 *
 * What it deliberately does NOT flag, because the authorization requires the
 * scope to be precise rather than loud:
 *
 *   - `src/tokens/colors.css`, the single file where the raw palette is
 *     declared and where the semantic layer resolves against it. Flagging it
 *     would make the approved token definition a defect;
 *   - CSS and TypeScript comments, which are documentation. `elevation.css`
 *     explains its rgba triple by naming `--blue-900` in prose, and that
 *     sentence is why a reviewer can check the value;
 *   - the generated artifacts, which are derived from the authored CSS and
 *     already guarded by `generate-tokens.mjs --check`. They are scanned all
 *     the same, because a generated file that leaked a palette entry would be
 *     a real defect — the generator asserts it cannot;
 *   - semantic names that merely begin with a family word. `--neutral-status-fg`
 *     is a public role and must not collide with `--neutral-25`.
 *
 * The pattern is the one `generate-tokens.mjs` classifies by, kept in sync by
 * being written the same way: a family word plus a numeric step, or `--white`.
 */
const srcDir = fileURLToPath(new URL("../../src", import.meta.url));

/** `--white`, or a `green`/`blue`/`red`/`neutral` family entry with a step. */
const RAW_PALETTE_REFERENCE = /--(?:white|(?:green|blue|red|neutral)-\d+)\b/g;

/** The one file allowed to name them: where they are declared. */
const DECLARATION_FILE = "tokens/colors.css";

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = `${dir}/${entry.name}`;
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/**
 * Strip block comments before scanning. Both CSS and TypeScript use the same
 * delimiters here, and every comment in src/ is a block comment; `//` line
 * comments are stripped too so a TypeScript note can name a palette entry.
 */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

describe("IA-5 · raw palette usage", () => {
  it("is referenced by no file but the one that declares it", () => {
    const offences: string[] = [];

    for (const file of walk(srcDir)) {
      if (!/\.(ts|tsx|css)$/.test(file)) {
        continue;
      }
      const relative = file.slice(srcDir.length + 1);
      if (relative === DECLARATION_FILE) {
        continue;
      }

      const matches = stripComments(readFileSync(file, "utf8")).match(
        RAW_PALETTE_REFERENCE,
      );
      if (matches !== null) {
        offences.push(`src/${relative}: ${[...new Set(matches)].join(", ")}`);
      }
    }

    expect(
      offences,
      "the raw palette is package-internal (ADR 0003 §5). Reference the " +
        "semantic role instead; a value with no semantic role is a missing " +
        "token, which is a pull request against this package.",
    ).toEqual([]);
  });

  it("does not mistake a semantic role for a palette entry", () => {
    // The guard above is only useful if it is precise. `--neutral-status-fg`
    // and `--text-primary` are public roles that must pass; `--neutral-600`
    // and `--white` are palette entries that must not.
    for (const allowed of [
      "color: var(--neutral-status-fg);",
      "color: var(--text-primary);",
      "background: var(--surface-subtle);",
      "border-color: var(--border-strong);",
    ]) {
      expect(RAW_PALETTE_REFERENCE.test(allowed), allowed).toBe(false);
      RAW_PALETTE_REFERENCE.lastIndex = 0;
    }

    for (const forbidden of [
      "color: var(--neutral-600);",
      "color: var(--white);",
      "background: var(--green-500);",
      "border-color: var(--blue-900);",
    ]) {
      expect(RAW_PALETTE_REFERENCE.test(forbidden), forbidden).toBe(true);
      RAW_PALETTE_REFERENCE.lastIndex = 0;
    }
  });

  it("still sees a palette entry hidden behind a comment", () => {
    // Comment stripping must not become a way to smuggle a declaration past
    // the scan: only the comment goes, never the code after it.
    const source = "/* --blue-900 explains this */\ncolor: var(--blue-900);";
    expect(stripComments(source)).toMatch(RAW_PALETTE_REFERENCE);
  });
});
