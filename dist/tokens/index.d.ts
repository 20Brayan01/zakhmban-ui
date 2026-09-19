/**
 * GENERATED FILE — do not edit. Changes here are discarded.
 *
 * Written by scripts/generate-tokens.mjs from the authored CSS custom
 * properties in src/tokens/. Edit those, then run `pnpm build`;
 * `node scripts/generate-tokens.mjs --check` fails the build if this file
 * and its source disagree.
 *
 * ADR 0003 §11 — the public contract this file must satisfy:
 *
 *   - exactly one runtime export, `tokens`, and no default export;
 *   - exactly three type exports, each defined from the object;
 *   - flat, with no nested family objects and no helper functions;
 *   - keyed by the canonical public CSS identifier verbatim, leading `--`
 *     included, neither stripped nor camel-cased;
 *   - exactly the 118 approved public tokens — no raw palette entry, no
 *     `--_` source, no `--radius-checkbox`, and no `--radius-pill` until an
 *     owner supplies a literal;
 *   - every value a resolved terminal CSS value represented as a string,
 *     never a `var()` reference and never a JavaScript number;
 *   - keys whose resolved values are equal all present — a generator that
 *     de-duplicates by value is a defect;
 *   - immutable at compile time through `as const`, with no `Object.freeze`.
 *
 * Property order is lexicographic by the complete canonical identifier, so
 * generation is deterministic and a review diff is stable. Ordering exists
 * for generation and review; consumers must not treat it as semantic API
 * behaviour.
 */
export declare const tokens: {
    readonly "--action-blue-hover": "#0062ac";
    readonly "--action-blue-press": "#045398";
    readonly "--action-blue-rest": "#0273b6";
    readonly "--action-green-hover": "#0c7912";
    readonly "--action-green-press": "#026e1e";
    readonly "--action-green-rest": "#347f1b";
    readonly "--action-red-hover": "#c80303";
    readonly "--action-red-press": "#b90304";
    readonly "--action-red-rest": "#d51013";
    readonly "--app-bar-height": "56px";
    readonly "--background": "#ffffff";
    readonly "--border": "#e2e6dd";
    readonly "--border-strong": "#a0a79c";
    readonly "--bottom-nav-height": "64px";
    readonly "--bottom-nav-safe-area": "20px";
    readonly "--brand-blue": "#0383ce";
    readonly "--brand-blue-dark": "#002a5e";
    readonly "--brand-blue-soft": "#eaf5fc";
    readonly "--brand-green": "#3c9220";
    readonly "--brand-green-dark": "#0c7912";
    readonly "--brand-green-soft": "#f0f8e7";
    readonly "--brand-red": "#ec1417";
    readonly "--brand-red-dark": "#c80303";
    readonly "--brand-red-soft": "#fdebec";
    readonly "--control-height-button": "52px";
    readonly "--control-height-input": "48px";
    readonly "--control-min-target": "44px";
    readonly "--danger": "#ec1417";
    readonly "--danger-bg": "#fdebec";
    readonly "--danger-fg": "#c80303";
    readonly "--disabled-bg": "#f1f3ef";
    readonly "--disabled-border": "#e2e6dd";
    readonly "--disabled-text": "#a0a79c";
    readonly "--divider": "#edf0ea";
    readonly "--duration-base": "200ms";
    readonly "--duration-fast": "120ms";
    readonly "--duration-shimmer": "1400ms";
    readonly "--duration-slow": "320ms";
    readonly "--easing-standard": "cubic-bezier(0.2, 0, 0, 1)";
    readonly "--focus-indicator-inner-color": "#ffffff";
    readonly "--focus-indicator-inner-width": "2px";
    readonly "--focus-indicator-outer-color": "#002a5e";
    readonly "--focus-indicator-outer-width": "2px";
    readonly "--font-ui": "\"Vazirmatn\", \"Segoe UI\", Tahoma, Arial, sans-serif";
    readonly "--info": "#0383ce";
    readonly "--info-bg": "#eaf5fc";
    readonly "--info-fg": "#0062ac";
    readonly "--link": "#016fbb";
    readonly "--link-hover": "#0062ac";
    readonly "--link-press": "#01356f";
    readonly "--neutral-status-bg": "#f7f9f5";
    readonly "--neutral-status-fg": "#667085";
    readonly "--on-brand-icon": "#ffffff";
    readonly "--on-brand-text": "#ffffff";
    readonly "--overlay": "rgba(0, 42, 94, 0.4)";
    readonly "--press-scale": "0.98";
    readonly "--radius-button": "14px";
    readonly "--radius-card": "16px";
    readonly "--radius-control": "12px";
    readonly "--radius-input": "14px";
    readonly "--radius-sheet": "24px";
    readonly "--shadow-modal": "0 16px 48px rgba(0, 42, 94, 0.18)";
    readonly "--shadow-nav": "0 -2px 12px rgba(0, 42, 94, 0.06)";
    readonly "--shadow-sheet": "0 -12px 40px rgba(0, 42, 94, 0.14)";
    readonly "--space-1": "4px";
    readonly "--space-2": "8px";
    readonly "--space-3": "12px";
    readonly "--space-4": "16px";
    readonly "--space-5": "20px";
    readonly "--space-6": "24px";
    readonly "--space-7": "32px";
    readonly "--space-8": "40px";
    readonly "--success": "#3c9220";
    readonly "--success-bg": "#f0f8e7";
    readonly "--success-fg": "#0c7912";
    readonly "--surface": "#ffffff";
    readonly "--surface-subtle": "#f7f9f5";
    readonly "--text-body": "15px";
    readonly "--text-body-line-height": "1.68";
    readonly "--text-body-size": "15px";
    readonly "--text-body-weight": "400";
    readonly "--text-button": "15px";
    readonly "--text-button-line-height": "1";
    readonly "--text-button-size": "15px";
    readonly "--text-button-weight": "600";
    readonly "--text-caption": "12px";
    readonly "--text-caption-line-height": "1.5";
    readonly "--text-caption-size": "12px";
    readonly "--text-caption-weight": "400";
    readonly "--text-card-title": "16px";
    readonly "--text-card-title-line-height": "1.5";
    readonly "--text-card-title-size": "16px";
    readonly "--text-card-title-weight": "600";
    readonly "--text-display": "32px";
    readonly "--text-display-line-height": "1.28";
    readonly "--text-display-size": "32px";
    readonly "--text-display-weight": "700";
    readonly "--text-label": "13px";
    readonly "--text-label-line-height": "1.5";
    readonly "--text-label-size": "13px";
    readonly "--text-label-weight": "500";
    readonly "--text-page-title": "22px";
    readonly "--text-page-title-line-height": "1.36";
    readonly "--text-page-title-size": "22px";
    readonly "--text-page-title-weight": "600";
    readonly "--text-primary": "#002a5e";
    readonly "--text-secondary": "#667085";
    readonly "--text-section-title": "19px";
    readonly "--text-section-title-line-height": "1.42";
    readonly "--text-section-title-size": "19px";
    readonly "--text-section-title-weight": "600";
    readonly "--weight-bold": "700";
    readonly "--weight-medium": "500";
    readonly "--weight-regular": "400";
    readonly "--weight-semibold": "600";
    readonly "--z-chrome": "10";
    readonly "--z-dialog": "30";
    readonly "--z-scrim": "20";
};
export type Tokens = typeof tokens;
export type TokenName = keyof Tokens;
export type TokenValue = Tokens[TokenName];
//# sourceMappingURL=index.d.ts.map