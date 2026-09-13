import { describe, expect, it } from "vitest";

import { toPersianDigits } from "../../src/format/digits.js";

describe("toPersianDigits", () => {
  it("converts every ASCII digit 0-9", () => {
    expect(toPersianDigits("0123456789")).toBe("۰۱۲۳۴۵۶۷۸۹");
  });

  it("accepts a number directly", () => {
    expect(toPersianDigits(1404)).toBe("۱۴۰۴");
  });

  it("converts zero", () => {
    expect(toPersianDigits(0)).toBe("۰");
  });

  it("leaves non-digit characters untouched, including a negative sign and a decimal point", () => {
    expect(toPersianDigits("-3.14")).toBe("-۳.۱۴");
  });

  it("leaves separators and letters untouched inside a mixed string", () => {
    expect(toPersianDigits("v1.2.3-rc.10")).toBe("v۱.۲.۳-rc.۱۰");
  });

  it("leaves an all-non-digit string unchanged", () => {
    expect(toPersianDigits("تومان")).toBe("تومان");
  });

  it("returns an empty string for an empty string", () => {
    expect(toPersianDigits("")).toBe("");
  });
});
