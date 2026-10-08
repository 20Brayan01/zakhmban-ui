import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The Styles Foundation v0.2.0 Contract Ruling, 2026-09-24 — D-1, D-2, D-3
 * and D-6's exclusion.
 *
 * Self-contained by the rule in `tests/architecture/README.md`.
 */
const stylesDir = fileURLToPath(new URL("../../src/styles", import.meta.url));

function withoutComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function read(file: string): string {
  return withoutComments(readFileSync(`${stylesDir}/${file}`, "utf8"));
}

/** Every declaration in a stylesheet, as `property: value` with whitespace collapsed. */
function declarations(css: string): string[] {
  return [...css.matchAll(/([a-z-]+)\s*:\s*([^;{}]+);/g)].map(
    (match) => `${match[1]!}: ${match[2]!.replace(/\s+/g, " ").trim()}`,
  );
}

const reset = read("reset.css");
const global = read("global.css");
const ALL_STYLES = [
  "fonts.css",
  "reset.css",
  "global.css",
  "keyframes.css",
  "overlay.css",
  // The shared TextField and Select surface, delivered through the same
  // ./styles entry. Every hygiene rule below applies to it unchanged.
  "field.css",
  // The Button primitive, on the same entry (Button Implementation
  // Authorization, 2026-10-06). Every hygiene rule below applies to it.
  "button.css",
  // The OtpInput primitive, on the same entry (OtpInput Implementation
  // Authorization, 2026-10-06). Every hygiene rule below applies to it.
  "otp-input.css",
];

/**
 * The four Styles files that existed before the overlay work. D-6's
 * prohibition still binds every one of them: the overlay mechanics belong in
 * `overlay.css` and nowhere else, so a `position: fixed` appearing in
 * `global.css` is still the defect the guard was written to catch.
 */
const PRE_OVERLAY_STYLES = [
  "fonts.css",
  "reset.css",
  "global.css",
  "keyframes.css",
];

describe("D-1 · the minimal reset", () => {
  it("contains exactly the three approved rules", () => {
    // "Nothing else belongs to the v0.2.0 reset unless separately
    // authorized." Selector blocks are counted, so a fourth rule fails here
    // rather than in review.
    const selectors = [...reset.matchAll(/([^{}]+)\{/g)].map((match) =>
      match[1]!.replace(/\s+/g, " ").trim(),
    );
    expect(selectors).toEqual([
      "*, *::before, *::after",
      "html, body",
      "button, input, select, textarea",
    ]);
  });

  it("declares exactly the approved declarations", () => {
    expect(declarations(reset)).toEqual([
      "box-sizing: border-box",
      "margin: 0",
      "padding: 0",
      "font: inherit",
    ]);
  });

  it("adopts no third-party or expanded reset", () => {
    // normalize.css, modern-normalize and Josh Comeau's reset are each
    // explicitly not authorized, and neither is any of the behaviour they
    // would bring with them.
    for (const forbidden of [
      "list-style",
      "text-decoration",
      "-webkit-appearance",
      "appearance:",
      "border: 0",
      "border: none",
      "max-width",
      "min-width",
      "display: block",
      "background: none",
      "cursor:",
      "h1",
      "img",
      "svg",
      "a:",
      "ul",
      "ol",
    ]) {
      expect(reset.includes(forbidden), `reset contains ${forbidden}`).toBe(
        false,
      );
    }
  });
});

describe("D-2 · the global body contract", () => {
  it("declares exactly the eight approved body declarations, in order", () => {
    const body = global.slice(global.indexOf("body"), global.indexOf("}"));
    expect(declarations(body)).toEqual([
      "font-family: var(--font-ui)",
      "font-synthesis: none",
      "background: var(--background)",
      "color: var(--text-primary)",
      "font-size: var(--text-body-size)",
      "line-height: var(--text-body-line-height)",
      "font-weight: var(--text-body-weight)",
      "text-wrap: pretty",
    ]);
  });

  it("excludes everything D-2 excludes", () => {
    for (const forbidden of [
      "font-variant-numeric",
      "-webkit-font-smoothing",
      "-moz-osx-font-smoothing",
      "text-rendering",
      "direction:",
      "lang(",
      "prefers-color-scheme",
      "[data-theme",
      "@media (min-width",
      "@media (max-width",
      "@container",
    ]) {
      expect(
        global.includes(forbidden),
        `global.css contains ${forbidden}`,
      ).toBe(false);
    }
  });

  it("never forces direction — the document owns it", () => {
    // v0.2 §5 sets dir="rtl" and lang="fa" once on the document, and the font
    // ruling assigns framework document/head integration to applications.
    //
    // Matched as a declaration rather than as a substring: `flex-direction`
    // is a layout property that says nothing about writing direction, and a
    // bare `includes("direction:")` reads it as a violation. The property
    // this rule is about is `direction`, at the start of a declaration.
    const DIRECTION_DECLARATION = /(^|[;{\s])direction\s*:/;
    for (const file of ALL_STYLES) {
      expect(
        DIRECTION_DECLARATION.test(read(file)),
        `${file} sets direction`,
      ).toBe(false);
    }
  });
});

describe("D-3 · the focus indicator", () => {
  it("uses :focus-visible and paints two rings from the four tokens only", () => {
    expect(global).toContain(":focus-visible");
    const block = global.slice(global.indexOf(":focus-visible"));
    for (const token of [
      "--focus-indicator-inner-width",
      "--focus-indicator-inner-color",
      "--focus-indicator-outer-width",
      "--focus-indicator-outer-color",
    ]) {
      expect(block.includes(token), `focus rule omits ${token}`).toBe(true);
    }
    expect(block).toContain("box-shadow");
  });

  it("paints the inner ring rather than leaving a transparent gap", () => {
    // A transparent `outline-offset` gap shows the page through, so on
    // --surface-subtle or any approved soft tint the "white" layer would not
    // be white and Decision 3b's contrast evidence would not hold.
    expect(global.includes("outline-offset")).toBe(false);
  });

  it("removes the default outline only inside the rule that replaces it", () => {
    // No global `:focus:not(:focus-visible) { outline: none }`, and no focus
    // removal without an immediately effective approved replacement.
    expect(global.includes(":focus:not(:focus-visible)")).toBe(false);
    const outlineRules = [
      ...global.matchAll(/([^{}]+)\{[^{}]*outline:\s*none/g),
    ];
    expect(outlineRules.length).toBe(1);
    expect(outlineRules[0]![1]!.trim()).toBe(":focus-visible");
  });
});

describe("Styles CSS hygiene", () => {
  it("uses no raw colour literal", () => {
    // v0.2 §2.1 forbids raw hex in component source; the same rule governs
    // Styles. Every colour resolves through a semantic token.
    for (const file of ALL_STYLES) {
      const source = read(file);
      expect(
        /#[0-9a-fA-F]{3,8}\b/.test(source),
        `${file} has a hex literal`,
      ).toBe(false);
      for (const fn of ["rgb(", "rgba(", "hsl(", "hsla(", "color-mix("]) {
        expect(source.includes(fn), `${file} uses ${fn}`).toBe(false);
      }
    }
  });

  it("references no raw palette entry and no package-internal source", () => {
    // Decision 1 constraint 2: components and consuming applications never
    // reference Raw Palette tokens directly. ADR 0003 §5 keeps the `--_`
    // sources and --radius-checkbox out of every consumer-facing artifact.
    for (const file of ALL_STYLES) {
      const source = read(file);
      expect(/var\(\s*--_/.test(source), `${file} reads a --_ source`).toBe(
        false,
      );
      expect(
        /var\(\s*--(?:green|blue|red|neutral|white|black)-\d/.test(source),
        `${file} reads a raw palette entry`,
      ).toBe(false);
      expect(source.includes("--radius-checkbox")).toBe(false);
    }
  });

  it("uses no physical left/right property", () => {
    // v0.2 §5: logical properties only. A hardcoded left/right assumption is
    // a defect even though only one direction ships.
    for (const file of ALL_STYLES) {
      const source = read(file);
      for (const physical of [
        "margin-left",
        "margin-right",
        "padding-left",
        "padding-right",
        "border-left",
        "border-right",
        "left:",
        "right:",
        "text-align: left",
        "text-align: right",
      ]) {
        expect(source.includes(physical), `${file} uses ${physical}`).toBe(
          false,
        );
      }
    }
  });

  it("keeps overlay mechanics out of every non-overlay Styles file", () => {
    // D-6 excluded overlay mechanics from v0.2.0 while no technique was
    // approved. Decision A, Accepted ADR 0006 and the BottomSheet Height
    // Ruling have since approved one, and the BottomSheet Implementation
    // Authorization of 2026-10-04 permits it to ship — in `overlay.css`,
    // alongside the component and these tests, and nowhere else.
    //
    // The prohibition is therefore narrowed, not lifted: the four files that
    // predate the overlay work may still not acquire a stacking, scroll-lock
    // or inertness mechanic by accident.
    for (const file of PRE_OVERLAY_STYLES) {
      const source = read(file);
      for (const deferred of [
        "overlay-root",
        "portal",
        "overflow: hidden",
        "inert",
        "pointer-events",
        "position: fixed",
        "scroll-lock",
        "--z-scrim",
        "--z-dialog",
        "--z-chrome",
      ]) {
        expect(
          source.toLowerCase().includes(deferred),
          `${file} implements deferred v0.3.0 work: ${deferred}`,
        ).toBe(false);
      }
    }
  });
});
