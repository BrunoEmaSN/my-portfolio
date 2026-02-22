import { useRef, useId } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useWeekdayBanner } from "../hooks/useWeekdayBanner";

export interface WeekdayBannerProps {
  className?: string;
}

/** Colores del indicador de fase lunar */
const MOON_LIT = "#FACC15";
const MOON_SHADOW = "#000";

/**
 * Área de intersección de dos círculos de radio 1 con distancia d entre centros.
 */
function circleIntersectionArea(d: number): number {
  if (d >= 2) return 0;
  if (d <= 0) return Math.PI;
  return 2 * Math.acos(d / 2) - (d / 2) * Math.sqrt(4 - d * d);
}

/**
 * Dado phase (0 = nueva, 1 = llena), devuelve la distancia entre centros para que
 * el círculo de sombra deje visible la fracción phase del disco (terminador curvo).
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

/**
 * Indicador de fase lunar para hemisferio sur (Argentina).
 * Terminador curvo: creciente/menguante (finos) y gibosa creciente/menguante (gordos).
 */
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
    <div
      className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden"
      aria-hidden
      title={`Fase lunar: ${Math.round(phase * 100)}%`}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        style={{ transform: "translateZ(0)" }}
      >
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
    },
    { scope: waveRef, dependencies: [] }
  );

  return (
    <div
      className={clsx(
        "relative w-full min-h-[2rem] md:min-h-[3rem] lg:min-h-[5rem] xl:min-h-[7rem] flex items-end justify-center overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Texto de fondo grande */}
      <span
        className={clsx(
          backgroundLabel === "DARK HOUR" && "text-lime-950",
          backgroundLabel !== "DARK HOUR" && "text-[#141F67] left-1/2 -translate-x-1/2",
          "absolute top-2 text-[5rem] font-black tracking-tighter uppercase pointer-events-none select-none z-10"
        )}
        aria-hidden
      >
        {backgroundLabel}
      </span>
      {/* Onda animada continua con GSAP (2 periodos idénticos = loop sin corte) */}
      <div className={clsx(
          "absolute bottom-0 left-0 w-full h-20 z-10 overflow-hidden"
        )}>
        <svg
          ref={waveRef}
          className={clsx(
            backgroundLabel === "DARK HOUR" && "text-green-700/80",
            "absolute bottom-0 left-0 h-full text-blue-600/80"
          )}
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            width: "200%",
            minWidth: "200%",
          }}
          viewBox="0 0 2000 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Un periodo: 0–1000; segundo periodo idéntico: 1000–2000 */}
          <path
            fill="currentColor"
            d="M0,20 Q250,8 500,20 Q750,32 1000,20 Q1250,8 1500,20 Q1750,32 2000,20 L2000,40 L0,40 Z"
          />
        </svg>
      </div>
      {/* Barra central azul con resplandor */}
      <div
        className="relative z-20 flex items-center justify-between w-[92%] max-w-2xl min-h-[4.5rem] px-5 py-3 mt-7 rounded-xl"
      >
        {/* Bloque izquierdo: fecha + día + triángulo + subtítulo */}
        <div className="flex flex-col items-start">
          <div className="flex items-baseline">
            <span
              className="text-3xl sm:text-4xl font-black text-white tracking-tight"
              style={{ WebkitTextStroke: "1px black" }}
            >
              {date}
            </span>
            <div className="flex flex-col items-center relative">
              <span
                className="absolute w-11 h-10 bg-black"
                style={{
                  clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                }}
                aria-hidden
              />
              <span
                className="text-sm font-bold text-white uppercase leading-tight z-10"
                style={{ WebkitTextStroke: "1px black" }}
              >
                {dayLabel}
              </span>
            </div>
          </div>
          <span
            className={clsx(
              backgroundLabel === "DARK HOUR" && "text-emerald-500",
              "text-base sm:text-lg font-bold text-cyan-300 tracking-wide"
            )}
          >
            {subtitle}
          </span>
        </div>

        {/* Bloque derecho: LIMIT + número + icono */}
        <div className={clsx(
            backgroundLabel === "DARK HOUR" && "hidden",
            "flex items-center gap-2"
          )}>
          <div className="flex flex-col items-end">
            <span
              className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider"
            >
              LIMIT
            </span>
            <span
              className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight"
            >
              {limit}
            </span>
          </div>
          <MoonPhaseIndicator phase={moonPhase} waxing={moonWaxing} />
        </div>
      </div>
    </div>
  );
};

export default WeekdayBanner;
