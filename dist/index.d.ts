/**
 * @zakhmban/ui — the single public entry point.
 *
 * UI System Specification v0.2 §7 ("Exports"): one public entry with named
 * exports only, no default export, and no deep import into an internal path —
 * path stability inside the package is not part of the contract.
 *
 * Each capability arrives in its own commit and widens this barrel by a
 * reviewed diff:
 *
 *   formatters  → Jalali dates, Persian numerals, Toman, duration, phone
 *                 display masking                      (deep entry /utils/format)
 *   validation  → phone normalisation, national-ID checksum          (below)
 *   tokens      → generated typed token object         (deep entry /tokens)
 *   styles      → token CSS and static styles          (deep entry /styles)
 *   icons       → the permanent Icon abstraction and its registry
 *   primitives  → Button, TextField, Select, OtpInput, BottomSheet —
 *                 exactly five, frozen by Technical Architecture v1.1 §2.
 *                 A sixth requires an ADR in this repository.
 *
 * Nothing here may ever import a framework, perform data fetching, handle
 * authentication, resolve routes, or carry application-specific strings
 * (frozen v1.1 §2.1).
 *
 * Validation Helpers' full public contract — accepted input, digit-script
 * handling, invalid-input and runtime-type semantics — is recorded in
 * docs/adr/0002-validation-helpers-contract.md, not restated here.
 */
export { normalizeIranianMobile, isValidIranianNationalId, } from "./validation/index.js";
//# sourceMappingURL=index.d.ts.map