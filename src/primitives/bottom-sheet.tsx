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
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/** ADR 0006 §2 and §3 — the only two names this package and an application share. */
const ROOT_ATTRIBUTE = "data-zakhmban-overlay-root";
const BACKGROUND_ATTRIBUTE = "data-zakhmban-overlay-background";

const FOCUSABLE = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * §A.5: one package-owned sheet at a time, enforced by the package. The
 * application's own Modal is its responsibility and nothing here can or
 * does claim to coordinate it.
 */
let openSheets = 0;

export interface BottomSheetProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title" | "children"
> {
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

interface Structure {
  readonly root: HTMLElement;
  readonly backgrounds: readonly HTMLElement[];
}

/**
 * ADR 0006 §5 — invalid structure is exactly these four, and each must be
 * distinguishable in the message so a developer knows which obligation was
 * missed rather than only that something was.
 */
function readStructure(): Structure {
  const roots = Array.from(
    document.querySelectorAll<HTMLElement>(`[${ROOT_ATTRIBUTE}]`),
  );
  if (roots.length === 0) {
    throw new Error(
      `@zakhmban/ui BottomSheet: no element carries [${ROOT_ATTRIBUTE}]. ` +
        `The application's Screen must render one overlay root as a direct ` +
        `child of <body> (ADR 0006 §2, §4). The sheet is not rendered.`,
    );
  }
  if (roots.length > 1) {
    throw new Error(
      `@zakhmban/ui BottomSheet: ${roots.length} elements carry ` +
        `[${ROOT_ATTRIBUTE}] and exactly one is required (ADR 0006 §4). ` +
        `The sheet is not rendered.`,
    );
  }

  const root = roots[0] as HTMLElement;
  const backgrounds = Array.from(
    document.querySelectorAll<HTMLElement>(`[${BACKGROUND_ATTRIBUTE}]`),
  );
  if (backgrounds.length === 0) {
    throw new Error(
      `@zakhmban/ui BottomSheet: no element carries ` +
        `[${BACKGROUND_ATTRIBUTE}]. The application must mark every region ` +
        `that becomes unavailable while a sheet is open (ADR 0006 §3, §4). ` +
        `The sheet is not rendered.`,
    );
  }
  if (backgrounds.some((background) => background.contains(root))) {
    throw new Error(
      `@zakhmban/ui BottomSheet: the overlay root is inside an element ` +
        `carrying [${BACKGROUND_ATTRIBUTE}], so making the background ` +
        `unavailable would disable the sheet itself (ADR 0006 §4). The ` +
        `sheet is not rendered.`,
    );
  }

  return { root, backgrounds };
}

export function BottomSheet({
  open,
  title,
  onClose,
  footer,
  children,
  ...rest
}: BottomSheetProps) {
  const titleId = useId();
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [footerScrolls, setFooterScrolls] = useState(false);
  const [structure, setStructure] = useState<Structure | null>(null);
  const [failure, setFailure] = useState<Error | null>(null);

  // Resolved on the client only: there is no document to read during server
  // rendering, and the structure is the application's, not this component's.
  useLayoutEffect(() => {
    if (!open) {
      setStructure(null);
      setFailure(null);
      return;
    }
    try {
      setStructure(readStructure());
      setFailure(null);
    } catch (error) {
      setStructure(null);
      setFailure(error instanceof Error ? error : new Error(String(error)));
    }
  }, [open]);

  // §A.5. Counted rather than flagged, so a correctly paired open/close
  // leaves no residue even if two sheets mount in the same tick.
  useEffect(() => {
    if (!open || failure !== null) {
      return;
    }
    openSheets += 1;
    const isSecond = openSheets > 1;
    if (isSecond) {
      setFailure(
        new Error(
          `@zakhmban/ui BottomSheet: a package-owned BottomSheet is already ` +
            `open, and only one is supported (Decision A §A.5). ` +
            `Coordinating the application's own Modal is the application's ` +
            `responsibility; this package does not and cannot enforce it. ` +
            `The second sheet is not rendered.`,
        ),
      );
    }
    return () => {
      openSheets -= 1;
    };
  }, [open, failure]);

  // Background exclusion and the scroll lock. One effect, because they share
  // a lifetime and must be undone together on close, on unmount and on any
  // interrupted path — React runs the cleanup in all three.
  useEffect(() => {
    if (!open || structure === null || failure !== null) {
      return;
    }

    const previousInert = structure.backgrounds.map(
      (background) => background.inert,
    );
    for (const background of structure.backgrounds) {
      background.inert = true;
    }

    // Only the inline value is touched, and it is restored exactly — an
    // empty string removes the declaration the way it was absent before,
    // leaving every other document style alone.
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      structure.backgrounds.forEach((background, index) => {
        background.inert = previousInert[index] ?? false;
      });
      body.style.overflow = previousOverflow;
    };
  }, [open, structure, failure]);

  // Focus entry, and return to whatever had focus when the sheet opened.
  useEffect(() => {
    if (!open || structure === null || failure !== null) {
      return;
    }

    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const surface = surfaceRef.current;
    const first = surface?.querySelector<HTMLElement>(FOCUSABLE) ?? null;
    (first ?? surface)?.focus();

    return () => {
      // The opener may have been removed while the sheet was open; focusing
      // a detached node is a no-op, so this is checked rather than assumed.
      if (opener !== null && opener.isConnected) {
        opener.focus();
      }
    };
  }, [open, structure, failure]);

  /**
   * The constrained-height fallback of the BottomSheet Height Ruling.
   *
   * A sticky box taller than its scrollport pins its bottom inset and
   * pushes its own top permanently out of view, so a footer that cannot fit
   * would strand part of itself — which the ruling forbids. The condition is
   * measured, not thresholded: "does the footer fit", and nothing else. When
   * it does not, the surface is marked and `overlay.css` unpins the footer,
   * so the whole bounded sheet scrolls and every part is reachable again.
   */
  useEffect(() => {
    if (!open || structure === null || failure !== null) {
      return;
    }
    const surface = surfaceRef.current;
    const footerElement = footerRef.current;
    if (surface === null || footerElement === null) {
      setFooterScrolls(false);
      return;
    }

    const measure = () => {
      setFooterScrolls(
        footerElement.offsetHeight >= surface.clientHeight &&
          surface.clientHeight > 0,
      );
    };
    measure();

    // Text enlargement, a rotated phone and collapsing browser chrome all
    // change the answer without re-rendering, so the measurement follows the
    // boxes rather than the render.
    //
    // `ResizeObserver` is the precise instrument and is used wherever it
    // exists. It is feature-detected rather than assumed: a consumer running
    // its own component tests under a DOM implementation that lacks it would
    // otherwise crash on this component, and a viewport listener answers the
    // same question well enough to keep the fallback correct there.
    if (typeof ResizeObserver === "function") {
      const observer = new ResizeObserver(measure);
      observer.observe(surface);
      observer.observe(footerElement);
      return () => {
        observer.disconnect();
      };
    }

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [open, structure, failure, footer]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }

      // Containment. The background is already inert, so this is the inner
      // half of the trap: wrap within the surface rather than leaving it.
      const surface = surfaceRef.current;
      if (surface === null) {
        return;
      }
      const focusable = Array.from(
        surface.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        surface.focus();
        return;
      }
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === surface)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (failure !== null) {
    // §A.4: never a silent inline fallback. The channel is this file's
    // choice; that the failure is observable is the contract.
    throw failure;
  }

  if (!open || structure === null) {
    return null;
  }

  return createPortal(
    <>
      <div className="zakhmban-sheet-scrim" onClick={onClose} />
      <div
        {...rest}
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        data-zakhmban-sheet-footer={footerScrolls ? "scrolls" : undefined}
        className={
          rest.className === undefined
            ? "zakhmban-sheet-surface"
            : `zakhmban-sheet-surface ${rest.className}`
        }
      >
        <div className="zakhmban-sheet-body">
          <h2 id={titleId} className="zakhmban-sheet-title">
            {title}
          </h2>
          {children}
        </div>
        {footer === undefined ? null : (
          <div ref={footerRef} className="zakhmban-sheet-footer">
            {footer}
          </div>
        )}
      </div>
    </>,
    structure.root,
  );
}
