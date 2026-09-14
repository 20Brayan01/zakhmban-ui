/**
 * `src/validation/` — internal layout for the Validation Helpers capability
 * (UI System Specification v0.2 §7 package-structure diagram).
 *
 * ADR 0002 (docs/adr/0002-validation-helpers-contract.md): both functions
 * below are exported from the package root (`@zakhmban/ui`), not behind a
 * deep entry — the specification reserves exactly three deep entries and
 * validation is not one of them. This barrel exists only so `src/index.ts`
 * stays a plain re-export list; no `package.json` subpath points at this
 * file itself, so it is not, on its own, part of the public contract.
 */
export { normalizeIranianMobile } from "./phone.js";
export { isValidIranianNationalId } from "./national-id.js";
//# sourceMappingURL=index.d.ts.map