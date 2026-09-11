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
 * Steps: clear dist/, compile. CSS copying and the token/icon generators are
 * added to this file by the commits that introduce them.
 */
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

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

console.log("[build] done");
