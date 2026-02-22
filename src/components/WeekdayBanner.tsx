import clsx from "clsx";

export interface WeekdayBannerProps {
  /** Fecha en formato "DD/MM" (ej. "11/12") */
  date: string;
  /** Abreviatura del día (ej. "Thu") */
  dayLabel: string;
  /** Texto descriptivo debajo de la fecha (ej. "After School") */
  subtitle: string;
  /** Valor del límite mostrado a la derecha */
  limit: number;
  /** Texto de fondo grande (ej. "WEEKDAY") */
  backgroundLabel?: string;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

/** Icono circular mitad amarillo / mitad negro (fase lunar o medidor) */
const LimitIndicator = () => (
  <div
    className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden"
    aria-hidden
  >
    <div className="w-full h-full relative">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(to right, #FACC15 0%, #FACC15 50%, #000 50%, #000 100%)",
        }}
      />
    </div>
  </div>
);

const WeekdayBanner = ({
  date,
  dayLabel,
  subtitle,
  limit,
  backgroundLabel = "WEEKDAY",
  className = "",
}: WeekdayBannerProps) => {
  return (
    <div
      className={clsx(
        "relative w-full min-h-[7rem] flex items-end justify-center overflow-hidden",
        className
      )}
    >
      {/* Texto de fondo grande */}
      <span
        className="absolute top-2 left-1/2 -translate-x-1/2 text-[4rem] sm:text-[5rem] font-black tracking-tighter uppercase text-[#141F67] pointer-events-none select-none z-10"
        aria-hidden
      >
        {backgroundLabel}
      </span>
      <div className="absolute botom-0 left-0 w-full h-10 bg-blue-700/50 z-10" />
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
            className="text-base sm:text-lg font-bold text-cyan-300 tracking-wide"
          >
            {subtitle}
          </span>
        </div>

        {/* Bloque derecho: LIMIT + número + icono */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span
              className="text-xs font-semibold text-white/90 uppercase tracking-wider"
              style={{ WebkitTextStroke: "0.5px black" }}
            >
              LIMIT
            </span>
            <span
              className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight"
            >
              {limit}
            </span>
          </div>
          <LimitIndicator />
        </div>
      </div>
    </div>
  );
};

export default WeekdayBanner;
