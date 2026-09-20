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

  it("exports exactly the Validation Helpers capability, and nothing else", async () => {
    // ADR 0002 (docs/adr/0002-validation-helpers-contract.md): the root
    // barrel widens only by a reviewed diff. This is that diff's guard for
    // the Validation Helpers commit — exactly these two names, no default
    // export, and no fifth name arriving unnoticed alongside them.
    const entry = await import("../../dist/index.js");
    expect(Object.keys(entry).sort()).toEqual(
      ["isValidIranianNationalId", "normalizeIranianMobile"].sort(),
    );

    const source = readFileSync(`${srcDir}/index.ts`, "utf8");
    expect(source).not.toMatch(/^export default\b/m);
  });

  it("ships no component or icon at this commit", () => {
    // The scope boundary, enforced rather than trusted. Each of these arrives
    // in its own commit with its own tests; none may ride along in a
    // foundation change.
    //
    // "tokens" and "tailwind" left this list with Token Foundation V1, which
    // ships src/tokens/ and the generated Tailwind artifact (ADR 0003 §18).
    const files = walk(srcDir);

    for (const forbidden of [
      "Button",
      "TextField",
      "OtpInput",
      "BottomSheet",
      "Icon",
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
        file.endsWith(".tsx"),
        `${file} is a component — primitives land in their own commit`,
      ).toBe(false);
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
