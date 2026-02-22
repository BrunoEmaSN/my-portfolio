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
        "relative w-full min-h-[7rem] flex items-center justify-center overflow-hidden rounded-lg",
        className
      )}
      style={{
        background: `
          linear-gradient(90deg, 
            #8B6914 0%, 
            #A67C32 15%, 
            #C4A35A 35%, 
            #8B6914 50%,
            #6B4E0E 65%,
            #A67C32 85%,
            #8B6914 100%
          )
        `,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
      }}
    >
      {/* Texto de fondo grande */}
      <span
        className="absolute top-2 left-1/2 -translate-x-1/2 text-[4rem] sm:text-[5rem] font-black tracking-tighter uppercase text-[#0E0D51]/40 pointer-events-none select-none"
        aria-hidden
      >
        {backgroundLabel}
      </span>

      {/* Barra central azul con resplandor */}
      <div
        className="relative z-10 flex items-center justify-between w-[92%] max-w-2xl min-h-[4.5rem] px-5 py-3 rounded-xl"
        style={{
          background: "linear-gradient(180deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.9) 50%, rgba(29, 78, 216, 0.95) 100%)",
          boxShadow: `
            0 0 20px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.2)
          `,
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* Bloque izquierdo: fecha + día + triángulo + subtítulo */}
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {date}
            </span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-white uppercase leading-tight">
                {dayLabel}
              </span>
              <span
                className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-black"
                aria-hidden
              />
            </div>
          </div>
          <span className="text-base sm:text-lg font-bold text-cyan-300 tracking-wide">
            {subtitle}
          </span>
        </div>

        {/* Bloque derecho: LIMIT + número + icono */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
              LIMIT
            </span>
            <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
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
