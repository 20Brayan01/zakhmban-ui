import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../../", import.meta.url));
const distDir = `${root}dist`;
const srcDir = `${root}src`;

/**
 * Every asset `scripts/build.mjs` copies out of `src/styles/`, as the paths a
 * consumer resolves. ADR 0003 §15 requires each to reach `dist/`
 * byte-for-byte at the same relative path, so a URL authored in `src/`
 * resolves identically in `dist/`.
 */
const COPIED_STYLE_ASSETS = [
  "styles/index.css",
  "styles/fonts.css",
  "styles/fonts/Vazirmatn-Variable.woff2",
  "styles/fonts/OFL.txt",
];

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = `${dir}/${entry.name}`;
    return entry.isDirectory() ? walk(full) : [full];
  });
}

describe("build output", () => {
  it("exists, because the artifact is committed rather than built on install", () => {
    // Frozen Technical Architecture v1.1 §2.2. A missing dist/ is not a local
    // inconvenience — it is every consumer's install failing.
    expect(existsSync(distDir)).toBe(true);
  });

  it("emits JavaScript, declarations and both map kinds for the entry", () => {
    for (const artefact of [
      "index.js",
      "index.d.ts",
      "index.js.map",
      "index.d.ts.map",
    ]) {
      expect(
        existsSync(`${distDir}/${artefact}`),
        `dist/${artefact} missing`,
      ).toBe(true);
    }
  });

  it("contains no CommonJS output", () => {
    for (const file of walk(distDir)) {
      expect(file.endsWith(".cjs"), `${file} is CommonJS output`).toBe(false);
    }
    expect(readFileSync(`${distDir}/index.js`, "utf8")).not.toContain(
      "require(",
    );
  });

  it("copies every approved Styles asset into dist/", () => {
    // The font binary and its licence are not CSS, so they reach dist/ only
    // because the build's allow-list admits .woff2 and .txt. A consumer
    // installs dist/ verbatim: a missing asset here is a 404 on their page,
    // not a build warning.
    for (const asset of COPIED_STYLE_ASSETS) {
      expect(
        existsSync(`${distDir}/${asset}`),
        `dist/${asset} is missing — the build did not copy it`,
      ).toBe(true);
    }
  });

  it("copies each Styles asset byte-for-byte, binaries included", () => {
    // Compared as Buffers, so the font is checked byte-for-byte rather than
    // through a lossy text decode. A whole-tree `git diff` proves the tree
    // matches what the build produced; this proves each file matches its
    // source, which is what ADR 0003 §15 asks for.
    for (const asset of COPIED_STYLE_ASSETS) {
      const source = readFileSync(`${srcDir}/${asset}`);
      const built = readFileSync(`${distDir}/${asset}`);
      expect(
        built.equals(source),
        `dist/${asset} is not byte-identical to src/${asset}`,
      ).toBe(true);
    }
  });

  it("copies no unapproved asset type into dist/styles/", () => {
    // The allow-list is .css, .woff2 and .txt. Anything else under
    // src/styles/ would be package payload nobody reviewed.
    for (const file of walk(`${distDir}/styles`)) {
      expect(
        /\.(css|woff2|txt)$/.test(file),
        `${file} is not an approved Styles asset type`,
      ).toBe(true);
    }
  });

  it("is not excluded from version control", () => {
    // The single most consequential line in .gitignore is the one that is not
    // there. `git check-ignore` exits 0 when a path IS ignored.
    const ignored = spawnSync("git", ["check-ignore", "-q", "dist/index.js"], {
      cwd: root,
    });
    expect(
      ignored.status,
      "dist/ is gitignored — consumers install the committed artifact (frozen v1.1 §2.2)",
    ).not.toBe(0);

    const gitignore = readFileSync(`${root}.gitignore`, "utf8");
    const ignoresDist = gitignore
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"))
      .some((line) => line === "dist" || line === "dist/" || line === "/dist");
    expect(ignoresDist).toBe(false);
  });
});
