import { useEffect, useRef } from "react";

const SCROLL_STEP = 280;

/**
 * Binds ArrowUp and ArrowDown to vertical scroll of the given container (e.g. section).
 */
export function useScreenScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  options?: { scrollStep?: number }
) {
  const step = options?.scrollStep ?? SCROLL_STEP;
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

      const target = e.target as HTMLElement;
      const tag = target.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || target.isContentEditable) return;

      const container = containerRef.current;
      if (!container) return;

      e.preventDefault();
      const amount = e.key === "ArrowDown" ? stepRef.current : -stepRef.current;
      container.scrollBy({ top: amount, behavior: "smooth" });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [containerRef]);
}
