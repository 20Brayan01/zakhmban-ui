import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The Owner Font Contract and Delivery Ruling, 2026-09-18, and the provenance
 * the implementing commit recorded in `src/styles/fonts.css`.
 *
 * Self-contained by the rule in `tests/architecture/README.md`: a guard that
 * depends on a shared helper can be defeated by editing the helper.
 */
const root = fileURLToPath(new URL("../../", import.meta.url));
const stylesDir = `${root}src/styles`;
const distStylesDir = `${root}dist/styles`;

/** Recorded with the binary. Changing either without re-verifying upstream is the defect this guard exists to catch. */
const APPROVED_SHA256 =
  "4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92";
const APPROVED_BYTE_SIZE = 111152;
const STORED_FILENAME = "Vazirmatn-Variable.woff2";
const UPSTREAM_FILENAME = "Vazirmatn[wght].woff2";
const UPSTREAM_COMMIT = "83629f877e8f084cc07b47030b5d3a0ff06c76ec";

const fontFace = readFileSync(`${stylesDir}/fonts.css`, "utf8");
const globalCss = readFileSync(`${stylesDir}/global.css`, "utf8");

/** CSS with every comment removed, so prose that names a construct is not mistaken for the construct. */
function withoutComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

const rules = withoutComments(fontFace);

describe("font delivery", () => {
  it("stores the approved binary at the path ADR 0003 §16 fixes", () => {
    const stat = statSync(`${stylesDir}/fonts/${STORED_FILENAME}`);
    expect(stat.isFile()).toBe(true);
  });

  it("matches the recorded SHA-256 and byte size exactly", () => {
    // The ruling forbids substituting another build: neither the
    // zakhmban-website copies nor any @fontsource binary carries the approved
    // provenance, and both are subsets rather than the unmodified variable
    // asset. This is the check that makes that enforceable rather than
    // aspirational.
    const binary = readFileSync(`${stylesDir}/fonts/${STORED_FILENAME}`);
    expect(binary.byteLength).toBe(APPROVED_BYTE_SIZE);
    expect(createHash("sha256").update(binary).digest("hex")).toBe(
      APPROVED_SHA256,
    );
  });

  it("records the full provenance the ruling requires", () => {
    for (const fact of [
      "rastikerdar/vazirmatn",
      "v33.003",
      UPSTREAM_COMMIT,
      "vazirmatn-v33.003.zip",
      UPSTREAM_FILENAME,
      STORED_FILENAME,
      APPROVED_SHA256,
      String(APPROVED_BYTE_SIZE),
      "SIL OFL 1.1",
    ]) {
      expect(fontFace.includes(fact), `provenance omits ${fact}`).toBe(true);
    }
  });

  it("ships the OFL licence beside the binary, with its copyright notice", () => {
    // OFL 1.1 permits bundling only when each distributed copy carries the
    // copyright notice and the licence. Both travel with the binary.
    const licence = readFileSync(`${stylesDir}/fonts/OFL.txt`, "utf8");
    expect(licence.length).toBeGreaterThan(0);
    expect(licence).toContain("SIL Open Font License, Version 1.1");
    expect(licence).toContain("Copyright 2015 The Vazirmatn Project Authors");
  });

  it("declares exactly one @font-face", () => {
    expect(rules.match(/@font-face/g)?.length).toBe(1);
  });

  it("carries the approved descriptors and nothing wider", () => {
    expect(rules).toContain('font-family: "Vazirmatn"');
    expect(rules).toContain("font-style: normal");
    // The binary's own axis is wider; the ruling exposes 400-700 only and
    // excludes 800 and 900 as public weights, so the descriptor states the
    // approved range and a request outside it clamps to a real weight.
    expect(rules).toContain("font-weight: 400 700");
    expect(rules).toContain("font-display: swap");
  });

  it("does not treat font-synthesis as an @font-face descriptor", () => {
    // `font-synthesis` is a normal property, not a descriptor. Inside the
    // block it is inert; the ruling assigns it to the Styles contract and D-2
    // places it on the global body rule.
    expect(rules.includes("font-synthesis")).toBe(false);
    expect(withoutComments(globalCss)).toContain("font-synthesis: none");
  });

  it("resolves its URL to the stored binary, relatively", () => {
    const urls = [...rules.matchAll(/url\(\s*"([^"]+)"\s*\)/g)].map(
      (match) => match[1],
    );
    expect(urls).toEqual([`./fonts/${STORED_FILENAME}`]);
  });

  it("references no remote font, in any package stylesheet", () => {
    // Ruling B clause 4, generalised: CDN font delivery is rejected for every
    // consumer and every CDN. Iran blocks Google Fonts, the frozen CSP model
    // allows no third-party font-src, and a PWA must not depend on a third
    // party to render.
    for (const file of [
      "fonts.css",
      "index.css",
      "global.css",
      "reset.css",
      "keyframes.css",
    ]) {
      const source = withoutComments(
        readFileSync(`${stylesDir}/${file}`, "utf8"),
      );
      for (const remote of [
        "http://",
        "https://",
        "//fonts.googleapis",
        "//fonts.gstatic",
        "jsdelivr",
        "unpkg",
        "cdn.",
      ]) {
        expect(source.includes(remote), `${file} references ${remote}`).toBe(
          false,
        );
      }
    }
  });

  it("introduces no framework-specific font integration", () => {
    for (const forbidden of ["next/font", "@fontsource", "fontsource"]) {
      expect(
        withoutComments(fontFace).includes(forbidden),
        `${forbidden} is present in the rules`,
      ).toBe(false);
    }
  });

  it("reaches dist/ byte-for-byte", () => {
    for (const asset of [
      `fonts/${STORED_FILENAME}`,
      "fonts/OFL.txt",
      "fonts.css",
    ]) {
      const source = readFileSync(`${stylesDir}/${asset}`);
      const built = readFileSync(`${distStylesDir}/${asset}`);
      expect(built.equals(source), `dist/styles/${asset} differs`).toBe(true);
    }
  });
});
