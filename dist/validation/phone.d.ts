/**
 * Iranian mobile number normalisation.
 *
 * ADR 0002 (docs/adr/0002-validation-helpers-contract.md) is the
 * authoritative source for this contract — UI System Specification v0.2 §7
 * names the capability ("phone normalisation") but not its API, which the
 * ADR supplies and this file implements exactly.
 *
 * This is normalisation, not display. `maskPhoneDisplay`
 * (`src/format/phone.ts`) is presentational and deliberately independent:
 * neither function calls the other (ADR 0002, "Separation from
 * Formatters").
 */
/**
 * Normalises a user-entered Iranian mobile number to the canonical form
 * `09XXXXXXXXX`, or returns `null` if `input` does not match one of the five
 * accepted structural forms (`09XXXXXXXXX`, `9XXXXXXXXX`, `+989XXXXXXXXX`,
 * `00989XXXXXXXXX`, `989XXXXXXXXX`).
 *
 * Accepts ASCII, Persian (`۰`–`۹`) and Arabic-Indic (`٠`–`٩`) digits,
 * normalised internally to ASCII before matching. Trims outer Unicode
 * whitespace only — internal whitespace, hyphens, parentheses and any other
 * separator are not stripped, and their presence fails the match and
 * returns `null`.
 *
 * Throws `TypeError` if `input` is not a string. Never throws for a
 * correctly-typed but invalid string — that returns `null`. Does not
 * mutate `input`.
 */
export declare function normalizeIranianMobile(input: string): string | null;
//# sourceMappingURL=phone.d.ts.map