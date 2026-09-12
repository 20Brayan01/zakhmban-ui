/**
 * `@zakhmban/ui/utils/format` — the formatters deep entry.
 *
 * UI System Specification v0.2 §7: "One public entry (`@zakhmban/ui`) with
 * named exports only, plus three deep entries that are part of the
 * contract: `/tokens`, `/styles`, `/utils/format`." This barrel's compiled
 * output is the file `package.json`'s `exports["./utils/format"]` points at
 * — it is deliberately a *separate* public entry from the root `.` export,
 * not something re-exported from `src/index.ts`. The root entry stays empty
 * at this commit (`tests/architecture/source-entry.test.ts`): formatters
 * are reached only through this subpath, exactly as the specification
 * names it.
 *
 * Internal layout note: the specification's package-structure diagram (§7)
 * names this directory `format/`, not `utils/format/` — the public subpath
 * and the internal folder are deliberately different spellings, bridged by
 * the `exports` map entry in `package.json` rather than by mirroring the
 * public path inside `src/`.
 *
 * Five capabilities, matching the README's "Reserved deep entries" table
 * and Frozen Technical Architecture v1.1 §2 verbatim: "Persian/Jalali date
 * and number formatting, Toman formatting, phone display masking" (Persian
 * numerals and duration are named alongside these in the UI System
 * Specification's own restatement of the same list).
 */
export { toPersianDigits } from "./digits.js";
export { formatJalaliDate } from "./jalali.js";
export { formatToman } from "./money.js";
export { formatDuration } from "./duration.js";
export { maskPhoneDisplay } from "./phone.js";
//# sourceMappingURL=index.js.map