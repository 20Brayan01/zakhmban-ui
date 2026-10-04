// @vitest-environment jsdom
/**
 * BottomSheet interaction tests.
 *
 * These assert BEHAVIOUR a reader could not verify by reading the component:
 * which element ends up focused, whether the background is actually
 * excluded, what the document looks like after an interrupted unmount. They
 * deliberately do not restate the markup — `role="dialog"` being present is
 * only interesting here because `aria-modal` and the accessible name must be
 * true at the same time.
 *
 * jsdom is a DOM, not a browser: it computes no layout, so the height
 * ruling's two states, actual layering and the scrim's hit target are
 * verified in a real browser instead and are recorded as such in the pull
 * request.
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BottomSheet } from "../../src/index.js";

function shell(): { background: HTMLElement; root: HTMLElement } {
  const background = document.createElement("div");
  background.setAttribute("data-zakhmban-overlay-background", "");
  const opener = document.createElement("button");
  opener.textContent = "open";
  background.append(opener);

  const root = document.createElement("div");
  root.setAttribute("data-zakhmban-overlay-root", "");

  document.body.append(background, root);
  return { background, root };
}

afterEach(() => {
  cleanup();
  document.body.replaceChildren();
  document.body.removeAttribute("style");
});

describe("BottomSheet — valid structure", () => {
  it("portals into the application's overlay root, not inline", () => {
    const { root } = shell();
    const { container } = render(
      <BottomSheet open title="فیلترها" onClose={vi.fn()}>
        body
      </BottomSheet>,
    );

    expect(root.querySelector("[role='dialog']")).not.toBeNull();
    expect(container.querySelector("[role='dialog']")).toBeNull();
  });

  it("declares modal semantics and takes its accessible name from title", () => {
    shell();
    render(<BottomSheet open title="فیلترها" onClose={vi.fn()} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    // The name must come from the rendered heading, not a duplicated string.
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(labelledBy).not.toBeNull();
    expect(document.getElementById(labelledBy as string)?.textContent).toBe(
      "فیلترها",
    );
  });

  it("renders nothing while closed", () => {
    const { root } = shell();
    render(<BottomSheet open={false} title="فیلترها" onClose={vi.fn()} />);
    expect(root.childElementCount).toBe(0);
  });
});

describe("BottomSheet — background exclusion", () => {
  it("makes every marked background inert, not merely aria-hidden", () => {
    const { background } = shell();
    const second = document.createElement("div");
    second.setAttribute("data-zakhmban-overlay-background", "");
    document.body.append(second);

    render(<BottomSheet open title="t" onClose={vi.fn()} />);

    // `inert` is what removes the background from sequential focus
    // navigation as well as from pointer interaction; §A.3 rejects
    // aria-hidden plus pointer-events as a substitute.
    expect(background.inert).toBe(true);
    expect(second.inert).toBe(true);
  });

  it("restores a background that was already inert to its own value", () => {
    const { background } = shell();
    background.inert = true;

    const { unmount } = render(
      <BottomSheet open title="t" onClose={vi.fn()} />,
    );
    unmount();

    expect(background.inert).toBe(true);
  });

  it("clears inert on close", () => {
    const { background } = shell();
    const { rerender } = render(
      <BottomSheet open title="t" onClose={vi.fn()} />,
    );
    rerender(<BottomSheet open={false} title="t" onClose={vi.fn()} />);
    expect(background.inert).toBe(false);
  });
});

describe("BottomSheet — scroll lock", () => {
  it("locks the body while open and removes the declaration it added", () => {
    shell();
    const { unmount } = render(
      <BottomSheet open title="t" onClose={vi.fn()} />,
    );
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    // Removed, not set to some other value: the declaration was absent
    // before and must be absent after.
    expect(document.body.style.overflow).toBe("");
  });

  it("restores an unrelated pre-existing inline overflow exactly", () => {
    shell();
    document.body.style.overflow = "scroll";
    document.body.style.backgroundColor = "rgb(1, 2, 3)";

    const { unmount } = render(
      <BottomSheet open title="t" onClose={vi.fn()} />,
    );
    unmount();

    expect(document.body.style.overflow).toBe("scroll");
    expect(document.body.style.backgroundColor).toBe("rgb(1, 2, 3)");
  });

  it("restores on an interrupted lifecycle — unmount while still open", () => {
    const { background } = shell();
    const { unmount } = render(
      <BottomSheet open title="t" onClose={vi.fn()} />,
    );

    unmount();

    expect(document.body.style.overflow).toBe("");
    expect(background.inert).toBe(false);
  });
});

describe("BottomSheet — focus", () => {
  it("moves focus into the sheet on open", () => {
    shell();
    render(
      <BottomSheet
        open
        title="t"
        onClose={vi.fn()}
        footer={<button>ok</button>}
      >
        <button>inside</button>
      </BottomSheet>,
    );
    expect(document.activeElement?.textContent).toBe("inside");
  });

  it("focuses the surface itself when the sheet has no focusable content", () => {
    shell();
    render(<BottomSheet open title="t" onClose={vi.fn()} />);
    expect(document.activeElement).toBe(screen.getByRole("dialog"));
  });

  it("contains Tab at the end and Shift+Tab at the start", () => {
    shell();
    render(
      <BottomSheet
        open
        title="t"
        onClose={vi.fn()}
        footer={<button>last</button>}
      >
        <button>first</button>
      </BottomSheet>,
    );
    const dialog = screen.getByRole("dialog");
    const first = screen.getByText("first");
    const last = screen.getByText("last");

    last.focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(document.activeElement).toBe(first);

    first.focus();
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it("returns focus to the opener on close", () => {
    const { background } = shell();
    const opener = background.querySelector("button") as HTMLButtonElement;
    opener.focus();

    const { rerender } = render(
      <BottomSheet open title="t" onClose={vi.fn()} />,
    );
    expect(document.activeElement).not.toBe(opener);

    rerender(<BottomSheet open={false} title="t" onClose={vi.fn()} />);
    expect(document.activeElement).toBe(opener);
  });

  it("does not throw when the opener left the document while open", () => {
    const { background } = shell();
    const opener = background.querySelector("button") as HTMLButtonElement;
    opener.focus();

    const { rerender } = render(
      <BottomSheet open title="t" onClose={vi.fn()} />,
    );
    opener.remove();

    expect(() =>
      rerender(<BottomSheet open={false} title="t" onClose={vi.fn()} />),
    ).not.toThrow();
  });
});

describe("BottomSheet — dismissal", () => {
  it("calls onClose on Escape", () => {
    shell();
    const onClose = vi.fn();
    render(<BottomSheet open title="t" onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on scrim interaction", () => {
    const { root } = shell();
    const onClose = vi.fn();
    render(<BottomSheet open title="t" onClose={onClose} />);

    const scrim = root.querySelector(".zakhmban-sheet-scrim");
    expect(scrim).not.toBeNull();
    fireEvent.click(scrim as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on a key that is not Escape", () => {
    shell();
    const onClose = vi.fn();
    render(<BottomSheet open title="t" onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("BottomSheet — invalid structure never renders inline", () => {
  const cases: ReadonlyArray<readonly [string, () => void]> = [
    [
      "no overlay root",
      () => {
        const background = document.createElement("div");
        background.setAttribute("data-zakhmban-overlay-background", "");
        document.body.append(background);
      },
    ],
    [
      "two overlay roots",
      () => {
        shell();
        const second = document.createElement("div");
        second.setAttribute("data-zakhmban-overlay-root", "");
        document.body.append(second);
      },
    ],
    [
      "no marked background",
      () => {
        const root = document.createElement("div");
        root.setAttribute("data-zakhmban-overlay-root", "");
        document.body.append(root);
      },
    ],
    [
      "root inside the marked background",
      () => {
        const background = document.createElement("div");
        background.setAttribute("data-zakhmban-overlay-background", "");
        const root = document.createElement("div");
        root.setAttribute("data-zakhmban-overlay-root", "");
        background.append(root);
        document.body.append(background);
      },
    ],
  ];

  for (const [name, build] of cases) {
    it(`fails observably and renders no sheet — ${name}`, () => {
      build();
      // The channel is this implementation's choice; what the contract
      // requires is that the failure reaches a developer and that no inline
      // sheet appears.
      expect(() =>
        render(<BottomSheet open title="t" onClose={vi.fn()} />),
      ).toThrow(/@zakhmban\/ui BottomSheet/);
      expect(document.querySelector("[role='dialog']")).toBeNull();
    });
  }
});

describe("BottomSheet — single package-owned sheet", () => {
  it("refuses a second open sheet and leaves the first intact", () => {
    shell();
    render(<BottomSheet open title="first" onClose={vi.fn()} />);

    expect(() =>
      render(<BottomSheet open title="second" onClose={vi.fn()} />),
    ).toThrow(/only one is supported/);
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
  });

  it("allows a later sheet once the first has closed", () => {
    shell();
    const first = render(<BottomSheet open title="first" onClose={vi.fn()} />);
    first.unmount();

    expect(() =>
      render(<BottomSheet open title="second" onClose={vi.fn()} />),
    ).not.toThrow();
  });
});

describe("BottomSheet — constrained-height fallback", () => {
  // jsdom computes no layout, so the heights are stubbed to put the
  // component in the one state the BottomSheet Height Ruling describes. What
  // is asserted is the decision the component makes from those heights, not
  // the layout it produces — the visual outcome is browser-verified and
  // recorded as such in the pull request.
  function withHeights(
    footerHeight: number,
    surfaceHeight: number,
  ): () => void {
    const surface = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientHeight",
    );
    const offset = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetHeight",
    );
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      get(this: HTMLElement) {
        return this.classList.contains("zakhmban-sheet-surface")
          ? surfaceHeight
          : 0;
      },
    });
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      get(this: HTMLElement) {
        return this.classList.contains("zakhmban-sheet-footer")
          ? footerHeight
          : 0;
      },
    });
    return () => {
      if (surface !== undefined) {
        Object.defineProperty(HTMLElement.prototype, "clientHeight", surface);
      }
      if (offset !== undefined) {
        Object.defineProperty(HTMLElement.prototype, "offsetHeight", offset);
      }
    };
  }

  it("leaves the footer pinned while it fits", () => {
    const restore = withHeights(100, 400);
    try {
      shell();
      render(
        <BottomSheet
          open
          title="t"
          onClose={vi.fn()}
          footer={<button>ok</button>}
        />,
      );
      expect(
        screen.getByRole("dialog").getAttribute("data-zakhmban-sheet-footer"),
      ).toBeNull();
    } finally {
      restore();
    }
  });

  it("unpins the footer when pinning it would strand part of itself", () => {
    const restore = withHeights(500, 400);
    try {
      shell();
      render(
        <BottomSheet
          open
          title="t"
          onClose={vi.fn()}
          footer={<button>ok</button>}
        />,
      );
      expect(
        screen.getByRole("dialog").getAttribute("data-zakhmban-sheet-footer"),
      ).toBe("scrolls");
    } finally {
      restore();
    }
  });
});

describe("BottomSheet — pass-through", () => {
  it("keeps its own class while accepting the caller's", () => {
    shell();
    render(
      <BottomSheet open title="t" onClose={vi.fn()} className="app-sheet" />,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.classList.contains("zakhmban-sheet-surface")).toBe(true);
    expect(dialog.classList.contains("app-sheet")).toBe(true);
  });
});
