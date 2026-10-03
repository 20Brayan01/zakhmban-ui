/**
 * Internal barrel for the icon module.
 *
 * ADR 0005 §4: `Icon`, `IconProps` and `IconName` are public through the
 * package's single root entry and nothing else is. The registry object, the
 * glyph data and the node types stay package-internal — there is no `./icons`
 * subpath, no deep import, and no published runtime name array. This file
 * exists so `src/index.ts` names one module rather than two.
 */
export { Icon } from "./icon.js";
//# sourceMappingURL=index.js.map