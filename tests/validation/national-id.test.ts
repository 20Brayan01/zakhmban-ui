import { describe, expect, it } from "vitest";

import { isValidIranianNationalId } from "../../src/validation/national-id.js";

/**
 * Test vectors below are not taken from an external source; each is derived
 * by applying ADR 0002's documented checksum arithmetic by hand and
 * recorded here with the derivation, so the vector is independently
 * checkable without trusting this file's own implementation:
 *
 * "1274977411" — d0..d8 = 1,2,7,4,9,7,7,4,1
 *   sum = 1*10+2*9+7*8+4*7+9*6+7*5+7*4+4*3+1*2
 *       = 10+18+56+28+54+35+28+12+2 = 243
 *   243 % 11 = 1 (11*22=242)         → remainder < 2, expected check digit = 1
 *   d9 = 1 → matches. Exercises the "remainder < 2" branch with remainder 1.
 *
 * "0449708993" — d0..d8 = 0,4,4,9,7,0,8,9,9
 *   sum = 0*10+4*9+4*8+9*7+7*6+0*5+8*4+9*3+9*2
 *       = 0+36+32+63+42+0+32+27+18 = 250
 *   250 % 11 = 8 (11*22=242)         → remainder >= 2, expected = 11-8 = 3
 *   d9 = 3 → matches. Exercises the "remainder >= 2" branch.
 *
 * "0111111110" — d0..d8 = 0,1,1,1,1,1,1,1,1
 *   sum = 0*10+1*9+1*8+1*7+1*6+1*5+1*4+1*3+1*2
 *       = 0+9+8+7+6+5+4+3+2 = 44
 *   44 % 11 = 0                      → remainder < 2, expected = 0
 *   d9 = 0 → matches. Exercises the exact "remainder === 0" boundary.
 *
 * Invalid-checksum vectors reuse a valid vector's first nine digits with a
 * wrong check digit, so only the checksum comparison — not the shape — is
 * under test.
 */

describe("isValidIranianNationalId", () => {
  it("accepts a checksum-valid ID (remainder < 2 branch, remainder 1)", () => {
    expect(isValidIranianNationalId("1274977411")).toBe(true);
  });

  it("accepts a checksum-valid ID (remainder >= 2 branch)", () => {
    expect(isValidIranianNationalId("0449708993")).toBe(true);
  });

  it("accepts a checksum-valid ID (remainder === 0 boundary)", () => {
    expect(isValidIranianNationalId("0111111110")).toBe(true);
  });

  it("rejects the same digits with a wrong check digit", () => {
    expect(isValidIranianNationalId("1274977410")).toBe(false);
    expect(isValidIranianNationalId("0449708990")).toBe(false);
  });

  it("rejects every all-identical-digit value, 0 through 9", () => {
    // "0000000000" is checksum-valid by the arithmetic alone (sum = 0,
    // remainder = 0, expected check digit = 0) — this rule is what
    // rejects it anyway, independently of the checksum branch above.
    for (let digit = 0; digit <= 9; digit += 1) {
      expect(isValidIranianNationalId(String(digit).repeat(10))).toBe(false);
    }
  });

  it("rejects a string shorter than 10 digits", () => {
    expect(isValidIranianNationalId("123456789")).toBe(false);
  });

  it("rejects a string longer than 10 digits", () => {
    expect(isValidIranianNationalId("12749774111")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidIranianNationalId("")).toBe(false);
  });

  it("rejects a whitespace-only string", () => {
    expect(isValidIranianNationalId("   ")).toBe(false);
  });

  it("rejects internal whitespace", () => {
    expect(isValidIranianNationalId("127 497741 1")).toBe(false);
  });

  it("rejects hyphenated input", () => {
    expect(isValidIranianNationalId("127-497-7411")).toBe(false);
  });

  it("rejects alphabetic input", () => {
    expect(isValidIranianNationalId("12A4977411")).toBe(false);
  });

  it("accepts Persian digits and normalises to ASCII before checking", () => {
    expect(isValidIranianNationalId("۱۲۷۴۹۷۷۴۱۱")).toBe(true);
  });

  it("accepts Arabic-Indic digits and normalises to ASCII before checking", () => {
    expect(isValidIranianNationalId("١٢٧٤٩٧٧٤١١")).toBe(true);
  });

  it("trims outer whitespace", () => {
    expect(isValidIranianNationalId("  1274977411  ")).toBe(true);
  });

  it("does not mutate its input", () => {
    const input = "  1274977411  ";
    isValidIranianNationalId(input);
    expect(input).toBe("  1274977411  ");
  });

  it("throws TypeError for non-string runtime input", () => {
    // @ts-expect-error — deliberately calling with the wrong runtime type.
    expect(() => isValidIranianNationalId(1274977411)).toThrow(TypeError);
    // @ts-expect-error — same, for null.
    expect(() => isValidIranianNationalId(null)).toThrow(TypeError);
    // @ts-expect-error — same, for undefined.
    expect(() => isValidIranianNationalId(undefined)).toThrow(TypeError);
    // @ts-expect-error — same, for a boolean.
    expect(() => isValidIranianNationalId(false)).toThrow(TypeError);
    // @ts-expect-error — same, for a plain object.
    expect(() => isValidIranianNationalId({})).toThrow(TypeError);
    // @ts-expect-error — same, for an array.
    expect(() => isValidIranianNationalId([])).toThrow(TypeError);
  });
});
