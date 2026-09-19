#!/usr/bin/env node
/**
 * The build, in full.
 *
 * TypeScript compiler only — no Vite library mode, no Rollup, no tsup. The
 * artifact in dist/ is committed and reviewed by people, so per-file `tsc`
 * output that mirrors src/ one-to-one is the readable form: a one-line source
 * change produces a one-line artifact change. A bundler would also be a second
 * tool whose determinism `pnpm verify:dist` has to trust.
 *
 * Steps: generate the derived token artifacts, clear dist/, compile, copy CSS.
 *
 * The generator runs first and before `tsc`, because `src/tokens/index.ts` is
 * its output and the compiler's input (UI System Specification v0.2 §2's
 * strict order; ADR 0003 §14). The CSS copy runs last: `tsc` emits only
 * TypeScript, and ADR 0003 §15 requires each authored stylesheet to reach
 * dist/ byte-for-byte at the same relative path, so a URL authored in src/
 * resolves identically in dist/.
 *
 * The icon generator is added to this file by the commit that introduces it.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "src");
const dist = join(root, "dist");

function stylesheets(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      return stylesheets(full);
    }
    return entry.name.endsWith(".css") ? [full] : [];
  });
}

console.log("[build] generate-tokens");
execFileSync(process.execPath, [join(root, "scripts", "generate-tokens.mjs")], {
  cwd: root,
  stdio: "inherit",
});

console.log("[build] clearing dist/");
rmSync(dist, { recursive: true, force: true });

console.log("[build] tsc -p tsconfig.build.json");
execFileSync(
  process.execPath,
  [
    join(root, "node_modules", "typescript", "bin", "tsc"),
    "-p",
    "tsconfig.build.json",
  ],
  { cwd: root, stdio: "inherit" },
);

const copied = stylesheets(src);
console.log(`[build] copying ${copied.length} stylesheet(s) to dist/`);
for (const file of copied) {
  const target = join(dist, relative(src, file));
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(file, target);
}

console.log("[build] done");
