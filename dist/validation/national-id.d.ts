/**
 * Iranian national-ID format/checksum validation.
 *
 * ADR 0002 (docs/adr/0002-validation-helpers-contract.md) is the
 * authoritative source for this contract, including the exact checksum
 * arithmetic below.
 *
 * A `true` result means only that the supplied value has a syntactically and
 * arithmetically valid documented format/checksum. It does not verify that a
 * real person exists, ownership of that identity, KYC status, authentication,
 * or government registry status.
 */
/**
 * Validates the syntax and checksum of an Iranian 10-digit national ID.
 *
 * Accepts ASCII, Persian (`۰`–`۹`) and Arabic-Indic (`٠`–`٩`) digits,
 * normalised internally to ASCII before matching. Trims outer Unicode
 * whitespace only — an internal separator (space, hyphen, or otherwise)
 * makes the normalised value fail the exactly-10-digits check and returns
 * `false`. All ten digits identical (`0000000000` through `9999999999`) are
 * rejected outright, before the checksum is evaluated.
 *
 * Checksum, for normalised digits `d0…d9`:
 *
 * ```
 * sum = d0*10 + d1*9 + d2*8 + d3*7 + d4*6 + d5*5 + d6*4 + d7*3 + d8*2
 * remainder = sum % 11
 * expectedCheckDigit = remainder < 2 ? remainder : 11 - remainder
 * ```
 *
 * Valid only when `d9 === expectedCheckDigit`.
 *
 * Throws `TypeError` if `input` is not a string. Never throws for a
 * correctly-typed but invalid string — that returns `false`.
 */
export declare function isValidIranianNationalId(input: string): boolean;
//# sourceMappingURL=national-id.d.ts.map