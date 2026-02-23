import { useRef, useId } from "react";
import { useKeyboard } from "./useKeyboard";

const SCROLL_STEP = 280;

/**
 * Binds ArrowUp and ArrowDown to vertical scroll of the given container.
 * Uses the centralized keyboard controller (low priority so it does not override menus).
 */
export function useScreenScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  options?: { scrollStep?: number }
) {
  const step = options?.scrollStep ?? SCROLL_STEP;
  const stepRef = useRef(step);
  stepRef.current = step;
  const contextId = `scroll-${useId()}`;

  useKeyboard(
    contextId,
    {
      ArrowUp: (e) => {
        const container = containerRef.current;
        if (!container) return false;
        e.preventDefault();
        container.scrollBy({ top: -stepRef.current, behavior: "smooth" });
        return true;
      },
      ArrowDown: (e) => {
        const container = containerRef.current;
        if (!container) return false;
        e.preventDefault();
        container.scrollBy({ top: stepRef.current, behavior: "smooth" });
        return true;
      },
    },
    { priority: 10, ignoreInInputs: true }
  );
}
