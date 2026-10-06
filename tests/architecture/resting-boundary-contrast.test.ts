import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * IA-1 · the resting control boundary of `TextField` and `Select`.
 *
 * This guard exists because the first implementation shipped a boundary that
 * failed IA-1 and no test noticed: every assertion was about which TOKEN was
 * named, and naming the approved token is exactly what the defect did. The
 * test that would have caught it has to reach the VALUE.
 *
 * So it does what a reviewer with a contrast checker would do, and nothing
 * less: it resolves the binding the stylesheet actually declares, through
 * the `var()` chain in the authored token CSS, down to a hex literal, and
 * computes the WCAG 2.x contrast ratio against the surface the control
 * actually sits on. A later edit that swapped the binding back to `--border`,
 * or to any other token below 3:1, fails here with the measured number.
 *
 * It is deliberately NOT a snapshot of `#667085`. Pinning the hex would make
 * an approved remap of `--text-secondary` fail this file for no reason,
 * while a binding change to a different sub-3:1 token would still pass. The
 * threshold is the contract; the token is not.
 *
 * What it does not claim: this measures one pair against one surface. It is
 * not an accessibility audit, and nothing here is evidence of conformance
 * beyond the single ratio it computes.
 *
 * Authority: Resting Control-Boundary Role Exception, 2026-10-06 —
 * `--text-secondary` is a NAMED exception for these two controls. The test
 * asserts the measured threshold, not the exception's reach; the reach is
 * recorded in the Token Table and in `field.css`.
 *
 * Self-contained by the rule in `tests/architecture/README.md`.
 */
const src = fileURLToPath(new URL("../../src", import.meta.url));

const strip = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

const field = strip(readFileSync(`${src}/styles/field.css`, "utf8"));

/** Every custom property declared anywhere in the authored token CSS. */
const tokens: Record<string, string> = {};
for (const file of [
  "colors.css",
  "base.css",
  "typography.css",
  "spacing.css",
  "motion.css",
  "elevation.css",
  "fonts.css",
]) {
  const css = strip(readFileSync(`${src}/tokens/${file}`, "utf8"));
  for (const [, name, value] of css.matchAll(
    /(--[a-z0-9-]+)\s*:\s*([^;]+);/g,
  )) {
    tokens[name!] = value!.trim();
  }
}

/** Follow `var(--a)` → `var(--b)` → `#hex`, which is how the layers resolve. */
function resolve(value: string, depth = 0): string {
  expect(depth, `token chain too deep: ${value}`).toBeLessThan(10);
  const hex = /^#[0-9a-fA-F]{3,8}$/.exec(value.trim());
  if (hex !== null) {
    return value.trim().toLowerCase();
  }
  const reference = /var\(\s*(--[a-z0-9-]+)\s*\)/.exec(value);
  expect(reference, `not a colour or a var(): ${value}`).not.toBeNull();
  const next = tokens[reference![1]!];
  expect(next, `undeclared token ${reference![1]!}`).toBeDefined();
  return resolve(next!, depth + 1);
}

function luminance(hex: string): number {
  const channels = [0, 2, 4]
    .map((i) => parseInt(hex.slice(1 + i, 3 + i), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)];
  const [light, dark] = x! > y! ? [x!, y!] : [y!, x!];
  return (light + 0.05) / (dark + 0.05);
}

/** The `border` shorthand on the one rule that carries the resting boundary. */
function restingBorder(): { width: string; token: string } {
  const at = field.indexOf(".zakhmban-field-control");
  expect(at, "no .zakhmban-field-control rule").toBeGreaterThan(-1);
  const body = field.slice(field.indexOf("{", at), field.indexOf("}", at));
  const declaration = /border\s*:\s*([^;]+);/.exec(body);
  expect(
    declaration,
    "the resting rule declares no border shorthand",
  ).not.toBeNull();
  const parts = declaration![1]!.trim().split(/\s+/);
  return { width: parts[0]!, token: parts.slice(2).join(" ") };
}

describe("IA-1 · the resting boundary of an empty TextField and Select", () => {
  it("clears 3:1 against the surface the control sits on", () => {
    // The surface is read from the same rule rather than assumed, so a
    // change to the field's background is measured against, not ignored.
    const { token } = restingBorder();
    const at = field.indexOf(".zakhmban-field-control");
    const body = field.slice(field.indexOf("{", at), field.indexOf("}", at));
    const fill = /background-color\s*:\s*([^;]+);/.exec(body);
    expect(
      fill,
      "the resting rule declares no background-color",
    ).not.toBeNull();

    const border = resolve(token);
    const surface = resolve(fill![1]!);
    const ratio = contrast(border, surface);

    expect(
      ratio,
      `the resting boundary measures ${ratio.toFixed(4)}:1 (${border} on ` +
        `${surface}). IA-1: a boundary below 3:1 "must never be the sole ` +
        `visible means of locating a control", and an empty TextField has ` +
        `no value, no icon and no guaranteed placeholder to carry that ` +
        `instead. Bind it to a token that clears 3:1, or take an owner ` +
        `ruling — do not lower this threshold.`,
    ).toBeGreaterThanOrEqual(3);
  });

  it("clears 3:1 against the page behind the control too", () => {
    // IA-1: "that boundary must reach at least 3:1 against every adjacent
    // surface". The field's own fill is one; the page it sits on is the
    // other, and the two are separate roles even at one value today.
    const { token } = restingBorder();
    const ratio = contrast(resolve(token), resolve("var(--background)"));
    expect(
      ratio,
      `${ratio.toFixed(4)}:1 against --background`,
    ).toBeGreaterThanOrEqual(3);
  });

  it("keeps the approved 1px width — the exception changed colour only", () => {
    // §2.3: "Borders 1px, 1.5px when a card is selected or in error." The
    // ruling of 2026-10-06 is explicit that the width is unchanged, so a
    // thicker resting border would be an unapproved geometry change
    // smuggled in as a contrast fix.
    expect(restingBorder().width).toBe("1px");
  });

  it("measures the real thing — the resolver is proved on known pairs", () => {
    // A contrast guard that silently resolved everything to white would
    // pass forever. These are the two ends of the actual decision.
    expect(contrast(resolve("var(--text-secondary)"), "#ffffff")).toBeCloseTo(
      4.9748,
      3,
    );
    expect(contrast(resolve("var(--border)"), "#ffffff")).toBeCloseTo(
      1.2653,
      3,
    );
    // And the token chain really is a chain: --text-secondary is an alias.
    expect(tokens["--text-secondary"]).toContain("var(");
    expect(resolve("var(--text-secondary)")).toBe("#667085");
  });

  it("leaves the error and focused borders to their own rules", () => {
    // The exception of 2026-10-06 reaches the RESTING boundary only. This
    // guard must not start policing the other two, whose bindings are
    // approved separately and asserted in field-styles-contract.test.ts.
    expect(field).toContain("var(--brand-blue)");
    expect(field).toContain("var(--danger)");
  });
});
