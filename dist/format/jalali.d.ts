/**
 * Jalali (Persian solar) calendar date presentation.
 *
 * UI System Specification v0.2 §5 gives the exact target output for this
 * function as its own worked example: «۱۴ مرداد ۱۴۰۴». Frozen Technical
 * Architecture v1.1 §2 and §7 of the spec both say the package contains
 * "Persian/Jalali date … formatting" and explicitly forbid a date library —
 * "Jalali formatting is a small internal utility." This function is that
 * utility: it delegates the entire Gregorian→Jalali conversion and Persian
 * digit rendering to the JavaScript engine's built-in ICU data via `Intl`,
 * rather than shipping calendar-math or a dependency.
 *
 * Verified against this runtime's `Intl` (Node 22, full ICU): formatting the
 * Gregorian date 2025-08-05 with the exact options below reproduces the
 * specification's example byte-for-byte, including the Persian digits and
 * the month name — see `tests/format/jalali.test.ts`.
 *
 * Timezone safety (the documented input contract). A calendar date has no
 * time of day and no timezone; a JavaScript `Date` is an instant that has
 * both. Formatting a `Date` naively with the *host machine's* local timezone
 * is exactly how a date-only value silently becomes the wrong calendar day
 * on a different machine. This module removes that hazard by construction:
 * every input is resolved to a calendar date using UTC components only, and
 * `Intl.DateTimeFormat` is pinned to `timeZone: "UTC"` — the host's local
 * timezone configuration never enters the computation, so output is
 * identical on every machine regardless of where it runs.
 */
/**
 * A plain Gregorian calendar date — the day a wall calendar shows, with no
 * time of day and no timezone attached. Named for the calendar it holds,
 * not the calendar `formatJalaliDate` renders into — this is the function's
 * *input* shape; the Jalali (Persian) result is always a rendered string,
 * never a structured value this module hands back.
 */
export interface GregorianCalendarDate {
    /** Gregorian year, e.g. `2026`. */
    readonly year: number;
    /** Gregorian month, `1`–`12`. */
    readonly month: number;
    /** Gregorian day of month, `1`–`31`. */
    readonly day: number;
}
/**
 * The accepted input contract for `formatJalaliDate`:
 *
 * - a `Date` — its calendar date is read from **UTC** components
 *   (`getUTCFullYear`/`getUTCMonth`/`getUTCDate`), never local components.
 *   If the `Date` represents a specific local-time instant near midnight,
 *   normalise it to a date-only value yourself before calling this function
 *   — this module cannot recover the timezone that instant was created in.
 * - a `{ year, month, day }` object — Gregorian calendar components,
 *   interpreted directly with no timezone conversion of any kind.
 * - an ISO date-only string in the exact form `"YYYY-MM-DD"` — no time
 *   component, no timezone offset. `"2026-09-12T00:00:00Z"` is rejected:
 *   accepting it would invite exactly the ambiguity this contract exists to
 *   remove.
 */
export type JalaliDateInput = Date | GregorianCalendarDate | string;
/**
 * Renders a Gregorian calendar date as a long-form Jalali date string, e.g.
 * `formatJalaliDate("2025-08-05")` → `"۱۴ مرداد ۱۴۰۴"`.
 *
 * Throws `RangeError` for anything outside the documented input contract: an
 * invalid `Date`, a string that is not exactly `"YYYY-MM-DD"`, non-integer
 * calendar components, or a day/month combination that is not a real
 * Gregorian date (e.g. day 30 in February). A formatter that silently
 * "corrected" such input to a nearby valid date would be far more dangerous
 * than one that refuses it.
 */
export declare function formatJalaliDate(input: JalaliDateInput): string;
//# sourceMappingURL=jalali.d.ts.map