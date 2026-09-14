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
import { toAsciiDigits } from "./digits.js";
/**
 * The five accepted structural forms, after outer-whitespace trim and digit
 * normalisation: an optional prefix (`0`, `+98`, `0098` or `98`), then a
 * leading `9`, then nine more digits. Carrier/operator prefix allocation is
 * deliberately not checked — this is a structural-shape match only.
 */
const IRANIAN_MOBILE_PATTERN = /^(0|\+98|0098|98)?9\d{9}$/;
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
export function normalizeIranianMobile(input) {
    if (typeof input !== "string") {
        throw new TypeError(`normalizeIranianMobile: expected a string, received ${typeof input}`);
    }
    const normalized = toAsciiDigits(input.trim());
    if (!IRANIAN_MOBILE_PATTERN.test(normalized)) {
        return null;
    }
    // Every accepted form ends with exactly "9" followed by nine digits — the
    // trailing 10 characters are the canonical number with its prefix, if
    // any, already stripped.
    return `0${normalized.slice(-10)}`;
}
//# sourceMappingURL=phone.js.map