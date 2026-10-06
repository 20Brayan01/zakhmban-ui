// @vitest-environment jsdom
/**
 * TextField behaviour tests.
 *
 * These assert what a reader could not verify by reading the component:
 * what the accessible name actually resolves to, what is actually announced
 * as the field's description, whether the control is genuinely operable
 * from the keyboard, and what survives a change of state. They deliberately
 * avoid restating markup — `aria-invalid` appearing in the DOM is
 * uninteresting on its own; `aria-invalid` appearing at the same moment the
 * message becomes part of the accessible description is the contract.
 *
 * jsdom is a DOM, not a browser: it computes no layout and resolves no
 * stylesheet, so the 48px height, the radius, the three border treatments,
 * RTL placement and the rendered Caption step are verified in a real
 * browser instead and recorded as such in the pull request.
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { TextField } from "../../src/index.js";

afterEach(cleanup);

/** The accessible description, resolved the way a screen reader resolves it. */
function describedText(control: HTMLElement): string {
  const ids = (control.getAttribute("aria-describedby") ?? "").split(/\s+/);
  return ids
    .filter((id) => id.length > 0)
    .map((id) => document.getElementById(id)?.textContent ?? "")
    .join(" ");
}

describe("TextField — the accessible name", () => {
  it("comes from a real <label> that is associated with the control", () => {
    render(<TextField label="شماره موبایل" />);

    // getByLabelText resolves the name through label association, so this
    // fails if the label is a bare <span> or the `for`/`id` pair is wrong —
    // which a `toContain("<label")` assertion would not catch.
    const control = screen.getByLabelText("شماره موبایل");
    expect(control.tagName).toBe("INPUT");

    const label = document.querySelector("label");
    expect(label?.getAttribute("for")).toBe(control.id);
  });

  it("is never carried by a placeholder", () => {
    // v0.2 §3.2: "Never placeholder-as-label." The placeholder is a hint of
    // format and disappears on input; it must not be the name.
    render(<TextField label="کد رهگیری" placeholder="۱۲۳۴" />);

    const control = screen.getByLabelText("کد رهگیری");
    expect(control.getAttribute("placeholder")).toBe("۱۲۳۴");
    expect(screen.queryByLabelText("۱۲۳۴")).toBeNull();
  });

  it("generates a unique id per instance so two fields never collide", () => {
    // Two unlabelled-by-id fields on one screen is the ordinary case, and a
    // shared id would silently point both labels at the first control.
    render(
      <>
        <TextField label="طول" />
        <TextField label="عرض" />
      </>,
    );

    const first = screen.getByLabelText("طول");
    const second = screen.getByLabelText("عرض");
    expect(first.id).not.toBe(second.id);
    expect(first.id.length).toBeGreaterThan(0);
  });

  it("uses a caller-supplied id instead of generating one", () => {
    // The application needs a stable handle to focus the first invalid
    // field (§4.2), and the ref goes to the wrapper under §3.
    render(<TextField label="قد" id="height-field" />);
    expect(screen.getByLabelText("قد").id).toBe("height-field");
  });
});

describe("TextField — hint and error descriptions", () => {
  it("describes the field with its hint", () => {
    render(<TextField label="وزن" hint="بر حسب کیلوگرم" />);
    expect(describedText(screen.getByLabelText("وزن"))).toContain(
      "بر حسب کیلوگرم",
    );
  });

  it("describes the field with its error and marks it invalid together", () => {
    render(<TextField label="وزن" error="وزن را وارد کنید" />);

    const control = screen.getByLabelText("وزن");
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(describedText(control)).toContain("وزن را وارد کنید");
  });

  it("describes the field with hint AND error at once, error last", () => {
    // Both are present during correction: the hint still explains the
    // format while the error explains the failure. A component that
    // replaced one with the other would drop information mid-task.
    render(
      <TextField label="وزن" hint="بر حسب کیلوگرم" error="عدد نامعتبر است" />,
    );

    const described = describedText(screen.getByLabelText("وزن"));
    expect(described).toContain("بر حسب کیلوگرم");
    expect(described).toContain("عدد نامعتبر است");
    expect(described.indexOf("عدد نامعتبر است")).toBeGreaterThan(
      described.indexOf("بر حسب کیلوگرم"),
    );
  });

  it("keeps a caller-supplied aria-describedby rather than overwriting it", () => {
    // §3 requires aria-* pass-through and §3.2 requires the component's own
    // wiring. Both are true only if the caller's value survives.
    render(
      <>
        <p id="external">توضیح بیرونی</p>
        <TextField label="وزن" hint="راهنما" aria-describedby="external" />
      </>,
    );

    const described = describedText(screen.getByLabelText("وزن"));
    expect(described).toContain("توضیح بیرونی");
    expect(described).toContain("راهنما");
  });

  it("omits aria-describedby entirely when there is nothing to describe", () => {
    // `aria-describedby=""` is a present attribute pointing at no element,
    // which some assistive technology reports as a broken reference. The
    // attribute must be absent, not empty.
    render(<TextField label="ساده" />);
    expect(screen.getByLabelText("ساده").hasAttribute("aria-describedby")).toBe(
      false,
    );
  });

  it("is not invalid when `error` is an empty string", () => {
    // An empty error is the shape a form produces between validations.
    // Treating it as an error would leave a field permanently invalid with
    // no message explaining why.
    render(<TextField label="وزن" error="" />);
    const control = screen.getByLabelText("وزن");
    expect(control.hasAttribute("aria-invalid")).toBe(false);
    expect(control.hasAttribute("aria-describedby")).toBe(false);
  });
});

describe("TextField — the error is announced by more than colour", () => {
  it("puts the message in a live region so it is announced when it appears", () => {
    // v0.2 §6: 'Errors role="alert"'. aria-describedby alone covers a later
    // visit to the field; it does not announce a failure that appears while
    // focus is elsewhere.
    const { rerender } = render(<TextField label="وزن" />);
    expect(screen.queryByRole("alert")).toBeNull();

    rerender(<TextField label="وزن" error="وزن را وارد کنید" />);
    expect(screen.getByRole("alert").textContent).toBe("وزن را وارد کنید");
  });

  it("carries the state in text and ARIA, not in the ink alone", () => {
    // §6's non-colour-signalling rule, asserted as behaviour: strip every
    // style and the failure is still fully conveyed.
    render(<TextField label="وزن" error="عدد نامعتبر است" />);

    const control = screen.getByLabelText("وزن");
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(document.body.textContent).toContain("عدد نامعتبر است");
  });
});

describe("TextField — state transitions", () => {
  it("reports the value through a native change event", () => {
    // The value is read INSIDE the handler. React resets a controlled
    // input's DOM value once the handler returns, so an assertion made
    // afterwards would read the reset node and prove nothing about what the
    // form was told.
    const seen: string[] = [];
    render(
      <TextField
        label="نام"
        value=""
        onChange={(event) => {
          seen.push(event.target.value);
        }}
      />,
    );

    fireEvent.change(screen.getByLabelText("نام"), {
      target: { value: "زهرا" },
    });

    expect(seen).toEqual(["زهرا"]);
  });

  it("stays controlled — it renders the value it is given, not what was typed", () => {
    render(<TextField label="نام" value="زهرا" onChange={() => {}} />);
    const control = screen.getByLabelText<HTMLInputElement>("نام");

    fireEvent.change(control, { target: { value: "مریم" } });
    expect(control.value).toBe("زهرا");
  });

  it("recovers from the error state when the error is cleared", () => {
    const { rerender } = render(<TextField label="وزن" error="نامعتبر" />);
    expect(screen.getByLabelText("وزن").getAttribute("aria-invalid")).toBe(
      "true",
    );

    rerender(<TextField label="وزن" />);
    const control = screen.getByLabelText("وزن");
    expect(control.hasAttribute("aria-invalid")).toBe(false);
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

describe("TextField — required, disabled and read-only", () => {
  it("marks the control required rather than only drawing one", () => {
    render(<TextField label="نام" required />);
    const control = screen.getByLabelText<HTMLInputElement>("نام");
    expect(control.required).toBe(true);
    // The implicit `aria-required` a native `required` carries is what
    // assistive technology reads; a drawn asterisk is not.
    expect(control.hasAttribute("required")).toBe(true);
  });

  it("is not required by default", () => {
    render(<TextField label="نام" />);
    expect(screen.getByLabelText<HTMLInputElement>("نام").required).toBe(false);
  });

  it("reaches the disabled state through the real attribute", () => {
    // §3.2 names `disabled` as a state but not as a prop. It arrives through
    // native pass-through, which means the control is genuinely disabled —
    // unfocusable and unsubmittable — not merely styled as such.
    render(<TextField label="نام" disabled />);

    const control = screen.getByLabelText<HTMLInputElement>("نام");
    expect(control.disabled).toBe(true);

    control.focus();
    expect(document.activeElement).not.toBe(control);
  });

  it("reaches the read-only state, which stays focusable", () => {
    // v0.2 §3.2's "read-only (verified phone)". Read-only is not disabled:
    // the value must still be reachable, selectable and announced.
    render(<TextField label="موبایل" readOnly value="09123456789" />);

    const control = screen.getByLabelText<HTMLInputElement>("موبایل");
    expect(control.readOnly).toBe(true);
    expect(control.disabled).toBe(false);

    control.focus();
    expect(document.activeElement).toBe(control);
  });
});

describe("TextField — the multiline and suffix forms", () => {
  it("renders a real textarea for multiline, keeping the same name wiring", () => {
    render(<TextField label="یادداشت" multiline rows={4} />);

    const control = screen.getByLabelText("یادداشت");
    expect(control.tagName).toBe("TEXTAREA");
    expect(control.getAttribute("rows")).toBe("4");
  });

  it("keeps hint, error and invalidity working on the multiline form", () => {
    // The two forms share one wiring path; this proves it rather than
    // assuming it.
    render(
      <TextField label="یادداشت" multiline hint="اختیاری" error="خیلی بلند" />,
    );

    const control = screen.getByLabelText("یادداشت");
    expect(control.tagName).toBe("TEXTAREA");
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(describedText(control)).toContain("خیلی بلند");
  });

  it("announces the suffix unit instead of hiding it", () => {
    // "تومان" is the unit the number is in. A field announced without it is
    // announced wrongly, so the suffix is described rather than
    // aria-hidden.
    render(<TextField label="هزینه" suffix="تومان" />);

    expect(describedText(screen.getByLabelText("هزینه"))).toContain("تومان");
    expect(document.body.textContent).toContain("تومان");
  });

  it("renders no suffix element when none is given", () => {
    render(<TextField label="هزینه" />);
    expect(document.querySelector(".zakhmban-field-suffix")).toBeNull();
  });
});

describe("TextField — keyboard operation", () => {
  it("is reachable and operable with no pointer at all", () => {
    // v0.2 §6: "Full operation without a pointer."
    render(<TextField label="نام" />);
    const control = screen.getByLabelText<HTMLInputElement>("نام");

    control.focus();
    expect(document.activeElement).toBe(control);

    fireEvent.keyDown(control, { key: "ز" });
    fireEvent.change(control, { target: { value: "ز" } });
    expect(control.value).toBe("ز");
  });

  it("follows document order across two fields", () => {
    // Tab order is the browser's, driven by document order; what the
    // component must not do is introduce a tabindex that reorders it.
    render(
      <>
        <TextField label="نام" />
        <TextField label="نام خانوادگی" />
      </>,
    );

    for (const control of [
      screen.getByLabelText("نام"),
      screen.getByLabelText("نام خانوادگی"),
    ]) {
      expect(control.hasAttribute("tabindex")).toBe(false);
    }
  });
});

describe("TextField — the §3 pass-through contract", () => {
  it("forwards its ref to the outermost DOM node", () => {
    // v0.2 §3, stated for every component: "forwards its ref to the
    // outermost DOM node". For a field that node is the wrapper, not the
    // input — recorded as such in the pull request, because it is a
    // surprising consequence rather than an oversight.
    let node: HTMLDivElement | null = null;
    render(
      <TextField
        label="نام"
        ref={(element) => {
          node = element;
        }}
      />,
    );

    expect(node).not.toBeNull();
    expect((node as unknown as HTMLElement).tagName).toBe("DIV");
    expect(
      (node as unknown as HTMLElement).contains(screen.getByLabelText("نام")),
    ).toBe(true);
  });

  it("puts className and style on that same outermost node", () => {
    render(
      <TextField label="نام" className="custom" style={{ opacity: 0.5 }} />,
    );

    const wrapper = document.querySelector(".zakhmban-field");
    expect(wrapper?.classList.contains("custom")).toBe(true);
    expect((wrapper as HTMLElement).style.opacity).toBe("0.5");
    // The package's own class is kept, not replaced by the caller's.
    expect(wrapper?.classList.contains("zakhmban-field")).toBe(true);
  });

  it("passes data-* through to the control", () => {
    render(<TextField label="نام" data-testid="native" />);
    expect(screen.getByTestId("native").tagName).toBe("INPUT");
  });

  it("passes the caller's dir to the control and sets none itself", () => {
    // v0.2 §5: `dir` isolates a Latin technical value inside an RTL page.
    // The package decides no direction — the document owns it (owner D-2).
    const { rerender } = render(<TextField label="شناسه" dir="ltr" />);
    expect(screen.getByLabelText("شناسه").getAttribute("dir")).toBe("ltr");

    rerender(<TextField label="شناسه" />);
    expect(screen.getByLabelText("شناسه").hasAttribute("dir")).toBe(false);
    expect(document.querySelector(".zakhmban-field")?.hasAttribute("dir")).toBe(
      false,
    );
  });

  it("passes inputMode and type to the single-line control", () => {
    render(<TextField label="موبایل" inputMode="numeric" type="tel" />);
    const control = screen.getByLabelText("موبایل");
    expect(control.getAttribute("inputmode")).toBe("numeric");
    expect(control.getAttribute("type")).toBe("tel");
  });

  it("does not put a type attribute on a textarea", () => {
    // `type` is meaningless on a textarea, so it is applied to the
    // single-line form only rather than spread onto both.
    render(<TextField label="یادداشت" multiline type="tel" />);
    expect(screen.getByLabelText("یادداشت").hasAttribute("type")).toBe(false);
  });
});
