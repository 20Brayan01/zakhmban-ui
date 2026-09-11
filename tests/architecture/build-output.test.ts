import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../../", import.meta.url));
const distDir = `${root}dist`;

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
