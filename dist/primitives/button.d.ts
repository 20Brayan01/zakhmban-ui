/**
 * Button — one of the five primitives frozen by Technical Architecture v1.1
 * §2.1, implemented under the Button Implementation Authorization of
 * 2026-10-06.
 *
 * The contract it implements, none of which is decided here:
 *
 *   v0.2 §3.2   the eight props `variant tone size block disabled loading
 *               iconStart onClick`; variants primary / secondary (outline) /
 *               text; tones green (default), blue, red; sizes sm / md / lg;
 *               the states default, hover, press, focus, disabled, loading;
 *               and "Loading keeps the label, sets `aria-busy`, and blocks
 *               re-entry."
 *   v0.2 §3     `className` / `style` / `id` / `data-*` / `aria-*`
 *               pass-through, and the ref forwarded to the outermost DOM
 *               node — which here is the `<button>` itself.
 *   Decision B  `sm` has a minimum visible block size of 44px, expressed
 *               through `--control-min-target` (§B.3); `md` 48 and `lg` 52
 *               are unchanged (§B.2).
 *   Ruling 1    `md` and `lg` resolve through `--control-height-button-md`
 *               and `--control-height-button-lg`. `--control-height-input`
 *               is not used for a Button.
 *   §3.1        an icon-only control carries its label on the control, not
 *               on the icon — so `iconStart` is always decorative here and
 *               the button's own text is its accessible name.
 *
 * WHAT THIS FILE CHOOSES, because the contract left it open:
 *
 *   - `variant` defaults to `primary` and `size` to `md`. §3.2 marks a
 *     default for `tone` only ("green (default)") and marks none of the three
 *     with †, so each is optional and each needs one. `md` 48px is the middle
 *     size and matches the approved input height, so a Button set beside a
 *     TextField aligns. This is the one judgement call in the file and it is
 *     flagged in the pull request.
 *   - loading leaves the button FOCUSABLE and blocks re-entry by guarding the
 *     handler and preventing the default action, rather than by disabling it.
 *     A disabled control drops out of the tab order and stops being
 *     announced, which would contradict "keeps the label"; `aria-disabled`
 *     reports the state without removing it from the page.
 *   - no spinner. The authorization is explicit: no approved glyph is a
 *     spinner, and ADR 0004 §8 scopes `zakhmban-spin` to Tier 2.
 *   - `type` is not defaulted. A `<button>` in a form submits by default and
 *     that is the platform's behaviour, not this component's to overturn; a
 *     caller who wants otherwise passes `type`, which reaches the element
 *     through native pass-through.
 *
 * None of those is a public contract, and each can change without a ruling.
 */
import { type ButtonHTMLAttributes, type MouseEventHandler, type ReactNode, type Ref } from "react";
import { type IconName } from "../icons/index.js";
/** The three approved variants, closed at the type level. */
export type ButtonVariant = "primary" | "secondary" | "text";
/** The three approved tones. §3.2: "green (default), blue, red". */
export type ButtonTone = "green" | "blue" | "red";
/** The three approved sizes. §3.2: "Sizes sm 40 / md 48 / lg 52" — `sm` is a 44px minimum by Decision B. */
export type ButtonSize = "sm" | "md" | "lg";
/**
 * Native attributes that pass straight through to the real `<button>`:
 * `type`, `name`, `value`, `form`, `autoFocus`, `onFocus`, `onBlur`,
 * `data-*`, `aria-*` and the rest. The four this component owns are removed
 * so they cannot arrive twice.
 */
type PassThrough = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled" | "onClick" | "aria-busy">;
export interface ButtonProps extends PassThrough {
    /** Visual weight. Defaults to `primary`. */
    variant?: ButtonVariant;
    /** Semantic tone. Defaults to `green`, per §3.2. */
    tone?: ButtonTone;
    /** Control size. Defaults to `md`. */
    size?: ButtonSize;
    /** Fills the inline axis of its container. */
    block?: boolean;
    /** Disables the control. §3.2: never disable without a visible reason nearby. */
    disabled?: boolean;
    /** Keeps the label, sets `aria-busy`, and blocks re-entry. */
    loading?: boolean;
    /** A decorative leading glyph, by name from the approved registry. */
    iconStart?: IconName;
    /** Activation handler. Not called while disabled or loading. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** The label. It is the button's accessible name and survives `loading`. */
    children?: ReactNode;
    /** Forwarded to the outermost DOM node, as v0.2 §3 requires. */
    ref?: Ref<HTMLButtonElement>;
}
export declare function Button({ variant, tone, size, block, disabled, loading, iconStart, onClick, children, className, ref, ...rest }: ButtonProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=button.d.ts.map