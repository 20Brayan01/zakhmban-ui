import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Button,
  Icon,
  OtpInput,
  TextField,
  type IconName,
} from "../../src/index.js";
import { ICON_REGISTRY } from "../../src/icons/registry.js";
import { tokens } from "../../src/tokens/index.js";

/**
 * v0.5.0 is ADDITIVE ONLY — owner decision of 2026-10-25, ADR 0003, Amendment of 2026-10-25 and
 * ADR 0005 §7.2. The patient application consumes this library, so nothing a
 * v0.4.1 consumer receives may change. This file is the proof, in four
 * independent parts, each recorded from the v0.4.1 tree (commit 6c75753)
 * before any v0.5.0 change was made:
 *
 *   1. every v0.4.1 token keeps its value, and the additions are exactly the
 *      set named below;
 *   2. every v0.4.1 icon keeps its position, its artwork and its mirror flag;
 *   3. every style rule v0.4.1 shipped is still there, byte for byte — whole
 *      files by digest, and for the two files that gained a clearly delimited
 *      section at their end, the comment-stripped v0.4.1 text as a prefix;
 *   4. the markup of every default render is identical to v0.4.1's.
 *
 * The baselines are written out here and read from nowhere else. A guard that
 * regenerated its expectation from the tree it guards would pass for any tree.
 * Self-contained by the rule in tests/architecture/README.md.
 */

// ---------------------------------------------------------------------------
// 1 · Tokens
// ---------------------------------------------------------------------------

/** The 119 public tokens of v0.4.1, with their resolved values. */
const V0_4_1_TOKENS: Record<string, string> = {
  "--action-blue-hover": "#0062ac",
  "--action-blue-press": "#045398",
  "--action-blue-rest": "#0273b6",
  "--action-green-hover": "#0c7912",
  "--action-green-press": "#026e1e",
  "--action-green-rest": "#347f1b",
  "--action-red-hover": "#c80303",
  "--action-red-press": "#b90304",
  "--action-red-rest": "#d51013",
  "--app-bar-height": "56px",
  "--background": "#ffffff",
  "--border": "#e2e6dd",
  "--border-strong": "#a0a79c",
  "--bottom-nav-height": "64px",
  "--bottom-nav-safe-area": "20px",
  "--brand-blue": "#0383ce",
  "--brand-blue-dark": "#002a5e",
  "--brand-blue-soft": "#eaf5fc",
  "--brand-green": "#3c9220",
  "--brand-green-dark": "#0c7912",
  "--brand-green-soft": "#f0f8e7",
  "--brand-red": "#ec1417",
  "--brand-red-dark": "#c80303",
  "--brand-red-soft": "#fdebec",
  "--control-height-button-lg": "52px",
  "--control-height-button-md": "48px",
  "--control-height-input": "48px",
  "--control-min-target": "44px",
  "--danger": "#ec1417",
  "--danger-bg": "#fdebec",
  "--danger-fg": "#c80303",
  "--disabled-bg": "#f1f3ef",
  "--disabled-border": "#e2e6dd",
  "--disabled-text": "#a0a79c",
  "--divider": "#edf0ea",
  "--duration-base": "200ms",
  "--duration-fast": "120ms",
  "--duration-shimmer": "1400ms",
  "--duration-slow": "320ms",
  "--easing-standard": "cubic-bezier(0.2, 0, 0, 1)",
  "--focus-indicator-inner-color": "#ffffff",
  "--focus-indicator-inner-width": "2px",
  "--focus-indicator-outer-color": "#002a5e",
  "--focus-indicator-outer-width": "2px",
  "--font-ui": '"Vazirmatn", "Segoe UI", Tahoma, Arial, sans-serif',
  "--info": "#0383ce",
  "--info-bg": "#eaf5fc",
  "--info-fg": "#0062ac",
  "--link": "#016fbb",
  "--link-hover": "#0062ac",
  "--link-press": "#01356f",
  "--neutral-status-bg": "#f7f9f5",
  "--neutral-status-fg": "#667085",
  "--on-brand-icon": "#ffffff",
  "--on-brand-text": "#ffffff",
  "--overlay": "rgba(0, 42, 94, 0.4)",
  "--press-scale": "0.98",
  "--radius-button": "14px",
  "--radius-card": "16px",
  "--radius-control": "12px",
  "--radius-input": "14px",
  "--radius-sheet": "24px",
  "--shadow-modal": "0 16px 48px rgba(0, 42, 94, 0.18)",
  "--shadow-nav": "0 -2px 12px rgba(0, 42, 94, 0.06)",
  "--shadow-sheet": "0 -12px 40px rgba(0, 42, 94, 0.14)",
  "--space-1": "4px",
  "--space-2": "8px",
  "--space-3": "12px",
  "--space-4": "16px",
  "--space-5": "20px",
  "--space-6": "24px",
  "--space-7": "32px",
  "--space-8": "40px",
  "--success": "#3c9220",
  "--success-bg": "#f0f8e7",
  "--success-fg": "#0c7912",
  "--surface": "#ffffff",
  "--surface-subtle": "#f7f9f5",
  "--text-body": "15px",
  "--text-body-line-height": "1.68",
  "--text-body-size": "15px",
  "--text-body-weight": "400",
  "--text-button": "15px",
  "--text-button-line-height": "1",
  "--text-button-size": "15px",
  "--text-button-weight": "600",
  "--text-caption": "12px",
  "--text-caption-line-height": "1.5",
  "--text-caption-size": "12px",
  "--text-caption-weight": "400",
  "--text-card-title": "16px",
  "--text-card-title-line-height": "1.5",
  "--text-card-title-size": "16px",
  "--text-card-title-weight": "600",
  "--text-display": "32px",
  "--text-display-line-height": "1.28",
  "--text-display-size": "32px",
  "--text-display-weight": "700",
  "--text-label": "13px",
  "--text-label-line-height": "1.5",
  "--text-label-size": "13px",
  "--text-label-weight": "500",
  "--text-page-title": "22px",
  "--text-page-title-line-height": "1.36",
  "--text-page-title-size": "22px",
  "--text-page-title-weight": "600",
  "--text-primary": "#002a5e",
  "--text-secondary": "#667085",
  "--text-section-title": "19px",
  "--text-section-title-line-height": "1.42",
  "--text-section-title-size": "19px",
  "--text-section-title-weight": "600",
  "--weight-bold": "700",
  "--weight-medium": "500",
  "--weight-regular": "400",
  "--weight-semibold": "600",
  "--z-chrome": "10",
  "--z-dialog": "30",
  "--z-scrim": "20",
};

/** The only identifiers v0.5.0 adds. Everything else must be absent. */
const V0_5_0_ADDED_TOKENS: Record<string, string> = {
  "--text-tertiary": "#8a9384",
  "--action-green-brand-rest": "#3c9220",
  "--action-green-brand-hover": "#347f1b",
  "--action-green-brand-press": "#0c7912",
  "--control-width-otp-cell": "48px",
  "--control-height-otp-cell": "52px",
};

describe("v0.5.0 is additive · tokens", () => {
  const actual = tokens as unknown as Record<string, string>;

  it("keeps all 119 v0.4.1 tokens, each with its v0.4.1 value", () => {
    expect(Object.keys(V0_4_1_TOKENS)).toHaveLength(119);
    for (const [name, value] of Object.entries(V0_4_1_TOKENS)) {
      expect(actual[name], name + " changed or was removed").toBe(value);
    }
  });

  it("adds exactly six tokens, with exactly the values stated", () => {
    const added = Object.keys(actual).filter(
      (name) => !(name in V0_4_1_TOKENS),
    );
    expect(added.sort()).toEqual(Object.keys(V0_5_0_ADDED_TOKENS).sort());
    for (const [name, value] of Object.entries(V0_5_0_ADDED_TOKENS)) {
      expect(actual[name], name).toBe(value);
    }
    expect(Object.keys(actual)).toHaveLength(125);
  });

  it("does not resurrect the retired --text-muted under any spelling", () => {
    // The Owner Contrast Ruling retired it and no replacement alias was to be
    // created. The design's muted ink arrives under a different name, so the
    // retirement stands and the guards that assert it stay unweakened.
    for (const name of Object.keys(actual)) {
      expect(name, name).not.toMatch(/muted/);
    }
  });

  it("defines each new token in the file that holds its siblings, via a palette entry", () => {
    const dir = fileURLToPath(new URL("../../src/tokens", import.meta.url));
    const colors = readFileSync(dir + "/colors.css", "utf8");
    const base = readFileSync(dir + "/base.css", "utf8");
    expect(colors).toMatch(/--text-tertiary:\s*var\(--neutral-500\);/);
    expect(colors).toMatch(/--action-green-brand-rest:\s*var\(--green-500\);/);
    expect(colors).toMatch(/--action-green-brand-hover:\s*var\(--green-550\);/);
    expect(colors).toMatch(/--action-green-brand-press:\s*var\(--green-600\);/);
    expect(base).toMatch(/--control-width-otp-cell:\s*48px;/);
    expect(base).toMatch(/--control-height-otp-cell:\s*52px;/);
    // No new raw palette entry: the palette stays at its thirty.
    const palette = colors.match(
      /^\s*--(?:white|(?:green|blue|red|neutral)-\d+):/gm,
    );
    expect(palette).toHaveLength(30);
  });

  it("maps the two new colours into Tailwind and leaves geometry unmapped", () => {
    const preset = readFileSync(
      fileURLToPath(
        new URL("../../src/tokens/tailwind-preset.css", import.meta.url),
      ),
      "utf8",
    );
    expect(preset).toContain("--color-text-tertiary: var(--text-tertiary);");
    expect(preset).toContain(
      "--color-action-green-brand-rest: var(--action-green-brand-rest);",
    );
    expect(preset).not.toContain("otp-cell");
  });
});

// ---------------------------------------------------------------------------
// 2 · Icons
// ---------------------------------------------------------------------------

/** The fifteen v0.4.1 registry entries, exactly as that tree held them. */
const V0_4_1_ICONS = {
  back: { nodes: [["path", { d: "m15 18-6-6 6-6" }]], mirror: true },
  chevron: { nodes: [["path", { d: "m9 18 6-6-6-6" }]], mirror: true },
  search: {
    nodes: [
      ["path", { d: "m21 21-4.34-4.34" }],
      ["circle", { cx: "11", cy: "11", r: "8" }],
    ],
    mirror: false,
  },
  close: {
    nodes: [
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" }],
    ],
    mirror: false,
  },
  check: { nodes: [["path", { d: "M20 6 9 17l-5-5" }]], mirror: false },
  alert: {
    nodes: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }],
    ],
    mirror: false,
  },
  info: {
    nodes: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 16v-4" }],
      ["path", { d: "M12 8h.01" }],
    ],
    mirror: false,
  },
  camera: {
    nodes: [
      [
        "path",
        {
          d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
        },
      ],
      ["circle", { cx: "12", cy: "13", r: "3" }],
    ],
    mirror: false,
  },
  trash: {
    nodes: [
      ["path", { d: "M10 11v6" }],
      ["path", { d: "M14 11v6" }],
      ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
      ["path", { d: "M3 6h18" }],
      ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }],
    ],
    mirror: false,
  },
  plus: {
    nodes: [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "M12 5v14" }],
    ],
    mirror: false,
  },
  star: {
    nodes: [
      [
        "path",
        {
          d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        },
      ],
    ],
    mirror: false,
  },
  listing: {
    nodes: [
      ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" }],
      [
        "path",
        {
          d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
        },
      ],
      ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" }],
    ],
    mirror: false,
  },
  folder: {
    nodes: [
      [
        "path",
        {
          d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        },
      ],
    ],
    mirror: false,
  },
  wallet: {
    nodes: [
      [
        "path",
        {
          d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
        },
      ],
      ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }],
    ],
    mirror: false,
  },
  person: {
    nodes: [
      ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "12", cy: "7", r: "4" }],
    ],
    mirror: false,
  },
};

describe("v0.5.0 is additive · icons", () => {
  it("keeps the fifteen v0.4.1 entries first, in order, artwork and mirror flag untouched", () => {
    const names = Object.keys(V0_4_1_ICONS);
    expect(names).toHaveLength(15);
    expect(Object.keys(ICON_REGISTRY).slice(0, 15)).toEqual(names);
    for (const name of names) {
      expect(JSON.stringify(ICON_REGISTRY[name as IconName]), name).toBe(
        JSON.stringify((V0_4_1_ICONS as Record<string, unknown>)[name]),
      );
    }
  });

  it("renders each of the fifteen exactly as before (box, stroke, colour, flip)", () => {
    const digest = createHash("sha256");
    for (const name of Object.keys(V0_4_1_ICONS)) {
      digest.update(
        renderToStaticMarkup(createElement(Icon, { name: name as IconName })),
      );
    }
    // Recorded from v0.4.1 over the same fifteen renders.
    expect(digest.digest("hex")).toBe(
      "faf9bb833f5f952f684202a6d1d665b218153d99acc6a01e42fb8280754dd9df",
    );
  });
});

// ---------------------------------------------------------------------------
// 3 · Styles
// ---------------------------------------------------------------------------

const stylesDir = fileURLToPath(new URL("../../src/styles", import.meta.url));

function stripped(file: string): string {
  return readFileSync(stylesDir + "/" + file, "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
  );
}

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

/** Comment-stripped sha256 of every style file v0.5.0 does not touch. */
const UNTOUCHED_STYLES: Record<string, string> = {
  "field.css":
    "4203ec51cc2f69db279242ecbcc393a24db0e073c54cee4ed50a03490d692fee",
  "fonts.css":
    "7c50bfe644939011633e91e1caf31b2b937355bfdb405aae35102721e521bd39",
  "global.css":
    "0ade3246eb8792fbb150d3498d4d285b9cd01d6e3255f74d11054d542f71824c",
  "index.css":
    "66317f557bcebbde8f02e7b670126e49a9956eaed1c89f323e73ef792070eb77",
  "keyframes.css":
    "b11c8f4883466314aaf5098674b8494804425013bc33e2c2b5be7fe43117ae41",
  "overlay.css":
    "c49708cbd1a859e2395f285ff2e0f866e85a9ee5f884416f5508147d9284c8cf",
  "reset.css":
    "228b72de66fb119f06aa6718afd6594d9f92fcb6e44d6d371ffddd2eb06a1afa",
};

/** The two files that gained a section at the end: length and digest of v0.4.1's text. */
const EXTENDED_STYLES: Record<string, { length: number; sha256: string }> = {
  "button.css": {
    length: 5458,
    sha256: "ae6238e9763945252cfa4004d0631a5a93f2e724615436cdfb60dd4fb54af607",
  },
  "otp-input.css": {
    length: 1329,
    sha256: "3325451fc3b3096d4d2cfd2c5c306883d2b3f27c08b221226779d393100d1e3a",
  },
};

describe("v0.5.0 is additive · styles", () => {
  it("leaves every style file it does not mean to touch byte-identical (comments aside)", () => {
    for (const [file, digest] of Object.entries(UNTOUCHED_STYLES)) {
      expect(sha256(stripped(file)), file).toBe(digest);
    }
  });

  it("keeps every v0.4.1 rule of the two extended files as an unchanged prefix", () => {
    for (const [file, baseline] of Object.entries(EXTENDED_STYLES)) {
      const now = stripped(file);
      expect(now.length, file + " shrank").toBeGreaterThan(baseline.length);
      expect(sha256(now.slice(0, baseline.length)), file).toBe(baseline.sha256);
    }
  });

  it("styles.css index imports the same nine files in the same order", () => {
    // The sheet list did not change: no new file, no new subpath.
    const imports = stripped("index.css").match(/@import "[^"]+";/g);
    expect(imports).toEqual([
      '@import "../tokens/base.css";',
      '@import "./fonts.css";',
      '@import "./reset.css";',
      '@import "./global.css";',
      '@import "./keyframes.css";',
      '@import "./overlay.css";',
      '@import "./field.css";',
      '@import "./button.css";',
      '@import "./otp-input.css";',
    ]);
  });
});

// ---------------------------------------------------------------------------
// 4 · Default output
// ---------------------------------------------------------------------------

describe("v0.5.0 is additive · default markup", () => {
  const render = (element: Parameters<typeof renderToStaticMarkup>[0]) =>
    renderToStaticMarkup(element);

  it("renders all 64 variant x tone x size Buttons exactly as v0.4.1 did", () => {
    const rendered: Record<string, string> = {};
    for (const variant of [undefined, "primary", "secondary", "text"] as const)
      for (const tone of [undefined, "green", "blue", "red"] as const)
        for (const size of [undefined, "sm", "md", "lg"] as const)
          rendered[variant + "|" + tone + "|" + size] = render(
            createElement(
              Button,
              {
                ...(variant === undefined ? {} : { variant }),
                ...(tone === undefined ? {} : { tone }),
                ...(size === undefined ? {} : { size }),
              },
              "x",
            ),
          );
    expect(sha256(JSON.stringify(rendered))).toBe(
      "5561188d21ba454da3e352d3313186494ecd0c2287c8422b4c37b5931173a0fb",
    );
    // Spelled out for the one a reader will look for first.
    expect(rendered["primary|green|md"]).toBe(
      '<button class="zakhmban-button zakhmban-button-primary zakhmban-button-green zakhmban-button-md"><span class="zakhmban-button-label">x</span></button>',
    );
  });

  it("renders block, loading, icon, className and disabled Buttons as v0.4.1 did", () => {
    expect(
      render(
        createElement(
          Button,
          { block: true, loading: true, iconStart: "plus", className: "c" },
          "x",
        ),
      ),
    ).toBe(
      '<button class="zakhmban-button zakhmban-button-secondary zakhmban-button-green zakhmban-button-md zakhmban-button-block c" aria-busy="true" aria-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg><span class="zakhmban-button-label">x</span></button>',
    );
    expect(render(createElement(Button, { disabled: true }, "x"))).toBe(
      '<button class="zakhmban-button zakhmban-button-secondary zakhmban-button-green zakhmban-button-md" disabled=""><span class="zakhmban-button-label">x</span></button>',
    );
  });

  it("passes fill=action through as the default — identical to omitting it", () => {
    expect(
      render(
        createElement(Button, { variant: "primary", fill: "action" }, "x"),
      ),
    ).toBe(render(createElement(Button, { variant: "primary" }, "x")));
  });

  it("renders OtpInput exactly as v0.4.1 did, default, errored and with a className", () => {
    expect(render(createElement(OtpInput, {}))).toBe(
      '<div class="zakhmban-otp"><div id="_R_0_" class="zakhmban-otp-cells" dir="ltr" role="group"><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="1" autoComplete="one-time-code" value=""/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="2" value=""/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="3" value=""/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="4" value=""/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="5" value=""/></div></div>',
    );
    expect(
      render(
        createElement(OtpInput, {
          length: 6,
          value: "123",
          error: "e",
          id: "o",
        }),
      ),
    ).toBe(
      '<div class="zakhmban-otp"><div id="o" class="zakhmban-otp-cells" dir="ltr" role="group"><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="1" aria-invalid="true" aria-describedby="o-error" autoComplete="one-time-code" value="1"/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="2" aria-invalid="true" aria-describedby="o-error" value="2"/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="3" aria-invalid="true" aria-describedby="o-error" value="3"/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="4" aria-invalid="true" aria-describedby="o-error" value=""/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="5" aria-invalid="true" aria-describedby="o-error" value=""/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="6" aria-invalid="true" aria-describedby="o-error" value=""/></div><p class="zakhmban-otp-error" id="o-error" role="alert">e</p></div>',
    );
    expect(
      render(createElement(OtpInput, { className: "c", value: "12345" })),
    ).toBe(
      '<div class="zakhmban-otp c"><div id="_R_0_" class="zakhmban-otp-cells" dir="ltr" role="group"><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="1" autoComplete="one-time-code" value="1"/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="2" value="2"/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="3" value="3"/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="4" value="4"/><input class="zakhmban-otp-cell" inputMode="numeric" aria-label="5" value="5"/></div></div>',
    );
    expect(render(createElement(OtpInput, { appearance: "default" }))).toBe(
      render(createElement(OtpInput, {})),
    );
  });

  it("renders TextField exactly as v0.4.1 did — v0.5.0 adds nothing to it", () => {
    expect(render(createElement(TextField, { label: "l", id: "t" }))).toBe(
      '<div class="zakhmban-field"><label class="zakhmban-field-label" for="t">l</label><div class="zakhmban-field-control"><input id="t" class="zakhmban-field-input"/></div></div>',
    );
    expect(
      render(
        createElement(TextField, {
          label: "l",
          id: "t",
          required: true,
          hint: "h",
          error: "e",
          suffix: "s",
        }),
      ),
    ).toBe(
      '<div class="zakhmban-field"><label class="zakhmban-field-label" for="t">l</label><div class="zakhmban-field-control" data-zakhmban-field-invalid="true"><input id="t" class="zakhmban-field-input" required="" aria-invalid="true" aria-describedby="t-suffix t-hint t-error"/><span class="zakhmban-field-suffix" id="t-suffix">s</span></div><p class="zakhmban-field-message" id="t-hint" data-zakhmban-field-message="hint">h</p><p class="zakhmban-field-message" id="t-error" data-zakhmban-field-message="error" role="alert">e</p></div>',
    );
  });
});

// ---------------------------------------------------------------------------
// 5 · The added rules
// ---------------------------------------------------------------------------

/** Only the text after the v0.4.1 baseline, comments removed. */
function added(file: string): string {
  return stripped(file).slice(EXTENDED_STYLES[file]!.length);
}

/** Every selector in a block of CSS, whitespace collapsed. */
function selectors(css: string): string[] {
  return [...css.matchAll(/([^{}]+)\{/g)].map((m) =>
    m[1]!
      .replace(/\s+/g, " ")
      .replace(/\(\s+/g, "(")
      .replace(/\s+\)/g, ")")
      .trim(),
  );
}

describe("v0.5.0 is additive · the rules it adds", () => {
  it("scopes every added Button rule to the opt-in class, so no default Button can match", () => {
    const list = selectors(added("button.css"));
    expect(list).toHaveLength(3);
    for (const selector of list) {
      expect(selector, selector).toContain(".zakhmban-button-fill-brand");
    }
  });

  it("scopes every added OtpInput rule to the opt-in class", () => {
    const list = selectors(added("otp-input.css"));
    expect(list).toHaveLength(2);
    for (const selector of list) {
      expect(selector, selector).toMatch(/^\.zakhmban-otp-filled /);
    }
  });

  it("reads only the new tokens and existing semantic ones — no literal, no palette entry", () => {
    const button = added("button.css");
    const otp = added("otp-input.css");
    expect(
      [...button.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]),
    ).toEqual([
      "--action-green-brand-rest",
      "--action-green-brand-hover",
      "--action-green-brand-press",
    ]);
    expect(
      [
        ...new Set(
          [...otp.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]),
        ),
      ].sort(),
    ).toEqual(
      [
        "--brand-green",
        "--control-height-otp-cell",
        "--control-width-otp-cell",
        "--surface-subtle",
      ].sort(),
    );
    for (const css of [button, otp]) {
      expect(/#[0-9a-fA-F]{3,8}\b/.test(css)).toBe(false);
      expect(/rgba?\(/.test(css)).toBe(false);
      expect(/var\(\s*--(?:green|blue|red|neutral|white)-\d*/.test(css)).toBe(
        false,
      );
      expect(/^\s*--[a-z-]+\s*:/m.test(css), "declares a custom property").toBe(
        false,
      );
    }
  });

  it("uses logical properties only — nothing physical, nothing directional", () => {
    for (const file of ["button.css", "otp-input.css"]) {
      const css = added(file);
      expect(
        /(^|[;{\s])(left|right|margin-left|margin-right|padding-left|padding-right|border-left|border-right|width|height|min-width|min-height|text-align\s*:\s*(left|right))\s*:/.test(
          css,
        ),
        file,
      ).toBe(false);
      expect(/(^|[;{\s])direction\s*:/.test(css), file).toBe(false);
      expect(/(^|[;{\s])outline\s*:/.test(css), file).toBe(false);
    }
  });

  it("never paints over disabled, error or focus: each is excluded by the selector", () => {
    const brand = selectors(added("button.css"));
    for (const selector of brand) {
      expect(selector, selector).toMatch(/:not\(\s*:disabled\s*\)/);
    }
    const digit = selectors(added("otp-input.css")).find((s) =>
      s.includes("[data-zakhmban-otp-digit]"),
    )!;
    for (const guard of [
      ":not(:focus)",
      ":not(:disabled)",
      ':not([aria-invalid="true"])',
    ]) {
      expect(digit, guard).toContain(guard);
    }
  });

  it("keeps the 44px minimum and a minimum-only height on the filled cell", () => {
    const css = added("otp-input.css");
    // 48 wide and 52 tall both clear §6's unconditional 44px; the height is a
    // minimum, so 200% text zoom grows the cell rather than clipping it.
    expect(css).toContain("inline-size: var(--control-width-otp-cell)");
    expect(css).toContain("min-block-size: var(--control-height-otp-cell)");
    expect(/(^|[;{\s])block-size\s*:/.test(css)).toBe(false);
    expect(css).toContain("flex: 0 0 auto");
  });
});
