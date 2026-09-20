/**
 * A TypeScript consumer fixture — ADR 0003 §11 assertion 17.
 *
 * It imports all four named exports of `@zakhmban/ui/tokens` through the
 * package's own specifier, exactly as a consuming application would, and
 * uses each of the three types in a position where a wrong shape is a
 * compile error. `pnpm typecheck` is the assertion; the accompanying test
 * proves the module also resolves and runs.
 *
 * This is a fixture, not a test file, so vitest does not collect it.
 */
import { tokens } from "@zakhmban/ui/tokens";
import type { TokenName, Tokens, TokenValue } from "@zakhmban/ui/tokens";

/** `Tokens` is the object's own type, so a missing key is a compile error. */
export const everyToken: Tokens = tokens;

/** `TokenName` is the key union: a typo here fails `pnpm typecheck`. */
export const surfaceRole: TokenName = "--surface";
export const pageBackgroundRole: TokenName = "--background";

/** `TokenValue` is the value union, and every member is a string. */
export const surfaceValue: TokenValue = tokens["--surface"];

/** Keys are canonical CSS identifiers, so a token reads straight into CSS. */
export function cssDeclaration(name: TokenName): string {
  return `${name}: ${tokens[name]};`;
}

/** Literal types survive `as const`: this is "#ffffff", not `string`. */
export const literalWhite: "#ffffff" = tokens["--background"];
