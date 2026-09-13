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
export declare function formatToman(amount: number): string;
//# sourceMappingURL=money.d.ts.map