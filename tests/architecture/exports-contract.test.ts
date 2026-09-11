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
 * Reserved by UI System Specification v0.2 §7 ("Exports") and not yet declared,
 * because an export whose target does not exist is a broken package:
 *
 *   ./styles           token CSS and static styles
 *   ./tokens           generated typed token object
 *   ./tokens/tailwind-preset
 *   ./utils/format     Jalali, Persian numerals, Toman, duration, phone masking
 */
const DECLARED_SUBPATHS = [".", "./package.json"];

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

  it("never exposes src, tests, scripts or an internal path", () => {
    const serialised = JSON.stringify(exportsMap);
    for (const forbidden of ["./src", "./tests", "./scripts", "internal"]) {
      expect(serialised).not.toContain(forbidden);
    }
  });
});
