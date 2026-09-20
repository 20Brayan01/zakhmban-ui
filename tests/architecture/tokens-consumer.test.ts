import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  cssDeclaration,
  everyToken,
  literalWhite,
  surfaceValue,
} from "./fixtures/tokens-consumer.js";

/**
 * The consumer-facing half of the token contract.
 *
 * The fixture imports all four named exports through the package specifier
 * and is type-checked by `pnpm typecheck`; this file proves the same module
 * resolves and runs, and that the README carries the ordered import snippet
 * ADR 0001 requires (ADR 0003 §18 assertion 17).
 */
const readme = readFileSync(
  fileURLToPath(new URL("../../README.md", import.meta.url)),
  "utf8",
);

describe("token consumer contract", () => {
  it("resolves all four named exports through @zakhmban/ui/tokens", () => {
    expect(Object.keys(everyToken)).toHaveLength(118);
    expect(surfaceValue).toBe("#ffffff");
    expect(literalWhite).toBe("#ffffff");
    expect(cssDeclaration("--space-4")).toBe("--space-4: 16px;");
  });

  it("documents the three public subpaths in the README", () => {
    for (const subpath of [
      "@zakhmban/ui/styles",
      "@zakhmban/ui/tokens",
      "@zakhmban/ui/tokens/tailwind-preset",
    ]) {
      expect(readme.includes(subpath), `${subpath} is undocumented`).toBe(true);
    }
  });

  it("carries the ordered Tailwind import snippet, in the only safe order", () => {
    // ADR 0001: a @theme layer imported before the custom properties it
    // references, or before Tailwind itself, fails quietly with unstyled
    // output. The order is the contract, so the README states it exactly.
    const snippet = [...readme.matchAll(/```css\n([\s\S]*?)```/g)]
      .map((match) => match[1] as string)
      .find((block) => block.includes("tailwind-preset"));

    expect(snippet, "README carries no Tailwind import snippet").toBeDefined();
    expect((snippet as string).trim().split("\n")).toEqual([
      '@import "tailwindcss";',
      '@import "@zakhmban/ui/styles";',
      '@import "@zakhmban/ui/tokens/tailwind-preset";',
    ]);
  });
});
