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

const PERSIAN_DIGITS_START = 0x06f0; // ۰
const PERSIAN_DIGITS_END = 0x06f9; // ۹
const ARABIC_INDIC_DIGITS_START = 0x0660; // ٠
const ARABIC_INDIC_DIGITS_END = 0x0669; // ٩

const NON_ASCII_DIGIT = /[۰-۹٠-٩]/g;

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
export function toAsciiDigits(value: string): string {
  return value.replace(NON_ASCII_DIGIT, (character) => {
    const code = character.charCodeAt(0);
    const isPersian =
      code >= PERSIAN_DIGITS_START && code <= PERSIAN_DIGITS_END;
    const isArabicIndic =
      code >= ARABIC_INDIC_DIGITS_START && code <= ARABIC_INDIC_DIGITS_END;
    const start = isPersian
      ? PERSIAN_DIGITS_START
      : isArabicIndic
        ? ARABIC_INDIC_DIGITS_START
        : code;
    return String(code - start);
  });
}
