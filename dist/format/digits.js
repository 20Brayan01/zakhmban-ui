/**
 * Persian (Extended Arabic-Indic) digit conversion.
 *
 * UI System Specification v0.2 §5: "Persian digits everywhere in product
 * copy." This is the one primitive every other formatter in this module is
 * built on — `formatToman` and `formatDuration` both convert their grouped
 * ASCII digit strings through this function.
 *
 * `formatJalaliDate` does *not* use this: `Intl` produces Persian digits
 * directly for the "fa" locale, and duplicating that work here would be a
 * second, independent place the exact same ten glyphs could drift apart.
 */
/**
 * Converts every ASCII digit (`0`–`9`) in `value` to its Persian digit
 * equivalent (`۰`–`۹`, U+06F0–U+06F9). Every other character — letters,
 * punctuation, the decimal point, a leading `-` sign, whitespace — passes
 * through unchanged.
 *
 * This is a character-level substitution only. It does not group digits,
 * localise a separator, or interpret the input as a number; those are the
 * job of the formatter that calls it (`formatToman`, `formatDuration`).
 *
 * Accepts a `number` for convenience (`String(value)` first), so a raw
 * numeric value can be passed directly without the caller reaching for
 * `String()` themselves.
 */
export function toPersianDigits(value) {
    return String(value).replace(/[0-9]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 0x06f0 - 0x0030));
}
//# sourceMappingURL=digits.js.map