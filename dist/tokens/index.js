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
export const tokens = {
    "--action-blue-hover": "#0062ac",
    "--action-blue-press": "#045398",
    "--action-blue-rest": "#0273b6",
    "--action-green-hover": "#0c7912",
    "--action-green-press": "#026e1e",
    "--action-green-rest": "#347f1b",
    "--action-red-hover": "#c80303",
    "--action-red-press": "#b90304",
    "--action-red-rest": "#d51013",
    "--app-bar-height": "56px",
    "--background": "#ffffff",
    "--border": "#e2e6dd",
    "--border-strong": "#a0a79c",
    "--bottom-nav-height": "64px",
    "--bottom-nav-safe-area": "20px",
    "--brand-blue": "#0383ce",
    "--brand-blue-dark": "#002a5e",
    "--brand-blue-soft": "#eaf5fc",
    "--brand-green": "#3c9220",
    "--brand-green-dark": "#0c7912",
    "--brand-green-soft": "#f0f8e7",
    "--brand-red": "#ec1417",
    "--brand-red-dark": "#c80303",
    "--brand-red-soft": "#fdebec",
    "--control-height-button": "52px",
    "--control-height-input": "48px",
    "--control-min-target": "44px",
    "--danger": "#ec1417",
    "--danger-bg": "#fdebec",
    "--danger-fg": "#c80303",
    "--disabled-bg": "#f1f3ef",
    "--disabled-border": "#e2e6dd",
    "--disabled-text": "#a0a79c",
    "--divider": "#edf0ea",
    "--duration-base": "200ms",
    "--duration-fast": "120ms",
    "--duration-shimmer": "1400ms",
    "--duration-slow": "320ms",
    "--easing-standard": "cubic-bezier(0.2, 0, 0, 1)",
    "--focus-indicator-inner-color": "#ffffff",
    "--focus-indicator-inner-width": "2px",
    "--focus-indicator-outer-color": "#002a5e",
    "--focus-indicator-outer-width": "2px",
    "--font-ui": '"Vazirmatn", "Segoe UI", Tahoma, Arial, sans-serif',
    "--info": "#0383ce",
    "--info-bg": "#eaf5fc",
    "--info-fg": "#0062ac",
    "--link": "#016fbb",
    "--link-hover": "#0062ac",
    "--link-press": "#01356f",
    "--neutral-status-bg": "#f7f9f5",
    "--neutral-status-fg": "#667085",
    "--on-brand-icon": "#ffffff",
    "--on-brand-text": "#ffffff",
    "--overlay": "rgba(0, 42, 94, 0.4)",
    "--press-scale": "0.98",
    "--radius-button": "14px",
    "--radius-card": "16px",
    "--radius-control": "12px",
    "--radius-input": "14px",
    "--radius-sheet": "24px",
    "--shadow-modal": "0 16px 48px rgba(0, 42, 94, 0.18)",
    "--shadow-nav": "0 -2px 12px rgba(0, 42, 94, 0.06)",
    "--shadow-sheet": "0 -12px 40px rgba(0, 42, 94, 0.14)",
    "--space-1": "4px",
    "--space-2": "8px",
    "--space-3": "12px",
    "--space-4": "16px",
    "--space-5": "20px",
    "--space-6": "24px",
    "--space-7": "32px",
    "--space-8": "40px",
    "--success": "#3c9220",
    "--success-bg": "#f0f8e7",
    "--success-fg": "#0c7912",
    "--surface": "#ffffff",
    "--surface-subtle": "#f7f9f5",
    "--text-body": "15px",
    "--text-body-line-height": "1.68",
    "--text-body-size": "15px",
    "--text-body-weight": "400",
    "--text-button": "15px",
    "--text-button-line-height": "1",
    "--text-button-size": "15px",
    "--text-button-weight": "600",
    "--text-caption": "12px",
    "--text-caption-line-height": "1.5",
    "--text-caption-size": "12px",
    "--text-caption-weight": "400",
    "--text-card-title": "16px",
    "--text-card-title-line-height": "1.5",
    "--text-card-title-size": "16px",
    "--text-card-title-weight": "600",
    "--text-display": "32px",
    "--text-display-line-height": "1.28",
    "--text-display-size": "32px",
    "--text-display-weight": "700",
    "--text-label": "13px",
    "--text-label-line-height": "1.5",
    "--text-label-size": "13px",
    "--text-label-weight": "500",
    "--text-page-title": "22px",
    "--text-page-title-line-height": "1.36",
    "--text-page-title-size": "22px",
    "--text-page-title-weight": "600",
    "--text-primary": "#002a5e",
    "--text-secondary": "#667085",
    "--text-section-title": "19px",
    "--text-section-title-line-height": "1.42",
    "--text-section-title-size": "19px",
    "--text-section-title-weight": "600",
    "--weight-bold": "700",
    "--weight-medium": "500",
    "--weight-regular": "400",
    "--weight-semibold": "600",
    "--z-chrome": "10",
    "--z-dialog": "30",
    "--z-scrim": "20",
};
//# sourceMappingURL=index.js.map