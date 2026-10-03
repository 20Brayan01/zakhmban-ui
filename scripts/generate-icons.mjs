#!/usr/bin/env node
/**
 * Icon registry generation — ADR 0005 §2.
 *
 * The glyph registry is a generated artifact, authored nowhere by hand, on the
 * pattern `generate-tokens.mjs` already established: read an exactly pinned
 * upstream source, emit a committed file, and fail the build under `--check`
 * if the committed artifact and its source disagree. Transcribed vector path
 * data is unreviewable and silently wrong; a committed artifact nobody can
 * re-derive is a liability rather than an artifact.
 *
 * Inputs   node_modules/lucide/dist/esm/icons/<kebab>.mjs  — one file per glyph
 *          node_modules/lucide/LICENSE                     — the notice
 * Outputs  src/icons/registry.ts            the eleven-entry registry
 *          src/icons/LUCIDE-LICENSE.txt     a verbatim copy of the notice
 *
 * Usage    node scripts/generate-icons.mjs           write
 *          node scripts/generate-icons.mjs --check   verify, write nothing
 *
 * EXACT-VERSION DEPENDENCY ON A LUCIDE-INTERNAL PATH. `lucide` publishes no
 * `exports` field, so `dist/esm/icons/<kebab>.mjs` is an internal path that
 * resolves today and is not a declared upstream contract. That is acceptable
 * only because EXPECTED_VERSION below is pinned exactly and asserted at
 * generation time: a version bump fails here rather than silently reading a
 * moved file or different artwork. Upstream also renames glyphs — at 1.51.0
 * the canonical files are `circle-alert` and `trash`, with `alert-circle` and
 * `trash-2` surviving only as alias exports — so the table below names
 * canonical files and never aliases. Re-verify both facts when bumping.
 *
 * Lucide is a devDependency and reaches no runtime import graph: this script
 * runs at build time and emits literals. `dependencies` stays `{}`.
 *
 * Unlike `generate-tokens.mjs`, this generator formats its TypeScript output
 * with Prettier's Node API rather than hand-emitting prettier-clean text.
 * Token output is a flat list of short key/value pairs; vector path data is
 * not, and `pnpm format:check` covers `src/`. Prettier is an exactly pinned
 * devDependency already in the build path, so the formatting step is as
 * deterministic as the rest of the generation.
 */
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import prettier from "prettier";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const iconsDir = join(root, "src", "icons");
const lucideDir = join(root, "node_modules", "lucide");
const upstreamIcons = join(lucideDir, "dist", "esm", "icons");

/** The pinned upstream version this generator was verified against. */
const EXPECTED_VERSION = "1.51.0";

/**
 * The eleven public names ADR 0005 §7 admits, in the order its table lists
 * them, each mapped to the canonical upstream file and carrying its mirroring
 * decision as an explicit boolean.
 *
 * `mirror` is v0.2 §5's declared property, not an inference from the name and
 * not a default. The two directional glyphs store the LTR-authored base
 * artwork and set the flag; storing a pre-mirrored glyph instead would throw
 * the declaration away and is prohibited by the Icon Foundation
 * Implementation Authorization.
 */
const GLYPHS = [
  { name: "back", upstream: "chevron-left", mirror: true },
  { name: "chevron", upstream: "chevron-right", mirror: true },
  { name: "search", upstream: "search", mirror: false },
  { name: "close", upstream: "x", mirror: false },
  { name: "check", upstream: "check", mirror: false },
  { name: "alert", upstream: "circle-alert", mirror: false },
  { name: "info", upstream: "info", mirror: false },
  { name: "camera", upstream: "camera", mirror: false },
  { name: "trash", upstream: "trash", mirror: false },
  { name: "plus", upstream: "plus", mirror: false },
  { name: "star", upstream: "star", mirror: false },
];

/**
 * The SVG element names the eleven glyphs are allowed to use. A closed list,
 * so an upstream change that introduces a shape the component does not render
 * fails generation instead of rendering nothing.
 */
const ALLOWED_TAGS = ["circle", "line", "path"];

/**
 * Attribute names must be plain camelCase or lowercase, because they are
 * spread straight onto a React SVG element. A hyphenated or namespaced key
 * such as `stroke-width` would be dropped or mis-applied by React, so it
 * fails generation rather than rendering subtly wrong.
 */
const ATTRIBUTE_NAME = /^[a-z][a-zA-Z0-9]*$/;

class GenerationError extends Error {}

function fail(message) {
  throw new GenerationError(message);
}

function assertUpstreamVersion() {
  let manifest;
  try {
    manifest = JSON.parse(
      readFileSync(join(lucideDir, "package.json"), "utf8"),
    );
  } catch {
    fail(
      "node_modules/lucide is not installed — run `pnpm install --frozen-lockfile`",
    );
  }
  if (manifest.name !== "lucide") {
    fail(`node_modules/lucide declares name "${manifest.name}"`);
  }
  if (manifest.version !== EXPECTED_VERSION) {
    fail(
      `lucide ${manifest.version} is installed but this generator is verified ` +
        `against ${EXPECTED_VERSION}. Upstream renames glyphs and may move ` +
        `dist/esm/icons/, so re-verify the eleven mappings and the LICENSE, ` +
        `then update EXPECTED_VERSION in this file.`,
    );
  }
  if (manifest.license !== "ISC") {
    fail(
      `lucide ${manifest.version} declares license "${manifest.license}", not ` +
        `ISC. The notice delivery in src/icons/ assumes ISC plus the Feather ` +
        `MIT attribution the same file carries.`,
    );
  }
}

async function readGlyph({ name, upstream, mirror }) {
  const file = join(upstreamIcons, `${upstream}.mjs`);
  let module;
  try {
    module = await import(pathToFileURL(file).href);
  } catch {
    fail(
      `${name}: upstream glyph "${upstream}" is not at ` +
        `dist/esm/icons/${upstream}.mjs. At ${EXPECTED_VERSION} the canonical ` +
        `files are kebab-case and aliases have no file of their own.`,
    );
  }

  const nodes = module.default;
  if (!Array.isArray(nodes) || nodes.length === 0) {
    fail(`${name}: upstream "${upstream}" exported no drawing instructions`);
  }

  for (const node of nodes) {
    if (!Array.isArray(node) || node.length !== 2) {
      fail(`${name}: upstream node is not a [tag, attributes] pair`);
    }
    const [tag, attributes] = node;
    if (!ALLOWED_TAGS.includes(tag)) {
      fail(
        `${name}: upstream uses <${tag}>, which is outside the allow-list ` +
          `${ALLOWED_TAGS.join(", ")}. The component renders no other shape.`,
      );
    }
    if (attributes === null || typeof attributes !== "object") {
      fail(`${name}: upstream <${tag}> carries no attribute object`);
    }
    for (const [key, value] of Object.entries(attributes)) {
      if (!ATTRIBUTE_NAME.test(key)) {
        fail(
          `${name}: upstream <${tag}> carries attribute "${key}", which is ` +
            `not a plain React SVG attribute name`,
        );
      }
      if (typeof value !== "string" && typeof value !== "number") {
        fail(`${name}: upstream <${tag}> attribute "${key}" is not a scalar`);
      }
    }
  }

  return { name, upstream, mirror, nodes };
}

function quote(value) {
  return JSON.stringify(value);
}

function renderNode([tag, attributes]) {
  const pairs = Object.entries(attributes)
    .map(([key, value]) => `${key}: ${quote(String(value))}`)
    .join(", ");
  return `[${quote(tag)}, { ${pairs} }]`;
}

function renderRegistry(glyphs) {
  const tags = [
    ...new Set(glyphs.flatMap(({ nodes }) => nodes.map(([tag]) => tag))),
  ].sort();

  const header = `/**
 * GENERATED FILE — do not edit. Changes here are discarded.
 *
 * Written by scripts/generate-icons.mjs from lucide@${EXPECTED_VERSION} (ISC;
 * the package-root LICENSE additionally carries the Feather MIT attribution,
 * and a verbatim copy of it ships beside this file as LUCIDE-LICENSE.txt).
 * Run \`pnpm build\`; \`node scripts/generate-icons.mjs --check\` fails the build
 * if this file and its upstream source disagree.
 *
 * ADR 0005 — the contract this file must satisfy:
 *
 *   - exactly the eleven approved public names, in §7's order;
 *   - each entry carries its drawing instructions and its mirroring decision
 *     as an EXPLICIT boolean — v0.2 §5 makes mirroring a declared property,
 *     never inferred from the name and never defaulted;
 *   - the two directional glyphs hold the LTR-authored base artwork; the flag,
 *     not the artwork, is what makes them correct in the RTL document;
 *   - package-internal — never exported from the root entry, never reachable
 *     by a deep import, and never published as a runtime name array.
 *
 * \`IconName\` is derived from this object, so the public union and the data it
 * indexes cannot drift apart.
 */

export type IconNodeTag = ${tags.map(quote).join(" | ")};

export type IconNode = readonly [
  tag: IconNodeTag,
  attributes: Readonly<Record<string, string>>,
];

export interface IconRegistryEntry {
  readonly nodes: readonly IconNode[];
  readonly mirror: boolean;
}
`;

  const entries = glyphs
    .map(
      ({ name, upstream, mirror, nodes }) =>
        `  // lucide ${upstream}\n` +
        `  ${name}: { nodes: [${nodes.map(renderNode).join(", ")}], mirror: ${mirror} },`,
    )
    .join("\n");

  return `${header}
export const ICON_REGISTRY = {
${entries}
} as const satisfies Readonly<Record<string, IconRegistryEntry>>;

export type IconName = keyof typeof ICON_REGISTRY;
`;
}

async function build() {
  assertUpstreamVersion();

  const seen = new Set();
  for (const { name } of GLYPHS) {
    if (seen.has(name)) {
      fail(`${name} is listed twice in GLYPHS`);
    }
    seen.add(name);
  }

  const glyphs = [];
  for (const glyph of GLYPHS) {
    glyphs.push(await readGlyph(glyph));
  }

  const source = renderRegistry(glyphs);
  const options = await prettier.resolveConfig(join(iconsDir, "registry.ts"));
  const registry = await prettier.format(source, {
    ...options,
    parser: "typescript",
  });

  return { registry, count: glyphs.length };
}

function compare(path, next, stale) {
  let current = null;
  try {
    current = readFileSync(path, "utf8");
  } catch {
    stale.push(`${path} is missing`);
    return;
  }
  if (current !== next) {
    stale.push(`${path} differs from what the pinned upstream generates`);
  }
}

async function main(argv) {
  const check = argv.includes("--check");
  const unknown = argv.filter((arg) => arg !== "--check");
  if (unknown.length > 0) {
    console.error(
      `[generate-icons] unknown argument: ${unknown.join(", ")}\n` +
        "Usage: node scripts/generate-icons.mjs [--check]",
    );
    return 1;
  }

  let generated;
  try {
    generated = await build();
  } catch (error) {
    if (error instanceof GenerationError) {
      console.error(`[generate-icons] FAILED — ${error.message}`);
      return 1;
    }
    throw error;
  }

  const registryPath = join(iconsDir, "registry.ts");
  const noticePath = join(iconsDir, "LUCIDE-LICENSE.txt");
  const upstreamNotice = join(lucideDir, "LICENSE");

  if (check) {
    const stale = [];
    compare(registryPath, generated.registry, stale);
    compare(noticePath, readFileSync(upstreamNotice, "utf8"), stale);

    if (stale.length > 0) {
      console.error(
        "[generate-icons] FAILED — generated output is stale:\n  " +
          stale.join("\n  ") +
          "\nRun `node scripts/generate-icons.mjs` and commit the result. " +
          "Never hand-edit a generated artifact or a licence notice.",
      );
      return 1;
    }
    console.log(
      `[generate-icons] --check OK — ${generated.count} glyphs from ` +
        `lucide@${EXPECTED_VERSION}, notice byte-identical`,
    );
    return 0;
  }

  writeFileSync(registryPath, generated.registry);
  // Copied, never rewritten: the notice must reach a consumer exactly as
  // upstream published it, attribution intact.
  copyFileSync(upstreamNotice, noticePath);

  console.log(
    `[generate-icons] wrote src/icons/registry.ts and ` +
      `src/icons/LUCIDE-LICENSE.txt — ${generated.count} glyphs from ` +
      `lucide@${EXPECTED_VERSION}`,
  );
  return 0;
}

process.exitCode = await main(process.argv.slice(2));
