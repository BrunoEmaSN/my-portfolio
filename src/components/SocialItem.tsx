import { Mail } from "lucide-react";
import clsx from "clsx";

export interface SocialItemProps {
  /** URL o ruta de la imagen del avatar (sección izquierda) */
  logoSrc: string;
  /** Texto alternativo para el avatar */
  logoAlt?: string;
  /** Nombre del remitente (ej. "Keisuke Hiraga") */
  name: string;
  icon: React.ReactNode;
  /** Descripción o asunto del mensaje (ej. "Painting buddy") */
  description: string;
  /** Callback al hacer clic en el elemento */
  onClick?: () => void;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

const SocialItem = ({
  logoSrc,
  logoAlt = "Logo",
  name,
  icon,
  description,
  onClick,
  className = "",
}: SocialItemProps) => {
  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      className={clsx(
        "z-50 relative flex w-full min-h-[6rem] max-w-xl rounded overflow-hidden bg-[#1E1E1E] shadow-card shadow-[#0E0D51]/80 hover:bg-white hover:text-black transition-colors pointer-events-auto",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Sección izquierda: avatar con recorte diagonal */}
      <div
        className="relative w-[20%] aspect-3/2 bg-[#1E1E1E]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
        }}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          className="absolute inset-0 w-full h-full object-cover object-left -skew-x-17"
        />
      </div>

      {/* Sección derecha: nombre + descripción */}
      <div className="flex-1 flex flex-col justify-center py-3 pr-4 pl-3 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[#2563eb]" aria-hidden>
            {icon ?? <Mail size={18} strokeWidth={0.5} fill="#93c5fd" className="text-[#1d4ed8]" />}
          </span>
          <span className="text-[#1d4ed8] font-medium text-sm truncate">{name}</span>
        </div>
        <div className="mt-1 h-px w-full max-w-[90%] bg-[#1d4ed8]/80" />
        <p className="mt-2 text-lg font-semibold leading-tight truncate">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SocialItem;
