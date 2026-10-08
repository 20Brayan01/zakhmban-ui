import { readFileSync } from "node:fs";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

const manifest: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

describe("root export — Validation Helpers (ADR 0002)", () => {
  it("resolves and imports as an ES module through the package's own name", async () => {
    // Same mechanism a real consumer's `import ... from "@zakhmban/ui"`
    // resolves through — Node's self-reference resolution via the
    // package.json `exports` map, not a relative path into dist/
    // (exports-contract.test.ts already checks the map itself).
    const entry = await import("@zakhmban/ui");
    expect(entry).toBeDefined();
  });

  it("exports exactly the ADR 0002, ADR 0005 and implemented-primitive capabilities, and nothing else", async () => {
    const entry = await import("@zakhmban/ui");
    expect(Object.keys(entry).sort()).toEqual(
      [
        "BottomSheet",
        "Button",
        "Icon",
        "OtpInput",
        "Select",
        "TextField",
        "isValidIranianNationalId",
        "normalizeIranianMobile",
      ].sort(),
    );
  });

  it("renders a real glyph through the built artifact, not just the source", async () => {
    // tests/icons/ covers behaviour against src/. This proves the compiled
    // artifact a consumer actually installs renders the same thing — the
    // half a source-only test cannot reach.
    const { Icon } = await import("@zakhmban/ui");
    const markup = renderToStaticMarkup(createElement(Icon, { name: "back" }));

    expect(markup).toContain('viewBox="0 0 24 24"');
    expect(markup).toContain('stroke="var(--text-primary)"');
    expect(markup).toContain('stroke-width="1.8"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('<g transform="translate(24, 0) scale(-1, 1)">');
    expect(markup).toContain('d="m15 18-6-6 6-6"');
  });

  it("renders TextField and Select through the built artifact", async () => {
    // The same half a source-only test cannot reach, for the two primitives
    // this commit adds: that the COMPILED components a consumer installs
    // still produce a real label bound to a real control, and that Select is
    // still the native element the authorization requires.
    const { TextField, Select } = await import("@zakhmban/ui");

    const field = renderToStaticMarkup(
      createElement(TextField, { label: "وزن", error: "نامعتبر" }),
    );
    expect(field).toContain("<label");
    expect(field).toContain("<input");
    expect(field).toContain('aria-invalid="true"');
    expect(field).toContain('role="alert"');
    expect(field).toContain("نامعتبر");

    const select = renderToStaticMarkup(
      createElement(Select, {
        label: "محل زخم",
        options: [{ value: "heel", label: "پاشنه" }],
      }),
    );
    expect(select).toContain("<select");
    expect(select).toContain('<option value="heel">پاشنه</option>');
    // A custom listbox is not authorized, and the built artifact is where
    // that would show up if it had been built anyway.
    expect(select).not.toContain('role="listbox"');
  });

  it("defaults an omitted Button variant to secondary in the BUILT package", async () => {
    // The drift this guards against actually happened: the source and its own
    // test agreed on `primary` while the merged ruling said `secondary`, and
    // nothing compared either to the built artifact a consumer installs.
    //
    // Button Default Variant and Size Ruling, 2026-10-06. `primary` must be
    // asked for, so that §3.2's "One primary per screen" cannot be defeated
    // by an omitted prop.
    const { Button } = await import("@zakhmban/ui");

    const omitted = renderToStaticMarkup(createElement(Button, null, "ادامه"));
    expect(omitted).toContain("zakhmban-button-secondary");
    expect(omitted).not.toContain("zakhmban-button-primary");
    // The other two approved defaults, in the same artifact.
    expect(omitted).toContain("zakhmban-button-green");
    expect(omitted).toContain("zakhmban-button-md");

    const explicit = renderToStaticMarkup(
      createElement(Button, { variant: "primary" }, "ثبت"),
    );
    expect(explicit).toContain("zakhmban-button-primary");
    expect(explicit).not.toContain("zakhmban-button-secondary");
  });

  it("binds the built label to the built control, not merely to a name", async () => {
    // `for` and `id` must agree in the COMPILED output: a mismatch here is
    // a field with no accessible name in every consuming application, and
    // it is exactly the kind of thing a bundler or a minifier could break.
    const { TextField } = await import("@zakhmban/ui");
    const markup = renderToStaticMarkup(
      createElement(TextField, { label: "وزن", id: "w" }),
    );
    expect(markup).toContain('for="w"');
    expect(markup).toContain('id="w"');
  });

  it("renders OtpInput through the built artifact with its approved contract", async () => {
    // The built half of the five-cell contract: a consumer installing dist/
    // gets five real inputs, the LTR isolation §5 requires, the one-time-code
    // hint on the first cell, and the polite status region §3.2 asks for.
    const { OtpInput } = await import("@zakhmban/ui");

    const markup = renderToStaticMarkup(
      createElement(OtpInput, {
        value: "123",
        error: "نادرست",
        onChange: () => {},
      }),
    );
    // Lower-cased before matching: HTML attribute names are ASCII
    // case-insensitive, React's server renderer emits some of these in the
    // camelCase it was given, and the DOM resolves them either way — the
    // jsdom suite reads them back through `getAttribute("autocomplete")`.
    // Asserting the exact casing would be testing the renderer, not the
    // contract.
    const html = markup.toLowerCase();
    expect(markup.match(/<input/g)).toHaveLength(5);
    expect(html).toContain('dir="ltr"');
    expect(html).toContain('autocomplete="one-time-code"');
    // No live region of its own, and the code never reaches one — OtpInput
    // Completion Announcement Ruling, 2026-10-06. Asserted on the BUILT
    // artifact because that is what a consumer installs.
    expect(html).not.toContain('role="status"');
    expect(html).not.toContain("aria-live");
    expect(html).not.toContain('role="log"');
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('inputmode="numeric"');
    // Ruling 4: no cooldown, timer or resend reaches the artifact.
    for (const forbidden of ["cooldown", "resend", "countdown"]) {
      expect(html.includes(forbidden)).toBe(false);
    }

    // The error alert is the component's ONE live region and carries the
    // application's message, never the digits.
    const alertText = /role="alert"[^>]*>([^<]*)</.exec(markup)?.[1] ?? "";
    expect(alertText).toBe("نادرست");
    expect(alertText).not.toContain("123");
  });

  it("publishes no runtime glyph list and no registry", async () => {
    // ADR 0005 §4: the registry object, the glyph data and any runtime name
    // array stay internal. A published list invites an application to iterate
    // the set, which turns every later addition into a visible behaviour
    // change. `IconName` is a type and carries no runtime key.
    const entry: Record<string, unknown> = await import("@zakhmban/ui");
    for (const leaked of [
      "ICON_REGISTRY",
      "iconNames",
      "IconName",
      "icons",
      "registry",
    ]) {
      expect(
        entry[leaked],
        `${leaked} must not be a runtime export`,
      ).toBeUndefined();
    }
  });

  it("produces correct, real output when called through that same import", async () => {
    // Proves the *built* artifact behind the root entry behaves correctly,
    // not just the TypeScript source (tests/validation/*.test.ts covers
    // that half already).
    const { normalizeIranianMobile, isValidIranianNationalId } =
      await import("@zakhmban/ui");

    expect(normalizeIranianMobile("09123456789")).toBe("09123456789");
    expect(normalizeIranianMobile("not a phone number")).toBeNull();
    expect(isValidIranianNationalId("1274977411")).toBe(true);
    expect(isValidIranianNationalId("1234567890")).toBe(false);
  });

  it("declares no validation deep entry in package.json", () => {
    // ADR 0002 "Public Export Decision": root-only. A "./utils/validation"
    // (or any other validation subpath) here would be exactly the
    // unreviewed widening the exports allow-list exists to prevent.
    const exportsMap = manifest["exports"] as Record<string, unknown>;
    for (const subpath of Object.keys(exportsMap)) {
      expect(subpath.toLowerCase()).not.toContain("valid");
    }
  });

  it("does not leak the private digit-normalisation helper", async () => {
    // ADR 0002: digit-script conversion is an internal implementation
    // detail, never a public export, at either the root or a subpath.
    const entry: Record<string, unknown> = await import("@zakhmban/ui");
    expect(entry["toAsciiDigits"]).toBeUndefined();

    const serialisedExports = JSON.stringify(manifest["exports"] ?? {});
    expect(serialisedExports).not.toContain("digits");
  });
});
