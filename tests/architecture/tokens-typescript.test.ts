import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The typed token artifact — ADR 0003 §11.
 *
 * The approved public token set is written out here in full, independently of
 * the generator that emits it. A guard that read the list from the artifact it
 * guards would pass for any artifact. Every identifier and every value below
 * traces to the Scoped Token Foundation V1 Owner Sign-off and the decisions it
 * incorporates, as ADR 0003 §5 and §7 record them.
 *
 * Hex literals and numeric forms appear in the repository's Prettier-canonical
 * spelling — lowercase hex, a leading zero on a decimal, spaced function
 * arguments. Prettier owns src/, and ADR 0003 §18 assertion 15 makes passing
 * that gate a requirement of this commit, so the authored CSS carries the
 * canonical spelling and the generator propagates it verbatim rather than
 * transforming it. No approved value is changed by that: #ffffff is #FFFFFF
 * and 0.98 is .98.
 */
const APPROVED_PUBLIC_TOKENS: Record<string, string> = {
  // --- Colour · 48 ------------------------------------------------------

  // Raw Brand Identity — v0.2 §2.1, unchanged by Decision 12.
  "--brand-green": "#3c9220",
  "--brand-green-dark": "#0c7912",
  "--brand-green-soft": "#f0f8e7",
  "--brand-blue": "#0383ce",
  "--brand-blue-dark": "#002a5e",
  "--brand-blue-soft": "#eaf5fc",
  "--brand-red": "#ec1417",
  "--brand-red-dark": "#c80303",
  "--brand-red-soft": "#fdebec",

  // Status — Decision 2, including the ratified INFO asymmetry.
  "--success": "#3c9220",
  "--success-fg": "#0c7912",
  "--success-bg": "#f0f8e7",
  "--info": "#0383ce",
  "--info-fg": "#0062ac",
  "--info-bg": "#eaf5fc",
  "--danger": "#ec1417",
  "--danger-fg": "#c80303",
  "--danger-bg": "#fdebec",

  // Fourth tone — the Owner Contrast Ruling's remap to --neutral-600.
  "--neutral-status-fg": "#667085",
  "--neutral-status-bg": "#f7f9f5",

  // Ink — --text-muted is retired.
  "--text-primary": "#002a5e",
  "--text-secondary": "#667085",

  // Surfaces — Decision 14.
  "--background": "#ffffff",
  "--surface": "#ffffff",
  "--surface-subtle": "#f7f9f5",

  "--border": "#e2e6dd",
  "--border-strong": "#a0a79c",
  "--divider": "#edf0ea",

  "--disabled-bg": "#f1f3ef",
  "--disabled-text": "#a0a79c",
  "--disabled-border": "#e2e6dd",

  // Semantic Action Fill — the nine state-aligned identities.
  "--action-green-rest": "#347f1b",
  "--action-green-hover": "#0c7912",
  "--action-green-press": "#026e1e",
  "--action-blue-rest": "#0273b6",
  "--action-blue-hover": "#0062ac",
  "--action-blue-press": "#045398",
  "--action-red-rest": "#d51013",
  "--action-red-hover": "#c80303",
  "--action-red-press": "#b90304",

  // On-brand foregrounds — Decision 12a and 12b, kept separate.
  "--on-brand-text": "#ffffff",
  "--on-brand-icon": "#ffffff",

  // Inline text links — Decision 13.
  "--link": "#016fbb",
  "--link-hover": "#0062ac",
  "--link-press": "#01356f",

  // Focus indicator colours — Decision 3b.
  "--focus-indicator-inner-color": "#ffffff",
  "--focus-indicator-outer-color": "#002a5e",

  "--overlay": "rgba(0, 42, 94, 0.4)",

  // --- Typography · 36 --------------------------------------------------

  "--text-display": "32px",
  "--text-display-size": "32px",
  "--text-display-line-height": "1.28",
  "--text-display-weight": "700",
  "--text-page-title": "22px",
  "--text-page-title-size": "22px",
  "--text-page-title-line-height": "1.36",
  "--text-page-title-weight": "600",
  "--text-section-title": "19px",
  "--text-section-title-size": "19px",
  "--text-section-title-line-height": "1.42",
  "--text-section-title-weight": "600",
  "--text-card-title": "16px",
  "--text-card-title-size": "16px",
  "--text-card-title-line-height": "1.5",
  "--text-card-title-weight": "600",
  "--text-body": "15px",
  "--text-body-size": "15px",
  "--text-body-line-height": "1.68",
  "--text-body-weight": "400",
  "--text-label": "13px",
  "--text-label-size": "13px",
  "--text-label-line-height": "1.5",
  "--text-label-weight": "500",
  "--text-caption": "12px",
  "--text-caption-size": "12px",
  "--text-caption-line-height": "1.5",
  "--text-caption-weight": "400",
  "--text-button": "15px",
  "--text-button-size": "15px",
  "--text-button-line-height": "1",
  "--text-button-weight": "600",
  "--weight-regular": "400",
  "--weight-medium": "500",
  "--weight-semibold": "600",
  "--weight-bold": "700",

  // --- Spacing · 8 ------------------------------------------------------

  "--space-1": "4px",
  "--space-2": "8px",
  "--space-3": "12px",
  "--space-4": "16px",
  "--space-5": "20px",
  "--space-6": "24px",
  "--space-7": "32px",
  "--space-8": "40px",

  // --- Radius · 5 -------------------------------------------------------

  "--radius-control": "12px",
  "--radius-input": "14px",
  "--radius-button": "14px",
  "--radius-card": "16px",
  "--radius-sheet": "24px",

  // --- Elevation · 3 ----------------------------------------------------

  "--shadow-nav": "0 -2px 12px rgba(0, 42, 94, 0.06)",
  "--shadow-sheet": "0 -12px 40px rgba(0, 42, 94, 0.14)",
  "--shadow-modal": "0 16px 48px rgba(0, 42, 94, 0.18)",

  // --- Motion · 6 -------------------------------------------------------

  "--duration-fast": "120ms",
  "--duration-base": "200ms",
  "--duration-slow": "320ms",
  "--duration-shimmer": "1400ms",
  "--easing-standard": "cubic-bezier(0.2, 0, 0, 1)",
  "--press-scale": "0.98",

  // --- Font · 1 ---------------------------------------------------------

  "--font-ui": '"Vazirmatn", "Segoe UI", Tahoma, Arial, sans-serif',

  // --- Geometry · 8 -----------------------------------------------------

  "--control-min-target": "44px",
  "--control-height-input": "48px",
  "--control-height-button": "52px",
  "--app-bar-height": "56px",
  "--bottom-nav-height": "64px",
  "--bottom-nav-safe-area": "20px",
  "--focus-indicator-inner-width": "2px",
  "--focus-indicator-outer-width": "2px",

  // --- Layering · 3 -----------------------------------------------------

  "--z-chrome": "10",
  "--z-scrim": "20",
  "--z-dialog": "30",
};

/** Excluded by name, each for its own recorded reason. */
const MUST_BE_ABSENT = [
  // The six retired Decision 3a identifiers.
  "--green-hover",
  "--green-press",
  "--blue-hover",
  "--blue-press",
  "--red-hover",
  "--red-press",
  // Retired or superseded.
  "--text-muted",
  "--focus-ring",
  "--focus-ring-green",
  "--focus-ring-inner",
  "--focus-ring-outer",
  "--focus-ring-width",
  "--font-numeric",
  "--font-sans",
  // Deferred elevation.
  "--shadow-none",
  "--shadow-xs",
  "--shadow-sm",
  "--shadow-md",
  // No canonical literal exists.
  "--radius-pill",
  // Package-internal.
  "--radius-checkbox",
];

const distSource = readFileSync(
  fileURLToPath(new URL("../../dist/tokens/index.js", import.meta.url)),
  "utf8",
);
const generatedSource = readFileSync(
  fileURLToPath(new URL("../../src/tokens/index.ts", import.meta.url)),
  "utf8",
);
const declaration = readFileSync(
  fileURLToPath(new URL("../../dist/tokens/index.d.ts", import.meta.url)),
  "utf8",
);

describe("typed token artifact — ADR 0003 §11", () => {
  it("exports exactly one runtime value, named tokens", async () => {
    const module_ = await import("@zakhmban/ui/tokens");
    expect(Object.keys(module_)).toEqual(["tokens"]);
  });

  it("has no default export", async () => {
    const module_: Record<string, unknown> =
      await import("@zakhmban/ui/tokens");
    expect(module_["default"]).toBeUndefined();
    expect(generatedSource).not.toMatch(/^export default\b/m);
    expect(declaration).not.toMatch(/^export default\b/m);
  });

  it("declares exactly the three ADR 0003 type exports, each derived", () => {
    expect(declaration).toContain("declare const tokens:");
    expect(declaration).toContain("type Tokens = typeof tokens");
    expect(declaration).toContain("type TokenName = keyof Tokens");
    expect(declaration).toContain("type TokenValue = Tokens[TokenName]");

    const exportedTypes = [
      ...declaration.matchAll(/^export type (\w+)\b/gm),
    ].map((match) => match[1]);
    expect([...new Set(exportedTypes)].sort()).toEqual([
      "TokenName",
      "TokenValue",
      "Tokens",
    ]);
  });

  it("exposes no helper function and no per-token runtime export", () => {
    const code = generatedSource.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(code).not.toMatch(/\bfunction\b/);
    expect(code).not.toMatch(/=>/);
    // Exactly one `export const`, the object itself.
    expect(generatedSource.match(/^export const /gm)).toHaveLength(1);
  });

  it("is immutable at compile time only — as const, never Object.freeze", () => {
    // Comment-stripped: the generated header names Object.freeze in prose,
    // recording that it is deliberately absent. The guard is on the code.
    const code = (text: string) => text.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(generatedSource).toContain("} as const;");
    expect(code(generatedSource)).not.toContain("Object.freeze");
    expect(code(distSource)).not.toContain("Object.freeze");
  });

  it("holds exactly 118 keys", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    expect(Object.keys(tokens)).toHaveLength(118);
    expect(Object.keys(APPROVED_PUBLIC_TOKENS)).toHaveLength(118);
  });

  it("keys every entry with the canonical CSS identifier, leading -- included", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    for (const key of Object.keys(tokens)) {
      expect(key.startsWith("--"), `${key} does not begin with "--"`).toBe(
        true,
      );
      expect(key, `${key} is camel-cased`).not.toMatch(/[A-Z]/);
    }
  });

  it("matches the approved public token set exactly", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    expect(Object.keys(tokens).sort()).toEqual(
      Object.keys(APPROVED_PUBLIC_TOKENS).sort(),
    );
  });

  it("carries the approved value for every token", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    const actual = tokens as unknown as Record<string, string>;
    for (const [name, value] of Object.entries(APPROVED_PUBLIC_TOKENS)) {
      expect(actual[name], name).toBe(value);
    }
  });

  it("holds string values throughout, including the numeric-looking ones", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    for (const [key, value] of Object.entries(tokens)) {
      expect(typeof value, `${key} is not a string`).toBe("string");
    }
    const actual = tokens as unknown as Record<string, string>;
    expect(actual["--weight-bold"]).toBe("700");
    expect(actual["--z-chrome"]).toBe("10");
    expect(actual["--press-scale"]).toBe("0.98");
  });

  it("resolves every value to a terminal literal, never a var() reference", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    for (const [key, value] of Object.entries(tokens)) {
      expect(String(value).includes("var("), `${key} is referential`).toBe(
        false,
      );
    }
  });

  it("excludes every raw palette entry, --_ source and internal token", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    for (const key of Object.keys(tokens)) {
      expect(key.startsWith("--_"), `${key} is an internal source`).toBe(false);
      expect(
        /^--(?:white|(?:green|blue|red|neutral)-\d+)$/.test(key),
        `${key} is a raw palette entry`,
      ).toBe(false);
    }
  });

  it("excludes every retired, deferred and unvalued identifier by name", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    const keys = new Set(Object.keys(tokens));
    for (const absent of MUST_BE_ABSENT) {
      expect(keys.has(absent), `${absent} must not be exported`).toBe(false);
      expect(
        generatedSource.includes(`"${absent}":`),
        `${absent} appears as a key in the generated source`,
      ).toBe(false);
    }
  });

  it("keeps distinct roles that share one resolved value", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    const actual = tokens as unknown as Record<string, string>;

    // Decision 14 — two surface roles at #ffffff.
    expect(actual["--background"]).toBe("#ffffff");
    expect(actual["--surface"]).toBe("#ffffff");

    // Owner Contrast Ruling — two inks at #667085.
    expect(actual["--neutral-status-fg"]).toBe("#667085");
    expect(actual["--text-secondary"]).toBe("#667085");

    // Decision 13 — three roles at #0062ac.
    expect(actual["--info-fg"]).toBe("#0062ac");
    expect(actual["--action-blue-hover"]).toBe("#0062ac");
    expect(actual["--link-hover"]).toBe("#0062ac");

    // Decision 3b — two focus rings at 2px.
    expect(actual["--focus-indicator-inner-width"]).toBe("2px");
    expect(actual["--focus-indicator-outer-width"]).toBe("2px");
  });

  it("is sorted lexicographically by the complete identifier", async () => {
    const { tokens } = await import("@zakhmban/ui/tokens");
    const keys = Object.keys(tokens);
    expect(keys).toEqual([...keys].sort());
  });

  it("carries no runtime dependency", () => {
    // The emitted module is data. An import or require here would become a
    // transitive dependency four applications cannot resolve independently.
    expect(distSource).not.toMatch(/\bimport\s/);
    expect(distSource).not.toContain("require(");
  });

  it("keeps the source and dist public surfaces identical", async () => {
    const fromSource = await import("../../src/tokens/index.js");
    const fromDist = await import("@zakhmban/ui/tokens");
    expect(Object.keys(fromSource).sort()).toEqual(
      Object.keys(fromDist).sort(),
    );
    expect(fromSource.tokens).toEqual(fromDist.tokens);
  });

  it("does not widen the root export", async () => {
    const root = await import("@zakhmban/ui");
    expect(Object.keys(root).sort()).toEqual([
      "isValidIranianNationalId",
      "normalizeIranianMobile",
    ]);
  });
});
