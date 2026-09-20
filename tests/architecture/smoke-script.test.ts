import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The Tailwind consumer smoke script — `scripts/smoke-tailwind-consumer.mjs`.
 *
 * Why this lives in its own file rather than in `release-gate.test.ts`: that
 * guard protects `.github/workflows/release.yml` — which jobs exist, what
 * they may write, what order they run in. The invariants here belong to a
 * different artifact, the script the gate invokes, and the suite's
 * convention is one self-contained file per guarded artifact. Folding them
 * together would also mean a workflow edit and a script edit could not fail
 * independently.
 *
 * The invariant this exists for: **the script must not know the package
 * version.** It previously wrote `file:../zakhmban-ui-0.0.0.tgz` into the
 * throwaway consumer's manifest, reconstructing a name that is npm's to
 * choose. That silently pinned the smoke test to version 0.0.0, so the first
 * legitimate version bump would have broken the release gate — including the
 * pre-tag gate in `release.yml`, which would have made a release impossible
 * rather than merely noisy.
 *
 * The script now asks `npm pack --json` what it wrote. These assertions keep
 * it that way.
 */
const script = readFileSync(
  fileURLToPath(
    new URL("../../scripts/smoke-tailwind-consumer.mjs", import.meta.url),
  ),
  "utf8",
);

/** The script with comment lines removed — executable content only. */
const code = script
  .split("\n")
  .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
  .join("\n");

/**
 * The condition of the `if` whose body throws the containment error, with
 * whitespace normalised.
 *
 * Extracted by matching parentheses rather than by a substring search,
 * because the property under test is that the *active* condition rejects a
 * path outside the destination. An assertion that merely looked for
 * `resolve(destination, filename)` and the word "escapes" passes happily
 * when the condition is replaced by `if (false)` and both strings survive in
 * dead code — which is exactly how this guard was found to be inadequate.
 *
 * Returns null when the throw is not the first statement of an `if` body,
 * which is what a message stranded in unreachable code looks like.
 */
function containmentCondition(source: string): string | null {
  const thrown = source.indexOf("throw new Error(`packed tarball");
  if (thrown === -1) {
    return null;
  }

  const open = source.lastIndexOf("if (", thrown);
  if (open === -1) {
    return null;
  }

  let depth = 0;
  let close = open + "if ".length;
  for (; close < source.length; close += 1) {
    const character = source[close];
    if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth -= 1;
      if (depth === 0) {
        break;
      }
    }
  }
  if (depth !== 0) {
    return null;
  }

  // The throw must be the first statement of that `if`'s body, so the error
  // belongs to the guarded branch rather than sitting somewhere after it.
  if (!/^\s*\{\s*$/.test(source.slice(close + 1, thrown))) {
    return null;
  }

  return source
    .slice(open + "if (".length, close)
    .replace(/\s+/g, " ")
    .trim();
}

describe("Tailwind smoke script — version independence", () => {
  it("asks npm for the tarball name with --json", () => {
    expect(code).toContain(
      '"pack", "--pack-destination", destination, "--json"',
    );
  });

  it("takes the filename from the parsed pack result", () => {
    expect(code).toContain("JSON.parse(output)");
    expect(code).toContain("results[0]?.filename");
  });

  it("hard-codes no tarball filename for any version", () => {
    // The original defect, and every future spelling of it.
    expect(script).not.toContain("zakhmban-ui-0.0.0.tgz");
    expect(
      /zakhmban-ui-\d+\.\d+\.\d+\.tgz/.test(script),
      "the script names a version-specific tarball",
    ).toBe(false);
  });

  it("never reconstructs the name from package metadata", () => {
    // A guessed name that happens to be right is indistinguishable from a
    // wrong one until a release is already in flight.
    expect(code).not.toMatch(/\$\{\s*(pkg|manifest|name|version)\s*\}\.tgz/);
    expect(code).not.toMatch(/zakhmban-ui-\$\{/);
    expect(code).not.toMatch(/\.version\s*\}?\s*\+?\s*["'`]\.tgz/);
  });

  it("refuses a pack result it cannot understand", () => {
    expect(code).toContain("Array.isArray(results)");
    expect(code).toContain("results.length !== 1");
    expect(code).toMatch(/typeof filename !== "string"/);
    expect(code).toContain("basename(filename)");
  });

  it("verifies the reported tarball exists before installing it", () => {
    expect(code).toContain("existsSync(tarball)");
    const packed = code.indexOf("existsSync(tarball)");
    const installed = code.indexOf('npm(["install"');
    expect(packed, "no existence check").toBeGreaterThan(-1);
    expect(installed, "no install call").toBeGreaterThan(-1);
    expect(
      packed,
      "the tarball is installed before its existence is checked",
    ).toBeLessThan(installed);
  });

  it("installs the exact reported file, not a rebuilt path", () => {
    expect(code).toContain("`file:${tarball}`");
  });

  it("keeps the tarball inside the directory it created", () => {
    expect(code).toContain("resolve(destination, filename)");

    // Assert the ACTIVE condition, not that the words appear somewhere. A
    // dead `if (false)` branch leaves every substring in place while the
    // check no longer runs.
    const condition = containmentCondition(code);
    expect(
      condition,
      "no containment `if` guards the escape error — the check is absent, or its message is stranded in unreachable code",
    ).not.toBeNull();

    const guard = condition as string;
    expect(guard.startsWith("!"), `condition is not negated: ${guard}`).toBe(
      true,
    );
    expect(
      guard.includes("tarball.startsWith("),
      `condition does not test the tarball prefix: ${guard}`,
    ).toBe(true);
    expect(
      guard.includes("resolve(destination)"),
      `the resolved destination prefix is not part of the condition: ${guard}`,
    ).toBe(true);
  });

  it("still removes its temporary directory in a finally block", () => {
    expect(code).toMatch(/}\s*finally\s*{/);
    expect(code).toContain("rmSync(work, { recursive: true, force: true })");
    expect(code).toContain("mkdtempSync(");
  });

  it("keeps the pinned Tailwind and PostCSS versions", () => {
    expect(code).toContain('const TAILWIND = "4.3.3"');
    expect(code).toContain('const POSTCSS = "8.5.6"');
  });

  it("adds no dependency to parse JSON", () => {
    // The script's OWN imports, anchored at column 0. The `postcss` and
    // `@tailwindcss/postcss` specifiers further down are indented string
    // literals the script writes into the throwaway consumer, where they are
    // that project's devDependencies, not this one's.
    const imports = [
      ...script.matchAll(/^(?:import .*|\}) from "([^"]+)";$/gm),
    ].map((match) => match[1] as string);

    expect(imports.length).toBeGreaterThan(0);
    for (const specifier of imports) {
      expect(specifier.startsWith("node:"), specifier).toBe(true);
    }
  });
});
