import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * ESLint configuration for @zakhmban/ui.
 *
 * Presets are copied per repository, never shared as a package — Frozen
 * Technical Architecture v1.1 §2.1 records ESLint and tsconfig presets as
 * "copied … harmless drift". This file therefore stands alone rather than
 * importing anything from a consuming repository.
 *
 * Two rule groups:
 *
 *   Practical  — TypeScript and ESM hygiene.
 *   Structural — the package boundaries frozen §2.1 states in prose:
 *                "no data fetching, no authentication, no routing and no
 *                application-specific strings". Enforced here as restricted
 *                imports and restricted globals. The deeper source-scan half
 *                (a scan sees files ESLint is configured to ignore and cannot
 *                be silenced by an inline disable comment) arrives with the
 *                commit that adds the first module those rules can fire on.
 */
export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-console": "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": ["error", "always"],

      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Structural: this package knows no framework, no transport and no
      // sibling package. It is consumed by four applications and must not
      // pull any of their decisions in behind them.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["next", "next/*"],
              message:
                "@zakhmban/ui is framework-free (frozen v1.1 §2.1: no routing). Next.js belongs to the consuming application.",
            },
            {
              group: ["react-router", "react-router-dom", "react-router/*"],
              message:
                "@zakhmban/ui is framework-free (frozen v1.1 §2.1: no routing).",
            },
            {
              group: ["axios", "axios/*", "node-fetch", "ky", "superagent"],
              message:
                "@zakhmban/ui contains no data fetching (frozen v1.1 §2.1). Transport belongs to @zakhmban/api-client.",
            },
            {
              group: ["@zakhmban/*"],
              message:
                "@zakhmban/ui depends on no application and no sibling package. The dependency points one way (UI System Specification v0.2 §7.3, directional rule).",
            },
          ],
        },
      ],

      "no-restricted-globals": [
        "error",
        {
          name: "fetch",
          message: "@zakhmban/ui contains no data fetching (frozen v1.1 §2.1).",
        },
        {
          name: "XMLHttpRequest",
          message: "@zakhmban/ui contains no data fetching (frozen v1.1 §2.1).",
        },
        {
          name: "localStorage",
          message:
            "@zakhmban/ui holds no session or application state (frozen v1.1 §2.1: no authentication).",
        },
        {
          name: "sessionStorage",
          message:
            "@zakhmban/ui holds no session or application state (frozen v1.1 §2.1: no authentication).",
        },
      ],
    },
  },

  {
    // Architecture test fixtures stand in for a consuming application, so a
    // fixture resolves the package through its own published specifier —
    // that self-reference is the thing under test (ADR 0003 §11 assertion
    // 17: "a TypeScript consumer fixture imports all four named exports …
    // and type-checks"). The directional rule is unchanged everywhere else,
    // and every other @zakhmban/* specifier stays restricted here too: the
    // rule forbids depending on an application or a SIBLING package, and
    // this package is neither of those to itself.
    //
    // src/ is not relieved of anything. `tests/architecture/
    // source-entry.test.ts` asserts that no file under src/ imports a
    // @zakhmban/ specifier at all, so the boundary that matters is enforced
    // by a guard a lint override cannot reach.
    files: ["tests/**/fixtures/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["next", "next/*"],
              message:
                "@zakhmban/ui is framework-free (frozen v1.1 §2.1: no routing). Next.js belongs to the consuming application.",
            },
            {
              group: ["react-router", "react-router-dom", "react-router/*"],
              message:
                "@zakhmban/ui is framework-free (frozen v1.1 §2.1: no routing).",
            },
            {
              group: ["axios", "axios/*", "node-fetch", "ky", "superagent"],
              message:
                "@zakhmban/ui contains no data fetching (frozen v1.1 §2.1). Transport belongs to @zakhmban/api-client.",
            },
            {
              group: ["@zakhmban/*", "!@zakhmban/ui", "!@zakhmban/ui/*"],
              message:
                "@zakhmban/ui depends on no application and no sibling package. The dependency points one way (UI System Specification v0.2 §7.3, directional rule).",
            },
          ],
        },
      ],
    },
  },

  {
    // Build scripts, the architecture suite, and standalone Node test
    // fixtures (tests/**/*.mjs — e.g. a script spawned as its own process to
    // probe timezone-dependent behaviour in isolation) all run directly in
    // Node and report to the terminal, so they are exempt from no-console.
    // None of these are package payload: tsconfig.build.json excludes both
    // src/**/__tests__ and every *.test.ts from the emit, and tests/ is
    // outside tsconfig.build.json's `include` entirely.
    files: ["scripts/**/*.mjs", "tests/**/*.ts", "tests/**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
);
