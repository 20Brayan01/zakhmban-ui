/**
 * Icon — the permanent abstraction of UI System Specification v0.2 §3.1, and
 * the package's first React-bearing module.
 *
 * v0.2 fixes everything visible here and this file decides none of it:
 *
 *   §3.1  a 24px box, a 1.8px stroke with rounded caps, the props
 *         `name† size color strokeWidth`, and `aria-hidden` by default —
 *         "an icon-only control must carry a label on the control, not the
 *         icon", restated by §6 Semantics. Applications reference glyphs by
 *         name and never import an icon library; a direct icon-library
 *         import in app code is a spec violation, which is why the registry
 *         is internal and `IconName` is closed.
 *   §5    mirroring is "a property of the icon, declared in its registry
 *         entry — not a per-usage decision", and the document owns `dir`.
 *
 * COLOUR, exactly as ADR 0005 §1.1 settles it. The default is navy and it is
 * bound: the Token Table fixes "the §3.1 Icon navy default — `--text-primary`
 * `#002A5E`", so the default resolves through that public token and authors
 * no literal. Every other colour arrives at the use site through `color` —
 * §3.1's prop list carries no `tone`, `state` or `variant`, unlike Text,
 * Button, StatusBadge and IconButton, because semantics live on the control.
 * A caller that wants the glyph to inherit from its control passes
 * `color="currentColor"`. No semantic active/destructive mapping exists: owner
 * finding IA-6 leaves "green when active" and "red when destructive" bound to
 * no token identifier, and filling that in here would be an implementer
 * closing an owner deferral.
 *
 * MIRRORING is applied in SVG user space rather than through CSS. The product
 * is RTL-only (v0.2 decision 2: no LTR mode, no direction switching) and the
 * package must not set or read `direction` (owner D-2), so there is no second
 * direction to branch on — but the DECISION must still be visible, and it is:
 * it lives in the registry's boolean, the artwork stays the LTR-authored
 * original, and the transform below is the mechanical consequence. Inside the
 * fixed `0 0 24 24` box, `translate(24, 0) scale(-1, 1)` maps x to 24 - x, so
 * the flip is exact and needs no `transform-box` or `transform-origin`, both
 * of which differ between engines for SVG.
 */
import { createElement, type SVGProps } from "react";

import { ICON_REGISTRY, type IconName } from "./registry.js";

export type { IconName };

/** The fixed glyph box of v0.2 §3.1, and the upstream artwork's viewBox. */
const BOX = 24;

/** v0.2 §3.1, "1.8px stroke, rounded caps". */
const DEFAULT_STROKE_WIDTH = 1.8;

/** v0.2 §3.1's navy default, bound to the public token by the Token Table. */
const DEFAULT_COLOR = "var(--text-primary)";

/** A horizontal flip within the fixed box: x becomes 24 - x. */
const MIRROR_TRANSFORM = `translate(${BOX}, 0) scale(-1, 1)`;

export interface IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "name" | "color" | "children"
> {
  /** One of the approved glyph names. Closed: an unknown name will not compile. */
  name: IconName;
  /** Rendered width and height in px. Defaults to the 24px box of v0.2 §3.1. */
  size?: number;
  /** Any CSS colour. Defaults to the bound navy `var(--text-primary)`. */
  color?: string;
  /** Stroke width in px. Defaults to 1.8 per v0.2 §3.1. */
  strokeWidth?: number;
  /**
   * `data-*` pass-through. v0.2 §3 requires every component to accept
   * `className`, `style`, `id`, `data-*` and `aria-*`; React's own SVG props
   * cover all but `data-*`, which JSX special-cases and an object literal
   * does not.
   */
  [attribute: `data-${string}`]: unknown;
}

export function Icon({
  name,
  size = BOX,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...rest
}: IconProps) {
  const entry = ICON_REGISTRY[name];

  const shapes = entry.nodes.map(([tag, attributes], index) =>
    // The registry types attributes structurally, as the generated data they
    // are; this narrows them once, at the single point they become React SVG
    // props. The generator rejects any attribute name React would not apply.
    createElement(tag, {
      key: `${name}-${index}`,
      ...(attributes as SVGProps<SVGElement>),
    }),
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${BOX} ${BOX}`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      // Decorative by default (§3.1). Spread last, so a caller that genuinely
      // owns the accessible name can override it — the default is a default,
      // not a lock. `focusable="false"` keeps the glyph out of the tab order
      // in engines that make SVG focusable, supporting §6 Keyboard.
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {entry.mirror ? <g transform={MIRROR_TRANSFORM}>{shapes}</g> : shapes}
    </svg>
  );
}
