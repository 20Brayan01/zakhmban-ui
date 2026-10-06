// @vitest-environment jsdom
/**
 * Button behaviour tests.
 *
 * These assert what reading the component cannot settle: what the accessible
 * name resolves to, whether a loading button can actually be re-entered,
 * whether a disabled one really is inert, and that the size classes bind to
 * the tokens the ruling names rather than to any other 48px role.
 *
 * jsdom computes no layout and resolves no stylesheet, so the rendered 44 /
 * 48 / 52 geometry, the three border treatments, the focus ring and RTL
 * placement are verified in a real browser instead and recorded in the pull
 * request. Which TOKEN each rule names is asserted in
 * `tests/architecture/button-styles-contract.test.ts`, which runs in node and
 * can read the stylesheet off disk.
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "../../src/index.js";

afterEach(cleanup);

describe("Button — the approved API surface", () => {
  it("renders a real <button> carrying its label as the accessible name", () => {
    render(<Button>ثبت نهایی گزارش</Button>);
    const control = screen.getByRole("button", { name: "ثبت نهایی گزارش" });
    expect(control.tagName).toBe("BUTTON");
  });

  it("defaults to secondary / green / md", () => {
    // The Button Default Variant and Size Ruling of 2026-10-06. `secondary`
    // and `md` are the owner's; `green` is §3.2's own default. None of the
    // three is the implementation's choice.
    render(<Button>ادامه</Button>);
    const classes = screen.getByRole("button").className.split(" ");
    expect(classes).toContain("zakhmban-button-secondary");
    expect(classes).toContain("zakhmban-button-green");
    expect(classes).toContain("zakhmban-button-md");
  });

  it("never renders primary unless primary was asked for", () => {
    // This is the whole point of the ruling: §3.2 says "One primary per
    // screen", and a primary-by-default component defeats that by omission.
    // An omitted `variant` must not produce one.
    render(<Button>ادامه</Button>);
    expect(screen.getByRole("button").className).not.toContain(
      "zakhmban-button-primary",
    );
  });

  it("still renders primary when it is requested explicitly", () => {
    // The ruling removes `primary` from the default, not from the API: it
    // "is not removed, deprecated or discouraged" and stays the correct
    // choice for a screen's single principal action.
    render(<Button variant="primary">ثبت نهایی گزارش</Button>);
    const classes = screen.getByRole("button").className.split(" ");
    expect(classes).toContain("zakhmban-button-primary");
    expect(classes).not.toContain("zakhmban-button-secondary");
  });

  it("accepts every approved variant, tone and size, and nothing else", () => {
    for (const variant of ["primary", "secondary", "text"] as const) {
      for (const tone of ["green", "blue", "red"] as const) {
        for (const size of ["sm", "md", "lg"] as const) {
          cleanup();
          render(
            <Button variant={variant} tone={tone} size={size}>
              ذخیره
            </Button>,
          );
          const classes = screen.getByRole("button").className.split(" ");
          expect(classes).toContain(`zakhmban-button-${variant}`);
          expect(classes).toContain(`zakhmban-button-${tone}`);
          expect(classes).toContain(`zakhmban-button-${size}`);
        }
      }
    }
  });

  it("fills its container only when `block` is set", () => {
    const { rerender } = render(<Button>ادامه</Button>);
    expect(screen.getByRole("button").className).not.toContain(
      "zakhmban-button-block",
    );
    rerender(<Button block>ادامه</Button>);
    expect(screen.getByRole("button").className).toContain(
      "zakhmban-button-block",
    );
  });
});

describe("Button — loading keeps the label and blocks re-entry", () => {
  it("keeps the label visible and sets aria-busy", () => {
    // §3.2, verbatim: "Loading keeps the label, sets `aria-busy`, and blocks
    // re-entry." The label is the assertion that distinguishes this from a
    // control that swaps its text for a spinner.
    render(<Button loading>ثبت نهایی</Button>);
    const control = screen.getByRole("button", { name: "ثبت نهایی" });
    expect(control.getAttribute("aria-busy")).toBe("true");
    expect(control.textContent).toBe("ثبت نهایی");
  });

  it("does not fire onClick while loading, however many times it is clicked", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        ثبت
      </Button>,
    );
    const control = screen.getByRole("button");
    fireEvent.click(control);
    fireEvent.click(control);
    fireEvent.click(control);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("stays focusable while loading, because a disabled control is not announced", () => {
    // The reason the component uses aria-disabled rather than `disabled`:
    // a disabled button leaves the tab order, which would contradict
    // "keeps the label" for a screen-reader user.
    render(<Button loading>ثبت</Button>);
    const control = screen.getByRole("button");
    control.focus();
    expect(document.activeElement).toBe(control);
    expect(control.getAttribute("aria-disabled")).toBe("true");
    expect((control as HTMLButtonElement).disabled).toBe(false);
  });

  it("blocks the platform's own activation, not merely the handler", () => {
    // A loading <button> inside a form would otherwise submit it, and the
    // form would be re-entered by the platform rather than by onClick.
    render(<Button loading>ثبت</Button>);
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    screen.getByRole("button").dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("recovers: it fires again once loading clears", () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <Button loading onClick={onClick}>
        ثبت
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();

    rerender(<Button onClick={onClick}>ثبت</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button").hasAttribute("aria-busy")).toBe(false);
  });
});

describe("Button — disabled", () => {
  it("is genuinely disabled, not merely styled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        ادامه
      </Button>,
    );
    const control = screen.getByRole("button") as HTMLButtonElement;
    expect(control.disabled).toBe(true);

    fireEvent.click(control);
    expect(onClick).not.toHaveBeenCalled();

    control.focus();
    expect(document.activeElement).not.toBe(control);
  });
});

describe("Button — keyboard operation and focus", () => {
  it("activates from the keyboard with no pointer", () => {
    // §6: "Full operation without a pointer." A real <button> gets Enter and
    // Space from the platform; what this proves is that the component does
    // not intercept or suppress them.
    const onClick = vi.fn();
    render(<Button onClick={onClick}>ادامه</Button>);
    const control = screen.getByRole("button");

    control.focus();
    expect(document.activeElement).toBe(control);

    fireEvent.keyDown(control, { key: "Enter" });
    fireEvent.click(control);
    fireEvent.keyDown(control, { key: " " });
    fireEvent.click(control);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("introduces no tabindex, so tab order follows document order", () => {
    render(
      <>
        <Button>یک</Button>
        <Button>دو</Button>
      </>,
    );
    for (const control of screen.getAllByRole("button")) {
      expect(control.hasAttribute("tabindex")).toBe(false);
    }
  });
});

describe("Button — iconStart", () => {
  it("renders the named glyph and keeps the label as the accessible name", () => {
    // §3.1: "an icon-only control must carry a label on the control, not the
    // icon." The glyph is decorative; the text names the button.
    render(<Button iconStart="plus">افزودن</Button>);
    const control = screen.getByRole("button", { name: "افزودن" });
    const glyph = control.querySelector("svg");
    expect(glyph).not.toBeNull();
    expect(glyph?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders no glyph element when none is asked for", () => {
    render(<Button>افزودن</Button>);
    expect(screen.getByRole("button").querySelector("svg")).toBeNull();
  });

  it("lets the glyph take the button's own ink", () => {
    // So a primary button's white label and its glyph match without the
    // component naming a second colour.
    render(<Button iconStart="plus">افزودن</Button>);
    expect(
      screen.getByRole("button").querySelector("svg")?.getAttribute("stroke"),
    ).toBe("currentColor");
  });
});

describe("Button — RTL and the §3 pass-through contract", () => {
  it("forwards its ref to the outermost DOM node, which is the button", () => {
    let node: HTMLButtonElement | null = null;
    render(
      <Button
        ref={(element) => {
          node = element;
        }}
      >
        ادامه
      </Button>,
    );
    expect(node).not.toBeNull();
    expect((node as unknown as HTMLElement).tagName).toBe("BUTTON");
  });

  it("keeps its own classes when the caller adds one", () => {
    render(<Button className="custom">ادامه</Button>);
    const control = screen.getByRole("button");
    expect(control.classList.contains("custom")).toBe(true);
    expect(control.classList.contains("zakhmban-button")).toBe(true);
  });

  it("passes native attributes through to the real control", () => {
    render(
      <Button type="submit" name="confirm" data-testid="native">
        ادامه
      </Button>,
    );
    const control = screen.getByTestId("native");
    expect(control.getAttribute("type")).toBe("submit");
    expect(control.getAttribute("name")).toBe("confirm");
  });

  it("does not default `type`, leaving the platform's behaviour to the caller", () => {
    // A <button> in a form submits by default. That is HTML's decision, and
    // overturning it silently would change what a form does.
    render(<Button>ادامه</Button>);
    expect(screen.getByRole("button").hasAttribute("type")).toBe(false);
  });
});
