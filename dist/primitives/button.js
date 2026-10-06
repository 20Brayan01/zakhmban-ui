import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
 *   - nothing about the defaults. They are NOT this file's choice: the
 *     Button Default Variant and Size Ruling of 2026-10-06 fixes `variant` to
 *     `secondary` and `size` to `md`, and §3.2 fixes `tone` to `green`. The
 *     ruling exists because §3.2 marks none of the three with † and supplies
 *     a default only for tone, so the other two were unstated — and the
 *     registry's rules are that "Silence never creates permission" and that a
 *     deferral "must not be filled by an implementer".
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
import {} from "react";
import { Icon } from "../icons/index.js";
export function Button({ 
/* Button Default Variant and Size Ruling, 2026-10-06. `secondary` so that
   §3.2's "One primary per screen" cannot be defeated by omission: a
   primary-by-default control would make every Button whose `variant` a
   caller forgot into a primary one. A `primary` Button must be asked for.
   `tone` is §3.2's own default and is unchanged. */
variant = "secondary", tone = "green", size = "md", block, disabled, loading, iconStart, onClick, children, className, ref, ...rest }) {
    const isLoading = loading === true;
    const isDisabled = disabled === true;
    /**
     * "blocks re-entry" — the whole of it. The guard stops the handler, and
     * `preventDefault` stops the activation behaviour the element would have
     * had anyway: a `<button>` inside a form submits on click, and a loading
     * button that still submitted would be re-entered by the platform rather
     * than by the handler.
     */
    const handleClick = (event) => {
        if (isLoading || isDisabled) {
            event.preventDefault();
            return;
        }
        onClick?.(event);
    };
    /* One class per axis. The tone class applies to every variant: it drives a
       fill on `primary`, a border plus ink on `secondary`, and ink alone on
       `text`, so the three variants read one tone value rather than nine
       variant-tone rules. */
    const classes = [
        "zakhmban-button",
        `zakhmban-button-${variant}`,
        `zakhmban-button-${tone}`,
        `zakhmban-button-${size}`,
    ];
    if (block === true) {
        classes.push("zakhmban-button-block");
    }
    if (className !== undefined) {
        classes.push(className);
    }
    return (_jsxs("button", { ...rest, ref: ref, className: classes.join(" "), disabled: isDisabled, onClick: handleClick, ...(isLoading
            ? { "aria-busy": true, "aria-disabled": true }
            : {}), children: [iconStart === undefined ? null : (
            /* §3.1: decorative by default, and the label on the control carries
               the name. Size and colour are the Icon's own defaults — this file
               introduces no icon geometry. */
            _jsx(Icon, { name: iconStart, color: "currentColor" })), _jsx("span", { className: "zakhmban-button-label", children: children })] }));
}
//# sourceMappingURL=button.js.map