import { useRef, useId } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useWeekdayBanner } from "../hooks/useWeekdayBanner";

export interface WeekdayBannerProps {
  className?: string;
}

const MOON_LIT = "#facc15";
const MOON_SHADOW = "#000";

/**
 * Intersection area of two unit circles with center-to-center distance d.
 */
function circleIntersectionArea(d: number): number {
  if (d >= 2) return 0;
  if (d <= 0) return Math.PI;
  return 2 * Math.acos(d / 2) - (d / 2) * Math.sqrt(4 - d * d);
}

/**
 * Given phase (0 = new, 1 = full), returns center offset so the shadow circle
 * leaves the desired illuminated fraction (curved terminator). Binary search.
 */
function shadowCircleOffset(phase: number): number {
  const targetArea = (1 - phase) * Math.PI;
  let lo = 0;
  let hi = 2;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (circleIntersectionArea(mid) >= targetArea) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

const MoonPhaseIndicator = ({
  phase,
  waxing,
}: {
  phase: number;
  waxing: boolean;
}) => {
  const clipId = useId().replace(/:/g, "-");
  const r = 16;
  const cx = 16;
  const cy = 16;
  const d = shadowCircleOffset(phase);
  const shadowCx = waxing ? cx + d * r : cx - d * r;

  return (
    <div className="cmp-moon-indicator" aria-hidden title={`Fase lunar: ${Math.round(phase * 100)}%`}>
      <svg viewBox="0 0 32 32" style={{ transform: "translateZ(0)" }}>
        <defs>
          <clipPath id={clipId}>
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <circle cx={cx} cy={cy} r={r} fill={MOON_LIT} />
          <circle cx={shadowCx} cy={cy} r={r} fill={MOON_SHADOW} />
        </g>
      </svg>
    </div>
  );
};

const WeekdayBanner = ({ className }: WeekdayBannerProps) => {
  const waveRef = useRef<SVGSVGElement>(null);
  const wave2Ref = useRef<SVGSVGElement>(null);
  const { date, dayLabel, subtitle, limit, backgroundLabel, moonPhase, moonWaxing } = useWeekdayBanner();

  useGSAP(
    () => {
      if (!waveRef.current) return;
      const el = waveRef.current;
      gsap.set(el, { force3D: true });
      gsap.to(el, {
        xPercent: -50,
        duration: 4,
        ease: "none",
        repeat: -1,
        overwrite: "auto",
      });
      if (!wave2Ref.current) return;
      const el2 = wave2Ref.current;
      gsap.set(el2, { force3D: true });
      gsap.to(el2, {
        xPercent: -50,
        duration: 7,
        delay: 0.5,
        ease: "none",
        repeat: -1,
        overwrite: "auto",
      });
    },
    { scope: waveRef, dependencies: [] }
  );

  const isDark = backgroundLabel === "DARK HOUR";
  return (
    <div className={clsx("cmp-weekday-banner", className)}>
      <span
        className={clsx("cmp-weekday-banner__bg-text", isDark ? "dark" : "light")}
        aria-hidden
      >
        {backgroundLabel}
      </span>
      <div className="cmp-weekday-banner__wave-wrap wave-2">
        <svg
          ref={wave2Ref}
          className={clsx("cmp-weekday-banner__wave-svg", isDark ? "dark-bg" : "light-bg")}
          style={{ willChange: "transform", transform: "translateZ(0)", width: "200%", minWidth: "200%" }}
          viewBox="0 0 2000 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path fill="currentColor" d="M0,20 Q250,8 500,20 Q750,32 1000,20 Q1250,8 1500,20 Q1750,32 2000,20 L2000,40 L0,40 Z" />
        </svg>
      </div>
      <div className="cmp-weekday-banner__wave-wrap wave-1">
        <svg
          ref={waveRef}
          className={clsx("cmp-weekday-banner__wave-svg", isDark ? "dark" : "light")}
          style={{ willChange: "transform", transform: "translateZ(0)", width: "200%", minWidth: "200%" }}
          viewBox="0 0 2000 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path fill="currentColor" d="M0,20 Q250,8 500,20 Q750,32 1000,20 Q1250,8 1500,20 Q1750,32 2000,20 L2000,40 L0,40 Z" />
        </svg>
      </div>
      <div className="cmp-weekday-banner__bar">
        <div className="cmp-weekday-banner__bar-left">
          <div className="cmp-weekday-banner__bar-date-wrap">
            <span className="cmp-weekday-banner__date" style={{ WebkitTextStroke: "1px black" }}>{date}</span>
            <div className="cmp-weekday-banner__day-wrap">
              <span className="cmp-weekday-banner__day-bg" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} aria-hidden />
              <span className="cmp-weekday-banner__day-label" style={{ WebkitTextStroke: "1px black" }}>{dayLabel}</span>
            </div>
          </div>
          <span className={clsx("cmp-weekday-banner__subtitle", isDark ? "dark" : "light")}>{subtitle}</span>
        </div>

        <div className={clsx("cmp-weekday-banner__limit-wrap", isDark && "hidden-sun")}>
          <div className="flex flex-col items-end">
            <span className="cmp-weekday-banner__limit-label">LIMIT</span>
            <span className="cmp-weekday-banner__limit-value">{limit}</span>
          </div>
          <MoonPhaseIndicator phase={moonPhase} waxing={moonWaxing} />
        </div>
      </div>
    </div>
  );
};

export default WeekdayBanner;
