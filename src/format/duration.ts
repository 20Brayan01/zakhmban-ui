import { toPersianDigits } from "./digits.js";

/**
 * Remaining-duration display formatting.
 *
 * UI System Specification v0.2 §4.5: "Countdowns are shown as remaining
 * duration («۲۳:۱۴ باقی»، «۴۱ ساعت»), never as a raw deadline timestamp
 * alone." Those are this module's two test fixtures, and between them they
 * fix the whole contract:
 *
 *   - `formatDuration(1394)`   → `"۲۳:۱۴ باقی"` (23 minutes 14 seconds)
 *   - `formatDuration(147600)` → `"۴۱ ساعت"`     (41 hours, exactly)
 *
 * The specification gives these two output shapes but not the threshold
 * between them. One hour (3600 seconds) is this module's judgment call,
 * chosen because it is the simplest rule that reproduces both examples
 * exactly with a single cut point, and because the product's own duration
 * vocabulary is hour-scale everywhere it is written down (the 48-hour
 * record deadline, the 72-hour withdrawal SLA, the >12h/<12h record-status
 * strip bands in §3.6) — nowhere does it speak in days, which is why the
 * coarse form here stays "N hours" however large N gets, rather than ever
 * rolling over into a day/hour split that no source describes.
 *
 * `"۰۰:۰۰ باقی"` (a duration of exactly zero) is a valid, deterministic
 * result, not a special "expired" state — this is a presentational
 * primitive with no product/state knowledge, and a caller near a deadline
 * decides what an expired countdown means on the surface it renders on.
 */

/** Reproduces `"۲۳:۱۴ باقی"` below this threshold, `"۴۱ ساعت"` at or above it. */
const ONE_HOUR_IN_SECONDS = 3_600;

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Renders a non-negative whole number of seconds as a remaining-duration
 * string:
 *
 * - under one hour: `"MM:SS باقی"` (zero-padded minutes and seconds, floored
 *   — never rounded, so a countdown never overstates the time left);
 * - one hour or more: `"N ساعت"` (whole hours, floored, no minutes).
 *
 * `totalSeconds` must be a non-negative integer; throws `RangeError`
 * otherwise; this rejects `NaN`, `Infinity`, negative values and fractional
 * seconds in one check, consistent with `formatToman`'s input contract.
 */
export function formatDuration(totalSeconds: number): string {
  if (!Number.isInteger(totalSeconds) || totalSeconds < 0) {
    throw new RangeError(
      `formatDuration: expected a non-negative integer number of seconds, received ${String(totalSeconds)}`,
    );
  }

  if (totalSeconds < ONE_HOUR_IN_SECONDS) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${toPersianDigits(`${pad2(minutes)}:${pad2(seconds)}`)} باقی`;
  }

  const hours = Math.floor(totalSeconds / ONE_HOUR_IN_SECONDS);
  return `${toPersianDigits(hours)} ساعت`;
}
