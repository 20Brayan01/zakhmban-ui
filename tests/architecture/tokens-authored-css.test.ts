import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The authored token CSS — ADR 0003 §1 to §10 and §18.
 *
 * These guards protect the *shape* of the source of truth: one light theme,
 * two layers joined by var(), every colour literal in one file, the internal
 * properties that exist only because three canonical prefixes collide with
 * Tailwind v4 namespaces, and the identifiers that must never appear.
 */
const tokensDir = fileURLToPath(new URL("../../src/tokens", import.meta.url));
const stylesDir = fileURLToPath(new URL("../../src/styles", import.meta.url));

/** ADR 0003 §2 names exactly these seven, and no eighth token file. */
const AUTHORED_FILES = [
  "colors.css",
  "typography.css",
  "spacing.css",
  "elevation.css",
  "motion.css",
  "fonts.css",
  "base.css",
];

/** ADR 0003 §10 — eight internal sources exist and no more. */
const INTERNAL_SOURCES = [
  "--_shadow-nav",
  "--_shadow-sheet",
  "--_shadow-modal",
  "--_font-ui",
  "--_radius-control",
  "--_radius-input",
  "--_radius-card",
  "--_radius-sheet",
];

const RAW_PALETTE_NAME = /^--(?:white|(?:green|blue|red|neutral)-\d+)$/;

function read(file: string): string {
  return readFileSync(`${tokensDir}/${file}`, "utf8");
}

function withoutComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

function declarations(source: string): [string, string][] {
  const body = withoutComments(source);
  return [...body.matchAll(/(--[a-z0-9-_]+)\s*:\s*([^;]+);/g)].map((match) => [
    match[1] as string,
    (match[2] as string).trim().replace(/\s+/g, " "),
  ]);
}

const authored = new Map<string, [string, string][]>(
  AUTHORED_FILES.map((file) => [file, declarations(read(file))]),
);

const everyDeclaration = [...authored.entries()].flatMap(([file, entries]) =>
  entries.map(([name, value]) => ({ file, name, value })),
);

describe("authored token CSS", () => {
  it("contains exactly the seven files ADR 0003 §2 names, plus the two generated artifacts", () => {
    const present = readdirSync(tokensDir).sort();
    expect(present).toEqual(
      [...AUTHORED_FILES, "index.ts", "tailwind-preset.css"].sort(),
    );
  });

  it("keeps the style entry separate — it is not an eighth token file", () => {
    expect(readdirSync(stylesDir)).toEqual(["index.css"]);
    const entry = readFileSync(`${stylesDir}/index.css`, "utf8");
    const imports = [...entry.matchAll(/@import\s+"([^"]+)"/g)].map(
      (match) => match[1],
    );
    expect(imports).toEqual(["../tokens/base.css"]);
  });

  it("aggregates the other six files in base.css, in the ADR's order", () => {
    const imports = [...read("base.css").matchAll(/@import\s+"([^"]+)"/g)].map(
      (match) => match[1],
    );
    expect(imports).toEqual([
      "./colors.css",
      "./typography.css",
      "./spacing.css",
      "./elevation.css",
      "./motion.css",
      "./fonts.css",
    ]);
  });

  it("declares every token once, on :root, in a single light theme", () => {
    // ADR 0003 §3: no prefers-color-scheme block, no [data-theme] selector,
    // no .dark class, no second declaration of any token anywhere.
    const seen = new Set<string>();
    for (const { file, name } of everyDeclaration) {
      expect(seen.has(name), `${name} is declared twice (${file})`).toBe(false);
      seen.add(name);
    }

    for (const file of AUTHORED_FILES) {
      const body = withoutComments(read(file));
      expect(body.match(/:root/g) ?? [], file).toHaveLength(1);
      for (const forbidden of [
        "prefers-color-scheme",
        "[data-theme",
        ".dark",
        "@media",
      ]) {
        expect(body.includes(forbidden), `${file} contains ${forbidden}`).toBe(
          false,
        );
      }
    }
  });

  it("keeps every colour literal in colors.css", () => {
    for (const { file, name, value } of everyDeclaration) {
      if (file === "colors.css") {
        continue;
      }
      expect(/#[0-9a-fA-F]{3,8}\b/.test(value), `${name} in ${file}`).toBe(
        false,
      );
    }
  });

  it("holds exactly the thirty raw palette entries, each an opaque literal", () => {
    const palette = everyDeclaration.filter((entry) =>
      RAW_PALETTE_NAME.test(entry.name),
    );
    expect(palette).toHaveLength(30);
    for (const { name, file, value } of palette) {
      expect(file, name).toBe("colors.css");
      expect(value, name).toMatch(/^#[0-9a-f]{6}$/);
    }
    expect(palette.filter((e) => e.name.startsWith("--green-"))).toHaveLength(
      9,
    );
    expect(palette.filter((e) => e.name.startsWith("--blue-"))).toHaveLength(8);
    expect(palette.filter((e) => e.name.startsWith("--red-"))).toHaveLength(5);
  });

  it("gives every semantic colour a var() reference, never a restated hex", () => {
    // ADR 0003 §4 and Decision 1 constraint 6. The one exception is the alpha
    // derivative below, which rgba() cannot express as a reference.
    for (const [name, value] of authored.get("colors.css") ?? []) {
      if (RAW_PALETTE_NAME.test(name)) {
        continue;
      }
      if (name === "--overlay") {
        continue;
      }
      expect(value, `${name} must reference a palette entry`).toMatch(
        /^var\(--[a-z0-9-]+\)$/,
      );
    }
  });

  it("derives every alpha value from --blue-900's rgb triple", () => {
    // ADR 0003 §4 assertion 5: the literal rgba() carries a comment naming
    // its opaque source; this is the test that makes the derivation binding.
    const palette = new Map(authored.get("colors.css"));
    expect(palette.get("--blue-900")).toBe("#002a5e");
    const triple = "0, 42, 94";

    const alphas = everyDeclaration.filter((entry) =>
      entry.value.includes("rgba("),
    );
    expect(alphas.length).toBe(4);
    for (const { name, value } of alphas) {
      expect(value, `${name} is not derived from --blue-900`).toContain(
        `rgba(${triple},`,
      );
    }
  });

  it("declares exactly the eight --_ internal sources ADR 0003 §10 allows", () => {
    const sources = everyDeclaration
      .filter((entry) => entry.name.startsWith("--_"))
      .map((entry) => entry.name);
    expect(sources.sort()).toEqual([...INTERNAL_SOURCES].sort());
  });

  it("aliases each colliding public property onto its internal source", () => {
    const all = new Map(everyDeclaration.map((e) => [e.name, e.value]));
    for (const family of ["shadow-nav", "shadow-sheet", "shadow-modal"]) {
      expect(all.get(`--${family}`)).toBe(`var(--_${family})`);
    }
    expect(all.get("--font-ui")).toBe("var(--_font-ui)");
    for (const role of ["control", "input", "card", "sheet"]) {
      expect(all.get(`--radius-${role}`)).toBe(`var(--_radius-${role})`);
    }
    // One literal, two roles — v0.2 §2.3's "14 input and button".
    expect(all.get("--radius-button")).toBe("var(--radius-input)");
  });

  it("contains no circular custom-property reference", () => {
    const all = new Map(everyDeclaration.map((e) => [e.name, e.value]));
    for (const name of all.keys()) {
      const seen = new Set<string>([name]);
      let value = all.get(name) as string;
      for (;;) {
        const match = /^var\((--[a-z0-9-_]+)\)$/.exec(value);
        if (match === null) {
          break;
        }
        const next = match[1] as string;
        expect(seen.has(next), `circular reference reaching ${next}`).toBe(
          false,
        );
        seen.add(next);
        expect(all.has(next), `${next} is referenced but never declared`).toBe(
          true,
        );
        value = all.get(next) as string;
      }
    }
  });

  it("carries the eight-step spacing scale and nothing outside it", () => {
    const spacing = authored.get("spacing.css") ?? [];
    expect(spacing.map(([name]) => name)).toEqual([
      "--space-1",
      "--space-2",
      "--space-3",
      "--space-4",
      "--space-5",
      "--space-6",
      "--space-7",
      "--space-8",
    ]);
    expect(spacing.map(([, value]) => value)).toEqual([
      "4px",
      "8px",
      "12px",
      "16px",
      "20px",
      "24px",
      "32px",
      "40px",
    ]);
    for (const { name } of everyDeclaration) {
      if (!name.startsWith("--space")) {
        continue;
      }
      expect(name, `${name} is outside the closed scale`).toMatch(
        /^--space-[1-8]$/,
      );
    }
  });

  it("represents the focus indicator as exactly four scalars", () => {
    const names = everyDeclaration
      .map((entry) => entry.name)
      .filter((name) => name.includes("focus"));
    expect(names.sort()).toEqual([
      "--focus-indicator-inner-color",
      "--focus-indicator-inner-width",
      "--focus-indicator-outer-color",
      "--focus-indicator-outer-width",
    ]);
  });

  it("carries the eight type steps of v0.2 §2.2 and no ninth", () => {
    const steps = (authored.get("typography.css") ?? [])
      .map(([name]) => name)
      .filter((name) => /^--text-[a-z-]+$/.test(name))
      .filter((name) => !/-(size|line-height|weight)$/.test(name));
    expect(steps.sort()).toEqual([
      "--text-body",
      "--text-button",
      "--text-caption",
      "--text-card-title",
      "--text-display",
      "--text-label",
      "--text-page-title",
      "--text-section-title",
    ]);
  });

  it("carries the three stacking integers, in order", () => {
    const all = new Map(everyDeclaration.map((e) => [e.name, e.value]));
    expect([
      all.get("--z-chrome"),
      all.get("--z-scrim"),
      all.get("--z-dialog"),
    ]).toEqual(["10", "20", "30"]);
    // No base or zero role — Decision 15.
    const stacking = everyDeclaration.filter((e) => e.name.startsWith("--z-"));
    expect(stacking).toHaveLength(3);
  });

  it("keeps --radius-checkbox internal and --radius-pill unwritten", () => {
    const all = new Map(everyDeclaration.map((e) => [e.name, e.value]));
    expect(all.get("--radius-checkbox")).toBe("6px");
    expect(all.has("--radius-pill")).toBe(false);
    // The kit's 999px is evidence, not authority, and appears nowhere as a
    // value. It is named in an authored comment on purpose, so that a later
    // reader does not re-derive it; the guard is on the declarations.
    for (const { name, value } of everyDeclaration) {
      expect(value, `${name} carries the unratified pill literal`).not.toBe(
        "999px",
      );
    }
    expect(all.has("--radius-pill")).toBe(false);
  });

  it("exposes no 40px control geometry while the Button sm conflict is open", () => {
    // ADR 0003 gap 3. --space-8 is 40px and is a spacing step, not geometry.
    const geometry = (authored.get("base.css") ?? []).filter(
      ([name]) => !name.startsWith("--radius") && !name.startsWith("--z-"),
    );
    for (const [name, value] of geometry) {
      expect(
        value,
        `${name} publishes the open 40px small-control value`,
      ).not.toBe("40px");
    }
  });

  it("declares none of the retired, deferred or unnamed identifiers", () => {
    const source = withoutComments(AUTHORED_FILES.map(read).join("\n"));
    for (const absent of [
      "--green-hover",
      "--green-press",
      "--blue-hover",
      "--blue-press",
      "--red-hover",
      "--red-press",
      "--text-muted",
      "--focus-ring",
      "--focus-ring-green",
      "--focus-ring-inner",
      "--focus-ring-outer",
      "--focus-ring-width",
      "--font-numeric",
      "--font-sans",
      "--shadow-none",
      "--shadow-xs",
      "--shadow-sm",
      "--shadow-md",
    ]) {
      expect(
        source.includes(`${absent}:`),
        `${absent} is declared and must not be`,
      ).toBe(false);
    }
  });

  it("introduces no keyframes and no dark-theme mechanism", () => {
    // Comment-stripped: the authored files name these constructs in prose,
    // recording that each is deliberately absent. The guard is on the CSS.
    const source = withoutComments(
      [
        ...AUTHORED_FILES.map(read),
        readFileSync(`${stylesDir}/index.css`, "utf8"),
        readFileSync(`${tokensDir}/tailwind-preset.css`, "utf8"),
      ].join("\n"),
    );
    for (const forbidden of [
      "@keyframes",
      "--animate-",
      "prefers-color-scheme",
      "[data-theme",
      "@font-face",
    ]) {
      expect(source.includes(forbidden), `${forbidden} is present`).toBe(false);
    }
  });
});
