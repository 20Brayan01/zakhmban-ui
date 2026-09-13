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
const JALALI_DATE_FORMATTER = new Intl.DateTimeFormat("fa", {
    calendar: "persian",
    numberingSystem: "arabext",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
});
const ISO_DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
function resolveCalendarComponents(input) {
    if (input instanceof Date) {
        if (Number.isNaN(input.getTime())) {
            throw new RangeError("formatJalaliDate: received an invalid Date");
        }
        return {
            year: input.getUTCFullYear(),
            month: input.getUTCMonth() + 1,
            day: input.getUTCDate(),
        };
    }
    if (typeof input === "string") {
        const match = ISO_DATE_ONLY_PATTERN.exec(input);
        if (!match) {
            throw new RangeError(`formatJalaliDate: expected a date-only "YYYY-MM-DD" string, received "${input}"`);
        }
        return {
            year: Number(match[1]),
            month: Number(match[2]),
            day: Number(match[3]),
        };
    }
    return input;
}
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
export function formatJalaliDate(input) {
    const { year, month, day } = resolveCalendarComponents(input);
    if (!Number.isInteger(year) ||
        !Number.isInteger(month) ||
        !Number.isInteger(day)) {
        throw new RangeError("formatJalaliDate: year, month and day must all be integers");
    }
    const utc = new Date(Date.UTC(year, month - 1, day));
    const isRealCalendarDate = utc.getUTCFullYear() === year &&
        utc.getUTCMonth() === month - 1 &&
        utc.getUTCDate() === day;
    if (!isRealCalendarDate) {
        throw new RangeError(`formatJalaliDate: ${String(year)}-${String(month)}-${String(day)} is not a valid Gregorian calendar date`);
    }
    return JALALI_DATE_FORMATTER.format(utc);
}
//# sourceMappingURL=jalali.js.map