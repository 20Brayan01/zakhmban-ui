import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { formatJalaliDate } from "../../src/format/jalali.js";

const TIMEZONE_PROBE = fileURLToPath(
  new URL("./fixtures/jalali-timezone-probe.mjs", import.meta.url),
);

describe("formatJalaliDate", () => {
  it("reproduces the specification's own worked example exactly", () => {
    // UI System Specification v0.2 §5: «۱۴ مرداد ۱۴۰۴». 2025-08-05 is the
    // Gregorian date this runtime's ICU resolves to that exact Jalali date —
    // confirmed empirically before writing the implementation.
    expect(formatJalaliDate("2025-08-05")).toBe("۱۴ مرداد ۱۴۰۴");
  });

  it("accepts an ISO date-only string, a calendar object and a Date, and agrees on all three", () => {
    const viaString = formatJalaliDate("2025-08-05");
    const viaObject = formatJalaliDate({ year: 2025, month: 8, day: 5 });
    const viaDate = formatJalaliDate(new Date("2025-08-05T00:00:00Z"));

    expect(viaObject).toBe(viaString);
    expect(viaDate).toBe(viaString);
  });

  it("reads a Date's calendar day from its UTC components, not local components", () => {
    // A late-evening UTC instant: 23:30 UTC on 2025-08-04 is still 2025-08-04
    // in UTC terms, even though it would already be 2025-08-05 in a positive
    // UTC-offset local timezone. This is the exact ambiguity the documented
    // contract resolves by fixing the reference frame to UTC.
    expect(formatJalaliDate(new Date("2025-08-04T23:30:00Z"))).toBe(
      "۱۳ مرداد ۱۴۰۴",
    );
  });

  it("crosses the Jalali new year (Nowruz) correctly in both directions", () => {
    // Verified against this runtime's ICU persian-calendar data directly.
    expect(formatJalaliDate("2025-03-20")).toBe("۳۰ اسفند ۱۴۰۳");
    expect(formatJalaliDate("2025-03-21")).toBe("۱ فروردین ۱۴۰۴");
    // 1404 is not a leap year in the Jalali calendar: Esfand has 29 days.
    expect(formatJalaliDate("2026-03-20")).toBe("۲۹ اسفند ۱۴۰۴");
    expect(formatJalaliDate("2026-03-21")).toBe("۱ فروردین ۱۴۰۵");
  });

  it("produces output built only from Persian digits, a space, and Arabic-script letters", () => {
    // Guards against ICU silently including a bidi control character or a
    // different numbering system, which would break exact-string assertions
    // and could corrupt bidi rendering.
    const output = formatJalaliDate("2025-08-05");
    for (const char of output) {
      const code = char.codePointAt(0)!;
      const isPersianDigit = code >= 0x06f0 && code <= 0x06f9;
      const isArabicScriptLetter = code >= 0x0600 && code <= 0x06ff;
      const isPlainSpace = char === " ";
      expect(
        isPersianDigit || isArabicScriptLetter || isPlainSpace,
        `unexpected character U+${code.toString(16)} in "${output}"`,
      ).toBe(true);
    }
  });

  it('rejects a string that is not exactly "YYYY-MM-DD"', () => {
    // In particular, an ISO instant with a time/timezone component is
    // rejected rather than silently truncated — accepting it would
    // reintroduce the exact ambiguity this contract exists to remove.
    expect(() => formatJalaliDate("2025-08-05T00:00:00Z")).toThrow(RangeError);
    expect(() => formatJalaliDate("2025/08/05")).toThrow(RangeError);
    expect(() => formatJalaliDate("not-a-date")).toThrow(RangeError);
  });

  it("rejects a calendar date that does not exist", () => {
    expect(() => formatJalaliDate({ year: 2025, month: 2, day: 30 })).toThrow(
      RangeError,
    );
    expect(() => formatJalaliDate({ year: 2025, month: 13, day: 1 })).toThrow(
      RangeError,
    );
    expect(() => formatJalaliDate("2025-04-31")).toThrow(RangeError);
  });

  it("rejects non-integer calendar components", () => {
    expect(() => formatJalaliDate({ year: 2025.5, month: 8, day: 5 })).toThrow(
      RangeError,
    );
  });

  it("rejects an invalid Date", () => {
    expect(() => formatJalaliDate(new Date(NaN))).toThrow(RangeError);
  });

  it("is independent of the host machine's local timezone", () => {
    // Spawns the same import three times, once per host timezone, in a
    // fresh process each time (Date/Intl timezone data is resolved once per
    // process, so this cannot be tested by mutating process.env.TZ
    // in-place). All three must agree, including at the two-hour-offset
    // Iran timezone and the UTC+14 extreme.
    const timezones = [
      "UTC",
      "America/Los_Angeles",
      "Asia/Tehran",
      "Pacific/Kiritimati",
    ];
    const outputs = timezones.map(
      (timeZone) =>
        JSON.parse(
          execFileSync(process.execPath, [TIMEZONE_PROBE], {
            env: { ...process.env, TZ: timeZone },
            encoding: "utf8",
          }),
        ) as {
          fromDateInstant: string;
          fromIsoString: string;
          fromCalendarObject: string;
          hostTimezoneOffsetMinutes: number;
        },
    );

    // Sanity check that the environment variable actually took effect in
    // each spawned process — otherwise this test would pass vacuously.
    const offsets = new Set(outputs.map((o) => o.hostTimezoneOffsetMinutes));
    expect(offsets.size).toBeGreaterThan(1);

    for (const result of outputs) {
      expect(result.fromDateInstant).toBe("۱۴ مرداد ۱۴۰۴");
      expect(result.fromIsoString).toBe("۱۴ مرداد ۱۴۰۴");
      expect(result.fromCalendarObject).toBe("۱۴ مرداد ۱۴۰۴");
    }
  });
});
