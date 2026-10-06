import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Select — one of the five primitives frozen by Technical Architecture v1.1
 * §2.1, implemented under the TextField and Select Implementation
 * Authorization of 2026-10-05.
 *
 * The contract it implements, none of which is decided here:
 *
 *   v0.2 §3.2   the seven props `label† options† value onChange hint error
 *               placeholder`; "Same geometry and states as TextField";
 *               "Native control unless a design need forces a listbox".
 *   v0.2 §3     `className` / `style` / `id` / `data-*` / `aria-*`
 *               pass-through, and the ref forwarded to the outermost DOM
 *               node.
 *   v0.2 §6     errors announced with `role="alert"`; real elements first.
 *   Ruling      error text takes the Caption step and `--danger-fg`
 *               (TextField and Select Error Typography Ruling, 2026-10-05).
 *
 * NATIVE, AND NOT A CHOICE THIS FILE MAKES. §3.2 permits a custom listbox
 * only "if a design need forces" one, and the implementation authorization
 * records that no such need has been established: "A custom listbox is not
 * authorized." A real `<select>` therefore carries the whole of this
 * component's keyboard behaviour, its popup, its typeahead and its platform
 * conventions, and none of that is reimplemented here. Were one ever
 * authorized, §3.2 would require full `role="listbox"` keyboard semantics —
 * a separate owner decision and a separate commit.
 *
 * THE NATIVE EXPANDER IS LEFT ALONE. No `appearance: none`, and no package
 * glyph is drawn in its place: §3.2 gives `Select` no icon prop and no
 * canonical source specifies an indicator for it, so replacing the platform
 * one would be an invented visual. The approved geometry — 48px and radius
 * 14 — is shared with `TextField` through one class and does apply.
 *
 * The geometry, label, hint and error apparatus are `field.ts`, shared with
 * `TextField` so "same geometry and states" is true by construction rather
 * than by two edits staying in step.
 */
import { useId, } from "react";
import { describedBy, FIELD, FIELD_CONTROL, FIELD_INPUT, FIELD_LABEL, FIELD_MESSAGE, } from "./field.js";
export function Select({ label, options, value, onChange, hint, error, placeholder, className, style, ref, id, "aria-describedby": callerDescribedBy, ...rest }) {
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const invalid = typeof error === "string" && error.length > 0;
    const hasHint = typeof hint === "string" && hint.length > 0;
    const hasPlaceholder = typeof placeholder === "string" && placeholder.length > 0;
    const description = describedBy(callerDescribedBy, hasHint && hintId, invalid && errorId);
    return (_jsxs("div", { ref: ref, className: className === undefined ? FIELD : `${FIELD} ${className}`, ...(style === undefined ? {} : { style }), children: [_jsx("label", { className: FIELD_LABEL, htmlFor: controlId, children: label }), _jsx("div", { className: FIELD_CONTROL, "data-zakhmban-field-invalid": invalid || undefined, children: _jsxs("select", { ...rest, id: controlId, className: FIELD_INPUT, value: value, onChange: onChange, "aria-invalid": invalid || undefined, "aria-describedby": description, children: [hasPlaceholder ? (_jsx("option", { value: "", disabled: true, children: placeholder })) : null, options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }) }), hasHint ? (_jsx("p", { className: FIELD_MESSAGE, id: hintId, "data-zakhmban-field-message": "hint", children: hint })) : null, invalid ? (_jsx("p", { className: FIELD_MESSAGE, id: errorId, "data-zakhmban-field-message": "error", role: "alert", children: error })) : null] }));
}
//# sourceMappingURL=select.js.map