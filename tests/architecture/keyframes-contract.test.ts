import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * ADR 0004 and the Styles Keyframe Behaviour Owner Decision of 2026-09-25.
 *
 * Self-contained by the rule in `tests/architecture/README.md`.
 */
const stylesDir = fileURLToPath(new URL("../../src/styles", import.meta.url));

function withoutComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

const source = withoutComments(
  readFileSync(`${stylesDir}/keyframes.css`, "utf8"),
);

/** The `prefers-reduced-motion` block, and everything outside it. */
const reduceIndex = source.indexOf("@media (prefers-reduced-motion: reduce)");
const motion = source.slice(0, reduceIndex === -1 ? undefined : reduceIndex);
const reduced = reduceIndex === -1 ? "" : source.slice(reduceIndex);

/** The body of one `@keyframes` block, whitespace collapsed. */
function frames(css: string, name: string): string {
  const start = css.indexOf(`@keyframes ${name}`);
  expect(start, `@keyframes ${name} is missing`).toBeGreaterThan(-1);
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        return css
          .slice(css.indexOf("{", start) + 1, i)
          .replace(/\s+/g, " ")
          .trim();
      }
    }
  }
  throw new Error(`@keyframes ${name} is unterminated`);
}

const APPROVED = [
  "zakhmban-shimmer",
  "zakhmban-fade-up",
  "zakhmban-slide-up",
  "zakhmban-spin",
];

describe("D-4 · the four public keyframes", () => {
  it("defines exactly the four approved names and no fifth", () => {
    // v0.2 §2.4: "Four keyframes exist and no more." A fifth needs an owner
    // decision against that sentence before it needs an ADR.
    const names = [...motion.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)].map(
      (match) => match[1],
    );
    expect(names).toEqual(APPROVED);
  });

  it("prefixes every name, because the CSS namespace is global", () => {
    // ADR 0004 §2: two stylesheets that both define `spin` do not coexist —
    // the later one silently wins, with no build error and no warning.
    for (const name of [
      ...motion.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g),
    ].map((match) => match[1]!)) {
      expect(name.startsWith("zakhmban-"), `${name} is unprefixed`).toBe(true);
    }
  });

  it("emits no --animate-* Tailwind key", () => {
    // ADR 0004 §7: the preset is unchanged, and authored Styles content does
    // not enter a generated artifact.
    expect(source.includes("--animate-")).toBe(false);
  });

  it("carries the exact shimmer frames", () => {
    expect(frames(motion, "zakhmban-shimmer")).toBe(
      "from { background-position: 200% 0; } to { background-position: -200% 0; }",
    );
  });

  it("carries the exact fade-up frames", () => {
    expect(frames(motion, "zakhmban-fade-up")).toBe(
      "from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }",
    );
  });

  it("carries the exact slide-up frames, with no opacity", () => {
    expect(frames(motion, "zakhmban-slide-up")).toBe(
      "from { transform: translateY(100%); } to { transform: translateY(0); }",
    );
    expect(frames(motion, "zakhmban-slide-up").includes("opacity")).toBe(false);
  });

  it("carries the exact spin frames", () => {
    expect(frames(motion, "zakhmban-spin")).toBe(
      "from { transform: rotate(0deg); } to { transform: rotate(360deg); }",
    );
  });
});

describe("the shimmer surface contract", () => {
  it("states the base fill, the no-repeat rule and the size", () => {
    // A @keyframes block holds frames only; the surface is applied by the
    // element, which in v0.2.0 is always an application-owned Tier 2
    // component. The file states the pairing each consumer owes.
    const file = readFileSync(`${stylesDir}/keyframes.css`, "utf8");
    for (const required of [
      "background-color: var(--surface-subtle)",
      "background-repeat: no-repeat",
      "background-size: 200% 100%",
      "var(--surface-subtle) 0%",
      "var(--surface) 50%",
      "var(--surface-subtle) 100%",
      "var(--duration-shimmer)",
    ]) {
      expect(
        file.includes(required),
        `shimmer contract omits ${required}`,
      ).toBe(true);
    }
  });

  it("records the one-pass geometry and rejects the CSS default", () => {
    const file = readFileSync(`${stylesDir}/keyframes.css`, "utf8");
    expect(file).toContain("NOT conforming");
    expect(file).toContain("exactly once per cycle");
  });

  it("records the physical, unmirrored RTL behaviour", () => {
    const file = readFileSync(`${stylesDir}/keyframes.css`, "utf8");
    expect(file).toContain("not mirrored for RTL");
  });
});

describe("the pairing contracts for duration, timing and iteration", () => {
  it("states each approved pairing", () => {
    const file = readFileSync(`${stylesDir}/keyframes.css`, "utf8");
    for (const pairing of [
      "var(--duration-shimmer) linear infinite",
      "var(--duration-base) var(--easing-standard) 1",
      "var(--duration-slow) var(--easing-standard) 1",
      "1000ms linear infinite",
    ]) {
      expect(file.includes(pairing), `missing pairing ${pairing}`).toBe(true);
    }
  });

  it("creates no duration token for spin's authored 1000ms", () => {
    // The three-duration token set is not reopened; 1000ms stays an authored
    // Styles value.
    expect(source.includes("--duration-spin")).toBe(false);
    expect(/--duration-[a-z]+\s*:/.test(source)).toBe(false);
  });

  it("restricts repetition to a real loading state", () => {
    const file = readFileSync(`${stylesDir}/keyframes.css`, "utf8");
    expect(file).toContain("real loading or in-progress state");
    expect(file).toContain("must stop when that state ends");
    expect(file).toContain("permanent, ambient or ornamental looping remains");
  });
});

describe("D-5 · reduced motion", () => {
  it("suppresses every approved keyframe under prefers-reduced-motion", () => {
    expect(reduced.length).toBeGreaterThan(0);
    const names = [...reduced.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)].map(
      (match) => match[1],
    );
    expect(names).toEqual(APPROVED);
  });

  it("leaves each animation in its approved static end state", () => {
    expect(frames(reduced, "zakhmban-fade-up")).toBe(
      "from, to { opacity: 1; transform: translateY(0); }",
    );
    expect(frames(reduced, "zakhmban-slide-up")).toBe(
      "from, to { transform: translateY(0); }",
    );
    expect(frames(reduced, "zakhmban-spin")).toBe(
      "from, to { transform: rotate(0deg); }",
    );
    // Shimmer stops moving; its flat var(--surface-subtle) base is the
    // element's own background-color, which this keyframe never touches.
    expect(frames(reduced, "zakhmban-shimmer")).toBe(
      "from, to { background-position: 0 0; }",
    );
  });

  it("uses no ultra-short-duration workaround", () => {
    // A forced near-zero duration runs the animation rather than suppressing
    // it, and the ruling prohibits it.
    for (const workaround of ["0.01ms", "0.001s", "1ms", "!important"]) {
      expect(
        reduced.includes(workaround),
        `reduced-motion block uses ${workaround}`,
      ).toBe(false);
    }
  });

  it("reaches past no package-owned keyframe", () => {
    // Consumers remain responsible for consumer-owned animation unless it
    // invokes a package-owned keyframe, so no blanket selector appears.
    expect(/\*\s*,|\*\s*\{/.test(reduced)).toBe(false);
    expect(reduced.includes("animation: none")).toBe(false);
    expect(reduced.includes("transition: none")).toBe(false);
  });
});
