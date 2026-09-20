import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The Tailwind v4 @theme artifact — ADR 0001 and ADR 0003 §12.
 *
 * It references custom properties and restates no value, resets every
 * namespace it owns so a deferred decision cannot be filled by a Tailwind
 * default, and emits nothing for the four families Tailwind v4 has no
 * namespace for.
 */
const preset = readFileSync(
  fileURLToPath(
    new URL("../../src/tokens/tailwind-preset.css", import.meta.url),
  ),
  "utf8",
);

const body = preset.replace(/\/\*[\s\S]*?\*\//g, "");
const entries = [...body.matchAll(/(--[a-z0-9-*]+)\s*:\s*([^;]+);/g)].map(
  (match) => [match[1] as string, (match[2] as string).trim()] as const,
);
const resets = entries.filter(([, value]) => value === "initial");
const mappings = entries.filter(([, value]) => value !== "initial");

describe("Tailwind v4 @theme artifact", () => {
  it("is a single @theme block and declares no rule of its own", () => {
    expect(body.match(/@theme\s*\{/g) ?? []).toHaveLength(1);
    expect(body).not.toContain("@keyframes");
    expect(body).not.toContain(":root");
    expect(body).not.toContain("@utility");
    expect(body).not.toContain("@apply");
  });

  it("resets every namespace it owns, the spacing base included", () => {
    expect(resets.map(([key]) => key)).toEqual([
      "--color-*",
      "--text-*",
      "--font-*",
      "--font-weight-*",
      "--radius-*",
      "--shadow-*",
      "--ease-*",
      "--spacing",
      "--spacing-*",
    ]);
  });

  it("references a custom property in every entry and restates no literal", () => {
    for (const [key, value] of mappings) {
      expect(value, key).toMatch(/^var\(--[a-z0-9-_]+\)$/);
    }
    expect(body).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(body).not.toMatch(/\b\d+(?:px|ms)\b/);
    expect(body).not.toContain("cubic-bezier");
    expect(body).not.toContain("rgba(");
  });

  it("references no raw palette entry", () => {
    for (const [key, value] of mappings) {
      expect(
        /var\(--(?:white|(?:green|blue|red|neutral)-\d+)\)/.test(value),
        `${key} reaches the raw palette`,
      ).toBe(false);
    }
  });

  it("uses an internal --_ source exactly where the namespace collides", () => {
    // ADR 0003 §10: shadow, font and radius identifiers coincide with a
    // Tailwind namespace, so a direct self-reference would be circular.
    const mapped = new Map(mappings);
    expect(mapped.get("--shadow-nav")).toBe("var(--_shadow-nav)");
    expect(mapped.get("--shadow-sheet")).toBe("var(--_shadow-sheet)");
    expect(mapped.get("--shadow-modal")).toBe("var(--_shadow-modal)");
    expect(mapped.get("--font-ui")).toBe("var(--_font-ui)");
    expect(mapped.get("--radius-control")).toBe("var(--_radius-control)");
    expect(mapped.get("--radius-input")).toBe("var(--_radius-input)");
    expect(mapped.get("--radius-button")).toBe("var(--_radius-input)");
    expect(mapped.get("--radius-card")).toBe("var(--_radius-card)");
    expect(mapped.get("--radius-sheet")).toBe("var(--_radius-sheet)");

    for (const [key, value] of mappings) {
      expect(value, `${key} references itself`).not.toBe(`var(${key})`);
    }
  });

  it("maps the two focus-indicator colours with the -color suffix dropped", () => {
    const mapped = new Map(mappings);
    expect(mapped.get("--color-focus-indicator-inner")).toBe(
      "var(--focus-indicator-inner-color)",
    );
    expect(mapped.get("--color-focus-indicator-outer")).toBe(
      "var(--focus-indicator-outer-color)",
    );
    // The suffix rule applies to those two and to nothing else.
    const dropped = mappings.filter(([, value]) => value.endsWith("-color)"));
    expect(dropped).toHaveLength(2);
  });

  it("maps each type step to its size, line height and weight", () => {
    const mapped = new Map(mappings);
    for (const step of [
      "display",
      "page-title",
      "section-title",
      "card-title",
      "body",
      "label",
      "caption",
      "button",
    ]) {
      expect(mapped.get(`--text-${step}`)).toBe(`var(--text-${step}-size)`);
      expect(mapped.get(`--text-${step}--line-height`)).toBe(
        `var(--text-${step}-line-height)`,
      );
      expect(mapped.get(`--text-${step}--font-weight`)).toBe(
        `var(--text-${step}-weight)`,
      );
    }
    for (const weight of ["regular", "medium", "semibold", "bold"]) {
      expect(mapped.get(`--font-weight-${weight}`)).toBe(
        `var(--weight-${weight})`,
      );
    }
  });

  it("maps the eight ordinal spacing steps onto --spacing-1 … --spacing-8", () => {
    const mapped = new Map(mappings);
    for (let step = 1; step <= 8; step += 1) {
      expect(mapped.get(`--spacing-${step}`)).toBe(`var(--space-${step})`);
    }
    expect(mapped.get("--spacing-9")).toBeUndefined();
  });

  it("maps the one easing curve", () => {
    expect(new Map(mappings).get("--ease-standard")).toBe(
      "var(--easing-standard)",
    );
  });

  it("emits nothing for the four families Tailwind v4 has no namespace for", () => {
    const keys = mappings.map(([key]) => key);
    for (const key of keys) {
      expect(key, "durations have no Tailwind namespace").not.toMatch(
        /^--duration-/,
      );
      expect(key, "the stacking roles must not be mapped").not.toMatch(/^--z-/);
    }
    expect(keys).not.toContain("--press-scale");
    for (const geometry of [
      "--control-min-target",
      "--control-height-input",
      "--control-height-button",
      "--app-bar-height",
      "--bottom-nav-height",
      "--bottom-nav-safe-area",
      "--focus-indicator-inner-width",
      "--focus-indicator-outer-width",
    ]) {
      expect(keys).not.toContain(geometry);
      expect(body).not.toContain(`var(${geometry})`);
    }
  });

  it("emits no breakpoint, container or animation key", () => {
    for (const key of mappings.map(([name]) => name)) {
      expect(key).not.toMatch(/^--(?:breakpoint|container|animate)-/);
    }
  });

  it("emits no deferred or unvalued token", () => {
    for (const absent of [
      "--radius-pill",
      "--radius-checkbox",
      "--shadow-none",
      "--shadow-xs",
      "--shadow-sm",
      "--shadow-md",
      "--text-muted",
    ]) {
      expect(body.includes(absent), `${absent} is mapped`).toBe(false);
    }
  });

  it("is byte-identical in src/ and dist/", () => {
    const built = readFileSync(
      fileURLToPath(
        new URL("../../dist/tokens/tailwind-preset.css", import.meta.url),
      ),
      "utf8",
    );
    expect(built).toBe(preset);
  });
});
