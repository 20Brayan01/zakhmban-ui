import { describe, expect, it } from "vitest";

describe("utils/format export", () => {
  it("resolves and imports as an ES module through the package's own name", async () => {
    // Imports by the public specifier a real consumer would write —
    // "@zakhmban/ui/utils/format" — not a relative path into dist/. Node's
    // self-reference resolution walks up from this file to the nearest
    // package.json and resolves the subpath through its own `exports` map,
    // so this exercises the exact same mechanism
    // `github:20Brayan01/zakhmban-ui#vX.Y.Z` resolves for a real consumer,
    // including the `exports` map, not just "a file exists on disk"
    // (exports-contract.test.ts already checks that half).
    const entry = await import("@zakhmban/ui/utils/format");
    expect(entry).toBeDefined();
  });

  it("exports exactly the five documented formatter capabilities, and nothing else", async () => {
    // README "Reserved deep entries" and Frozen Technical Architecture v1.1
    // §2: "Persian/Jalali date and number formatting, Toman formatting,
    // phone display masking" (duration named alongside these in the UI
    // System Specification's restatement of the same list). A sixth export
    // appearing here without a reviewed diff to this list is exactly the
    // kind of silent surface growth this test exists to catch.
    const entry = await import("@zakhmban/ui/utils/format");
    expect(Object.keys(entry).sort()).toEqual(
      [
        "formatDuration",
        "formatJalaliDate",
        "formatToman",
        "maskPhoneDisplay",
        "toPersianDigits",
      ].sort(),
    );
  });

  it("produces correct, real output when called through that same import", async () => {
    // Not a re-test of formatter behaviour (tests/format/*.test.ts already
    // covers that against the TypeScript source) — this specifically proves
    // the *built* artifact behind the public subpath behaves the same way,
    // since a source-only test could pass while a stale or mis-pointed
    // dist/ entry silently shipped something else.
    const { formatToman, formatJalaliDate, formatDuration, maskPhoneDisplay } =
      await import("@zakhmban/ui/utils/format");

    expect(formatToman(60_000)).toBe("۶۰٫۰۰۰ تومان");
    expect(formatJalaliDate("2025-08-05")).toBe("۱۴ مرداد ۱۴۰۴");
    expect(formatDuration(23 * 60 + 14)).toBe("۲۳:۱۴ باقی");
    expect(maskPhoneDisplay("09121234567")).toBe("*******4567");
  });
});
