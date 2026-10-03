import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Icon, type IconName, type IconProps } from "../../src/index.js";
import { ICON_REGISTRY } from "../../src/icons/registry.js";

/**
 * Icon behaviour, asserted through the rendered markup.
 *
 * Icon is non-interactive — there is no state, no event handler and nothing
 * to simulate — so its whole contract is what it renders. `renderToStaticMarkup`
 * under the suite's existing `node` environment proves that directly, without
 * jsdom and the three supply-chain entries it brings. That also means **no
 * browser, layout, paint, font or visual verification happens here**: these
 * tests prove the markup is right, not that it looks right.
 */
function render(props: IconProps): string {
  return renderToStaticMarkup(createElement(Icon, props));
}

/** The eleven approved names, in ADR 0005 §7's order. */
const APPROVED: readonly IconName[] = [
  "back",
  "chevron",
  "search",
  "close",
  "check",
  "alert",
  "info",
  "camera",
  "trash",
  "plus",
  "star",
];

/** v0.2 §5's mirror list, intersected with the inventory. */
const MIRRORED: readonly IconName[] = ["back", "chevron"];

describe("Icon · the approved inventory", () => {
  it("is exactly the eleven approved names, in order", () => {
    expect(Object.keys(ICON_REGISTRY)).toEqual([...APPROVED]);
  });

  it("renders every one of them as a drawn 24-box SVG", () => {
    for (const name of APPROVED) {
      const markup = render({ name });
      expect(markup, name).toContain('viewBox="0 0 24 24"');
      // A glyph that renders an empty <svg> is the reference kit's failure
      // mode: no error anywhere, just a blank box.
      expect(markup, name).toMatch(/<(path|circle|line)\b/);
    }
  });

  it("admits no twelfth name, and no excluded one", () => {
    // `clock` is the worked example: v0.2 §5 names it, no specified surface
    // consumes it, and ADR 0005 §7 excludes it on that second rule. It and
    // the nine others must not have drifted in.
    for (const excluded of [
      "clock",
      "forward",
      "lock",
      "wallet",
      "shield",
      "phone",
      "undo",
      "trending",
    ]) {
      expect(Object.keys(ICON_REGISTRY)).not.toContain(excluded);
    }
    expect(Object.keys(ICON_REGISTRY)).toHaveLength(11);
  });
});

describe("Icon · directional mirroring", () => {
  it("mirrors exactly the two directional glyphs, and does so in user space", () => {
    // The flip maps x to 24 - x inside the fixed box, so it needs no
    // transform-box or transform-origin — both of which differ between
    // engines for SVG.
    for (const name of MIRRORED) {
      expect(render({ name }), name).toContain(
        '<g transform="translate(24, 0) scale(-1, 1)">',
      );
    }
  });

  it("mirrors nothing else", () => {
    for (const name of APPROVED.filter((n) => !MIRRORED.includes(n))) {
      expect(render({ name }), name).not.toContain("<g transform=");
    }
  });

  it("stores the LTR-authored artwork rather than a pre-mirrored glyph", () => {
    // The authorization forbids baking the flip into the data: the decision
    // must stay visible as the registry's boolean. `back` is upstream
    // chevron-left and `chevron` is chevron-right, so their path data differs
    // and neither is the other's mirror image already applied.
    expect(ICON_REGISTRY.back.nodes[0]?.[1]["d"]).toBe("m15 18-6-6 6-6");
    expect(ICON_REGISTRY.chevron.nodes[0]?.[1]["d"]).toBe("m9 18 6-6-6-6");
    expect(ICON_REGISTRY.back.mirror).toBe(true);
    expect(ICON_REGISTRY.chevron.mirror).toBe(true);
  });

  it("declares the flag on every entry, never leaving it to a default", () => {
    for (const [name, entry] of Object.entries(ICON_REGISTRY)) {
      expect(typeof entry.mirror, name).toBe("boolean");
    }
  });
});

describe("Icon · colour", () => {
  it("defaults to the bound navy token and authors no literal", () => {
    // v0.2 §3.1 "Navy default", bound by the Token Table to --text-primary.
    const markup = render({ name: "check" });
    expect(markup).toContain('stroke="var(--text-primary)"');
    expect(markup).not.toMatch(/stroke="#/);
  });

  it("takes any colour from the use site", () => {
    // ADR 0005 §1.1: green-when-active and red-when-destructive are the
    // caller's colour, because §3.1's prop list carries no tone.
    expect(render({ name: "check", color: "var(--success-fg)" })).toContain(
      'stroke="var(--success-fg)"',
    );
    expect(render({ name: "trash", color: "currentColor" })).toContain(
      'stroke="currentColor"',
    );
  });

  it("exposes no tone, state or variant prop", () => {
    // The guard against an implementer closing IA-6 by accident: §3.1's prop
    // list has none of these, and adding one would be a semantic colour
    // mapping the owner has not made. The compiler is the assertion — if a
    // `tone` prop is ever added, @ts-expect-error becomes unused and the
    // typecheck fails. (Unknown props still pass through to the SVG as
    // attributes; that is v0.2 §3's pass-through rule, not a tone API.)
    // @ts-expect-error -- IconProps must not accept a tone prop
    const withTone: IconProps = { name: "alert", tone: "danger" };
    // @ts-expect-error -- IconProps must not accept a variant prop
    const withVariant: IconProps = { name: "alert", variant: "outline" };
    expect([withTone.name, withVariant.name]).toEqual(["alert", "alert"]);
  });
});

describe("Icon · geometry and accessibility", () => {
  it("renders the 24px box and 1.8px rounded stroke by default", () => {
    const markup = render({ name: "plus" });
    expect(markup).toContain('width="24"');
    expect(markup).toContain('height="24"');
    expect(markup).toContain('stroke-width="1.8"');
    expect(markup).toContain('stroke-linecap="round"');
    expect(markup).toContain('stroke-linejoin="round"');
    expect(markup).toContain('fill="none"');
  });

  it("honours size and strokeWidth overrides", () => {
    const markup = render({ name: "plus", size: 16, strokeWidth: 2 });
    expect(markup).toContain('width="16"');
    expect(markup).toContain('height="16"');
    expect(markup).toContain('stroke-width="2"');
    // The box is fixed even when the rendered size is not.
    expect(markup).toContain('viewBox="0 0 24 24"');
  });

  it("is decorative by default and out of the tab order", () => {
    // v0.2 §3.1: "Decorative by default (aria-hidden); an icon-only control
    // must carry a label on the control, not the icon."
    const markup = render({ name: "search" });
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('focusable="false"');
  });

  it("lets a caller that owns the accessible name override the default", () => {
    const markup = render({
      name: "search",
      "aria-hidden": false,
      role: "img",
      "aria-label": "جست‌وجو",
    });
    expect(markup).toContain('role="img"');
    expect(markup).toContain('aria-label="جست‌وجو"');
    expect(markup).not.toContain('aria-hidden="true"');
  });

  it("passes className, style, id and data-* through", () => {
    // v0.2 §3's universal pass-through rule.
    const markup = render({
      name: "info",
      className: "w-6",
      id: "x",
      "data-testid": "y",
    });
    expect(markup).toContain('class="w-6"');
    expect(markup).toContain('id="x"');
    expect(markup).toContain('data-testid="y"');
  });

  it("never sets direction — the document owns it", () => {
    // Owner D-2 and v0.2 §5. Mirroring is a transform, not a direction.
    for (const name of APPROVED) {
      expect(render({ name }), name).not.toContain("dir=");
      expect(render({ name }), name).not.toContain("direction");
    }
  });
});
