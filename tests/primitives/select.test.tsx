// @vitest-environment jsdom
/**
 * Select behaviour tests.
 *
 * The same discipline as the TextField suite: these assert what reading the
 * component cannot settle — what the accessible name resolves to, what is
 * announced as the description, what the control actually reports when a
 * choice is made, and that the control really is the native one the
 * authorization requires rather than a div dressed as one.
 *
 * The NATIVE part matters most here and is the hardest thing to assert
 * honestly. jsdom implements `<select>` semantics but not a browser's popup,
 * its typeahead or its platform keyboard conventions, so this suite proves
 * that a real `<select>` with real `<option>` children is what ships — which
 * is what makes those behaviours the platform's rather than this package's —
 * and the rendered popup is checked in a real browser and recorded in the
 * pull request.
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Select } from "../../src/index.js";

afterEach(cleanup);

const SITES = [
  { value: "sacrum", label: "ساکروم" },
  { value: "heel", label: "پاشنه" },
  { value: "hip", label: "لگن" },
] as const;

function describedText(control: HTMLElement): string {
  const ids = (control.getAttribute("aria-describedby") ?? "").split(/\s+/);
  return ids
    .filter((id) => id.length > 0)
    .map((id) => document.getElementById(id)?.textContent ?? "")
    .join(" ");
}

describe("Select — it is the native control, not a reimplementation", () => {
  it("renders a real <select> with real <option> children", () => {
    // The authorization: "A custom listbox is not authorized." This is the
    // assertion that keeps it true — a div with role="listbox" would fail
    // here, and so would an options list rendered as buttons.
    render(<Select label="محل زخم" options={SITES} />);

    const control = screen.getByLabelText("محل زخم");
    expect(control.tagName).toBe("SELECT");

    const options = [...control.querySelectorAll("option")];
    expect(options.map((option) => option.value)).toEqual([
      "sacrum",
      "heel",
      "hip",
    ]);
    expect(options.map((option) => option.textContent)).toEqual([
      "ساکروم",
      "پاشنه",
      "لگن",
    ]);
  });

  it("declares no listbox role of its own", () => {
    // A native select already exposes the right role. Adding one would
    // either duplicate it or override it with semantics this component does
    // not implement the keyboard contract for.
    render(<Select label="محل زخم" options={SITES} />);
    expect(screen.getByLabelText("محل زخم").hasAttribute("role")).toBe(false);
    expect(document.querySelector('[role="listbox"]')).toBeNull();
  });

  it("reports a selection through a native change event", () => {
    const seen: string[] = [];
    render(
      <Select
        label="محل زخم"
        options={SITES}
        value="sacrum"
        onChange={(event) => {
          seen.push(event.target.value);
        }}
      />,
    );

    fireEvent.change(screen.getByLabelText("محل زخم"), {
      target: { value: "heel" },
    });
    expect(seen).toEqual(["heel"]);
  });

  it("stays controlled — it shows the value it is given", () => {
    const { rerender } = render(
      <Select
        label="محل زخم"
        options={SITES}
        value="sacrum"
        onChange={() => {}}
      />,
    );

    const control = screen.getByLabelText<HTMLSelectElement>("محل زخم");
    expect(control.value).toBe("sacrum");

    fireEvent.change(control, { target: { value: "hip" } });
    expect(control.value).toBe("sacrum");

    rerender(
      <Select
        label="محل زخم"
        options={SITES}
        value="hip"
        onChange={() => {}}
      />,
    );
    expect(control.value).toBe("hip");
  });

  it("renders an empty closed list without inventing an option", () => {
    render(<Select label="محل زخم" options={[]} />);
    expect(
      screen.getByLabelText("محل زخم").querySelectorAll("option"),
    ).toHaveLength(0);
  });
});

describe("Select — the placeholder is a choice, never the name", () => {
  it("renders the placeholder as an unselectable empty option", () => {
    // v0.2 §3.2's "Never placeholder-as-label" governs here exactly as it
    // governs TextField: `label` is still required and still the name.
    render(
      <Select label="محل زخم" options={SITES} placeholder="انتخاب کنید" />,
    );

    const control = screen.getByLabelText<HTMLSelectElement>("محل زخم");
    const first = control.querySelectorAll("option")[0];
    expect(first?.value).toBe("");
    expect(first?.textContent).toBe("انتخاب کنید");
    expect(first?.disabled).toBe(true);

    // The name is the label, and the placeholder is not a second name.
    expect(screen.queryByLabelText("انتخاب کنید")).toBeNull();
  });

  it("shows the placeholder rather than silently pre-selecting the first option", () => {
    // Without an empty option a native select shows its first entry, which
    // reads as a choice the user never made.
    render(
      <Select
        label="محل زخم"
        options={SITES}
        placeholder="انتخاب کنید"
        value=""
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText<HTMLSelectElement>("محل زخم").value).toBe("");
  });

  it("renders no empty option when no placeholder is given", () => {
    render(<Select label="محل زخم" options={SITES} />);
    const values = [
      ...screen.getByLabelText("محل زخم").querySelectorAll("option"),
    ].map((option) => option.value);
    expect(values).not.toContain("");
  });
});

describe("Select — name, hint and error", () => {
  it("takes its accessible name from a real associated <label>", () => {
    render(<Select label="مرحله" options={SITES} />);

    const control = screen.getByLabelText("مرحله");
    expect(control.tagName).toBe("SELECT");
    expect(document.querySelector("label")?.getAttribute("for")).toBe(
      control.id,
    );
  });

  it("describes the control with its hint", () => {
    render(<Select label="مرحله" options={SITES} hint="بر اساس معاینه" />);
    expect(describedText(screen.getByLabelText("مرحله"))).toContain(
      "بر اساس معاینه",
    );
  });

  it("marks invalid and describes the error together", () => {
    render(
      <Select label="مرحله" options={SITES} error="مرحله را انتخاب کنید" />,
    );

    const control = screen.getByLabelText("مرحله");
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(describedText(control)).toContain("مرحله را انتخاب کنید");
  });

  it("announces the error through a live region, not through colour", () => {
    const { rerender } = render(<Select label="مرحله" options={SITES} />);
    expect(screen.queryByRole("alert")).toBeNull();

    rerender(
      <Select label="مرحله" options={SITES} error="مرحله را انتخاب کنید" />,
    );
    expect(screen.getByRole("alert").textContent).toBe("مرحله را انتخاب کنید");
  });

  it("keeps a caller-supplied aria-describedby", () => {
    render(
      <>
        <p id="outside">توضیح بیرونی</p>
        <Select
          label="مرحله"
          options={SITES}
          hint="راهنما"
          aria-describedby="outside"
        />
      </>,
    );

    const described = describedText(screen.getByLabelText("مرحله"));
    expect(described).toContain("توضیح بیرونی");
    expect(described).toContain("راهنما");
  });

  it("recovers from the error state when the error is cleared", () => {
    const { rerender } = render(
      <Select label="مرحله" options={SITES} error="نامعتبر" />,
    );
    expect(screen.getByLabelText("مرحله").getAttribute("aria-invalid")).toBe(
      "true",
    );

    rerender(<Select label="مرحله" options={SITES} />);
    expect(screen.getByLabelText("مرحله").hasAttribute("aria-invalid")).toBe(
      false,
    );
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

describe("Select — keyboard and disabled state", () => {
  it("is focusable and operable with no pointer", () => {
    // v0.2 §6: "Full operation without a pointer." A native select is
    // opened, traversed and committed entirely from the keyboard by the
    // platform; what this asserts is that the component puts nothing in the
    // way of that.
    render(<Select label="مرحله" options={SITES} />);
    const control = screen.getByLabelText<HTMLSelectElement>("مرحله");

    control.focus();
    expect(document.activeElement).toBe(control);
    expect(control.hasAttribute("tabindex")).toBe(false);

    fireEvent.keyDown(control, { key: "ArrowDown" });
    fireEvent.change(control, { target: { value: "heel" } });
    expect(control.value).toBe("heel");
  });

  it("reaches the disabled state through the real attribute", () => {
    render(<Select label="مرحله" options={SITES} disabled />);

    const control = screen.getByLabelText<HTMLSelectElement>("مرحله");
    expect(control.disabled).toBe(true);

    control.focus();
    expect(document.activeElement).not.toBe(control);
  });
});

describe("Select — the §3 pass-through contract", () => {
  it("forwards its ref to the outermost DOM node", () => {
    let node: HTMLDivElement | null = null;
    render(
      <Select
        label="مرحله"
        options={SITES}
        ref={(element) => {
          node = element;
        }}
      />,
    );

    expect(node).not.toBeNull();
    expect((node as unknown as HTMLElement).tagName).toBe("DIV");
    expect(
      (node as unknown as HTMLElement).contains(screen.getByLabelText("مرحله")),
    ).toBe(true);
  });

  it("puts className and style on that same node and keeps its own class", () => {
    render(
      <Select
        label="مرحله"
        options={SITES}
        className="custom"
        style={{ opacity: 0.5 }}
      />,
    );

    const wrapper = document.querySelector(".zakhmban-field");
    expect(wrapper?.classList.contains("custom")).toBe(true);
    expect(wrapper?.classList.contains("zakhmban-field")).toBe(true);
    expect((wrapper as HTMLElement).style.opacity).toBe("0.5");
  });

  it("passes data-* and name through to the control", () => {
    render(
      <Select
        label="مرحله"
        options={SITES}
        data-testid="native"
        name="stage"
      />,
    );
    const control = screen.getByTestId("native");
    expect(control.tagName).toBe("SELECT");
    expect(control.getAttribute("name")).toBe("stage");
  });

  it("sets no direction of its own", () => {
    // Owner D-2 and v0.2 §5: the document owns direction.
    render(<Select label="مرحله" options={SITES} />);
    expect(screen.getByLabelText("مرحله").hasAttribute("dir")).toBe(false);
    expect(document.querySelector(".zakhmban-field")?.hasAttribute("dir")).toBe(
      false,
    );
  });

  it("generates a unique id per instance", () => {
    render(
      <>
        <Select label="محل" options={SITES} />
        <Select label="مرحله" options={SITES} />
      </>,
    );
    expect(screen.getByLabelText("محل").id).not.toBe(
      screen.getByLabelText("مرحله").id,
    );
  });
});

describe("TextField and Select share one geometry, by construction", () => {
  it("use the same control class, so they cannot drift apart", () => {
    // v0.2 §3.2: "Same geometry and states as TextField". Two matched sets
    // of rules would be two things to keep in step; one class is one.
    render(<Select label="مرحله" options={SITES} />);
    const selectBox = document.querySelector(".zakhmban-field-control");
    expect(selectBox).not.toBeNull();
    expect(selectBox?.querySelector("select")).not.toBeNull();
  });
});
