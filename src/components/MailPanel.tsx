import { Mail } from "lucide-react";
import { useAppStore } from "../store";
import clsx from "clsx";

export interface MailPanelProps {
  /** Imagen de fondo del panel (semitransparente, escala de grises) */
  backgroundImage: string;
  /** Texto alternativo para la imagen de fondo */
  backgroundImageAlt?: string;
  /** Nombre del remitente */
  fromName: string;
  /** Asunto o pregunta destacada (ej. "Did you get this?") */
  subject: string;
  /** Líneas del cuerpo del mensaje */
  messageLines: string[];
  /** Callback al pulsar el botón de acción (derecha) */
  onAction?: () => void;
  /** Etiqueta del botón de acción (por defecto solo se muestra el icono) */
  actionLabel?: string;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

const MailPanel = ({
  backgroundImage,
  backgroundImageAlt = 'Mail background',
  fromName,
  subject,
  messageLines,
  onAction,
  actionLabel,
  className = '',
}: MailPanelProps) => {
  const { showMenu } = useAppStore();
  return (
    <div
      className={clsx("relative w-full max-w-3xl h-full rounded-lg bg-[#1E1E1E] -translate-y-15 -rotate-10 scale-103", className, {
        "pointer-events-none": showMenu,
        "pointer-events-auto": !showMenu,
      })}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#1E1E1E]/50 translate-x-20 translate-y-10 rounded-lg rotate-3" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-2/3">
          <img
            src={backgroundImage}
            alt={backgroundImageAlt}
            className="absolute object-cover h-full w-full opacity-20 grayscale"
            style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 0)' }}
          />
          <div
            className="absolute top-0 right-0 w-full h-full bg-[#1E1E1E]"
            style={{ clipPath: 'polygon(100% 0, 30% 0, 100% 70%)' }}
          />
          <span className="absolute top-0 left-1/2 -translate-x-2/3 text-white text-[150px] font-bold -skew-x-20 -rotate-10">
            MAIL
          </span>
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/50"
            style={{ clipPath: 'polygon(0 0, 0% 90%, 90% 0)' }}
          />
        </div>
      </div>
      <div
        className=" z-50 absolute top-0 left-0 w-full h-full flex justify-end items-end border-l-16 border-b-16 blur-[0.5px] border-r-16 border-white/90 rounded-lg rotate-3 translate-x-10 translate-y-5">
        <button
          type="button"
          onClick={onAction}
          className="z-50 w-20 h-20 md:w-40 md:h-40 relative flex justify-end items-end hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer">
          <img
            src="/images/run.svg"
            alt="Mail button"
            className="absolute w-full h-full rotate-20 pb-2"
            style={{ filter: "invert(17%) sepia(89%) saturate(3464%) hue-rotate(226deg) brightness(95%) contrast(97%)" }}
          />
          {/* <span
            className="rotate-10 mb-10 mr-5 w-13 h-13 flex items-center justify-center rounded-full border-5 border-gray-300 text-3xl font-bold"
            aria-label={actionLabel ?? 'Acción'}
          >
            A
          </span> */}
          <span
            className="rotate-10 m-auto flex items-center justify-center text-3xl font-bold"
            aria-label={actionLabel ?? 'Acción'}
          >
            SEND EMAIL
          </span>
        </button>
      </div>

      {/* Contenido sobre la imagen */}
      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 md:p-8 rotate-10 translate-x-20">
        {/* Remitente - parte superior derecha */}
        <div className="flex flex-col items-center gap-1 pt-50">
          <div className="w-fit">
            <span className="text-transparent text-5xl font-bold" style={{ WebkitTextStroke: "1px white" }}>
              From
            </span>
            <div className="flex items-center gap-2 font-sans text-sm text-gray-300">
              <div className="relative">
                <Mail size={20} strokeWidth={0.5} fill="white" />
                <Mail size={20} strokeWidth={1} color="#1E1E1E" className="absolute top-0 left-0" />
              </div>
              <span className="text-xl font-bold">{fromName}</span>
            </div>
          </div>
        </div>

        {/* Asunto / pregunta destacada */}
        <div className="mt-4 flex justify-center h-full max-h-[min(70vh,35rem)]">
          <div className="max-w-md w-full h-full">
            <div className="w-full rounded shadow-card shadow-blue-700 bg-white px-4 py-3 text-center text-2xl text-black font-bold">
              {subject}
            </div>

            {/* Cuerpo del mensaje */}
            <div className="mt-4 h-full text-2xl font-bold overflow-y-auto overflow-x-hidden overscroll-contain">
              {messageLines.join(" ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailPanel;
