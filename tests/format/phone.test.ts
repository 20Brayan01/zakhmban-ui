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

// A phone number can arrive in any digit script a person types it in. Masking
// is a privacy control, so each script must be masked exactly as ASCII always
// has been: every digit but the last four hidden, the last four left as they
// arrived. The three scripts below are the ones ADR 0002 names for phone input.
const SCRIPTS = [
  { name: "ASCII", zero: 0x0030 },
  { name: "Persian", zero: 0x06f0 },
  { name: "Arabic-Indic", zero: 0x0660 },
] as const;

/** Writes the ASCII digits in `ascii` in the given script; other characters pass through. */
function inScript(ascii: string, zero: number): string {
  return ascii.replace(/[0-9]/g, (digit) =>
    String.fromCharCode(zero + Number(digit)),
  );
}

/** Counts Unicode decimal digits of any script. */
function countDigits(value: string): number {
  return value.match(/\p{Nd}/gu)?.length ?? 0;
}

describe("maskPhoneDisplay — every digit form", () => {
  describe.each(SCRIPTS)("$name digits", ({ zero }) => {
    const write = (ascii: string) => inScript(ascii, zero);

    it("masks every digit but the last four of a mobile number", () => {
      expect(maskPhoneDisplay(write("09121234567"))).toBe(
        `*******${write("4567")}`,
      );
    });

    it("leaves the visible last four in the script they arrived in", () => {
      const masked = maskPhoneDisplay(write("09121234567"));
      expect(masked.endsWith(write("4567"))).toBe(true);
      expect(countDigits(masked)).toBe(4);
    });

    it("masks all ten digits of the script when they precede the last four", () => {
      // 0123456789 followed by four more digits: none of the first ten may survive.
      expect(maskPhoneDisplay(write("01234567896789"))).toBe(
        `**********${write("6789")}`,
      );
    });

    it("preserves spaces, hyphens, parentheses and a leading +", () => {
      expect(maskPhoneDisplay(write("0912 123 4567"))).toBe(
        `**** *** ${write("4567")}`,
      );
      expect(maskPhoneDisplay(write("0912-123-4567"))).toBe(
        `****-***-${write("4567")}`,
      );
      expect(maskPhoneDisplay(write("(0912) 123-4567"))).toBe(
        `(****) ***-${write("4567")}`,
      );
      expect(maskPhoneDisplay(write("+98 912 123 4567"))).toBe(
        `+** *** *** ${write("4567")}`,
      );
    });

    it("reveals all digits when there are four or fewer", () => {
      expect(maskPhoneDisplay(write("1234"))).toBe(write("1234"));
      expect(maskPhoneDisplay(write("123"))).toBe(write("123"));
      expect(maskPhoneDisplay(write("1"))).toBe(write("1"));
    });

    it("is idempotent: masking a masked value changes nothing", () => {
      const once = maskPhoneDisplay(write("09121234567"));
      expect(maskPhoneDisplay(once)).toBe(once);
    });

    it("hides a number embedded in surrounding text", () => {
      expect(maskPhoneDisplay(`tel: ${write("09121234567")}`)).toBe(
        `tel: *******${write("4567")}`,
      );
    });
  });

  describe("mixed digit scripts in one value", () => {
    it("counts the last four digits across scripts, however they were typed", () => {
      // ASCII 0912, then Persian 1234567: eleven digits, last four Persian.
      expect(maskPhoneDisplay("0912۱۲۳۴۵۶۷")).toBe("*******۴۵۶۷");
      // Persian prefix, ASCII tail.
      expect(maskPhoneDisplay("۰۹۱۲۱۲۳4567")).toBe("*******4567");
      // All three scripts in one number.
      expect(maskPhoneDisplay("09١٢۱۲۳۴۵۶۷")).toBe("*******۴۵۶۷");
      // Scripts changing at every group.
      expect(maskPhoneDisplay("0912 ١٢٣ ۴۵۶۷")).toBe("**** *** ۴۵۶۷");
    });

    it("never leaves more than four digits visible, in any combination", () => {
      const samples = [
        "0912۱۲۳۴۵۶۷",
        "۰۹۱۲۱۲۳4567",
        "09١٢۱۲۳۴۵۶۷",
        "+٩٨ ٩١٢ ۱۲۳ 4567",
        "۰۹۱۲-١٢٣-4567",
      ];
      for (const sample of samples) {
        expect(countDigits(maskPhoneDisplay(sample))).toBe(4);
      }
    });
  });

  describe("what is not a digit stays as it was", () => {
    it("leaves Persian and Arabic letters and punctuation alone", () => {
      expect(maskPhoneDisplay("تلفن ۰۹۱۲۱۲۳۴۵۶۷")).toBe("تلفن *******۴۵۶۷");
      // U+066B ARABIC DECIMAL SEPARATOR and U+066C ARABIC THOUSANDS SEPARATOR
      // are punctuation, not digits.
      expect(maskPhoneDisplay("۱٫۲٬۳")).toBe("۱٫۲٬۳");
      expect(maskPhoneDisplay("پشتیبانی")).toBe("پشتیبانی");
    });
  });

  describe("beyond the three named scripts", () => {
    it("masks any other Unicode decimal digit rather than leaking it", () => {
      // Fullwidth digits, as an input method can produce them.
      expect(maskPhoneDisplay("０９１２１２３４５６７")).toBe(
        "*******４５６７",
      );
    });
  });
});

describe("maskPhoneDisplay — ASCII behaviour is unchanged", () => {
  // Every row was captured from the released `v0.3.0` before the digit-script
  // fix and is asserted verbatim, so the fix cannot change what ASCII, spaces,
  // hyphens, parentheses and `+` already did.
  const LEGACY: ReadonlyArray<readonly [string, string]> = [
    ["09121234567", "*******4567"],
    ["0912 123 4567", "**** *** 4567"],
    ["0912-123-4567", "****-***-4567"],
    ["+98 912 123 4567", "+** *** *** 4567"],
    ["989121234567", "********4567"],
    ["1234", "1234"],
    ["123", "123"],
    ["1", "1"],
    ["", ""],
    ["no-digits-here", "no-digits-here"],
    ["(0912) 123-4567", "(****) ***-4567"],
    ["09121234567 ext 12", "*********67 ext 12"],
  ];

  it.each(LEGACY)("%j → %j", (input, expected) => {
    expect(maskPhoneDisplay(input)).toBe(expected);
  });
});
