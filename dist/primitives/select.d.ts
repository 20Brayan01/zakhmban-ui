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
import { type ChangeEventHandler, type CSSProperties, type Ref, type SelectHTMLAttributes } from "react";
/** One entry of `options†`. A value and the text shown for it, and no more. */
export interface SelectOption {
    /** The submitted value. */
    value: string;
    /** The visible text. */
    label: string;
}
type PassThrough = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "className" | "onChange" | "style" | "value">;
export interface SelectProps extends PassThrough {
    /** The field's accessible name, rendered as a real `<label>`. Required. */
    label: string;
    /** The closed list of choices. Required. */
    options: readonly SelectOption[];
    /** The controlled value. */
    value?: string;
    /** Native change handler for the underlying select. */
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    /** Supporting text, described to assistive technology. */
    hint?: string;
    /** The error message. Its presence is what puts the field in the error state. */
    error?: string;
    /**
     * Text for the empty choice shown before anything is selected. It is an
     * unselectable placeholder entry, never the field's name: v0.2 §3.2's
     * "Never placeholder-as-label" governs here exactly as it governs
     * `TextField`, and `label` stays required.
     */
    placeholder?: string;
    /** Applied to the outermost node, with `style` and the forwarded ref. */
    className?: string;
    /** Applied to the outermost node. */
    style?: CSSProperties;
    /** Forwarded to the outermost DOM node, as v0.2 §3 requires. */
    ref?: Ref<HTMLDivElement>;
}
export declare function Select({ label, options, value, onChange, hint, error, placeholder, className, style, ref, id, "aria-describedby": callerDescribedBy, ...rest }: SelectProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=select.d.ts.map