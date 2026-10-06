import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The TextField / Select style contract.
 *
 * `styles-contract.test.ts` already applies the general Styles hygiene rules
 * to `field.css` — no raw colour, no raw palette entry, no `--_` source, no
 * physical left/right, no `direction`. This file asserts the things that are
 * specific to these two components and that a reviewer would otherwise have
 * to take on trust:
 *
 *   - the approved geometry is actually bound to the approved tokens;
 *   - the three border treatments bind to the tokens the pull request
 *     states, so a later edit to one of them is a visible diff here;
 *   - the error message really does take the Caption step and `--danger-fg`,
 *     which is the whole subject of the ruling of 2026-10-05;
 *   - the global focus indicator is neither re-declared nor removed;
 *   - no text container has a fixed height, which is what §6's 200%-zoom
 *     requirement comes down to in CSS.
 *
 * Self-contained by the rule in `tests/architecture/README.md`.
 */
const field = readFileSync(
  fileURLToPath(new URL("../../src/styles/field.css", import.meta.url)),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

/** The body of the first rule whose selector contains `selector`. */
function rule(selector: string): string {
  const at = field.indexOf(selector);
  expect(at, `no rule for ${selector}`).toBeGreaterThan(-1);
  const open = field.indexOf("{", at);
  return field.slice(open + 1, field.indexOf("}", open));
}

describe("field geometry — v0.2 §2.3 and §3.2", () => {
  it("binds the control to the approved input height and radius tokens", () => {
    // "48px, radius 14" reaches the component as the two public tokens, not
    // as two numbers that happen to match them today.
    const control = rule(".zakhmban-field-control");
    expect(control).toContain("var(--control-height-input)");
    expect(control).toContain("var(--radius-input)");
  });

  it("treats 48px as a minimum, so 200% text zoom grows the box", () => {
    // §6: "Layouts survive 200% text zoom without clipping — no fixed
    // heights on text containers." A `block-size` or `height` here would be
    // exactly that fixed height.
    const control = rule(".zakhmban-field-control");
    expect(control).toContain("min-block-size");
    expect(/(^|[;{\s])(block-size|height)\s*:/.test(control)).toBe(false);
  });

  it("sets no fixed height anywhere in the file", () => {
    expect(/(^|[;{\s])(height|block-size)\s*:/.test(field)).toBe(false);
  });
});

describe("field colour bindings — Decision 14 and the ruling of 2026-10-05", () => {
  it("binds the resting border to --text-secondary, per the 2026-10-06 exception", () => {
    // An INK token doing boundary work, which is a named owner exception for
    // these two controls and not a general rule. `--border` at 1.2653:1 was
    // the original defect: for an empty field it was the sole visible means
    // of locating the control, which IA-1 forbids.
    //
    // The MEASURED threshold lives in resting-boundary-contrast.test.ts,
    // which resolves the value and computes the ratio. This assertion is the
    // other half — that the binding recorded in the ruling is the binding
    // that shipped — so a swap to some other ≥3:1 token is still a visible
    // diff here rather than a silent substitution.
    expect(rule(".zakhmban-field-control")).toContain(
      "1px solid var(--text-secondary)",
    );
    expect(rule(".zakhmban-field-control")).not.toContain("var(--border)");
  });

  it("binds the focused border to --brand-blue, and only the border", () => {
    // §3.2 asks for a "blue border + ring". The ring is `global.css`; this
    // rule is the border half and must not grow into the other.
    const focused = rule(".zakhmban-field-control:focus-within");
    expect(focused).toContain("var(--brand-blue)");
    expect(focused).not.toContain("box-shadow");
    expect(focused).not.toContain("outline");
  });

  it("binds the error border to --danger at the approved 1.5px", () => {
    // §2.3: "Borders 1px, 1.5px when a card is selected or in error."
    // `--danger` is the non-text role of the family; `--danger-fg` is its
    // ink and belongs to the message instead.
    const error = rule(".zakhmban-field-control[data-zakhmban-field-invalid]");
    expect(error).toContain("var(--danger)");
    expect(error).toContain("1.5px");
    expect(error).not.toContain("var(--danger-fg)");
  });

  it("uses the approved disabled triplet and creates no fourth disabled value", () => {
    const disabled = rule(
      ".zakhmban-field-control:has(.zakhmban-field-input:disabled)",
    );
    for (const token of [
      "var(--disabled-border)",
      "var(--disabled-bg)",
      "var(--disabled-text)",
    ]) {
      expect(disabled, `disabled rule omits ${token}`).toContain(token);
    }
  });

  it("creates no custom property of its own", () => {
    // A component may not mint a token. The 118 / 39 / 1 boundary is a
    // Token Foundation matter and a stylesheet is not where it changes.
    expect(/^\s*--[a-z-]+\s*:/m.test(field)).toBe(false);
  });
});

describe("field typography — the ruling of 2026-10-05", () => {
  it("gives hint and error one shared Caption step", () => {
    // The reason the ruling gives for choosing Caption: hint and error are
    // sibling slots on the same control, so a field must not change its own
    // type size when it becomes invalid.
    const message = rule(".zakhmban-field-message");
    expect(message).toContain("var(--text-caption-size)");
    expect(message).toContain("var(--text-caption-line-height)");
    expect(message).toContain("var(--text-caption-weight)");
  });

  it("differs the error from the hint by ink alone", () => {
    const error = rule(
      '.zakhmban-field-message[data-zakhmban-field-message="error"]',
    );
    expect(error).toContain("var(--danger-fg)");
    expect(error).not.toContain("font-size");
    expect(error).not.toContain("font-weight");
    expect(error).not.toContain("line-height");
  });

  it("binds the label to the approved label step", () => {
    const label = rule(".zakhmban-field-label");
    expect(label).toContain("var(--text-label-size)");
    expect(label).toContain("var(--text-label-weight)");
  });
});

describe("field state selectors — scoped to the control, not to the box", () => {
  it("does not match a disabled <option> as a disabled control", () => {
    // Found in a browser, not in review: `:has(:disabled)` matches a box
    // containing a disabled OPTION, so every Select with a placeholder
    // rendered as though the whole control were disabled.
    expect(field).not.toContain(":has(:disabled)");
    expect(field).toContain(".zakhmban-field-input:disabled");
  });

  it("matches the readonly attribute rather than the :read-only state", () => {
    // Also found in a browser. `:read-only` matches any element that is not
    // user-alterable — every <select>, the suffix <span>, the <label> — so
    // the read-only tint leaked onto every Select and onto any TextField
    // with a suffix.
    expect(/:has\([^)]*:read-only/.test(field)).toBe(false);
    expect(field).toContain(".zakhmban-field-input[readonly]");
  });
});

describe("field focus — D-3 is left exactly where it is", () => {
  it("declares no outline and no focus ring of its own", () => {
    // The authorization: the global indicator is "not replaced, not
    // removed, not re-declared". A box-shadow ring here would be a second
    // indicator; an `outline: none` would be a removal.
    expect(/(^|[;{\s])outline\s*:/.test(field)).toBe(false);
    expect(field).not.toContain(":focus-visible");
    expect(field).not.toContain("--focus-indicator");
  });

  it("uses :focus-within for the border, because the box is not the focusable element", () => {
    expect(field).toContain(":focus-within");
  });
});
