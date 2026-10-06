import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The retired `--control-height-button` identifier, asserted absent.
 *
 * Ruling 1 of the v0.3.0 Remaining-Primitive Rulings (2026-10-06) retires a
 * **released** public identifier and replaces it with
 * `--control-height-button-md` and `--control-height-button-lg`. v0.2 §7
 * classifies that as breaking — *"removing or renaming a semantic token"* —
 * and the owner approved it as such for `v0.3.0`.
 *
 * A breaking change only stays honest if it actually breaks. The failure mode
 * this file exists to prevent is a well-meaning compatibility alias:
 * `--control-height-button: var(--control-height-button-lg)` would make every
 * consumer compile, hide the migration, and leave two names for one role
 * forever. ADR 0003 applies exactly this discipline to the nine identifiers
 * it retired — *"The retired names cannot come back. Nine identifiers are
 * asserted absent by test, so a well-meaning compatibility alias fails CI."*
 * This is the tenth.
 *
 * What it scans: the authored token CSS, every authored stylesheet, every
 * TypeScript source, and the committed `dist/` a consumer actually installs
 * — with COMMENTS STRIPPED first, on the `raw-palette-usage` precedent. A
 * comment that names the retired identifier is documentation, and
 * `base.css` and `button.css` both name it precisely to record that it was
 * retired and must not come back. Flagging those would make the explanation
 * a defect.
 *
 * Documentation under `docs/` is not scanned at all — the dated records name
 * the identifier because they are history, and rewriting history is what the
 * annotation convention forbids.
 *
 * Self-contained by the rule in `tests/architecture/README.md`.
 */
const root = fileURLToPath(new URL("../../", import.meta.url));

/** The retired name, matched so the two survivors do not count as hits. */
const RETIRED = /--control-height-button(?![-a-z0-9])/;

/** Both CSS and TypeScript use these delimiters; `//` lines go too. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = `${dir}/${entry.name}`;
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const scanned = [...walk(`${root}src`), ...walk(`${root}dist`)].filter((file) =>
  /\.(ts|tsx|css|js|d\.ts)$/.test(file),
);

describe("the retired --control-height-button identifier", () => {
  it("appears in no source, stylesheet or committed artifact", () => {
    const offences = scanned.filter((file) =>
      RETIRED.test(stripComments(readFileSync(file, "utf8"))),
    );
    expect(
      offences.map((f) => f.slice(root.length)),
      "`--control-height-button` is retired by Ruling 1 of 2026-10-06. Use " +
        "`--control-height-button-md` (48px) or `--control-height-button-lg` " +
        "(52px). Do not reintroduce it as a compatibility alias: v0.2 §7 " +
        "makes this a breaking change and an alias would hide it.",
    ).toEqual([]);
  });

  it("is not aliased back in the authored token CSS", () => {
    // The specific defect: a declaration whose NAME is the retired one.
    const base = readFileSync(`${root}src/tokens/base.css`, "utf8");
    expect(
      /^\s*--control-height-button\s*:/m.test(base),
      "a compatibility alias was reintroduced",
    ).toBe(false);
  });

  it("scans something — the matcher is proved against a known string", () => {
    // A guard that silently matched nothing would pass forever.
    expect(scanned.length).toBeGreaterThan(20);
    expect(RETIRED.test("min-block-size: var(--control-height-button);")).toBe(
      true,
    );
    // And the two survivors must NOT be read as the retired name.
    expect(RETIRED.test("var(--control-height-button-md)")).toBe(false);
    expect(RETIRED.test("var(--control-height-button-lg)")).toBe(false);
    // And comment stripping must not become a way to smuggle code past it.
    expect(
      stripComments("/* retired */\nblock-size: var(--control-height-button);"),
    ).toMatch(RETIRED);
  });

  it("replaced it with exactly two identifiers carrying the approved values", async () => {
    const { tokens } = await import("../../dist/tokens/index.js");
    const geometry = tokens as unknown as Record<string, string | undefined>;
    expect(geometry["--control-height-button-md"]).toBe("48px");
    expect(geometry["--control-height-button-lg"]).toBe("52px");
    expect(geometry["--control-height-button"]).toBeUndefined();
    // `--control-height-input` keeps its own role and value: reusing it for a
    // Button is what Decision B §B.4 refused.
    expect(geometry["--control-height-input"]).toBe("48px");
  });
});
