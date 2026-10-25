// @vitest-environment jsdom
/**
 * OtpInput behaviour tests.
 *
 * These assert what reading the component cannot settle: where focus lands
 * after each key, what a paste does from the middle of the row, how many
 * times `onComplete` fires, and that a controlled parent — not the component
 * — owns the value. They avoid restating markup.
 *
 * jsdom computes no layout, so the 44×44 geometry, the 320px reflow and the
 * rendered typography are verified in a real browser and recorded in the pull
 * request. Which TOKEN each rule names is asserted in
 * `tests/architecture/otp-input-styles-contract.test.ts`.
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { OtpInput } from "../../src/index.js";

afterEach(cleanup);

/** The five cells, in DOM order. Cell 1 is index 0. */
function cells(): HTMLInputElement[] {
  return screen.getAllByRole("textbox") as HTMLInputElement[];
}

/** A controlled host, which is how the component is meant to be used. */
function Host(props: {
  initial?: string;
  length?: number;
  error?: string;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(props.initial ?? "");
  return (
    <OtpInput
      {...(props.length === undefined ? {} : { length: props.length })}
      {...(props.error === undefined ? {} : { error: props.error })}
      {...(props.onComplete === undefined
        ? {}
        : { onComplete: props.onComplete })}
      value={value}
      onChange={(next) => {
        props.onChange?.(next);
        setValue(next);
      }}
      aria-label="کد تأیید"
    />
  );
}

describe("OtpInput — shape and the approved API", () => {
  it("renders five real inputs by default", () => {
    // §3.2: "Five-cell code entry". §6: "Real elements first."
    render(<Host />);
    const all = cells();
    expect(all).toHaveLength(5);
    for (const cell of all) {
      expect(cell.tagName).toBe("INPUT");
      expect(cell.getAttribute("inputmode")).toBe("numeric");
      // Deliberately NOT maxLength={1}: that makes the browser reject a
      // multi-character insertion outright, which would kill the
      // `one-time-code` autofill §3.2 requires. A cell shows one digit
      // because it is controlled, not because the platform truncates.
      expect(cell.hasAttribute("maxlength")).toBe(false);
    }
  });

  it("honours an explicit length", () => {
    render(<Host length={6} />);
    expect(cells()).toHaveLength(6);
  });

  it("puts autocomplete=one-time-code on the first cell only", () => {
    // Platforms fill the first field carrying it and deliver the whole code
    // at once; five copies invite five competing autofills.
    render(<Host />);
    const all = cells();
    expect(all[0]?.getAttribute("autocomplete")).toBe("one-time-code");
    for (const cell of all.slice(1)) {
      expect(cell.hasAttribute("autocomplete")).toBe(false);
    }
  });

  it("exposes no cooldown, timer or resend control", () => {
    // Ruling 4: both are application-owned. The assertion is that nothing
    // resembling either is rendered — not that a prop was merely omitted.
    render(<Host />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("timer")).toBeNull();
    const markup = document.body.innerHTML;
    for (const forbidden of ["cooldown", "resend", "countdown"]) {
      expect(markup.toLowerCase().includes(forbidden)).toBe(false);
    }
  });
});

describe("OtpInput — controlled entry", () => {
  it("is controlled: it renders the value it is given", () => {
    render(<OtpInput value="123" onChange={() => {}} />);
    const all = cells();
    expect(all.map((c) => c.value)).toEqual(["1", "2", "3", "", ""]);
  });

  it("ignores a value longer than length and non-digits inside it", () => {
    // §5 classifies OTP cells as Latin technical values.
    render(<OtpInput value="1a2b3c4d5e6" onChange={() => {}} />);
    expect(cells().map((c) => c.value)).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("reports the whole code on every change, not one cell", () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    fireEvent.change(cells()[0]!, { target: { value: "7" } });
    expect(onChange).toHaveBeenLastCalledWith("7");
    fireEvent.change(cells()[1]!, { target: { value: "8" } });
    expect(onChange).toHaveBeenLastCalledWith("78");
  });

  it("advances focus as each cell is filled", () => {
    render(<Host />);
    fireEvent.change(cells()[0]!, { target: { value: "1" } });
    expect(document.activeElement).toBe(cells()[1]);
    fireEvent.change(cells()[1]!, { target: { value: "2" } });
    expect(document.activeElement).toBe(cells()[2]);
  });

  it("stops advancing at the last cell", () => {
    render(<Host initial="1234" />);
    fireEvent.change(cells()[4]!, { target: { value: "5" } });
    expect(document.activeElement).toBe(cells()[4]);
  });

  it("replaces a filled cell rather than appending to it", () => {
    // Single digits are intercepted on keydown so typing over a filled cell
    // replaces it; left to the change handler it would append.
    const onChange = vi.fn();
    render(<Host initial="12345" onChange={onChange} />);
    fireEvent.keyDown(cells()[2]!, { key: "9" });
    expect(onChange).toHaveBeenLastCalledWith("12945");
  });

  it("refuses a non-digit keystroke", () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    fireEvent.keyDown(cells()[0]!, { key: "a" });
    fireEvent.keyDown(cells()[0]!, { key: "-" });
    fireEvent.keyDown(cells()[0]!, { key: " " });
    expect(onChange).not.toHaveBeenCalled();
    // A Persian digit is no longer refused: see "every Unicode decimal digit".
  });
});

describe("OtpInput — deletion and navigation", () => {
  it("Backspace clears a filled cell and stays put", () => {
    const onChange = vi.fn();
    render(<Host initial="123" onChange={onChange} />);
    cells()[2]!.focus();
    fireEvent.keyDown(cells()[2]!, { key: "Backspace" });
    expect(onChange).toHaveBeenLastCalledWith("12");
    expect(document.activeElement).toBe(cells()[2]);
  });

  it("Backspace on an empty cell retreats and clears the previous one", () => {
    const onChange = vi.fn();
    render(<Host initial="12" onChange={onChange} />);
    cells()[2]!.focus();
    fireEvent.keyDown(cells()[2]!, { key: "Backspace" });
    expect(onChange).toHaveBeenLastCalledWith("1");
    expect(document.activeElement).toBe(cells()[1]);
  });

  it("Backspace on the first empty cell does nothing", () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    cells()[0]!.focus();
    fireEvent.keyDown(cells()[0]!, { key: "Backspace" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("Delete removes the digit and shifts the rest left", () => {
    const onChange = vi.fn();
    render(<Host initial="123" onChange={onChange} />);
    fireEvent.keyDown(cells()[1]!, { key: "Delete" });
    expect(onChange).toHaveBeenLastCalledWith("13");
  });

  it("never lets a hole appear in the value", () => {
    // A string cannot represent an empty middle cell, so a blanked cell
    // would have to become a SPACE — a character the application would then
    // compare against the real code. Deletion splices instead, and a write
    // lands no further than the end of what is already entered.
    const onChange = vi.fn();
    const seen: string[] = [];
    render(
      <Host
        initial="12345"
        onChange={(v) => {
          seen.push(v);
          onChange(v);
        }}
      />,
    );
    fireEvent.keyDown(cells()[1]!, { key: "Backspace" });
    fireEvent.keyDown(cells()[0]!, { key: "Delete" });
    // and a write aimed past the end of the prefix
    fireEvent.change(cells()[4]!, { target: { value: "9" } });
    for (const value of seen) {
      expect(value, `"${value}" contains a hole`).toMatch(/^[0-9]*$/);
    }
    expect(seen.length).toBeGreaterThan(0);
  });

  it("arrow keys traverse by visual position, left being the lower index", () => {
    // The row is dir="ltr" inside an RTL page, so ArrowLeft is always the
    // previous cell whatever the document direction is.
    render(<Host />);
    cells()[2]!.focus();
    fireEvent.keyDown(cells()[2]!, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(cells()[1]);
    fireEvent.keyDown(cells()[1]!, { key: "ArrowRight" });
    expect(document.activeElement).toBe(cells()[2]);
  });

  it("arrows stop at both ends", () => {
    render(<Host />);
    cells()[0]!.focus();
    fireEvent.keyDown(cells()[0]!, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(cells()[0]);
    cells()[4]!.focus();
    fireEvent.keyDown(cells()[4]!, { key: "ArrowRight" });
    expect(document.activeElement).toBe(cells()[4]);
  });

  it("Home and End jump to the ends", () => {
    render(<Host />);
    cells()[2]!.focus();
    fireEvent.keyDown(cells()[2]!, { key: "End" });
    expect(document.activeElement).toBe(cells()[4]);
    fireEvent.keyDown(cells()[4]!, { key: "Home" });
    expect(document.activeElement).toBe(cells()[0]);
  });

  it("survives a renderer that implements no scrollIntoView", () => {
    // jsdom implements none, and CI caught this where a narrow grep over the
    // local output did not: the suite reported "43 passed" while also
    // reporting 30 unhandled errors, and only the exit code told the truth.
    //
    // Scrolling a focused cell back into view is a progressive enhancement
    // for widths below 320px, not a contract. Focus must work without it.
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);

    // The environment really does lack it — otherwise this test proves
    // nothing, because the guarded call would simply have run.
    const cell = cells()[0]!;
    expect(
      typeof (cell as unknown as { scrollIntoView?: unknown }).scrollIntoView,
    ).not.toBe("function");

    expect(() => {
      fireEvent.change(cell, { target: { value: "1" } });
    }).not.toThrow();
    expect(onChange).toHaveBeenLastCalledWith("1");
    expect(document.activeElement).toBe(cells()[1]);
  });

  it("is fully operable with no pointer at all", () => {
    // §6: "Full operation without a pointer."
    const onComplete = vi.fn();
    render(<Host onComplete={onComplete} />);
    cells()[0]!.focus();
    for (const digit of ["1", "2", "3", "4", "5"]) {
      fireEvent.keyDown(document.activeElement!, { key: digit });
    }
    expect(onComplete).toHaveBeenCalledWith("12345");
    expect(cells().map((c) => c.value)).toEqual(["1", "2", "3", "4", "5"]);
  });
});

describe("OtpInput — paste fills all cells", () => {
  const paste = (cell: HTMLInputElement, text: string): void => {
    fireEvent.paste(cell, { clipboardData: { getData: () => text } });
  };

  it("fills every cell from the first", () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    paste(cells()[0]!, "13579");
    expect(onChange).toHaveBeenLastCalledWith("13579");
  });

  it("fills from whichever cell received it", () => {
    // §3.2 says "paste fills all cells" without saying from where, and a
    // user who clicks the third cell and pastes means to start there.
    const onChange = vi.fn();
    render(<Host initial="12" onChange={onChange} />);
    paste(cells()[2]!, "345");
    expect(onChange).toHaveBeenLastCalledWith("12345");
  });

  it("truncates a paste longer than the remaining cells without losing the rest", () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    paste(cells()[0]!, "123456789");
    expect(onChange).toHaveBeenLastCalledWith("12345");
  });

  it("accepts a short paste and leaves the rest empty", () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    paste(cells()[0]!, "12");
    expect(onChange).toHaveBeenLastCalledWith("12");
  });

  it("strips separators a user copied with the code", () => {
    // Codes are routinely copied as "123 45" or "123-45" out of a message.
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    paste(cells()[0]!, "123-45");
    expect(onChange).toHaveBeenLastCalledWith("12345");
  });

  it("spreads a platform autofill arriving as one insertion", () => {
    // iOS and Android deliver `one-time-code` as a single multi-character
    // input event on the first field, not as five.
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    fireEvent.change(cells()[0]!, { target: { value: "24680" } });
    expect(onChange).toHaveBeenLastCalledWith("24680");
  });
});

describe("OtpInput — completion fires exactly once", () => {
  it("fires when the last cell is filled, with the whole code", () => {
    const onComplete = vi.fn();
    render(<Host initial="1234" onComplete={onComplete} />);
    fireEvent.change(cells()[4]!, { target: { value: "5" } });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith("12345");
  });

  it("does not fire on an incomplete value", () => {
    const onComplete = vi.fn();
    render(<Host initial="123" onComplete={onComplete} />);
    fireEvent.change(cells()[3]!, { target: { value: "4" } });
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("does not fire again on a re-render that changes nothing", () => {
    const onComplete = vi.fn();
    const { rerender } = render(
      <OtpInput value="12345" onComplete={onComplete} onChange={() => {}} />,
    );
    expect(onComplete).toHaveBeenCalledTimes(1);
    rerender(
      <OtpInput value="12345" onComplete={onComplete} onChange={() => {}} />,
    );
    rerender(
      <OtpInput value="12345" onComplete={onComplete} onChange={() => {}} />,
    );
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("does not fire on a cleared value, and fires again for a new code", () => {
    const onComplete = vi.fn();
    render(<Host initial="1234" onComplete={onComplete} />);
    fireEvent.change(cells()[4]!, { target: { value: "5" } });
    expect(onComplete).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(cells()[4]!, { key: "Backspace" });
    expect(onComplete).toHaveBeenCalledTimes(1);

    fireEvent.change(cells()[4]!, { target: { value: "9" } });
    expect(onComplete).toHaveBeenCalledTimes(2);
    expect(onComplete).toHaveBeenLastCalledWith("12349");
  });

  it("respects a parent that rejects the proposed value", () => {
    // The callback reflects what the component was GIVEN, not what its own
    // handler proposed: a controlled parent may refuse or rewrite it.
    const onComplete = vi.fn();
    render(
      <OtpInput value="1234" onChange={() => {}} onComplete={onComplete} />,
    );
    fireEvent.change(cells()[4]!, { target: { value: "5" } });
    expect(onComplete).not.toHaveBeenCalled();
  });
});

describe("OtpInput — error and the polite result", () => {
  it("announces the error and marks every cell invalid", () => {
    // §6: 'Errors role="alert"'. Ruling 2: the error is a text message.
    render(<Host error="کد نادرست است" />);
    expect(screen.getByRole("alert").textContent).toBe("کد نادرست است");
    for (const cell of cells()) {
      expect(cell.getAttribute("aria-invalid")).toBe("true");
    }
  });

  it("reaches the accessible description, not colour alone", () => {
    render(<Host error="کد نادرست است" />);
    const describedBy = cells()[0]!.getAttribute("aria-describedby");
    expect(describedBy).not.toBeNull();
    expect(document.getElementById(describedBy!)?.textContent).toBe(
      "کد نادرست است",
    );
  });

  it("is not in the error state when `error` is an empty string", () => {
    render(<Host error="" />);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(cells()[0]!.hasAttribute("aria-invalid")).toBe(false);
  });

  it("recovers when the error clears", () => {
    const { rerender } = render(
      <OtpInput value="" onChange={() => {}} error="نادرست" />,
    );
    expect(screen.getByRole("alert")).toBeTruthy();
    rerender(<OtpInput value="" onChange={() => {}} />);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(cells()[0]!.hasAttribute("aria-invalid")).toBe(false);
  });

  it("renders no live region of its own, complete or not", () => {
    // OtpInput Completion Announcement Ruling, 2026-10-06. The absence is
    // the contract, not a gap: the application owns the localized message,
    // and a package-owned region could only hold the code itself.
    const { rerender } = render(<OtpInput value="123" onChange={() => {}} />);
    expect(screen.queryByRole("status")).toBeNull();

    rerender(<OtpInput value="12345" onChange={() => {}} />);
    expect(screen.queryByRole("status")).toBeNull();
    expect(document.querySelector("[aria-live]")).toBeNull();
  });

  it("never places the OTP value in a live region", () => {
    // The specific harm the ruling names: announcing a one-time code aloud
    // reads out a credential to anyone within earshot. Asserted against
    // EVERY live region the component could produce, by any mechanism —
    // role="status", role="log", role="timer" or a bare aria-live.
    render(<OtpInput value="12345" onChange={() => {}} error="نادرست" />);

    const live = [
      ...document.querySelectorAll(
        '[aria-live], [role="status"], [role="log"], [role="timer"], [role="marquee"]',
      ),
    ];
    for (const region of live) {
      expect(
        region.textContent ?? "",
        `a live region carries the code: ${region.outerHTML}`,
      ).not.toContain("12345");
    }

    // The error alert IS a live region and is allowed — it carries the
    // application's own message, never the digits.
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toBe("نادرست");
    expect(alert.textContent).not.toContain("12345");
  });

  it("never claims a complete entry is valid", () => {
    // Completeness is not correctness: only the application can check the
    // code. Nothing in the rendered output may assert success.
    render(<OtpInput value="12345" onChange={() => {}} />);
    const markup = document.body.innerHTML.toLowerCase();
    for (const claim of ["valid", "success", "correct", "verified"]) {
      expect(markup.includes(claim), `output claims "${claim}"`).toBe(false);
    }
    // And no ARIA state that would imply it.
    for (const cell of cells()) {
      expect(cell.hasAttribute("aria-invalid")).toBe(false);
    }
  });
});

describe("OtpInput — RTL, focus and the §3 pass-through", () => {
  it("isolates the row as LTR with an attribute, setting no direction itself", () => {
    // §5's mechanism, and owner D-2: the package sets no CSS direction. The
    // visual leftmost-first ordering is verified in a browser, since jsdom
    // computes no layout.
    render(<Host />);
    const row = cells()[0]!.parentElement!;
    expect(row.getAttribute("dir")).toBe("ltr");
    expect(row.getAttribute("role")).toBe("group");
    expect(document.querySelector(".zakhmban-otp")?.hasAttribute("dir")).toBe(
      false,
    );
  });

  it("keeps DOM and focus order identical to cell order", () => {
    render(<Host />);
    const all = cells();
    for (let i = 0; i < all.length; i += 1) {
      expect(all[i]?.getAttribute("aria-label")).toBe(String(i + 1));
      expect(all[i]?.hasAttribute("tabindex")).toBe(false);
    }
  });

  it("passes the caller's aria-label to the group, not to a cell", () => {
    render(<Host />);
    const row = cells()[0]!.parentElement!;
    expect(row.getAttribute("aria-label")).toBe("کد تأیید");
  });

  it("forwards its ref to the outermost DOM node", () => {
    let node: HTMLDivElement | null = null;
    render(
      <OtpInput
        value=""
        onChange={() => {}}
        ref={(element) => {
          node = element;
        }}
      />,
    );
    expect(node).not.toBeNull();
    const element = node as unknown as HTMLElement;
    expect(element.tagName).toBe("DIV");
    expect(element.classList.contains("zakhmban-otp")).toBe(true);
    expect(element.contains(cells()[0]!)).toBe(true);
  });

  it("keeps its own class when the caller adds one", () => {
    render(<OtpInput value="" onChange={() => {}} className="custom" />);
    const root = document.querySelector(".zakhmban-otp");
    expect(root?.classList.contains("custom")).toBe(true);
  });

  it("generates unique ids per instance", () => {
    render(
      <>
        <Host error="یک" />
        <Host error="دو" />
      </>,
    );
    const ids = screen
      .getAllByRole("alert")
      .map((alert) => alert.getAttribute("id"));
    expect(ids[0]).not.toBe(ids[1]);
  });
});

/**
 * Every Unicode decimal digit is a digit — zakhmban-therapists CS-17.
 *
 * An Iranian keyboard produces Persian digits, and the primitive used to drop
 * them silently, so those users could not enter a code. The owner ruling of
 * 2026-10-23: accept every Unicode decimal digit, typed, pasted or autofilled,
 * normalise it to the ASCII digit the primitive already emits, and behave as
 * Latin input does.
 *
 * DISPLAY. The cells show the LATIN digit. UI System Specification v0.2 §5
 * ("Mixed Persian / Latin") lists "OTP cells" among the technical values that
 * "stay Latin and LTR", which the component's own header and `dir="ltr"`
 * isolation already follow; §5's "Persian digits everywhere in product copy"
 * governs copy, and a code cell is not copy. `toPersianDigits` is a display
 * formatter for copy and is not applied here. The assertions below pin both
 * halves: what is accepted, and what is shown and emitted.
 */
describe("OtpInput — every Unicode decimal digit", () => {
  /** "12345" written with the digits whose zero is `zero`. */
  const inScript = (ascii: string, zero: number): string =>
    [...ascii]
      .map((digit) => String.fromCodePoint(zero + Number(digit)))
      .join("");

  const PERSIAN = 0x06f0;
  const ARABIC_INDIC = 0x0660;
  const DEVANAGARI = 0x0966;
  const FULLWIDTH = 0xff10;
  const MATH_BOLD = 0x1d7ce;

  const paste = (cell: HTMLInputElement, text: string): void => {
    fireEvent.paste(cell, { clipboardData: { getData: () => text } });
  };

  const type = (text: string): void => {
    for (const key of text) {
      fireEvent.keyDown(document.activeElement!, { key });
    }
  };

  describe("typed", () => {
    it.each([
      ["Persian", PERSIAN],
      ["Arabic-Indic", ARABIC_INDIC],
      ["Devanagari", DEVANAGARI],
      ["fullwidth", FULLWIDTH],
      ["Mathematical bold", MATH_BOLD],
    ])("accepts %s digits keystroke by keystroke", (_name, zero) => {
      const onChange = vi.fn();
      const onComplete = vi.fn();
      render(<Host onChange={onChange} onComplete={onComplete} />);
      cells()[0]!.focus();
      type(inScript("13579", zero));
      expect(onChange).toHaveBeenLastCalledWith("13579");
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onComplete).toHaveBeenCalledWith("13579");
    });

    it("accepts the three scripts mixed within one code", () => {
      const onComplete = vi.fn();
      render(<Host onComplete={onComplete} />);
      cells()[0]!.focus();
      type("1" + "۲" + "٣" + "4" + "۵");
      expect(onComplete).toHaveBeenCalledWith("12345");
    });

    it("maps every digit value, 0 to 9, to the same ASCII digit in each script", () => {
      for (const zero of [PERSIAN, ARABIC_INDIC]) {
        const onChange = vi.fn();
        const { unmount } = render(<Host length={10} onChange={onChange} />);
        cells()[0]!.focus();
        type(inScript("0123456789", zero));
        expect(onChange).toHaveBeenLastCalledWith("0123456789");
        unmount();
      }
    });

    it("advances focus after a Persian digit exactly as after a Latin one", () => {
      render(<Host />);
      cells()[0]!.focus();
      fireEvent.keyDown(document.activeElement!, { key: "۱" });
      expect(document.activeElement).toBe(cells()[1]);
      fireEvent.keyDown(document.activeElement!, { key: "٢" });
      expect(document.activeElement).toBe(cells()[2]);
    });

    it("replaces a filled cell with a Persian digit rather than appending", () => {
      const onChange = vi.fn();
      render(<Host initial="12345" onChange={onChange} />);
      fireEvent.keyDown(cells()[2]!, { key: "۹" });
      expect(onChange).toHaveBeenLastCalledWith("12945");
    });

    it("accepts a Persian digit arriving through the change event", () => {
      // The path an IME or virtual keyboard that reports no usable `key`
      // takes: the keydown carries nothing, the digit arrives in the value.
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      fireEvent.change(cells()[0]!, { target: { value: "۷" } });
      expect(onChange).toHaveBeenLastCalledWith("7");
      expect(document.activeElement).toBe(cells()[1]);
    });
  });

  describe("pasted", () => {
    it.each([
      ["Persian", PERSIAN],
      ["Arabic-Indic", ARABIC_INDIC],
      ["Devanagari", DEVANAGARI],
      ["fullwidth", FULLWIDTH],
      ["Mathematical bold", MATH_BOLD],
    ])("fills every cell from %s digits", (_name, zero) => {
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      paste(cells()[0]!, inScript("24680", zero));
      expect(onChange).toHaveBeenLastCalledWith("24680");
    });

    it("fills from a mixed-script paste", () => {
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      paste(cells()[0]!, "1۲٣4۵");
      expect(onChange).toHaveBeenLastCalledWith("12345");
    });

    it("fills from whichever cell received it", () => {
      const onChange = vi.fn();
      render(<Host initial="12" onChange={onChange} />);
      paste(cells()[2]!, "۳۴۵");
      expect(onChange).toHaveBeenLastCalledWith("12345");
    });

    it("truncates a Persian paste longer than the remaining cells", () => {
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      paste(cells()[0]!, "۱۲۳۴۵۶۷۸۹");
      expect(onChange).toHaveBeenLastCalledWith("12345");
    });

    it("strips separators and invisible marks copied with a Persian code", () => {
      // A code copied out of a Persian SMS arrives with spaces, hyphens and
      // the direction marks a bidi renderer adds around it.
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      paste(cells()[0]!, "‏۱۲۳‌-‎۴۵ ");
      expect(onChange).toHaveBeenLastCalledWith("12345");
    });

    it("completes once when the paste fills the row", () => {
      const onComplete = vi.fn();
      render(<Host onComplete={onComplete} />);
      paste(cells()[0]!, "۱۲۳۴۵");
      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onComplete).toHaveBeenCalledWith("12345");
    });
  });

  describe("autofilled", () => {
    it.each([
      ["Persian", PERSIAN],
      ["Arabic-Indic", ARABIC_INDIC],
    ])("spreads a whole %s code arriving as one insertion", (_name, zero) => {
      // `one-time-code` autofill delivers the code as one multi-character
      // change on the first cell.
      const onChange = vi.fn();
      const onComplete = vi.fn();
      render(<Host onChange={onChange} onComplete={onComplete} />);
      fireEvent.change(cells()[0]!, {
        target: { value: inScript("24680", zero) },
      });
      expect(onChange).toHaveBeenLastCalledWith("24680");
      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onComplete).toHaveBeenCalledWith("24680");
    });

    it("spreads a mixed-script insertion", () => {
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      fireEvent.change(cells()[0]!, { target: { value: "2۴٦8۰" } });
      expect(onChange).toHaveBeenLastCalledWith("24680");
    });
  });

  describe("shown and emitted as Latin", () => {
    // §5: OTP cells are Latin technical values.
    it("shows a Latin digit in the cell however the digit was typed", () => {
      render(<Host />);
      cells()[0]!.focus();
      type("۱٢3۴");
      expect(cells().map((c) => c.value)).toEqual(["1", "2", "3", "4", ""]);
      for (const cell of cells()) {
        expect(cell.value).toMatch(/^[0-9]?$/);
      }
    });

    it("shows a Latin digit after a paste or an autofill", () => {
      render(<Host />);
      paste(cells()[0]!, "۱۲۳۴۵");
      expect(cells().map((c) => c.value)).toEqual(["1", "2", "3", "4", "5"]);
    });

    it("shows a Latin digit when a rejecting parent leaves the old value", () => {
      // The DOM must not be left holding the character the user typed.
      render(<OtpInput value="5" onChange={() => {}} />);
      fireEvent.change(cells()[0]!, { target: { value: "۵" } });
      expect(cells()[0]!.value).toBe("5");
    });

    it("emits only ASCII digits, whatever script went in", () => {
      const seen: string[] = [];
      render(<Host onChange={(value) => seen.push(value)} />);
      cells()[0]!.focus();
      type("۱٢3");
      paste(cells()[3]!, "۴۵");
      expect(seen.length).toBeGreaterThan(0);
      for (const value of seen) {
        expect(value).toMatch(/^[0-9]*$/);
      }
    });

    it("renders a `value` held in any digit script as Latin digits", () => {
      const { rerender } = render(<OtpInput value="۱۲۳" onChange={() => {}} />);
      expect(cells().map((c) => c.value)).toEqual(["1", "2", "3", "", ""]);
      rerender(<OtpInput value="٤٥٦٧٨" onChange={() => {}} />);
      expect(cells().map((c) => c.value)).toEqual(["4", "5", "6", "7", "8"]);
      rerender(<OtpInput value="1۲٣x4۵" onChange={() => {}} />);
      expect(cells().map((c) => c.value)).toEqual(["1", "2", "3", "4", "5"]);
    });

    it("fires onComplete for a `value` that is complete in a non-Latin script", () => {
      const onComplete = vi.fn();
      render(
        <OtpInput value="۱۲۳۴۵" onChange={() => {}} onComplete={onComplete} />,
      );
      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onComplete).toHaveBeenCalledWith("12345");
    });
  });

  describe("behaves identically to Latin input", () => {
    /**
     * One scripted session — type, delete, step, paste, retype — driven once
     * in each script. The reports, the completion calls, the cell contents and
     * the focus position after every step must match step for step: if a
     * Persian digit took any path a Latin one does not, they diverge here.
     */
    function session(script: (ascii: string) => string) {
      const reports: string[] = [];
      const completes: string[] = [];
      const snapshots: string[] = [];
      const focus: number[] = [];
      const { unmount } = render(
        <Host
          onChange={(value) => reports.push(value)}
          onComplete={(value) => completes.push(value)}
        />,
      );
      const snap = (): void => {
        snapshots.push(
          cells()
            .map((c) => c.value)
            .join("|"),
        );
        focus.push(cells().indexOf(document.activeElement as HTMLInputElement));
      };

      cells()[0]!.focus();
      for (const digit of script("123")) {
        fireEvent.keyDown(document.activeElement!, { key: digit });
        snap();
      }
      fireEvent.keyDown(document.activeElement!, { key: "Backspace" });
      snap();
      fireEvent.keyDown(cells()[0]!, { key: "Delete" });
      snap();
      fireEvent.keyDown(cells()[1]!, { key: "ArrowLeft" });
      snap();
      paste(cells()[2]!, script("789"));
      snap();
      fireEvent.change(cells()[0]!, { target: { value: script("9") } });
      snap();
      paste(cells()[0]!, script("55555"));
      snap();
      fireEvent.keyDown(cells()[4]!, { key: "Backspace" });
      snap();
      fireEvent.keyDown(cells()[4]!, { key: script("1") });
      snap();

      unmount();
      return { reports, completes, snapshots, focus };
    }

    it.each([
      ["Persian", PERSIAN],
      ["Arabic-Indic", ARABIC_INDIC],
    ])("%s digits trace the same session as ASCII digits", (_name, zero) => {
      const latin = session((ascii) => ascii);
      const other = session((ascii) => inScript(ascii, zero));
      expect(latin.reports.length).toBeGreaterThan(5);
      expect(latin.completes.length).toBeGreaterThan(0);
      expect(other).toEqual(latin);
    });

    it("a mixed-script session traces the same as ASCII too", () => {
      const mixed = (ascii: string): string =>
        [...ascii]
          .map((digit, index) =>
            String.fromCodePoint(
              [0x30, PERSIAN, ARABIC_INDIC][index % 3]! + Number(digit),
            ),
          )
          .join("");
      expect(session(mixed)).toEqual(session((ascii) => ascii));
    });
  });

  describe("non-digits are still rejected", () => {
    // None of these is a decimal digit (not Unicode category Nd), though
    // several look like one or sit beside one in the same block.
    const NON_DIGITS = [
      "a",
      "Z",
      "e",
      "-",
      " ",
      "٫", // ARABIC DECIMAL SEPARATOR
      "٬", // ARABIC THOUSANDS SEPARATOR
      "²", // SUPERSCRIPT TWO (No)
      "①", // CIRCLED DIGIT ONE (No)
      "½", // VULGAR FRACTION ONE HALF (No)
      "Ⅷ", // ROMAN NUMERAL EIGHT (Nl)
      "一", // CJK NUMERAL ONE (Lo)
      "‌", // ZWNJ
      "‏", // RIGHT-TO-LEFT MARK
    ];

    it.each(NON_DIGITS.map((character) => [character]))(
      "refuses %j as a keystroke",
      (character) => {
        const onChange = vi.fn();
        render(<Host onChange={onChange} />);
        fireEvent.keyDown(cells()[0]!, { key: character });
        expect(onChange).not.toHaveBeenCalled();
      },
    );

    it("fills nothing from a paste that contains no digit", () => {
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      paste(cells()[0]!, NON_DIGITS.join(""));
      expect(onChange).not.toHaveBeenCalled();
    });

    it("fills nothing from an insertion that contains no digit", () => {
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      fireEvent.change(cells()[0]!, { target: { value: "ab٫²" } });
      expect(onChange).not.toHaveBeenCalled();
    });

    it("keeps the digits and drops the rest of a mixed paste", () => {
      const onChange = vi.fn();
      render(<Host onChange={onChange} />);
      paste(cells()[0]!, "۱a۲²٣①4٫۵");
      expect(onChange).toHaveBeenLastCalledWith("12345");
    });

    it("renders no digit for a `value` made only of non-digits", () => {
      render(<OtpInput value="a٫²①-" onChange={() => {}} />);
      expect(cells().map((c) => c.value)).toEqual(["", "", "", "", ""]);
    });
  });

  describe("the digit-to-value rule holds across the whole code space", () => {
    // `asciiDigit` derives a digit's value from its position in a run of
    // consecutive decimal-digit code points. That is a property of the
    // Unicode this runtime ships, so it is checked rather than assumed.
    const runs: { start: number; length: number }[] = [];
    const isDigit = /^\p{Nd}$/u;
    let open: { start: number; length: number } | null = null;
    for (let code = 0; code <= 0x10ffff; code += 1) {
      if (isDigit.test(String.fromCodePoint(code))) {
        if (open === null) {
          open = { start: code, length: 0 };
        }
        open.length += 1;
      } else if (open !== null) {
        runs.push(open);
        open = null;
      }
    }

    it("finds the scripts the product depends on", () => {
      const starts = runs.map((run) => run.start);
      for (const zero of [0x30, ARABIC_INDIC, PERSIAN, DEVANAGARI, FULLWIDTH]) {
        expect(starts, `U+${zero.toString(16)}`).toContain(zero);
      }
    });

    it("has only runs that are a whole number of tens", () => {
      expect(runs.length).toBeGreaterThan(40);
      for (const run of runs) {
        expect(
          run.length % 10,
          `run at U+${run.start.toString(16)} has ${run.length} digits`,
        ).toBe(0);
      }
    });

    it("maps every block of ten, wherever it sits, to 0123456789", () => {
      let blocks = 0;
      for (const run of runs) {
        for (let at = run.start; at < run.start + run.length; at += 10) {
          const block = Array.from({ length: 10 }, (_, i) =>
            String.fromCodePoint(at + i),
          ).join("");
          const { unmount } = render(
            <OtpInput length={10} value={block} onChange={() => {}} />,
          );
          expect(
            cells()
              .map((c) => c.value)
              .join(""),
            `block at U+${at.toString(16)}`,
          ).toBe("0123456789");
          unmount();
          blocks += 1;
        }
      }
      expect(blocks).toBeGreaterThan(60);
    });
  });
});

describe("OtpInput — appearance, the v0.5.0 opt-in (owner decision of 2026-10-25)", () => {
  function FilledHost(props: { initial?: string; error?: string }) {
    const [value, setValue] = useState(props.initial ?? "");
    return (
      <OtpInput
        appearance="filled"
        length={6}
        {...(props.error === undefined ? {} : { error: props.error })}
        value={value}
        onChange={setValue}
        aria-label="کد تأیید"
      />
    );
  }

  /** Cells that carry the filled-digit marker, by their position. */
  function marked(): number[] {
    return cells().flatMap((cell, index) =>
      cell.hasAttribute("data-zakhmban-otp-digit") ? [index] : [],
    );
  }

  it("keeps six cells, Latin digits and the LTR row under the filled appearance", () => {
    const { container } = render(<FilledHost initial="123" />);
    expect(cells()).toHaveLength(6);
    expect(container.firstElementChild?.className).toContain(
      "zakhmban-otp-filled",
    );
    expect(screen.getByRole("group").getAttribute("dir")).toBe("ltr");
    expect(cells().map((c) => c.value)).toEqual(["1", "2", "3", "", "", ""]);
  });

  it("marks exactly the cells that hold a digit, and follows typing and deleting", () => {
    render(<FilledHost />);
    expect(marked()).toEqual([]);
    fireEvent.keyDown(cells()[0]!, { key: "4" });
    fireEvent.keyDown(cells()[1]!, { key: "8" });
    expect(marked()).toEqual([0, 1]);
    fireEvent.keyDown(cells()[1]!, { key: "Backspace" });
    expect(marked()).toEqual([0]);
  });

  it("behaves exactly as the default appearance does: a Persian-digit paste fills all six cells", () => {
    const onComplete = vi.fn();
    const onChange = vi.fn();
    render(
      <OtpInput
        appearance="filled"
        length={6}
        value=""
        onChange={onChange}
        onComplete={onComplete}
      />,
    );
    fireEvent.paste(cells()[0]!, {
      clipboardData: { getData: () => "۱۲۳۴۵۶" },
    });
    expect(onChange).toHaveBeenLastCalledWith("123456");
  });

  it("calls onComplete once, with the Latin code, when the last cell fills", () => {
    const onComplete = vi.fn();
    function CompleteHost() {
      const [value, setValue] = useState("");
      return (
        <OtpInput
          appearance="filled"
          length={6}
          value={value}
          onChange={setValue}
          onComplete={onComplete}
          aria-label="کد تأیید"
        />
      );
    }
    render(<CompleteHost />);
    fireEvent.paste(cells()[0]!, {
      clipboardData: { getData: () => "۱۲۳۴۵۶" },
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("still takes the error state, and the marker does not suppress aria-invalid", () => {
    render(<FilledHost initial="12" error="کد نادرست است" />);
    expect(screen.getByRole("alert").textContent).toBe("کد نادرست است");
    for (const cell of cells()) {
      expect(cell.getAttribute("aria-invalid")).toBe("true");
    }
    expect(marked()).toEqual([0, 1]);
  });

  it("puts no marker and no class on the default appearance", () => {
    const { container } = render(<Host initial="123" />);
    expect(container.querySelector("[data-zakhmban-otp-digit]")).toBeNull();
    expect(container.innerHTML).not.toContain("zakhmban-otp-filled");
  });
});
