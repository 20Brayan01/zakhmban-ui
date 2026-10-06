import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The OtpInput style contract.
 *
 * `styles-contract.test.ts` already applies the general Styles hygiene rules
 * to `otp-input.css`. This file asserts what is specific to this primitive:
 * that the 44×44 minimum really is unconditional on BOTH axes and cannot be
 * shrunk away by flex, that the typography is the one the rulings assigned
 * rather than one that merely looks similar, that the cell carries the
 * approved small-control radius, and that the polite status region stays in
 * the accessibility tree.
 *
 * It runs in node; the behavioural half is `tests/primitives/otp-input.test.tsx`.
 *
 * Self-contained by the rule in `tests/architecture/README.md`.
 */
const css = readFileSync(
  fileURLToPath(new URL("../../src/styles/otp-input.css", import.meta.url)),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

function rule(selector: string): string {
  const at = css.indexOf(selector);
  expect(at, `no rule for ${selector}`).toBeGreaterThan(-1);
  const open = css.indexOf("{", at);
  return css.slice(open + 1, css.indexOf("}", open));
}

const cell = rule(".zakhmban-otp-cell {");

describe("OtpInput target geometry — §6, unconditionally", () => {
  it("carries the 44px minimum on BOTH axes", () => {
    // §6: "44×44px minimum for anything tappable", with no viewport or zoom
    // qualifier. Block alone would leave a cell 44 tall and arbitrarily
    // narrow at a constrained width.
    expect(cell).toContain("min-block-size: var(--control-min-target)");
    expect(cell).toContain("min-inline-size: var(--control-min-target)");
  });

  it("lets flex grow a cell but never shrink it past those minimums", () => {
    // The authorization: "Flex shrink must not reduce either dimension below
    // 44px". `min-inline-size` is what actually stops it — a `flex-shrink`
    // of 1 is harmless only because the minimum floors it.
    expect(cell).toMatch(/flex:\s*1 1 auto/);
    expect(cell).toContain("min-inline-size");
  });

  it("introduces no fixed cell size that 200% text zoom could clip", () => {
    // §6: "no fixed heights on text containers". A cell holds a digit.
    expect(
      /(^|[;{\s])(block-size|height|inline-size|width)\s*:/.test(cell),
    ).toBe(false);
  });

  it("scrolls the GROUP, never the page, when the row cannot fit", () => {
    // The authorization: "page-level horizontal scrolling is not an
    // acceptable outcome, and any bounded scrolling must be internal to the
    // group with the focused cell scrolled into view."
    const row = rule(".zakhmban-otp-cells {");
    expect(row).toContain("overflow-x: auto");
    expect(cell).toContain("scroll-margin-inline");
  });

  it("takes the approved 12px small-control radius", () => {
    // "OtpInput cells use the approved 12px small-control geometry."
    expect(cell).toContain("border-radius: var(--radius-control)");
  });

  it("borrows no other control's geometry role", () => {
    // Decision B §B.4's lesson: a value that merely matches is not a role.
    // An OTP cell is neither an input nor a button.
    expect(css).not.toContain("--control-height-input");
    expect(css).not.toContain("--control-height-button");
  });
});

describe("OtpInput typography — Rulings 2 and 3", () => {
  it("gives the digits the --text-card-title step with no line-height override", () => {
    for (const token of [
      "var(--text-card-title-size)",
      "var(--text-card-title-line-height)",
      "var(--text-card-title-weight)",
    ]) {
      expect(cell, `digits omit ${token}`).toContain(token);
    }
    expect(cell).toContain("color: var(--text-primary)");
    // §2.2 requires tabular figures for "codes".
    expect(cell).toContain("font-variant-numeric: tabular-nums");
  });

  it("gives the error message the Caption step and --danger-fg", () => {
    const error = rule(".zakhmban-otp-error {");
    for (const token of [
      "var(--text-caption-size)",
      "var(--text-caption-line-height)",
      "var(--text-caption-weight)",
    ]) {
      expect(error, `error omits ${token}`).toContain(token);
    }
    expect(error).toContain("color: var(--danger-fg)");
  });

  it("uses the error border width §2.3 gives an error", () => {
    const invalid = rule('.zakhmban-otp-cell[aria-invalid="true"]');
    expect(invalid).toContain("1.5px");
    expect(invalid).toContain("var(--danger)");
  });
});

describe("OtpInput — the polite status region stays announceable", () => {
  it("is hidden by clipping, not by removal from the accessibility tree", () => {
    // `display: none`, `visibility: hidden` and zero dimensions each hide the
    // region from assistive technology as well as from the eye, which would
    // make §3.2's "result announced politely" announce nothing.
    const status = rule(".zakhmban-otp-status {");
    expect(status).toContain("clip-path");
    expect(status).not.toContain("display: none");
    expect(status).not.toContain("visibility: hidden");
    expect(/(^|[;{\s])(inline-size|block-size)\s*:\s*0/.test(status)).toBe(
      false,
    );
  });
});

describe("OtpInput — the cell must not cap its own length", () => {
  it("sets no maxLength on a cell", () => {
    // Found by instrumenting a real browser, and invisible to jsdom.
    //
    // `maxLength={1}` looks obviously right for a one-digit cell and is
    // actively harmful: the browser REJECTS a multi-character insertion
    // outright, so the `beforeinput` carrying a platform autofill of
    // `one-time-code` — all five digits at once into the first cell —
    // produces no `input` event and the component never sees it. §3.2
    // requires that autofill to work.
    //
    // jsdom's `fireEvent` does not enforce `maxLength`, so the behavioural
    // suite passes either way. This structural assertion is what stops the
    // attribute coming back.
    const source = readFileSync(
      fileURLToPath(
        new URL("../../src/primitives/otp-input.tsx", import.meta.url),
      ),
      "utf8",
    )
      // Comments go first, on the `raw-palette-usage` precedent: the file
      // names the attribute precisely to record why it must not come back,
      // and flagging that explanation would make the reasoning a defect.
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "");
    expect(/maxLength/.test(source), "a cell caps its own length").toBe(false);
    // The matcher is proved, so it cannot pass by matching nothing.
    expect(/maxLength/.test("<input maxLength={1} />")).toBe(true);
  });
});

describe("OtpInput — hygiene specific to this file", () => {
  it("declares no custom property and creates no design value", () => {
    expect(/^\s*--[a-z-]+\s*:/m.test(css)).toBe(false);
    expect(/#[0-9a-fA-F]{3,8}\b/.test(css)).toBe(false);
    expect(/var\(\s*--_/.test(css)).toBe(false);
    expect(
      /var\(\s*--(?:green|blue|red|neutral|white|black)-\d/.test(css),
    ).toBe(false);
  });

  it("leaves D-3's focus indicator alone and sets no direction", () => {
    expect(/(^|[;{\s])outline\s*:/.test(css)).toBe(false);
    expect(css).not.toContain("--focus-indicator");
    expect(/(^|[;{\s])direction\s*:/.test(css)).toBe(false);
  });

  it("styles no cooldown or resend affordance, because it renders none", () => {
    // Ruling 4 puts both in the application.
    for (const forbidden of ["cooldown", "resend", "countdown", "timer"]) {
      expect(css.toLowerCase().includes(forbidden)).toBe(false);
    }
  });
});
