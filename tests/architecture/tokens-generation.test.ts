import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Generation mechanics — ADR 0003 §14 and §15.
 *
 * The typed object and the Tailwind artifact are derived, never authored, so
 * the properties that matter are: the committed output matches what the
 * authored CSS generates, generation is deterministic, a hand edit is caught,
 * the generated source and the built artifact are both committed, and each
 * stylesheet reaches dist/ byte-for-byte.
 *
 * The staleness and determinism checks run against a throwaway copy of the
 * repository's generator and token sources rather than the working tree. The
 * generator resolves its paths from its own file URL, so a copy in a
 * temporary directory generates from the copied CSS and cannot touch the
 * checkout.
 */
const root = fileURLToPath(new URL("../../", import.meta.url));
const generator = join(root, "scripts", "generate-tokens.mjs");

function run(script: string, args: string[] = []) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

/** A self-contained copy of scripts/ and src/tokens/ in a temp directory. */
function sandbox(): { dir: string; generator: string; tokens: string } {
  const dir = mkdtempSync(join(tmpdir(), "zakhmban-tokens-"));
  cpSync(join(root, "scripts"), join(dir, "scripts"), { recursive: true });
  cpSync(join(root, "src", "tokens"), join(dir, "src", "tokens"), {
    recursive: true,
  });
  return {
    dir,
    generator: join(dir, "scripts", "generate-tokens.mjs"),
    tokens: join(dir, "src", "tokens"),
  };
}

describe("token generation", () => {
  it("reports a clean --check against the committed artifacts", () => {
    const result = run(generator, ["--check"]);
    expect(result.stderr).toBe("");
    expect(result.status, result.stdout + result.stderr).toBe(0);
    expect(result.stdout).toContain("118 public tokens");
    expect(result.stdout).toContain("39 internal properties");
  });

  it("is deterministic — two runs produce identical bytes", () => {
    const box = sandbox();
    try {
      expect(run(box.generator).status).toBe(0);
      const first = {
        ts: readFileSync(join(box.tokens, "index.ts"), "utf8"),
        css: readFileSync(join(box.tokens, "tailwind-preset.css"), "utf8"),
      };
      expect(run(box.generator).status).toBe(0);
      expect(readFileSync(join(box.tokens, "index.ts"), "utf8")).toBe(first.ts);
      expect(
        readFileSync(join(box.tokens, "tailwind-preset.css"), "utf8"),
      ).toBe(first.css);
      // And the committed artifacts are exactly what a clean run produces.
      expect(first.ts).toBe(
        readFileSync(join(root, "src", "tokens", "index.ts"), "utf8"),
      );
      expect(first.css).toBe(
        readFileSync(
          join(root, "src", "tokens", "tailwind-preset.css"),
          "utf8",
        ),
      );
    } finally {
      rmSync(box.dir, { recursive: true, force: true });
    }
  });

  it("detects a hand-edited typed artifact", () => {
    const box = sandbox();
    try {
      const path = join(box.tokens, "index.ts");
      writeFileSync(
        path,
        readFileSync(path, "utf8").replace(
          '"--space-1": "4px"',
          '"--space-1": "5px"',
        ),
      );
      const result = spawnSync(process.execPath, [box.generator, "--check"], {
        encoding: "utf8",
      });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("index.ts differs");
    } finally {
      rmSync(box.dir, { recursive: true, force: true });
    }
  });

  it("detects a hand-edited Tailwind artifact", () => {
    const box = sandbox();
    try {
      const path = join(box.tokens, "tailwind-preset.css");
      writeFileSync(
        path,
        readFileSync(path, "utf8").replace(
          "--color-danger: var(--danger);",
          "--color-danger: #ff0000;",
        ),
      );
      const result = spawnSync(process.execPath, [box.generator, "--check"], {
        encoding: "utf8",
      });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("tailwind-preset.css differs");
    } finally {
      rmSync(box.dir, { recursive: true, force: true });
    }
  });

  it("refuses a semantic colour that restates a literal", () => {
    const box = sandbox();
    try {
      const path = join(box.tokens, "colors.css");
      writeFileSync(
        path,
        readFileSync(path, "utf8").replace(
          "--brand-green: var(--green-500);",
          "--brand-green: #3c9220;",
        ),
      );
      const result = spawnSync(process.execPath, [box.generator], {
        encoding: "utf8",
      });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("restates the literal");
    } finally {
      rmSync(box.dir, { recursive: true, force: true });
    }
  });

  it("refuses a hex outside colors.css", () => {
    const box = sandbox();
    try {
      const path = join(box.tokens, "base.css");
      writeFileSync(
        path,
        readFileSync(path, "utf8").replace(
          "--z-chrome: 10;",
          "--z-chrome: 10;\n  --stray: #123456;",
        ),
      );
      const result = spawnSync(process.execPath, [box.generator], {
        encoding: "utf8",
      });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("carries a hex literal");
    } finally {
      rmSync(box.dir, { recursive: true, force: true });
    }
  });

  it("refuses a circular custom-property reference", () => {
    const box = sandbox();
    try {
      const path = join(box.tokens, "base.css");
      writeFileSync(
        path,
        readFileSync(path, "utf8").replace(
          "--_radius-control: 12px;",
          "--_radius-control: var(--radius-control);",
        ),
      );
      const result = spawnSync(process.execPath, [box.generator], {
        encoding: "utf8",
      });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("circular custom-property reference");
    } finally {
      rmSync(box.dir, { recursive: true, force: true });
    }
  });

  it("refuses a second theme block", () => {
    const box = sandbox();
    try {
      const path = join(box.tokens, "colors.css");
      writeFileSync(
        path,
        readFileSync(path, "utf8") +
          "\n@media (prefers-color-scheme: dark) {\n  :root {\n    --surface: var(--blue-900);\n  }\n}\n",
      );
      const result = spawnSync(process.execPath, [box.generator], {
        encoding: "utf8",
      });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain('more than one ":root" block');
    } finally {
      rmSync(box.dir, { recursive: true, force: true });
    }
  });

  it("commits both generated sources and both built artifacts", () => {
    const tracked = spawnSync(
      "git",
      [
        "ls-files",
        "--error-unmatch",
        "src/tokens/index.ts",
        "src/tokens/tailwind-preset.css",
        "dist/tokens/index.js",
        "dist/tokens/index.d.ts",
        "dist/tokens/tailwind-preset.css",
        "dist/styles/index.css",
      ],
      { cwd: root, encoding: "utf8" },
    );
    expect(tracked.status, tracked.stderr).toBe(0);
  });

  it("copies every authored stylesheet to dist/ byte-for-byte", () => {
    // ADR 0003 §15: a whole-tree diff does not prove this file by file.
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        return entry.isDirectory()
          ? walk(full)
          : entry.name.endsWith(".css")
            ? [full]
            : [];
      });

    const sources = walk(join(root, "src"));
    expect(sources.length).toBe(9);

    for (const source of sources) {
      const built = join(
        root,
        "dist",
        source.slice(join(root, "src").length + 1),
      );
      expect(
        readFileSync(built),
        `${built} is not byte-identical to its source`,
      ).toEqual(readFileSync(source));
    }
  });

  it("adds no dependency of its own", () => {
    const source = readFileSync(generator, "utf8");
    const imports = [...source.matchAll(/from "([^"]+)"/g)].map(
      (match) => match[1] as string,
    );
    for (const specifier of imports) {
      expect(specifier.startsWith("node:"), specifier).toBe(true);
    }
    expect(source).not.toContain("fetch(");
    expect(source).not.toContain("https://");
  });
});
