import { describe, expect, it } from "vitest";

import { formatToman } from "../../src/format/money.js";

describe("formatToman", () => {
  it("reproduces the specification's own worked example exactly", () => {
    // UI System Specification v0.2 §4.4: «پرداخت ۶۰٫۰۰۰ تومان از درگاه».
    expect(formatToman(60_000)).toBe("۶۰٫۰۰۰ تومان");
  });

  it("formats zero", () => {
    expect(formatToman(0)).toBe("۰ تومان");
  });

  it("does not group amounts under one thousand", () => {
    expect(formatToman(5)).toBe("۵ تومان");
    expect(formatToman(999)).toBe("۹۹۹ تومان");
  });

  it("groups by exactly three digits, repeating for large amounts", () => {
    expect(formatToman(1_000)).toBe("۱٫۰۰۰ تومان");
    expect(formatToman(1_234_567)).toBe("۱٫۲۳۴٫۵۶۷ تومان");
  });

  it("matches the documented default registration fee and access fee", () => {
    // Business Rules §5.1 / §7.2 defaults — realistic amounts this formatter
    // will actually be asked to render.
    expect(formatToman(150_000)).toBe("۱۵۰٫۰۰۰ تومان");
    expect(formatToman(350_000)).toBe("۳۵۰٫۰۰۰ تومان");
  });

  it("renders a negative amount with a leading ASCII hyphen", () => {
    expect(formatToman(-1_234)).toBe("-۱٫۲۳۴ تومان");
  });

  it("uses the exact grouping character the specification names, not Intl's locale default", () => {
    // U+066B (ARABIC DECIMAL SEPARATOR), not U+066C (ARABIC THOUSANDS
    // SEPARATOR) — Intl.NumberFormat("fa") groups with the latter by
    // default, which is why this formatter groups by hand.
    expect(formatToman(60_000)).toContain("٫");
    expect(formatToman(60_000)).not.toContain("٬");
  });

  it("contains no invisible bidi control characters", () => {
    // Intl.NumberFormat's own negative-number output inserts a U+200E
    // LEFT-TO-RIGHT MARK before the sign; this formatter must not. Listed by
    // explicit code point, deliberately, rather than embedding an invisible
    // character directly in this source file where it could not be read
    // back or reviewed.
    const BIDI_CONTROL_CODE_POINTS = [
      0x200e, // LEFT-TO-RIGHT MARK
      0x200f, // RIGHT-TO-LEFT MARK
      0x202a, // LEFT-TO-RIGHT EMBEDDING
      0x202b, // RIGHT-TO-LEFT EMBEDDING
      0x202c, // POP DIRECTIONAL FORMATTING
      0x202d, // LEFT-TO-RIGHT OVERRIDE
      0x202e, // RIGHT-TO-LEFT OVERRIDE
      0x2066, // LEFT-TO-RIGHT ISOLATE
      0x2067, // RIGHT-TO-LEFT ISOLATE
      0x2068, // FIRST STRONG ISOLATE
      0x2069, // POP DIRECTIONAL ISOLATE
    ];

    const output = formatToman(-1_234);
    for (const char of output) {
      expect(BIDI_CONTROL_CODE_POINTS).not.toContain(char.codePointAt(0));
    }
  });

  it("rejects a non-integer amount", () => {
    expect(() => formatToman(60_000.5)).toThrow(RangeError);
  });

  it("rejects NaN and Infinity", () => {
    expect(() => formatToman(NaN)).toThrow(RangeError);
    expect(() => formatToman(Infinity)).toThrow(RangeError);
    expect(() => formatToman(-Infinity)).toThrow(RangeError);
  });
});
