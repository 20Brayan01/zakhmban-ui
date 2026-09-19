#!/usr/bin/env node
/**
 * The clean-consumer Tailwind v4 smoke test.
 *
 * ADR 0001 records the obligation and ADR 0003 §18 assertion 16 makes it a
 * requirement of the Token Foundation commit: the extensionless subpath
 * `@zakhmban/ui/tokens/tailwind-preset` must be proven to resolve through
 * `@tailwindcss/postcss` from a freshly installed copy of the package, not
 * assumed.
 *
 * What it does, in a throwaway directory outside this repository:
 *
 *   1. `npm pack` the working tree — the same `files` set a consumer installs;
 *   2. install that tarball into an empty project alongside Tailwind v4 and
 *      `@tailwindcss/postcss`, at pinned versions;
 *   3. run PostCSS over the exact ordered import snippet the README gives;
 *   4. assert the approved utilities generate, that the reset removed
 *      Tailwind's own defaults, and that the two divergent spacing steps
 *      resolve to the approved scale.
 *
 * It is deliberately NOT part of `pnpm test`. It needs the network and a
 * package manager, and the architecture suite must stay offline and
 * deterministic. Run it before a release, and whenever the exports map, the
 * generated artifact or the Tailwind major version changes:
 *
 *   pnpm smoke:tailwind
 *
 * It adds no dependency to this package: Tailwind is installed by the
 * throwaway consumer, never here. ADR 0001 clarification 2 — Tailwind is not
 * a runtime or peer dependency of @zakhmban/ui.
 */
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

/** Pinned, so a Tailwind release cannot silently change what this proves. */
const TAILWIND = "4.3.3";
const POSTCSS = "8.5.6";

/** Utilities the artifact must produce. */
const MUST_GENERATE = [
  "bg-surface",
  "bg-brand-green",
  "text-text-primary",
  "text-on-brand-text",
  "text-body",
  "font-semibold",
  "font-ui",
  "p-4",
  "p-7",
  "p-8",
  "rounded-card",
  "rounded-sheet",
  "shadow-modal",
  "ease-standard",
];

/**
 * Tailwind defaults the namespace reset must remove. Each one is a deferred
 * or forbidden decision the registry's deferral rule says an implementer,
 * a reference kit or a default must not fill.
 */
const MUST_NOT_RESOLVE = [
  "bg-purple-500",
  "text-red-500",
  "p-9",
  "rounded-xl",
  "ease-in-out",
];

const work = mkdtempSync(join(tmpdir(), "zakhmban-ui-smoke-"));
let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ok    ${message}`);
    return;
  }
  failures += 1;
  console.error(`  FAIL  ${message}`);
}

function npm(args, cwd) {
  execFileSync("npm", args, { cwd, stdio: "inherit" });
}

try {
  console.log(`[smoke] packing the working tree into ${work}`);
  npm(["pack", "--pack-destination", work, "--silent"], root);

  const consumer = join(work, "consumer");
  mkdirSync(consumer, { recursive: true });

  writeFileSync(
    join(consumer, "package.json"),
    `${JSON.stringify(
      {
        name: "zakhmban-ui-tailwind-smoke",
        private: true,
        type: "module",
        dependencies: { "@zakhmban/ui": "file:../zakhmban-ui-0.0.0.tgz" },
        devDependencies: {
          "@tailwindcss/postcss": TAILWIND,
          postcss: POSTCSS,
          tailwindcss: TAILWIND,
        },
      },
      null,
      2,
    )}\n`,
  );

  // The exact ordered snippet the README gives a consumer. Any other order
  // fails quietly with unstyled output, which is why the order is asserted
  // in the README by tests/architecture/tokens-consumer.test.ts as well.
  writeFileSync(
    join(consumer, "input.css"),
    [
      '@import "tailwindcss";',
      '@import "@zakhmban/ui/styles";',
      '@import "@zakhmban/ui/tokens/tailwind-preset";',
      '@source "./markup.html";',
      "",
    ].join("\n"),
  );

  writeFileSync(
    join(consumer, "markup.html"),
    `<div class="${[...MUST_GENERATE, ...MUST_NOT_RESOLVE].join(" ")}"></div>\n`,
  );

  writeFileSync(
    join(consumer, "build.mjs"),
    [
      'import { readFileSync, writeFileSync } from "node:fs";',
      'import postcss from "postcss";',
      'import tailwind from "@tailwindcss/postcss";',
      "",
      'const input = readFileSync("input.css", "utf8");',
      "const result = await postcss([tailwind()]).process(input, {",
      '  from: "input.css",',
      "});",
      'writeFileSync("output.css", result.css);',
      "",
    ].join("\n"),
  );

  console.log("[smoke] installing the packed package with Tailwind v4");
  npm(["install", "--no-audit", "--no-fund", "--silent"], consumer);

  console.log("[smoke] running PostCSS over the ordered import snippet");
  execFileSync(process.execPath, ["build.mjs"], {
    cwd: consumer,
    stdio: "inherit",
  });

  const output = readFileSync(join(consumer, "output.css"), "utf8");
  const generated = (utility) =>
    new RegExp(
      `^\\s*\\.${utility.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")} \\{`,
      "m",
    ).test(output);

  console.log("[smoke] assertions");
  assert(
    output.includes("--space-7: 32px"),
    "the authored token CSS reached the consumer through @zakhmban/ui/styles",
  );
  assert(
    output.includes("--radius-card: var(--_radius-card)"),
    "the extensionless @zakhmban/ui/tokens/tailwind-preset subpath resolved",
  );
  for (const utility of MUST_GENERATE) {
    assert(generated(utility), `.${utility} is generated`);
  }
  for (const utility of MUST_NOT_RESOLVE) {
    assert(
      !generated(utility),
      `.${utility} does not resolve — the namespace reset holds`,
    );
  }
  assert(
    /\.p-7 \{\s*padding: var\(--spacing-7\);/.test(output),
    "p-7 resolves through the approved scale, not Tailwind's 28px default",
  );
  assert(
    /\.p-8 \{\s*padding: var\(--spacing-8\);/.test(output),
    "p-8 resolves through the approved scale, not Tailwind's 32px default",
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`[smoke] FAILED — ${failures} assertion(s)`);
  process.exitCode = 1;
} else {
  console.log("[smoke] OK — a clean Tailwind v4 consumer resolves the preset");
}
