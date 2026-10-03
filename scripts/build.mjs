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
 * Steps: generate the derived token artifacts, clear dist/, compile, copy the
 * Styles assets.
 *
 * The generator runs first and before `tsc`, because `src/tokens/index.ts` is
 * its output and the compiler's input (UI System Specification v0.2 §2's
 * strict order; ADR 0003 §14). The asset copy runs last: `tsc` emits only
 * TypeScript, and ADR 0003 §15 requires each authored stylesheet to reach
 * dist/ byte-for-byte at the same relative path, so a URL authored in src/
 * resolves identically in dist/. The font binary and its licence travel the
 * same path for the same reason.
 *
 * The icon generator runs alongside the token generator and for the same
 * reason: `src/icons/registry.ts` is its output and the compiler's input, and
 * `src/icons/LUCIDE-LICENSE.txt` is a verbatim copy of the pinned upstream
 * notice that the asset copy below then carries into dist/ (ADR 0005 §2, §3).
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "src");
const dist = join(root, "dist");

/**
 * The file types `src/` may contribute to `dist/`, as an explicit allow-list
 * rather than a pattern. `.css` is the authored stylesheet; `.woff2` is the
 * approved font binary and `.txt` its OFL licence, which ADR 0003 §16 places
 * under `src/styles/fonts/` so the `@font-face` URL never crosses a
 * directory. Anything else is not package payload and is not copied.
 */
const COPIED_EXTENSIONS = [".css", ".woff2", ".txt"];

function assets(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      return assets(full);
    }
    return COPIED_EXTENSIONS.some((extension) => entry.name.endsWith(extension))
      ? [full]
      : [];
  });
}

console.log("[build] generate-tokens");
execFileSync(process.execPath, [join(root, "scripts", "generate-tokens.mjs")], {
  cwd: root,
  stdio: "inherit",
});

console.log("[build] generate-icons");
execFileSync(process.execPath, [join(root, "scripts", "generate-icons.mjs")], {
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

const copied = assets(src);
console.log(`[build] copying ${copied.length} asset(s) to dist/`);
for (const file of copied) {
  const target = join(dist, relative(src, file));
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(file, target);
}

console.log("[build] done");
