import { useEffect, useRef, useId } from "react";
import { useGamepad } from "./useGamepad";

const SCROLL_STEP = 100;
const SCROLL_DURATION_MS = 480;
/** Scroll repeat interval while key is held (ms). */
const KEY_REPEAT_MS = 120;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function smoothScrollTo(
  el: HTMLElement,
  targetTop: number,
  durationMs: number
): void {
  const startTop = el.scrollTop;
  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(elapsed / durationMs, 1);
    el.scrollTop = startTop + (targetTop - startTop) * easeOutCubic(t);
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

/**
 * Binds ArrowUp and ArrowDown to vertical scroll of the given container.
 * Smooth, slow scroll (keyboard and right stick). Low priority so it doesn't override menus.
 */
export function useScreenScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  options?: { scrollStep?: number; scrollDurationMs?: number }
) {
  const step = options?.scrollStep ?? SCROLL_STEP;
  const durationMs = options?.scrollDurationMs ?? SCROLL_DURATION_MS;
  const stepRef = useRef(step);
  const durationRef = useRef(durationMs);
  stepRef.current = step;
  durationRef.current = durationMs;
  const contextId = `scroll-${useId()}`;

  const scrollUp = () => {
    const container = containerRef.current;
    if (!container) return false;
    const target = Math.max(0, container.scrollTop - stepRef.current);
    smoothScrollTo(container, target, durationRef.current);
    return true;
  };
  const scrollDown = () => {
    const container = containerRef.current;
    if (!container) return false;
    const maxScroll = container.scrollHeight - container.clientHeight;
    const target = Math.min(maxScroll, container.scrollTop + stepRef.current);
    smoothScrollTo(container, target, durationRef.current);
    return true;
  };

  const scrollUpRef = useRef(scrollUp);
  const scrollDownRef = useRef(scrollDown);
  scrollUpRef.current = scrollUp;
  scrollDownRef.current = scrollDown;

  // Keyboard: continuous scroll while ArrowUp / ArrowDown are held
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const keysHeldRef = useRef<{ ArrowUp: boolean; ArrowDown: boolean }>({ ArrowUp: false, ArrowDown: false });

  useEffect(() => {
    const isInput = () => {
      if (typeof document === 'undefined') return false;
      const tag = (document.activeElement as HTMLElement)?.tagName?.toLowerCase();
      return tag === 'input' || tag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable === true;
    };

    const clearRepeat = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      if (isInput()) return;
      const key = e.key as 'ArrowUp' | 'ArrowDown';
      if (keysHeldRef.current[key]) return;
      keysHeldRef.current[key] = true;
      e.preventDefault();

      (key === 'ArrowUp' ? scrollUpRef.current : scrollDownRef.current)();
      intervalRef.current = setInterval(() => {
        (key === 'ArrowUp' ? scrollUpRef.current : scrollDownRef.current)();
      }, KEY_REPEAT_MS);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      const key = e.key as 'ArrowUp' | 'ArrowDown';
      keysHeldRef.current[key] = false;
      clearRepeat();
      // If the other key is still held, resume repeat in that direction
      if (keysHeldRef.current.ArrowUp) {
        scrollUpRef.current();
        intervalRef.current = setInterval(() => scrollUpRef.current(), KEY_REPEAT_MS);
      } else if (keysHeldRef.current.ArrowDown) {
        scrollDownRef.current();
        intervalRef.current = setInterval(() => scrollDownRef.current(), KEY_REPEAT_MS);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      clearRepeat();
    };
  }, []);

  useGamepad(
    contextId,
    {
      'stick-right-up': scrollUp,
      'stick-right-down': scrollDown,
    },
    { priority: 10 }
  );
}
