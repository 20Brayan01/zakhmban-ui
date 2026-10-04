/**
 * BottomSheet — one of the five primitives frozen by Technical Architecture
 * v1.1 §2.1, implemented under the BottomSheet Implementation Authorization
 * of 2026-10-04.
 *
 * The contract it implements, none of which is decided here:
 *
 *   v0.2 §3.4   the five props `open† title† onClose† footer children`, a
 *               focus trap, Escape and scrim-click dismissal, an inert
 *               background, focus return to the opener, `role="dialog"` with
 *               `aria-modal`, and a sticky footer action.
 *   Decision A  the application supplies a document-level overlay root and
 *               marks the background; this package owns focus entry and
 *               containment, dismissal, focus return, body scroll locking
 *               and background unavailability to pointer AND keyboard, and
 *               restores all of it on close and on unmount.
 *   ADR 0006    the two attributes, the six structural obligations and the
 *               four invalid structures.
 *   Height      content-driven up to `calc(100dvh - var(--control-min-target))`,
 *               with the sticky-footer layout and the constrained fallback.
 *
 * WHAT THIS FILE CHOOSES, because the contract deliberately left it open:
 *
 *   - `inert` for background exclusion. It removes pointer interaction,
 *     sequential focus navigation and accessibility-tree exposure in one
 *     attribute, which is what §A.3 asks for — `aria-hidden` plus
 *     `pointer-events` would leave the background keyboard-reachable and is
 *     explicitly not a substitute.
 *   - a throw for the structural failure. §A.9 leaves the channel to
 *     implementation; a throw reaches the developer in dev, in CI and
 *     through the consumer's error boundary, and it cannot be missed the way
 *     a console line can. The sheet never renders inline either way.
 *   - `createPortal` into the application's root, and a module-level
 *     registry for the single-sheet policy.
 *
 * None of those is a public contract, and each can change without a ruling.
 */
import { type HTMLAttributes, type ReactNode } from "react";
export interface BottomSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> {
    /** Whether the sheet is open. */
    open: boolean;
    /** The sheet's accessible name, rendered as its heading. Required. */
    title: string;
    /** Called on Escape, on scrim interaction, and by the sheet's own controls. */
    onClose: () => void;
    /** The sticky action area. */
    footer?: ReactNode;
    /** The sheet's content. */
    children?: ReactNode;
}
export declare function BottomSheet({ open, title, onClose, footer, children, ...rest }: BottomSheetProps): import("react").ReactPortal | null;
//# sourceMappingURL=bottom-sheet.d.ts.map