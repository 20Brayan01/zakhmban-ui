/**
 * Shared internals for the two input primitives, `TextField` and `Select`.
 *
 * v0.2 §3.2 says of `Select`: "Same geometry and states as TextField". That
 * sentence is why this file exists — the label, hint and error apparatus and
 * the class names are written once and both components use them, so the two
 * cannot drift apart by edit. Nothing here is public: no `./primitives`
 * subpath exists, and the root barrel exports only the two components and
 * their prop types.
 *
 * The CSS class names are the package-owned public identifiers of
 * `field.css`, on the `zakhmban-sheet-*` precedent. There are six, shared
 * between both components rather than six per component.
 */
/** The outermost node: label, control and message in one block. */
export const FIELD = "zakhmban-field";
/** The real `<label>`. Never a placeholder — v0.2 §3.2. */
export const FIELD_LABEL = "zakhmban-field-label";
/** The bordered box carrying the approved 48px / radius-14 geometry. */
export const FIELD_CONTROL = "zakhmban-field-control";
/** The `<input>`, `<textarea>` or `<select>` inside that box. */
export const FIELD_INPUT = "zakhmban-field-input";
/** The optional trailing unit (تومان, سانتی‌متر) — `TextField` only. */
export const FIELD_SUFFIX = "zakhmban-field-suffix";
/** Hint and error share one message class and differ by ink and role. */
export const FIELD_MESSAGE = "zakhmban-field-message";
/**
 * `aria-describedby`, composed rather than overwritten.
 *
 * v0.2 §3.2 requires hint and error to be "wired via aria-describedby", and
 * §3 requires `aria-*` pass-through. Both are true at once only if a
 * caller-supplied value survives: a component that replaced it would silently
 * drop the description the application attached, and a component that ignored
 * its own ids would not satisfy §3.2. Order puts the component's own ids
 * last, after the caller's, so the error is the final thing announced.
 *
 * Returns `undefined` rather than an empty string when there is nothing to
 * describe, because `aria-describedby=""` is a present attribute pointing at
 * no element.
 */
export function describedBy(...ids) {
    const present = ids.filter((id) => typeof id === "string");
    return present.length > 0 ? present.join(" ") : undefined;
}
//# sourceMappingURL=field.js.map