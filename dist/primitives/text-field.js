import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * TextField — one of the five primitives frozen by Technical Architecture
 * v1.1 §2.1, implemented under the TextField and Select Implementation
 * Authorization of 2026-10-05.
 *
 * The contract it implements, none of which is decided here:
 *
 *   v0.2 §3.2   the eleven props `label† value onChange hint error required
 *               suffix multiline rows dir inputMode`; the single-line,
 *               multiline and suffix-unit forms; 48px and radius 14; the
 *               states empty, filled, focus, error, disabled and read-only;
 *               "Label is a real `<label>`; hint and error wired via
 *               `aria-describedby`; `aria-invalid` on error. Never
 *               placeholder-as-label."
 *   v0.2 §3     `className` / `style` / `id` / `data-*` / `aria-*`
 *               pass-through, and the ref forwarded to the outermost DOM
 *               node.
 *   v0.2 §6     errors announced with `role="alert"`; real elements first;
 *               full keyboard operation.
 *   Ruling      error text takes the Caption step and `--danger-fg`
 *               (TextField and Select Error Typography Ruling, 2026-10-05).
 *
 * WHAT THIS FILE CHOOSES, because the contract left it open:
 *
 *   - `onChange` is the native React change handler rather than a
 *     `(value: string)` callback. §3.2 names the prop and not its signature,
 *     and the native event is the least invented shape: it carries
 *     `target.value` plus everything else a form needs, and it keeps `value`
 *     / `onChange` an ordinary controlled native pair.
 *   - `disabled` and `readOnly` arrive through native attribute
 *     pass-through, not as declared props. §3.2 names both as states but
 *     puts neither in the prop list; inventing two prop names would be a
 *     larger step than letting the real attributes through to the real
 *     control.
 *   - the bordered box is a wrapper around the control, because the
 *     suffix-unit form needs the unit inside the field's border. The global
 *     `:focus-visible` indicator is left to paint on the control itself,
 *     which is the focusable element D-3 is written about; this file neither
 *     replaces, removes nor re-declares it.
 *   - the suffix is DESCRIBED, not hidden. "تومان" and "سانتی‌متر" are the
 *     unit the number is in, so a field announced without them is announced
 *     wrongly. It joins `aria-describedby` rather than taking
 *     `aria-hidden`, which is what an `Icon`-style decoration would take.
 *
 * None of those is a public contract, and each can change without a ruling.
 */
import { useId, } from "react";
import { describedBy, FIELD, FIELD_CONTROL, FIELD_INPUT, FIELD_LABEL, FIELD_MESSAGE, FIELD_SUFFIX, } from "./field.js";
export function TextField({ label, value, onChange, hint, error, required, suffix, multiline, rows, dir, inputMode, type, className, style, ref, id, "aria-describedby": callerDescribedBy, ...rest }) {
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const suffixId = `${controlId}-suffix`;
    const invalid = typeof error === "string" && error.length > 0;
    const hasHint = typeof hint === "string" && hint.length > 0;
    const hasSuffix = typeof suffix === "string" && suffix.length > 0;
    /**
     * §3.2's two wiring duties in one value. The caller's own
     * `aria-describedby` comes first so the component's hint and error are the
     * last thing announced, and the error is announced even though it also
     * carries `role="alert"` — the live region covers the moment it appears,
     * `aria-describedby` covers every later visit to the field.
     */
    const description = describedBy(callerDescribedBy, hasSuffix && suffixId, hasHint && hintId, invalid && errorId);
    /** Identical for both forms, so a textarea cannot drift from an input. */
    const shared = {
        ...rest,
        id: controlId,
        className: FIELD_INPUT,
        value,
        required,
        "aria-invalid": invalid || undefined,
        "aria-describedby": description,
        ...(dir === undefined ? {} : { dir }),
    };
    return (_jsxs("div", { ref: ref, className: className === undefined ? FIELD : `${FIELD} ${className}`, ...(style === undefined ? {} : { style }), children: [_jsx("label", { className: FIELD_LABEL, htmlFor: controlId, children: label }), _jsxs("div", { className: FIELD_CONTROL, "data-zakhmban-field-invalid": invalid || undefined, children: [multiline === true ? (_jsx("textarea", { ...shared, onChange: onChange, ...(rows === undefined ? {} : { rows }) })) : (_jsx("input", { ...shared, onChange: onChange, ...(type === undefined ? {} : { type }), ...(inputMode === undefined ? {} : { inputMode }) })), hasSuffix ? (_jsx("span", { className: FIELD_SUFFIX, id: suffixId, children: suffix })) : null] }), hasHint ? (_jsx("p", { className: FIELD_MESSAGE, id: hintId, "data-zakhmban-field-message": "hint", children: hint })) : null, invalid ? (_jsx("p", { className: FIELD_MESSAGE, id: errorId, "data-zakhmban-field-message": "error", role: "alert", children: error })) : null] }));
}
//# sourceMappingURL=text-field.js.map