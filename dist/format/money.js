import { toPersianDigits } from "./digits.js";
/**
 * Toman monetary display formatting.
 *
 * UI System Specification v0.2 §5 gives the exact convention: "Money as
 * Persian digits, «٫» thousands separator, smaller trailing تومان, tabular
 * figures" — and a worked example in §4.4: «پرداخت ۶۰٫۰۰۰ تومان از درگاه»
 * ("pay ۶۰٫۰۰۰ Toman from the gateway"), i.e. `formatToman(60000)` must
 * produce `"۶۰٫۰۰۰ تومان"`. That exact amount is this module's test fixture.
 *
 * The "smaller trailing تومان" and "tabular figures" halves of that sentence
 * are typography — a font-variant-numeric rule and a font-size step applied
 * where this string is rendered — and are not representable in a plain
 * string. They belong to the Tier-2 `Money` component that will eventually
 * call this function, not to the formatter itself (ARCHITECTURE.md: this
 * package supplies formatting, never a component that renders it).
 *
 * `Intl.NumberFormat("fa", …)` was deliberately not used here even though it
 * can produce Persian digits: its default grouping separator for the `fa`
 * locale is `٬` (U+066C, ARABIC THOUSANDS SEPARATOR) — a different character
 * from the `٫` (U+066B, ARABIC DECIMAL SEPARATOR) the specification names —
 * and its negative-number output inserts an invisible U+200E LEFT-TO-RIGHT
 * MARK before the sign. Both were confirmed empirically against this
 * runtime's `Intl` before writing this function. Grouping is therefore done
 * by hand: exact character, no incidental bidi marks, deterministic string
 * output that a test can assert against byte-for-byte.
 *
 * This is a presentational primitive only. It holds no wallet, ledger,
 * commission, escrow or payout concept, and performs no rounding, currency
 * conversion or arithmetic beyond rendering the integer it is given.
 */
const THOUSANDS_SEPARATOR = "٫"; // «٫» — the exact character the spec names, not Intl's default.
/**
 * Renders an integer Toman amount as a Persian-digit string with `٫`
 * grouping every three digits and a trailing ` تومان` suffix, e.g.
 * `formatToman(60000)` → `"۶۰٫۰۰۰ تومان"`, `formatToman(0)` → `"۰ تومان"`.
 *
 * The input contract matches the business rules' own definition of the
 * type: "Money is integer Toman in domain data." `amount` must be a finite
 * integer — `Number.isInteger` alone is sufficient to reject `NaN`,
 * `Infinity` and non-integer values in one check. A negative amount is
 * rendered with a leading `-` (a debit/credit sign is a `Money` component
 * concern via its own `sign` prop, not this function's).
 *
 * Throws `RangeError` for any non-integer input rather than silently
 * rounding or truncating — a money display that quietly hides a fractional
 * Toman value is a worse failure than one that refuses to render it.
 */
export function formatToman(amount) {
    if (!Number.isInteger(amount)) {
        throw new RangeError(`formatToman: expected an integer Toman amount, received ${String(amount)}`);
    }
    const isNegative = amount < 0;
    const magnitude = Math.abs(amount);
    const grouped = String(magnitude).replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);
    return `${isNegative ? "-" : ""}${toPersianDigits(grouped)} تومان`;
}
//# sourceMappingURL=money.js.map