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
 *   - exactly the eleven approved public names, in §7's order;
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
export type IconNodeTag = "circle" | "line" | "path";
export type IconNode = readonly [
    tag: IconNodeTag,
    attributes: Readonly<Record<string, string>>
];
export interface IconRegistryEntry {
    readonly nodes: readonly IconNode[];
    readonly mirror: boolean;
}
export declare const ICON_REGISTRY: {
    readonly back: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "m15 18-6-6 6-6";
        }]];
        readonly mirror: true;
    };
    readonly chevron: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "m9 18 6-6-6-6";
        }]];
        readonly mirror: true;
    };
    readonly search: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "m21 21-4.34-4.34";
        }], readonly ["circle", {
            readonly cx: "11";
            readonly cy: "11";
            readonly r: "8";
        }]];
        readonly mirror: false;
    };
    readonly close: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "M18 6 6 18";
        }], readonly ["path", {
            readonly d: "m6 6 12 12";
        }]];
        readonly mirror: false;
    };
    readonly check: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "M20 6 9 17l-5-5";
        }]];
        readonly mirror: false;
    };
    readonly alert: {
        readonly nodes: readonly [readonly ["circle", {
            readonly cx: "12";
            readonly cy: "12";
            readonly r: "10";
        }], readonly ["line", {
            readonly x1: "12";
            readonly x2: "12";
            readonly y1: "8";
            readonly y2: "12";
        }], readonly ["line", {
            readonly x1: "12";
            readonly x2: "12.01";
            readonly y1: "16";
            readonly y2: "16";
        }]];
        readonly mirror: false;
    };
    readonly info: {
        readonly nodes: readonly [readonly ["circle", {
            readonly cx: "12";
            readonly cy: "12";
            readonly r: "10";
        }], readonly ["path", {
            readonly d: "M12 16v-4";
        }], readonly ["path", {
            readonly d: "M12 8h.01";
        }]];
        readonly mirror: false;
    };
    readonly camera: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z";
        }], readonly ["circle", {
            readonly cx: "12";
            readonly cy: "13";
            readonly r: "3";
        }]];
        readonly mirror: false;
    };
    readonly trash: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "M10 11v6";
        }], readonly ["path", {
            readonly d: "M14 11v6";
        }], readonly ["path", {
            readonly d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6";
        }], readonly ["path", {
            readonly d: "M3 6h18";
        }], readonly ["path", {
            readonly d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2";
        }]];
        readonly mirror: false;
    };
    readonly plus: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "M5 12h14";
        }], readonly ["path", {
            readonly d: "M12 5v14";
        }]];
        readonly mirror: false;
    };
    readonly star: {
        readonly nodes: readonly [readonly ["path", {
            readonly d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";
        }]];
        readonly mirror: false;
    };
};
export type IconName = keyof typeof ICON_REGISTRY;
//# sourceMappingURL=registry.d.ts.map