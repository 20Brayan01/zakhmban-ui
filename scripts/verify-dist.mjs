#!/usr/bin/env node
/**
 * Dist verification.
 *
 * Rebuilds from source and fails if the committed artifact differs by a single
 * byte. This is the only thing standing between a committed dist/ and one that
 * has silently drifted from its source — hand-edited, half-rebuilt, or built on
 * a different compiler patch. It is also why `typescript` is pinned exactly in
 * package.json rather than with a caret.
 *
 * Frozen Technical Architecture v1.1 §2.2 pairs two rules: dist/ is committed,
 * and nothing builds during a consumer's install. Neither works without the
 * other, and neither is safe without this check.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

console.log("[verify:dist] rebuilding");
execFileSync(process.execPath, [join(root, "scripts", "build.mjs")], {
  cwd: root,
  stdio: "inherit",
});

console.log("[verify:dist] comparing against the committed artifact");
const diff = spawnSync("git", ["diff", "--exit-code", "--", "dist"], {
  cwd: root,
  stdio: "inherit",
});

const untracked = spawnSync(
  "git",
  ["ls-files", "--others", "--exclude-standard", "--", "dist"],
  { cwd: root, encoding: "utf8" },
);

const strays = (untracked.stdout ?? "").trim();

if (diff.status !== 0 || strays.length > 0) {
  if (strays.length > 0) {
    console.error("[verify:dist] untracked files in dist/:\n" + strays);
  }
  console.error(
    "[verify:dist] FAILED — the committed dist/ is not what this source builds.\n" +
      "Rebuild and commit the artifact; never hand-edit it, and never resolve a\n" +
      "dist/ merge conflict by hand.",
  );
  process.exit(1);
}

console.log("[verify:dist] OK — committed artifact matches source");
