/**
 * Internal barrel for the primitives module.
 *
 * `BottomSheet` and `BottomSheetProps` are public through the package's
 * single root entry and nothing else is — no `./primitives` subpath, no deep
 * import, and no public `Portal` or `FocusTrap`: Decision A §A.6 keeps both
 * internal to this component.
 */
export { BottomSheet } from "./bottom-sheet.js";
//# sourceMappingURL=index.js.map