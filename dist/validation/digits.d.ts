/**
 * Digit-script normalisation, private to the validation module.
 *
 * ADR 0002 (docs/adr/0002-validation-helpers-contract.md), "Digit-script
 * normalization stays private": both Validation Helpers accept ASCII,
 * Persian and Arabic-Indic digits and normalise them internally to ASCII
 * before structural matching. This is the reverse direction of
 * `src/format/digits.ts`'s `toPersianDigits` (ASCII → Persian, for display)
 * and is deliberately not that function reused backwards. Nothing in
 * `package.json`'s `exports` map points at this file, so it is unreachable
 * from outside the package regardless of what it exports.
 */
/**
 * Converts every Persian (`۰`–`۹`) and Arabic-Indic (`٠`–`٩`) digit in
 * `value` to its ASCII equivalent (`0`–`9`). Every other character —
 * including ASCII digits, whitespace, punctuation and separators — passes
 * through unchanged.
 *
 * A character-level substitution only: it does not trim, validate, or
 * interpret structure. A single input may mix all three digit scripts;
 * each character is converted independently.
 */
export declare function toAsciiDigits(value: string): string;
//# sourceMappingURL=digits.d.ts.map