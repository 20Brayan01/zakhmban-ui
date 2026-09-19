#!/usr/bin/env node
/**
 * Token generation.
 *
 * UI System Specification v0.2 §2 fixes the order: the authored CSS custom
 * properties under src/tokens/ are the single source of truth, and the typed
 * object and the Tailwind artifact are derived, never authored. This script is
 * that derivation. A value that reaches a generated artifact without being in
 * the authored CSS is impossible by construction; a value hand-edited into a
 * generated artifact is a build error, because `--check` regenerates into
 * memory and fails on any difference.
 *
 * Inputs   src/tokens/{colors,typography,spacing,elevation,motion,fonts,base}.css
 * Outputs  src/tokens/index.ts             the typed object (ADR 0003 §11)
 *          src/tokens/tailwind-preset.css  the @theme artifact (ADR 0003 §12)
 *
 * Usage    node scripts/generate-tokens.mjs           write
 *          node scripts/generate-tokens.mjs --check   verify, write nothing
 *
 * No dependency, no network. The authored subset of CSS is a flat list of
 * custom-property declarations on :root, so parsing it needs no PostCSS
 * (ADR 0003 §14).
 *
 * The generator never invents. It fails, rather than guessing, on a property
 * it cannot classify, on a hex outside colors.css, on a raw palette entry
 * reaching a public artifact, on a semantic colour that restates a literal
 * instead of referencing one, and on a circular custom-property reference.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tokensDir = join(root, "src", "tokens");

/** The seven authored files, in the order base.css imports them. */
const AUTHORED_FILES = [
  "colors.css",
  "typography.css",
  "spacing.css",
  "elevation.css",
  "motion.css",
  "fonts.css",
  "base.css",
];

/**
 * A raw palette identifier, by shape: the three families v0.2 §2.1 names plus
 * warm green-tinted neutrals. The generator classifies structurally rather
 * than from a hard-coded list of the thirty approved entries, so the authored
 * CSS stays the only place the set is written down.
 */
const RAW_PALETTE_NAME = /^--(?:white|(?:green|blue|red|neutral)-\d+)$/;

/** Package-internal, never public, and never mapped into Tailwind. */
const INTERNAL_NON_PALETTE = new Set(["--radius-checkbox"]);

const HEX = /^#[0-9a-f]{3,8}$/;
const CONTAINS_HEX = /#[0-9a-fA-F]{3,8}\b/;
const VAR_REFERENCE = /^var\((--[a-z0-9-_]+)\)$/;

class GenerationError extends Error {}

function fail(message) {
  throw new GenerationError(message);
}

/**
 * Parse one authored file into ordered declarations.
 *
 * Accepts exactly what the authored subset uses: comments, `@import` at the
 * top, and a single `:root` block of `--name: value;` declarations. Anything
 * else is a shape the generator refuses to guess at.
 */
function parseAuthored(file, source) {
  const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, "");

  const open = withoutComments.indexOf(":root {");
  if (open === -1) {
    fail(`${file}: no ":root {" block — every token is declared on :root`);
  }
  if (withoutComments.indexOf(":root {", open + 1) !== -1) {
    fail(`${file}: more than one ":root" block — declare every token once`);
  }

  const before = withoutComments.slice(0, open);
  for (const line of before.split("\n")) {
    const text = line.trim();
    if (text === "" || text.startsWith("@import ")) {
      continue;
    }
    fail(`${file}: unexpected rule before :root — "${text}"`);
  }

  const close = withoutComments.indexOf("}", open);
  if (close === -1) {
    fail(`${file}: unterminated ":root" block`);
  }

  const after = withoutComments.slice(close + 1).trim();
  if (after !== "") {
    fail(
      `${file}: content after the :root block — a second selector, a theme ` +
        `variant or a media query is not part of the authored token shape ` +
        `(ADR 0003 §3: light theme only, one declaration per token)`,
    );
  }

  const declarations = [];
  for (const chunk of withoutComments.slice(open + 7, close).split(";")) {
    const text = chunk.trim();
    if (text === "") {
      continue;
    }
    const colon = text.indexOf(":");
    if (colon === -1) {
      fail(`${file}: cannot parse declaration "${text}"`);
    }
    const name = text.slice(0, colon).trim();
    const value = text
      .slice(colon + 1)
      .trim()
      .replace(/\s+/g, " ");
    if (!name.startsWith("--")) {
      fail(
        `${file}: "${name}" is not a custom property — the authored token ` +
          `files declare custom properties and nothing else`,
      );
    }
    declarations.push({ file, name, value });
  }

  return declarations;
}

/** Read and classify every authored declaration. */
function readTokens() {
  /** @type {Map<string, {file: string, name: string, value: string, kind: string}>} */
  const byName = new Map();
  /** @type {{file: string, name: string, value: string, kind: string}[]} */
  const ordered = [];

  for (const file of AUTHORED_FILES) {
    const source = readFileSync(join(tokensDir, file), "utf8");
    for (const declaration of parseAuthored(file, source)) {
      const { name, value } = declaration;

      if (byName.has(name)) {
        fail(
          `${name} is declared twice — in ${byName.get(name).file} and in ` +
            `${file}. ADR 0003 §3 allows one declaration per token.`,
        );
      }

      const isPalette = RAW_PALETTE_NAME.test(name);
      const bareHex = HEX.test(value);

      if (CONTAINS_HEX.test(value) && file !== "colors.css") {
        fail(
          `${file}: ${name} carries a hex literal. Every colour literal lives ` +
            `in colors.css (ADR 0003 §4).`,
        );
      }
      if (bareHex && !isPalette) {
        fail(
          `${name} restates the literal ${value} instead of referencing a raw ` +
            `palette entry (ADR 0003 §4, Decision 1 constraint 6).`,
        );
      }
      if (isPalette && !bareHex) {
        fail(
          `${name} looks like a raw palette entry but its value is "${value}". ` +
            `The raw palette holds opaque colour literals.`,
        );
      }
      if (!/^#[0-9a-f]{3,8}$/.test(value) && /^#/.test(value)) {
        fail(`${name}: hex literals are written lowercase — got "${value}"`);
      }

      let kind;
      if (name.startsWith("--_")) {
        kind = "internal-source";
      } else if (isPalette) {
        kind = "raw-palette";
      } else if (INTERNAL_NON_PALETTE.has(name)) {
        kind = "internal";
      } else {
        kind = "public";
      }

      const entry = { file, name, value, kind };
      byName.set(name, entry);
      ordered.push(entry);
    }
  }

  return { byName, ordered };
}

/**
 * Walk a `var()` alias chain to its terminal literal.
 *
 * Returns the resolved value and every property name traversed on the way,
 * which is what the Tailwind artifact needs to find a family's `--_` source.
 */
function resolve(name, byName) {
  const chain = [];
  const seen = new Set([name]);
  let current = byName.get(name);

  if (current === undefined) {
    fail(`${name} is referenced but never declared`);
  }

  for (;;) {
    const match = VAR_REFERENCE.exec(current.value);
    if (match === null) {
      if (current.value.includes("var(")) {
        fail(
          `${name}: "${current.value}" embeds a var() the generator will not ` +
            `guess at. The authored form is either a terminal literal or ` +
            `exactly var(--other).`,
        );
      }
      return { value: current.value, chain };
    }

    const next = match[1];
    if (seen.has(next)) {
      fail(
        `circular custom-property reference: ${[...seen, next].join(" -> ")}`,
      );
    }
    seen.add(next);
    chain.push(next);

    const target = byName.get(next);
    if (target === undefined) {
      fail(`${name} references ${next}, which is never declared`);
    }
    current = target;
  }
}

/** The `--_` source a Tailwind entry must reference (ADR 0003 §10). */
function internalSource(name, chain) {
  const source = chain.find((link) => link.startsWith("--_"));
  if (source === undefined) {
    fail(
      `${name} is mapped into a Tailwind namespace that collides with its own ` +
        `identifier, but no --_ source is declared for it (ADR 0003 §10)`,
    );
  }
  return source;
}

function quote(value) {
  if (value.includes('"') && !value.includes("'")) {
    return `'${value}'`;
  }
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

const TS_HEADER = `/**
 * GENERATED FILE — do not edit. Changes here are discarded.
 *
 * Written by scripts/generate-tokens.mjs from the authored CSS custom
 * properties in src/tokens/. Edit those, then run \`pnpm build\`;
 * \`node scripts/generate-tokens.mjs --check\` fails the build if this file
 * and its source disagree.
 *
 * ADR 0003 §11 — the public contract this file must satisfy:
 *
 *   - exactly one runtime export, \`tokens\`, and no default export;
 *   - exactly three type exports, each defined from the object;
 *   - flat, with no nested family objects and no helper functions;
 *   - keyed by the canonical public CSS identifier verbatim, leading \`--\`
 *     included, neither stripped nor camel-cased;
 *   - exactly the 118 approved public tokens — no raw palette entry, no
 *     \`--_\` source, no \`--radius-checkbox\`, and no \`--radius-pill\` until an
 *     owner supplies a literal;
 *   - every value a resolved terminal CSS value represented as a string,
 *     never a \`var()\` reference and never a JavaScript number;
 *   - keys whose resolved values are equal all present — a generator that
 *     de-duplicates by value is a defect;
 *   - immutable at compile time through \`as const\`, with no \`Object.freeze\`.
 *
 * Property order is lexicographic by the complete canonical identifier, so
 * generation is deterministic and a review diff is stable. Ordering exists
 * for generation and review; consumers must not treat it as semantic API
 * behaviour.
 */
`;

function renderTypeScript(publicTokens) {
  const lines = [TS_HEADER.trimEnd(), "", "export const tokens = {"];
  for (const { name, value } of publicTokens) {
    lines.push(`  ${quote(name)}: ${quote(value)},`);
  }
  lines.push(
    "} as const;",
    "",
    "export type Tokens = typeof tokens;",
    "export type TokenName = keyof Tokens;",
    "export type TokenValue = Tokens[TokenName];",
    "",
  );
  return lines.join("\n");
}

const CSS_HEADER = `/**
 * GENERATED FILE — do not edit. Changes here are discarded.
 *
 * Written by scripts/generate-tokens.mjs from the authored CSS custom
 * properties in src/tokens/. Edit those, then run \`pnpm build\`;
 * \`node scripts/generate-tokens.mjs --check\` fails the build if this file
 * and its source disagree.
 *
 * The Tailwind v4 \`@theme\` artifact — ADR 0001 and ADR 0003 §12. It
 * references custom properties and restates no value, so the literal exists
 * in exactly one file and this artifact cannot become a second place a colour
 * is defined (ADR 0001 clarification 3).
 *
 * It is not a JavaScript Tailwind preset, not a Tailwind configuration file,
 * and not a runtime or peer dependency. A consumer that uses Tailwind imports
 * it; a consumer that does not ignores it and loses nothing. Content and
 * source scanning stay with the consumer: this package supplies token custom
 * properties and the theme mappings over them, and no utility classes.
 *
 * Import order matters and is consumer-visible. A \`@theme\` layer imported
 * before the custom properties it references, or before Tailwind itself,
 * fails quietly with unstyled output:
 *
 *   @import "tailwindcss";
 *   @import "@zakhmban/ui/styles";
 *   @import "@zakhmban/ui/tokens/tailwind-preset";
 *
 * Four families are deliberately unmapped, because Tailwind v4 has no
 * namespace for them — durations, the press scale, the stacking roles and
 * control geometry, including the two focus-indicator widths. They are
 * reached through the custom property, which every consumer already has via
 * \`@zakhmban/ui/styles\`. Folding geometry into \`--spacing-*\` would reopen a
 * closed scale, and \`z-10\`/\`z-20\`/\`z-30\` must not stand in for the stacking
 * roles: the coincidence is not a contract.
 *
 * No \`--breakpoint-*\`, \`--container-*\` or \`--animate-*\` key is emitted, and
 * no \`@keyframes\`: Decision 16b is deferred, and v0.2 §7 places keyframes
 * under styles/, which has not begun.
 */
`;

/**
 * The namespaces this artifact owns are reset before the Zakhmban keys are
 * declared (ADR 0003 §12). Leaving Tailwind's defaults in place would put
 * \`bg-purple-500\`, \`p-7\`, \`rounded-xl\` and \`ease-in-out\` one keystroke away,
 * which is exactly the implementer-fills-a-deferral the registry's deferral
 * rule prohibits. \`--spacing\` in particular must be reset, or Tailwind's
 * dynamic scale generates every multiple of 4px and reopens the closed
 * spacing scale.
 */
const NAMESPACE_RESETS = [
  "--color-*",
  "--text-*",
  "--font-*",
  "--font-weight-*",
  "--radius-*",
  "--shadow-*",
  "--ease-*",
  "--spacing",
  "--spacing-*",
];

function renderTailwind(groups) {
  const lines = [CSS_HEADER.trimEnd(), "", "@theme {"];

  lines.push("  /* Namespace reset — the approved scales are closed. */");
  for (const namespace of NAMESPACE_RESETS) {
    lines.push(`  ${namespace}: initial;`);
  }

  for (const group of groups) {
    lines.push("", `  /* ${group.comment} */`);
    for (const [key, reference] of group.entries) {
      lines.push(`  ${key}: var(${reference});`);
    }
  }

  lines.push("}", "");
  return lines.join("\n");
}

function build() {
  const { byName, ordered } = readTokens();

  const publicTokens = ordered
    .filter((entry) => entry.kind === "public")
    .map((entry) => ({ ...entry, ...resolve(entry.name, byName) }))
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  for (const token of publicTokens) {
    if (token.value.includes("var(")) {
      fail(`${token.name} did not resolve to a terminal value`);
    }
  }

  // --- Tailwind mapping (ADR 0003 §12) ------------------------------------

  const colours = [];
  const typography = [];
  const weights = [];
  const spacing = [];
  const radius = [];
  const shadow = [];
  const font = [];
  const easing = [];

  const byNamePublic = new Map(publicTokens.map((t) => [t.name, t]));

  for (const token of publicTokens) {
    const { name, file, chain } = token;

    if (file === "colors.css") {
      // One stated suffix rule: a colour identifier ending in `-color` drops
      // that suffix inside the `--color-*` namespace, because the namespace
      // already says colour.
      const bare = name.slice(2).replace(/-color$/, "");
      colours.push([`--color-${bare}`, name]);
      continue;
    }

    if (file === "typography.css") {
      const weight = /^--weight-(.+)$/.exec(name);
      if (weight !== null) {
        weights.push([`--font-weight-${weight[1]}`, name]);
        continue;
      }
      // Only the eight step aliases are mapped; their three sub-properties
      // are referenced by the alias entries rather than mapped themselves.
      if (/-(size|line-height|weight)$/.test(name)) {
        continue;
      }
      const step = /^--text-(.+)$/.exec(name);
      if (step === null) {
        fail(`${name}: unclassified typography token`);
      }
      for (const sub of ["size", "line-height", "weight"]) {
        if (!byNamePublic.has(`--text-${step[1]}-${sub}`)) {
          fail(`--text-${step[1]}-${sub} is missing for the ${name} step`);
        }
      }
      typography.push([name, `--text-${step[1]}-size`]);
      typography.push([
        `${name}--line-height`,
        `--text-${step[1]}-line-height`,
      ]);
      typography.push([`${name}--font-weight`, `--text-${step[1]}-weight`]);
      continue;
    }

    if (file === "spacing.css") {
      const step = /^--space-(\d+)$/.exec(name);
      if (step === null) {
        fail(`${name}: unclassified spacing token`);
      }
      spacing.push([`--spacing-${step[1]}`, name]);
      continue;
    }

    if (file === "elevation.css") {
      shadow.push([name, internalSource(name, chain)]);
      continue;
    }

    if (file === "fonts.css") {
      font.push([name, internalSource(name, chain)]);
      continue;
    }

    if (file === "motion.css") {
      if (name === "--easing-standard") {
        easing.push(["--ease-standard", name]);
      }
      // Durations and the press scale have no Tailwind namespace.
      continue;
    }

    if (file === "base.css") {
      if (name.startsWith("--radius-")) {
        radius.push([name, internalSource(name, chain)]);
      }
      // Control geometry, the focus-indicator widths and the stacking roles
      // have no Tailwind namespace.
      continue;
    }

    fail(`${name}: no Tailwind mapping rule for a token from ${file}`);
  }

  const sortEntries = (entries) =>
    [...entries].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

  const groups = [
    { comment: "Semantic colour.", entries: sortEntries(colours) },
    {
      comment: "Type steps — size, with line height and weight attached.",
      entries: sortEntries(typography),
    },
    { comment: "Weights.", entries: sortEntries(weights) },
    {
      comment: "Spacing — the closed eight-step scale.",
      entries: sortEntries(spacing),
    },
    { comment: "Radius roles.", entries: sortEntries(radius) },
    {
      comment: "Elevation — the three reserved surfaces.",
      entries: sortEntries(shadow),
    },
    { comment: "Font family.", entries: sortEntries(font) },
    {
      comment: "Easing — the only curve in the system.",
      entries: sortEntries(easing),
    },
  ];

  for (const group of groups) {
    if (group.entries.length === 0) {
      fail(`the Tailwind artifact would emit an empty group: ${group.comment}`);
    }
  }

  return {
    typescript: renderTypeScript(publicTokens),
    tailwind: renderTailwind(groups),
    counts: {
      public: publicTokens.length,
      internal: ordered.filter(
        (entry) =>
          entry.kind === "raw-palette" ||
          entry.kind === "internal" ||
          entry.kind === "internal-source",
      ).length,
    },
  };
}

const OUTPUTS = [
  ["index.ts", "typescript"],
  ["tailwind-preset.css", "tailwind"],
];

function main(argv) {
  const check = argv.includes("--check");
  const unknown = argv.filter((arg) => arg !== "--check");
  if (unknown.length > 0) {
    console.error(
      `[generate-tokens] unknown argument: ${unknown.join(", ")}\n` +
        "Usage: node scripts/generate-tokens.mjs [--check]",
    );
    return 1;
  }

  let generated;
  try {
    generated = build();
  } catch (error) {
    if (error instanceof GenerationError) {
      console.error(`[generate-tokens] FAILED — ${error.message}`);
      return 1;
    }
    throw error;
  }

  const stale = [];
  for (const [file, key] of OUTPUTS) {
    const path = join(tokensDir, file);
    const next = generated[key];

    if (check) {
      let current = null;
      try {
        current = readFileSync(path, "utf8");
      } catch {
        stale.push(`${file} is missing`);
        continue;
      }
      if (current !== next) {
        stale.push(`${file} differs from what the authored CSS generates`);
      }
      continue;
    }

    writeFileSync(path, next);
  }

  if (check) {
    if (stale.length > 0) {
      console.error(
        "[generate-tokens] FAILED — generated output is stale:\n  " +
          stale.join("\n  ") +
          "\nRun `node scripts/generate-tokens.mjs` and commit the result. " +
          "Never hand-edit a generated artifact.",
      );
      return 1;
    }
    console.log(
      `[generate-tokens] --check OK — ${generated.counts.public} public tokens, ` +
        `${generated.counts.internal} internal properties`,
    );
    return 0;
  }

  console.log(
    `[generate-tokens] wrote src/tokens/index.ts and ` +
      `src/tokens/tailwind-preset.css — ${generated.counts.public} public ` +
      `tokens, ${generated.counts.internal} internal properties`,
  );
  return 0;
}

process.exitCode = main(process.argv.slice(2));
