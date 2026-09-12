/**
 * Phone number display masking.
 *
 * Frozen Technical Architecture v1.1 (`RequestSupportDto`, and the Support
 * permission table): a masked phone shows "the last four digits" and hides
 * the rest. This function implements exactly that transformation and
 * nothing else.
 *
 * It is presentational only — it does not normalise a phone number to a
 * canonical form, validate that one was given, or know anything about OTP
 * or authentication. Normalisation and validation are explicitly the
 * Validation Helpers stage's responsibility (UI System Specification v0.2
 * §7.2's `validation/` module), not this one's; mixing the two here would
 * make this formatter silently reject input that masking never needed to
 * understand in the first place.
 *
 * Digits are **not** converted to Persian glyphs. UI System Specification
 * v0.2 §5 ("Mixed Persian / Latin") places phone numbers explicitly among
 * the technical values that "stay Latin and LTR" — the same list as request
 * codes, tracking numbers and IBANs. Converting them here would contradict
 * that rule for every consumer of this function.
 */
/**
 * Masks every digit in `phone` except the last four, replacing each masked
 * digit with `*` and leaving every other character — spaces, hyphens, a
 * leading `+` — exactly where it was:
 *
 * - `maskPhoneDisplay("09121234567")` → `"*******4567"`
 * - `maskPhoneDisplay("0912 123 4567")` → `"**** *** 4567"`
 *
 * When `phone` contains four or fewer digits, there are no digits *before*
 * the last four to mask, so all of them stay visible — this is the literal
 * consequence of "the last four digits" for a short input, not a special
 * case. An empty string, or a string with no digits at all, is returned
 * unchanged.
 *
 * Throws `TypeError` if `phone` is not a string.
 */
export declare function maskPhoneDisplay(phone: string): string;
//# sourceMappingURL=phone.d.ts.map