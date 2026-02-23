import { useRef, useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "../../constants";

const MARK_DURATION = 0.35;
const MARK_EASE = "power2.inOut";

export interface MarkProps {
    /** Ref to the element that has focus; the mark will float next to it. */
    targetRef?: RefObject<HTMLElement | null>;
    /** Change when focus moves so the mark updates (e.g. selectedIndex). */
    targetKey?: number;
}

/** Position the mark so its top-right tip (clipPath 100% 46%) points at the target's top-right corner. */
function getMarkPosition(targetRect: DOMRect, markWidth: number, markHeight: number) {
    const tipY = 0.46 * markHeight;
    return {
        top: targetRect.top - tipY,
        left: targetRect.right - markWidth,
    };
}

export const Mark = ({ targetRef, targetKey = 0 }: MarkProps) => {
    const markRef = useRef<HTMLDivElement>(null);
    const hasPositionedRef = useRef(false);

    useLayoutEffect(() => {
        const el = targetRef?.current ?? null;
        if (!el) return;

        const update = (animate: boolean) => {
            if (!targetRef?.current || !markRef.current) return;
            const targetRect = targetRef.current.getBoundingClientRect();
            const markRect = markRef.current.getBoundingClientRect();
            const w = markRect.width || 160;
            const h = markRect.height || 140;
            const { top, left } = getMarkPosition(targetRect, w, h);
            if (!hasPositionedRef.current) {
                gsap.set(markRef.current, { top, left });
                hasPositionedRef.current = true;
            } else {
                gsap.to(markRef.current, {
                    top,
                    left,
                    duration: animate ? MARK_DURATION : 0,
                    ease: MARK_EASE,
                    overwrite: true,
                });
            }
        };

        update(hasPositionedRef.current);
        const obs = new ResizeObserver(() => update(true));
        obs.observe(el);
        const onScrollOrResize = () => update(true);
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            obs.disconnect();
            window.removeEventListener("scroll", onScrollOrResize, true);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [targetRef, targetKey]);

    if (!targetRef) return null;

    const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
    });

    useGSAP(() => {
        timeline.to("#mark", {
            x: 10,
            y: -10,
            duration: ANIMATION_CONFIG.fast / 2,
            ease: ANIMATION_CONFIG.ease,
        });

        timeline.to("#mark", {
            x: 0,
            y: 0,
            duration: ANIMATION_CONFIG.fast / 2,
            ease: ANIMATION_CONFIG.ease,
        });
    }, []);

    return (
        <div id="mark" className="relative flex w-full justify-end">
            <div className="relative w-fit">
                <div
                    ref={markRef}
                    className="pointer-events-none fixed z-[100] bg-blue-700 w-20 h-20 translate-y-7 -rotate-5 -skew-x-20 md:-skew-x-10"
                    style={{
                        clipPath: "polygon(100% 46%, 0 100%, 100% 100%)",
                        top: 0,
                        left: 0,
                    }}
                    aria-hidden
                />
            </div>
        </div>
    );
};
