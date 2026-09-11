import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const manifest: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

const tsconfig: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../tsconfig.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

const tsconfigBuild: Record<string, unknown> = JSON.parse(
  readFileSync(new URL("../../tsconfig.build.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

describe("module system — ESM only", () => {
  it("declares itself an ES module", () => {
    expect(manifest["type"]).toBe("module");
  });

  it("declares no CommonJS entry fields", () => {
    // `main` and `module` are legacy resolution fields. The `exports` map is
    // the whole contract; a stray `main` would give resolvers a second,
    // unreviewed way into the package.
    expect(manifest["main"]).toBeUndefined();
    expect(manifest["module"]).toBeUndefined();
    expect(manifest["types"]).toBeUndefined();
  });

  it("exposes no CommonJS condition in any export", () => {
    const serialised = JSON.stringify(manifest["exports"] ?? {});
    expect(serialised).not.toContain('"require"');
    expect(serialised).not.toContain(".cjs");
  });

  it("emits ESM that is valid for Node, Vite and Turbopack alike", () => {
    // NodeNext forces explicit .js extensions on relative imports in source.
    // That is what makes the *unbundled* emitted output resolve correctly under
    // plain Node ESM; a git-installed package with a committed dist/ gets no
    // bundler pass on the way out.
    //
    // The setting is authored once in tsconfig.json and inherited by the build
    // config, so this asserts both halves: the value, and the inheritance that
    // carries it into the emit.
    const options = tsconfig["compilerOptions"] as Record<string, unknown>;
    expect(options["module"]).toBe("NodeNext");
    expect(options["moduleResolution"]).toBe("NodeNext");
    expect(tsconfigBuild["extends"]).toBe("./tsconfig.json");

    const buildOptions = tsconfigBuild["compilerOptions"] as Record<
      string,
      unknown
    >;
    expect(buildOptions["module"]).toBeUndefined();
    expect(buildOptions["moduleResolution"]).toBeUndefined();
  });

  it("emits declarations and source maps from the committed build", () => {
    const options = tsconfigBuild["compilerOptions"] as Record<string, unknown>;
    expect(options["declaration"]).toBe(true);
    expect(options["declarationMap"]).toBe(true);
    expect(options["sourceMap"]).toBe(true);
    expect(options["noEmitOnError"]).toBe(true);
    // No ambient @types/node in a package consumed by browsers.
    expect(options["types"]).toEqual([]);
  });
});
