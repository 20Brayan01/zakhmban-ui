import { describe, expect, it } from "vitest";

import { formatDuration } from "../../src/format/duration.js";

describe("formatDuration", () => {
  it("reproduces both of the specification's worked examples exactly", () => {
    // UI System Specification v0.2 §4.5: «۲۳:۱۴ باقی»، «۴۱ ساعت».
    expect(formatDuration(23 * 60 + 14)).toBe("۲۳:۱۴ باقی");
    expect(formatDuration(41 * 3600)).toBe("۴۱ ساعت");
  });

  it("formats zero as a zero-padded countdown, not a special expired state", () => {
    expect(formatDuration(0)).toBe("۰۰:۰۰ باقی");
  });

  it("zero-pads both minutes and seconds under a minute", () => {
    expect(formatDuration(5)).toBe("۰۰:۰۵ باقی");
  });

  it("floors partial minutes rather than rounding, at the one-hour boundary", () => {
    expect(formatDuration(3_599)).toBe("۵۹:۵۹ باقی");
    expect(formatDuration(3_600)).toBe("۱ ساعت");
    expect(formatDuration(3_601)).toBe("۱ ساعت");
  });

  it("floors whole hours rather than rounding to the nearest hour", () => {
    expect(formatDuration(3_600 * 2 - 1)).toBe("۱ ساعت");
    expect(formatDuration(3_600 * 2)).toBe("۲ ساعت");
  });

  it("matches the documented default record deadline and withdrawal SLA", () => {
    // Business Rules §10.2 (48h record deadline) and §6.3 (72h withdrawal
    // SLA default) — realistic magnitudes this formatter will render.
    expect(formatDuration(48 * 3600)).toBe("۴۸ ساعت");
    expect(formatDuration(72 * 3600)).toBe("۷۲ ساعت");
  });

  it("keeps rendering whole hours for arbitrarily large durations, never switching to a day unit", () => {
    // The product's own documented duration vocabulary is hour-scale
    // (48h, 72h) and never speaks in days; this formatter follows that.
    expect(formatDuration(1000 * 3600)).toBe("۱۰۰۰ ساعت");
  });

  it("rejects a negative duration", () => {
    expect(() => formatDuration(-1)).toThrow(RangeError);
  });

  it("rejects a non-integer number of seconds", () => {
    expect(() => formatDuration(1.5)).toThrow(RangeError);
  });

  it("rejects NaN and Infinity", () => {
    expect(() => formatDuration(NaN)).toThrow(RangeError);
    expect(() => formatDuration(Infinity)).toThrow(RangeError);
  });
});
