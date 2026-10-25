/**
 * GENERATED FILE — do not edit. Changes here are discarded.
 *
 * Written by scripts/generate-icons.mjs from lucide@1.51.0 (ISC;
 * the package-root LICENSE additionally carries the Feather MIT attribution,
 * and a verbatim copy of it ships beside this file as LUCIDE-LICENSE.txt).
 * Run `pnpm build`; `node scripts/generate-icons.mjs --check` fails the build
 * if this file and its upstream source disagree.
 *
 * ADR 0005 — the contract this file must satisfy:
 *
 *   - exactly the nineteen approved public names, in §7's order;
 *   - each entry carries its drawing instructions and its mirroring decision
 *     as an EXPLICIT boolean — v0.2 §5 makes mirroring a declared property,
 *     never inferred from the name and never defaulted;
 *   - the two directional glyphs hold the LTR-authored base artwork; the flag,
 *     not the artwork, is what makes them correct in the RTL document;
 *   - package-internal — never exported from the root entry, never reachable
 *     by a deep import, and never published as a runtime name array.
 *
 * `IconName` is derived from this object, so the public union and the data it
 * indexes cannot drift apart.
 */

export type IconNodeTag = "circle" | "line" | "path" | "rect";

export type IconNode = readonly [
  tag: IconNodeTag,
  attributes: Readonly<Record<string, string>>,
];

export interface IconRegistryEntry {
  readonly nodes: readonly IconNode[];
  readonly mirror: boolean;
}

export const ICON_REGISTRY = {
  // lucide chevron-left
  back: { nodes: [["path", { d: "m15 18-6-6 6-6" }]], mirror: true },
  // lucide chevron-right
  chevron: { nodes: [["path", { d: "m9 18 6-6-6-6" }]], mirror: true },
  // lucide search
  search: {
    nodes: [
      ["path", { d: "m21 21-4.34-4.34" }],
      ["circle", { cx: "11", cy: "11", r: "8" }],
    ],
    mirror: false,
  },
  // lucide x
  close: {
    nodes: [
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" }],
    ],
    mirror: false,
  },
  // lucide check
  check: { nodes: [["path", { d: "M20 6 9 17l-5-5" }]], mirror: false },
  // lucide circle-alert
  alert: {
    nodes: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }],
    ],
    mirror: false,
  },
  // lucide info
  info: {
    nodes: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 16v-4" }],
      ["path", { d: "M12 8h.01" }],
    ],
    mirror: false,
  },
  // lucide camera
  camera: {
    nodes: [
      [
        "path",
        {
          d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
        },
      ],
      ["circle", { cx: "12", cy: "13", r: "3" }],
    ],
    mirror: false,
  },
  // lucide trash
  trash: {
    nodes: [
      ["path", { d: "M10 11v6" }],
      ["path", { d: "M14 11v6" }],
      ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
      ["path", { d: "M3 6h18" }],
      ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }],
    ],
    mirror: false,
  },
  // lucide plus
  plus: {
    nodes: [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "M12 5v14" }],
    ],
    mirror: false,
  },
  // lucide star
  star: {
    nodes: [
      [
        "path",
        {
          d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        },
      ],
    ],
    mirror: false,
  },
  // lucide store
  listing: {
    nodes: [
      ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" }],
      [
        "path",
        {
          d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
        },
      ],
      ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" }],
    ],
    mirror: false,
  },
  // lucide folder
  folder: {
    nodes: [
      [
        "path",
        {
          d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        },
      ],
    ],
    mirror: false,
  },
  // lucide wallet
  wallet: {
    nodes: [
      [
        "path",
        {
          d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
        },
      ],
      ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }],
    ],
    mirror: false,
  },
  // lucide user
  person: {
    nodes: [
      ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "12", cy: "7", r: "4" }],
    ],
    mirror: false,
  },
  // lucide smartphone
  smartphone: {
    nodes: [
      ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
      ["path", { d: "M12 18h.01" }],
    ],
    mirror: false,
  },
  // lucide monitor
  monitor: {
    nodes: [
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["line", { x1: "8", x2: "16", y1: "21", y2: "21" }],
      ["line", { x1: "12", x2: "12", y1: "17", y2: "21" }],
    ],
    mirror: false,
  },
  // lucide layout-list
  feed: {
    nodes: [
      ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }],
      ["path", { d: "M14 4h7" }],
      ["path", { d: "M14 9h7" }],
      ["path", { d: "M14 15h7" }],
      ["path", { d: "M14 20h7" }],
    ],
    mirror: false,
  },
  // lucide folder-open
  "folder-open": {
    nodes: [
      [
        "path",
        {
          d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
        },
      ],
    ],
    mirror: false,
  },
} as const satisfies Readonly<Record<string, IconRegistryEntry>>;

export type IconName = keyof typeof ICON_REGISTRY;
