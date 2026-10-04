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

  it("exports exactly the Validation Helpers, Icon and BottomSheet capabilities, and nothing else", async () => {
    // ADR 0002 and ADR 0005: the root barrel widens only by a reviewed diff.
    // `Icon` joined it with the Icon Foundation; `IconName` and `IconProps`
    // are types and so have no runtime key here. No default export, and no
    // further name arriving unnoticed alongside them.
    const entry = await import("../../dist/index.js");
    expect(Object.keys(entry).sort()).toEqual(
      [
        "BottomSheet",
        "Icon",
        "isValidIranianNationalId",
        "normalizeIranianMobile",
      ].sort(),
    );

    const source = readFileSync(`${srcDir}/index.ts`, "utf8");
    expect(source).not.toMatch(/^export default\b/m);
  });

  it("ships no primitive at this commit", () => {
    // The scope boundary, enforced rather than trusted. Each of these arrives
    // in its own commit with its own tests; none may ride along in a
    // foundation change.
    //
    // "tokens" and "tailwind" left this list with Token Foundation V1, which
    // ships src/tokens/ and the generated Tailwind artifact (ADR 0003 §18).
    // "Icon" left it with the Icon Foundation, which the Icon Foundation
    // Implementation Authorization of 2026-10-03 permits. "BottomSheet" left
    // it with the BottomSheet Implementation Authorization of 2026-10-04.
    // The four remaining frozen primitives stay, each still owed its own
    // authorization before it may appear.
    const files = walk(srcDir);

    for (const forbidden of ["Button", "TextField", "Select", "OtpInput"]) {
      expect(
        files.some((file) =>
          file.toLowerCase().includes(forbidden.toLowerCase()),
        ),
        `src/ contains a file matching "${forbidden}" — that belongs to a later commit`,
      ).toBe(false);
    }

    for (const file of files) {
      if (!file.endsWith(".tsx")) {
        continue;
      }
      expect(
        file.startsWith(`${srcDir}/icons/`) ||
          file.startsWith(`${srcDir}/primitives/`),
        `${file} is a component outside src/icons/ and src/primitives/ — each primitive lands in its own authorized commit`,
      ).toBe(true);
    }
  });

  it("imports no @zakhmban specifier anywhere under src/", () => {
    // The directional rule of UI System Specification v0.2 §7.3, enforced by
    // a guard rather than only by lint: this package depends on no
    // application and no sibling package, and it never reaches for itself
    // through its own published name either. A lint override scoped to test
    // fixtures cannot reach this assertion.
    for (const file of walk(srcDir)) {
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) {
        continue;
      }
      const specifiers = [
        ...readFileSync(file, "utf8").matchAll(
          /(?:from|import|require)\s*\(?\s*["']([^"']+)["']/g,
        ),
      ].map((match) => match[1] as string);
      for (const specifier of specifiers) {
        expect(
          specifier.startsWith("@zakhmban/"),
          `${file} imports ${specifier}`,
        ).toBe(false);
      }
    }
  });

  it("admits only approved non-TypeScript assets, at exactly two addresses", () => {
    // Styles v0.2.0 brought the first binary into src/; the Icon Foundation
    // brings the second asset, the vendored Lucide notice. Package payload a
    // consumer installs verbatim, so the inventory is an allow-list rather
    // than a convention: the font binary and its licence in the directory
    // ADR 0003 §16 names, and the glyph notice beside the registry it covers
    // (ADR 0005 §3). An asset anywhere else, or of any other type, is
    // something nobody reviewed reaching four applications.
    const APPROVED_ASSETS = [
      /^styles\/fonts\/[^/]+\.(woff2|txt)$/,
      /^icons\/LUCIDE-LICENSE\.txt$/,
    ];

    for (const file of walk(srcDir)) {
      if (/\.(ts|tsx|css)$/.test(file)) {
        continue;
      }
      const relative = file.slice(srcDir.length + 1);
      expect(
        APPROVED_ASSETS.some((pattern) => pattern.test(relative)),
        `src/${relative} is not an approved package asset`,
      ).toBe(true);
    }
  });

  it("keeps every stylesheet under src/tokens/ or src/styles/", () => {
    // ADR 0003 §18: the blanket .css prohibition is replaced by a placement
    // rule. Token CSS is authored under src/tokens/; the public stylesheet
    // entry and, later, static styles and font assets live under src/styles/.
    // A stylesheet anywhere else — beside a component, say — is the start of
    // a second styling system.
    for (const file of walk(srcDir)) {
      if (!file.endsWith(".css")) {
        continue;
      }
      const relative = file.slice(srcDir.length + 1);
      expect(
        relative.startsWith("tokens/") || relative.startsWith("styles/"),
        `src/${relative} is a stylesheet outside src/tokens/ and src/styles/`,
      ).toBe(true);
    }
  });
});
