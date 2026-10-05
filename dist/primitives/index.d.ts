/**
 * Internal barrel for the primitives module.
 *
 * Three of the five frozen primitives are implemented. They are public
 * through the package's single root entry and nothing else is — no
 * `./primitives` subpath and no deep import. `Portal` and `FocusTrap` stay
 * internal to `BottomSheet` (Decision A §A.6), and `field.ts` stays internal
 * to the two input primitives that share it.
 */
export { BottomSheet } from "./bottom-sheet.js";
export type { BottomSheetProps } from "./bottom-sheet.js";
export { TextField } from "./text-field.js";
export type { TextFieldProps } from "./text-field.js";
export { Select } from "./select.js";
export type { SelectOption, SelectProps } from "./select.js";
//# sourceMappingURL=index.d.ts.map