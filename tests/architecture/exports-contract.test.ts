import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const manifest: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

const exportsMap = manifest["exports"] as Record<string, unknown>;

/**
 * The complete public subpath list, updated only by the commit that ships the
 * files behind a new entry. Widening the package's public surface is always a
 * reviewed diff here, never a side effect of a refactor.
 *
 * `./utils/format` ships Jalali dates, Persian numerals, Toman formatting,
 * duration and phone display masking (`src/format/`, mapped to the public
 * subpath UI System Specification v0.2 §7 names for it).
 *
 * Token Foundation V1 adds the three subpaths v0.2 §7 reserves and ADR 0003
 * §13 declares, and no fourth:
 *
 *   ./styles                    the stylesheet entry point of v0.2 §2
 *   ./tokens                    the generated typed token object
 *   ./tokens/tailwind-preset    the generated Tailwind v4 @theme artifact
 *
 * In particular there is no `@zakhmban/ui/fonts`: the Owner Font Contract and
 * Delivery Ruling refused one, font binaries are internal assets referenced
 * by package CSS, and consumers must not deep-import a font file.
 */
const DECLARED_SUBPATHS = [
  ".",
  "./styles",
  "./tokens",
  "./tokens/tailwind-preset",
  "./utils/format",
  "./package.json",
];

describe("exports contract", () => {
  it("declares exactly the subpaths this commit ships", () => {
    expect(Object.keys(exportsMap).sort()).toEqual(
      [...DECLARED_SUBPATHS].sort(),
    );
  });

  it("declares no wildcard subpath", () => {
    // A "./*" entry would make every internal module a de-facto public API and
    // silently remove the package's ability to move a file. Spec §7: "no deep
    // imports … path stability inside the package is not guaranteed".
    for (const subpath of Object.keys(exportsMap)) {
      expect(subpath).not.toContain("*");
    }
  });

  it("resolves every declared export target on disk", () => {
    for (const [subpath, target] of Object.entries(exportsMap)) {
      const targets =
        typeof target === "string"
          ? [target]
          : Object.values(target as Record<string, string>);

      for (const relative of targets) {
        const absolute = fileURLToPath(
          new URL(`../../${relative}`, import.meta.url),
        );
        expect(
          existsSync(absolute),
          `exports["${subpath}"] points at ${relative}, which does not exist`,
        ).toBe(true);
      }
    }
  });

  it("routes the root entry through dist, with types resolved first", () => {
    const root = exportsMap["."] as Record<string, string>;
    // TypeScript resolves conditions in declaration order; "types" after
    // "default" is silently ignored and the consumer loses every type.
    expect(Object.keys(root)).toEqual(["types", "default"]);
    expect(root["types"]).toBe("./dist/index.d.ts");
    expect(root["default"]).toBe("./dist/index.js");
  });

  it("routes every conditional deep entry through dist, with types resolved first", () => {
    // The same "types" life first rule applies to every deep entry, not only
    // root — generalised here so a future entry inherits the guard rather
    // than needing its own copy of this test.
    for (const [subpath, target] of Object.entries(exportsMap)) {
      if (typeof target === "string") {
        continue; // "./package.json" — a plain file map, no conditions.
      }
      const conditions = target as Record<string, string>;
      expect(Object.keys(conditions), subpath).toEqual(["types", "default"]);
      expect(conditions["types"], subpath).toMatch(/\.d\.ts$/);
      expect(conditions["default"], subpath).toMatch(/\.js$/);
    }
  });

  it("declares the utils/format entry at the exact subpath the specification names", () => {
    const format = exportsMap["./utils/format"] as Record<string, string>;
    expect(format["types"]).toBe("./dist/format/index.d.ts");
    expect(format["default"]).toBe("./dist/format/index.js");
  });

  it("never exposes src, tests, scripts or an internal path", () => {
    const serialised = JSON.stringify(exportsMap);
    for (const forbidden of ["./src", "./tests", "./scripts", "internal"]) {
      expect(serialised).not.toContain(forbidden);
    }
  });
});
