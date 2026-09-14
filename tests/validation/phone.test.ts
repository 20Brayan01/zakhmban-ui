import { describe, expect, it } from "vitest";

import { normalizeIranianMobile } from "../../src/validation/phone.js";

describe("normalizeIranianMobile", () => {
  it("accepts the canonical 09 form unchanged", () => {
    expect(normalizeIranianMobile("09123456789")).toBe("09123456789");
  });

  it("accepts the 9-only form", () => {
    expect(normalizeIranianMobile("9123456789")).toBe("09123456789");
  });

  it("accepts the +98 form", () => {
    expect(normalizeIranianMobile("+989123456789")).toBe("09123456789");
  });

  it("accepts the 0098 form", () => {
    expect(normalizeIranianMobile("00989123456789")).toBe("09123456789");
  });

  it("accepts the 98 form", () => {
    expect(normalizeIranianMobile("989123456789")).toBe("09123456789");
  });

  it("accepts Persian digits and normalises to ASCII", () => {
    expect(normalizeIranianMobile("۰۹۱۲۳۴۵۶۷۸۹")).toBe("09123456789");
  });

  it("accepts Arabic-Indic digits and normalises to ASCII", () => {
    expect(normalizeIranianMobile("٠٩١٢٣٤٥٦٧٨٩")).toBe("09123456789");
  });

  it("accepts a single input mixing ASCII, Persian and Arabic-Indic digits", () => {
    // "+98" + Persian "۹" + ASCII "123456" + Arabic-Indic "٧" + ASCII "89"
    // spells the same number as "+989123456789".
    expect(normalizeIranianMobile("+98۹123456٧89")).toBe("09123456789");
  });

  it("trims outer whitespace, including tabs and newlines", () => {
    expect(normalizeIranianMobile("  09123456789  ")).toBe("09123456789");
    expect(normalizeIranianMobile("\t09123456789\n")).toBe("09123456789");
  });

  it("returns null for an empty string", () => {
    expect(normalizeIranianMobile("")).toBeNull();
  });

  it("returns null for a whitespace-only string", () => {
    expect(normalizeIranianMobile("   ")).toBeNull();
  });

  it("returns null when one digit short", () => {
    expect(normalizeIranianMobile("0912345678")).toBeNull();
  });

  it("returns null when one digit too long", () => {
    expect(normalizeIranianMobile("091234567890")).toBeNull();
  });

  it("returns null for a landline shape", () => {
    expect(normalizeIranianMobile("02112345678")).toBeNull();
  });

  it("returns null for a foreign country code", () => {
    expect(normalizeIranianMobile("+14155552671")).toBeNull();
  });

  it("returns null for alphabetic content", () => {
    expect(normalizeIranianMobile("0912abc4567")).toBeNull();
  });

  it("returns null for internal whitespace", () => {
    expect(normalizeIranianMobile("0912 345 6789")).toBeNull();
  });

  it("returns null for internal hyphens", () => {
    expect(normalizeIranianMobile("0912-345-6789")).toBeNull();
  });

  it("returns null for parentheses", () => {
    expect(normalizeIranianMobile("(0912) 345 6789")).toBeNull();
  });

  it("returns null for a trailing extension", () => {
    expect(normalizeIranianMobile("09123456789x123")).toBeNull();
  });

  it("returns null for a malformed +98 prefix", () => {
    // A stray extra digit inside what looks like a +98 prefix.
    expect(normalizeIranianMobile("+9989123456789")).toBeNull();
    // "+98" followed by too few digits and no leading 9.
    expect(normalizeIranianMobile("+9812345678")).toBeNull();
  });

  it("returns null for a malformed 0098 prefix", () => {
    expect(normalizeIranianMobile("009889123456789")).toBeNull();
  });

  it("returns null for a malformed 98 prefix", () => {
    // Looks like "98" + a mobile number, but one digit short of any
    // accepted form's total length.
    expect(normalizeIranianMobile("98912345678")).toBeNull();
  });

  it("does not mutate its input", () => {
    const input = "0912 345 6789";
    normalizeIranianMobile(input);
    expect(input).toBe("0912 345 6789");
  });

  it("throws TypeError for non-string runtime input", () => {
    // @ts-expect-error — deliberately calling with the wrong runtime type,
    // since a permissive caller (plain JS, or `any`-typed data crossing an
    // API boundary) can still reach this function with one.
    expect(() => normalizeIranianMobile(9123456789)).toThrow(TypeError);
    // @ts-expect-error — same, for null.
    expect(() => normalizeIranianMobile(null)).toThrow(TypeError);
    // @ts-expect-error — same, for undefined.
    expect(() => normalizeIranianMobile(undefined)).toThrow(TypeError);
    // @ts-expect-error — same, for a boolean.
    expect(() => normalizeIranianMobile(true)).toThrow(TypeError);
    // @ts-expect-error — same, for a plain object.
    expect(() => normalizeIranianMobile({})).toThrow(TypeError);
    // @ts-expect-error — same, for an array.
    expect(() => normalizeIranianMobile([])).toThrow(TypeError);
  });
});
