import { describe, expect, it } from "vitest";

import { maskPhoneDisplay } from "../../src/format/phone.js";

describe("maskPhoneDisplay", () => {
  it("masks every digit except the last four", () => {
    // Frozen Technical Architecture v1.1: a masked phone shows "the last
    // four digits". 09121234567 is an 11-digit Iranian mobile number.
    expect(maskPhoneDisplay("09121234567")).toBe("*******4567");
  });

  it("preserves spaces and their positions", () => {
    expect(maskPhoneDisplay("0912 123 4567")).toBe("**** *** 4567");
  });

  it("preserves hyphens and their positions", () => {
    expect(maskPhoneDisplay("0912-123-4567")).toBe("****-***-4567");
  });

  it("preserves a leading + and international-format digits", () => {
    expect(maskPhoneDisplay("+98 912 123 4567")).toBe("+** *** *** 4567");
  });

  it("does not convert digits to Persian glyphs", () => {
    // UI System Specification v0.2 §5: phone numbers stay Latin/LTR, unlike
    // money and dates, which are rendered in Persian digits.
    const output = maskPhoneDisplay("09121234567");
    expect(output).toMatch(/^[0-9*]+$/);
  });

  it("reveals all digits when there are four or fewer, since none precede the last four", () => {
    expect(maskPhoneDisplay("1234")).toBe("1234");
    expect(maskPhoneDisplay("123")).toBe("123");
    expect(maskPhoneDisplay("1")).toBe("1");
  });

  it("returns an empty string unchanged", () => {
    expect(maskPhoneDisplay("")).toBe("");
  });

  it("returns a string with no digits unchanged", () => {
    expect(maskPhoneDisplay("no-digits-here")).toBe("no-digits-here");
  });

  it("throws TypeError for a non-string input", () => {
    // @ts-expect-error — deliberately calling with the wrong runtime type,
    // since a permissive caller (plain JS, or `any`-typed data crossing an
    // API boundary) can still reach this function with one.
    expect(() => maskPhoneDisplay(9121234567)).toThrow(TypeError);
    // @ts-expect-error — same, for null.
    expect(() => maskPhoneDisplay(null)).toThrow(TypeError);
  });
});
