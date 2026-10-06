import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The Button style contract.
 *
 * `styles-contract.test.ts` already applies the general Styles hygiene rules
 * to `button.css`. This file asserts what is specific to this primitive and
 * what a reviewer would otherwise take on trust: that each size binds to the
 * token the ruling names rather than to some other value that happens to
 * match today, that the retired identifier and the input's role are both
 * absent, that the colour bindings carry the authority the pull request
 * claims for them, and that the global focus indicator is untouched.
 *
 * It runs in node — the behavioural half lives in
 * `tests/primitives/button.test.tsx`, which needs a DOM and therefore cannot
 * read a file off disk through `import.meta.url`.
 *
 * Self-contained by the rule in `tests/architecture/README.md`.
 */
const css = readFileSync(
  fileURLToPath(new URL("../../src/styles/button.css", import.meta.url)),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

/** The body of the first rule whose selector contains `selector`. */
function rule(selector: string): string {
  const at = css.indexOf(selector);
  expect(at, `no rule for ${selector}`).toBeGreaterThan(-1);
  const open = css.indexOf("{", at);
  return css.slice(open + 1, css.indexOf("}", open));
}

describe("Button geometry — Decision B and Ruling 1", () => {
  it("binds sm to --control-min-target, and no 40px value exists anywhere", () => {
    // Decision B §B.3: the 44px minimum is expressed through the existing
    // role. ADR 0003 gap 3 withheld a 40px token and Ruling 1 did not create
    // one, so a literal 40px here would be an invented value.
    expect(rule(".zakhmban-button-sm")).toContain(
      "min-block-size: var(--control-min-target)",
    );
    expect(css).not.toContain("40px");
  });

  it("binds md and lg to the two identifiers Ruling 1 created", () => {
    expect(rule(".zakhmban-button-md")).toContain(
      "min-block-size: var(--control-height-button-md)",
    );
    expect(rule(".zakhmban-button-lg")).toContain(
      "min-block-size: var(--control-height-button-lg)",
    );
  });

  it("never reaches for --control-height-input", () => {
    // Decision B §B.4's actual objection: 48px existed only under a role
    // named for a different control. Using it here would reinstate the exact
    // defect Ruling 1 was written to remove — and both values being 48px is
    // precisely why only a test catches it.
    expect(css).not.toContain("--control-height-input");
  });

  it("names the retired identifier in no declaration", () => {
    expect(/--control-height-button(?![-a-z0-9])/.test(css)).toBe(false);
  });

  it("uses a minimum at every size, so 200% text zoom grows the control", () => {
    // §6: "no fixed heights on text containers". A button is one.
    expect(/(^|[;{\s])(block-size|height)\s*:/.test(css)).toBe(false);
    for (const size of ["sm", "md", "lg"]) {
      expect(rule(`.zakhmban-button-${size}`)).toContain("min-block-size");
    }
  });

  it("takes the approved button radius rather than a literal", () => {
    expect(rule(".zakhmban-button {")).toContain(
      "border-radius: var(--radius-button)",
    );
  });
});

describe("Button colour — Decision 3a, Decision 12c and Decision 14", () => {
  it("binds filled variants to the full action ladder, all tones and states", () => {
    for (const tone of ["green", "blue", "red"]) {
      for (const state of ["rest", "hover", "press"]) {
        expect(
          css.includes(`var(--action-${tone}-${state})`),
          `missing --action-${tone}-${state}`,
        ).toBe(true);
      }
    }
    expect(rule(".zakhmban-button-primary {")).toContain(
      "var(--on-brand-text)",
    );
  });

  it("binds the secondary border to the same value Decision 12c gives its label", () => {
    // Decision 12c fixes the ink; Decision 14 leaves the border to the
    // component. One value for both is why they cannot drift apart.
    for (const tone of ["green", "blue", "red"]) {
      const body = rule(`.zakhmban-button-secondary.zakhmban-button-${tone} {`);
      expect(body).toContain(`border-color: var(--action-${tone}-rest)`);
    }
  });

  it("gives a text button no border in any state", () => {
    // Asserted against the file rather than one rule: `text` shares its
    // transparent ground with `secondary` in a grouped rule, and takes its
    // own `border-color: transparent` in a later standalone one.
    expect(
      /\.zakhmban-button-text\s*\{[^}]*border-color:\s*transparent/.test(css),
    ).toBe(true);
  });

  it("binds the approved disabled triplet and creates no fourth value", () => {
    const disabled = rule(".zakhmban-button:disabled");
    for (const token of [
      "var(--disabled-bg)",
      "var(--disabled-border)",
      "var(--disabled-text)",
    ]) {
      expect(disabled, `disabled rule omits ${token}`).toContain(token);
    }
  });

  it("uses no raw colour, raw-palette entry or internal source", () => {
    expect(/#[0-9a-fA-F]{3,8}\b/.test(css)).toBe(false);
    expect(/var\(\s*--_/.test(css)).toBe(false);
    expect(
      /var\(\s*--(?:green|blue|red|neutral|white|black)-\d/.test(css),
    ).toBe(false);
  });

  it("declares no custom property of its own", () => {
    // A component may not mint an identifier, and a custom property in a
    // published stylesheet is a name a consumer could set. The variant-tone
    // pairs are compound selectors for exactly this reason.
    expect(/^\s*--[a-z-]+\s*:/m.test(css)).toBe(false);
  });
});

describe("Button motion, focus and direction", () => {
  it("uses the one approved transform and suppresses it under reduced motion", () => {
    // §2.4: "The only transform in the system is a 0.98 press scale", and
    // "Every animation must be suppressed under prefers-reduced-motion."
    expect(css).toContain("transform: scale(var(--press-scale))");
    expect(css).toContain("prefers-reduced-motion: reduce");
    const reduced = css.slice(css.indexOf("prefers-reduced-motion"));
    expect(reduced).toContain("transform: none");
  });

  it("declares no keyframe animation — there is no spinner", () => {
    // The authorization: "No spinner is authorized." ADR 0004 §8 scopes
    // `zakhmban-spin` to "loading indicators — Tier 2".
    expect(css).not.toContain("zakhmban-spin");
    expect(/(^|[;{\s])animation\s*:/.test(css)).toBe(false);
  });

  it("leaves D-3's focus indicator exactly where it is", () => {
    expect(/(^|[;{\s])outline\s*:/.test(css)).toBe(false);
    expect(css).not.toContain(":focus-visible");
    expect(css).not.toContain("--focus-indicator");
  });

  it("sets no direction and uses no physical property", () => {
    expect(/(^|[;{\s])direction\s*:/.test(css)).toBe(false);
    for (const physical of [
      "margin-left",
      "margin-right",
      "padding-left",
      "padding-right",
      "left:",
      "right:",
      "text-align: left",
      "text-align: right",
    ]) {
      expect(css.includes(physical), `button.css uses ${physical}`).toBe(false);
    }
  });

  it("guards hover and press against disabled and loading", () => {
    // A loading button must not light up under the cursor: it cannot be
    // activated, and a hover tint would say otherwise. Whitespace is
    // collapsed first, because Prettier wraps these selectors across lines
    // and the guard is about the selector, not its formatting.
    const interactive = [...css.matchAll(/([^{}]*:(?:hover|active)[^{}]*)\{/g)]
      .map(([, selector]) => selector!.replace(/\s+/g, ""))
      .filter((selector) => selector.length > 0);

    expect(interactive.length).toBeGreaterThan(5);
    for (const selector of interactive) {
      expect(
        selector.includes(':not([aria-disabled="true"])') &&
          selector.includes(":not(:disabled)"),
        `unguarded interactive selector: ${selector}`,
      ).toBe(true);
    }
  });
});
