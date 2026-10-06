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
    fireEvent.keyDown(cells()[0]!, { key: "۵" });
    expect(onChange).not.toHaveBeenCalled();
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

  it("announces the result politely only once the code is complete", () => {
    // §3.2 "result announced politely" with §6's role="status". Silent while
    // partial, so it reports the result rather than narrating every key.
    const { rerender } = render(<OtpInput value="123" onChange={() => {}} />);
    expect(screen.getByRole("status").textContent).toBe("");
    rerender(<OtpInput value="12345" onChange={() => {}} />);
    expect(screen.getByRole("status").textContent).toBe("12345");
  });

  it("keeps the status region in the accessibility tree", () => {
    // A region hidden with `display: none` or `hidden` announces nothing.
    render(<OtpInput value="12345" onChange={() => {}} />);
    const status = screen.getByRole("status");
    expect(status.hasAttribute("hidden")).toBe(false);
    expect(status.getAttribute("aria-hidden")).toBeNull();
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
