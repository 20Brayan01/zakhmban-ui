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
export declare function formatDuration(totalSeconds: number): string;
//# sourceMappingURL=duration.d.ts.map