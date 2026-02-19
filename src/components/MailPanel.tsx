import { useState, useRef } from "react";
import { Mail } from "lucide-react";
import { useAppStore } from "../store";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface MailPanelProps {
  /** Imagen de fondo del panel (semitransparente, escala de grises) */
  backgroundImage: string;
  /** Texto alternativo para la imagen de fondo */
  backgroundImageAlt?: string;
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
  onAction,
  actionLabel,
  className = '',
}: MailPanelProps) => {
  const { showMenu } = useAppStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const [fromNameValue, setFromNameValue] = useState("");
  const [fromEmailValue, setFromEmailValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  useGSAP(() => {
    if (!panelRef.current || showMenu) return;
    gsap.fromTo(
      panelRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );
  }, { scope: panelRef, dependencies: [showMenu] });

  return (
    <div
      ref={panelRef}
      className={clsx("relative w-full max-w-3xl h-full rounded-lg bg-[#1E1E1E] md:-translate-y-15 lg:-rotate-10 scale-103", className, {
        "pointer-events-none": showMenu,
        "pointer-events-auto": !showMenu,
      })}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#1E1E1E]/50 lg:translate-x-20 lg:translate-y-10 rounded-lg lg:rotate-3" />
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
          <span className="absolute top-0 md:left-1/2 md:-translate-x-2/3 text-white text-8xl md:text-[150px] font-bold -skew-x-20 lg:-rotate-10">
            MAIL
          </span>
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/50"
            style={{ clipPath: 'polygon(0 0, 0% 90%, 90% 0)' }}
          />
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full hidden lg:flex justify-end items-end border-l-16 border-b-16 blur-[0.5px] border-r-16 border-white/90 rounded-lg lg:rotate-3 lg:translate-x-10 lg:translate-y-5" />

      {/* Contenido sobre la imagen */}
      <div className="relative z-50 flex h-full flex-col p-5 sm:p-6 md:p-8 lg:rotate-10 lg:translate-x-20">
        {/* Remitente - parte superior derecha */}
        <div className="flex flex-col items-center gap-1 pt-50">
          <div className="w-fit">
            <div className="flex items-end gap-2">
              <span className="text-transparent text-5xl font-bold" style={{ WebkitTextStroke: "1px white" }}>
                From
              </span>
              <input
                type="text"
                placeholder="Your name..."
                value={fromNameValue}
                onChange={(e) => setFromNameValue(e.target.value)}
                className="text-xl font-bold bg-transparent border-none outline-none w-full min-w-0 text-gray-300 truncate"
              />
            </div>
            <div className="flex items-center gap-2 font-sans text-sm text-gray-300">
              <div className="relative">
                <Mail size={20} strokeWidth={0.5} fill="white" />
                <Mail size={20} strokeWidth={1} color="#1E1E1E" className="absolute top-0 left-0" />
              </div>
              <input
                type="email"
                placeholder="Your email..."
                value={fromEmailValue}
                onChange={(e) => setFromEmailValue(e.target.value)}
                className="text-xl font-bold bg-transparent border-none outline-none w-full min-w-0 text-gray-300 truncate"
              />
            </div>
          </div>
        </div>

        {/* Asunto / pregunta destacada */}
        <div className="mt-4 flex justify-center h-full max-h-[min(70vh,35rem)]">
          <div className="max-w-md w-full h-full">
            <input
              type="text"
              placeholder="Subject..."
              value={subjectValue}
              onChange={(e) => setSubjectValue(e.target.value)}
              className="w-full rounded shadow-card shadow-blue-700 bg-white px-4 py-3 text-center text-2xl text-black font-bold border-none outline-none truncate"
            />

            {/* Cuerpo del mensaje */}
            <textarea
              placeholder="Message..."
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="mt-4 h-full text-2xl font-bold overflow-y-auto overflow-x-hidden overscroll-contain w-full resize-none bg-transparent border-none outline-none text-inherit"
            />
          </div>
        </div>
        <div className="flex justify-end items-end pt-20 md:pt-0">
          <button
            type="button"
            onClick={onAction}
            className="w-full h-20 md:w-40 md:h-40 relative flex justify-end items-end hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer">
            <img
              src="/images/run.svg"
              alt="Mail button"
              className="absolute hidden md:block w-full h-full p-2"
              style={{ filter: "invert(17%) sepia(89%) saturate(3464%) hue-rotate(226deg) brightness(95%) contrast(97%)" }}
            />
            {/* <span
              className="rotate-10 mb-10 mr-5 w-13 h-13 flex items-center justify-center rounded-full border-5 border-gray-300 text-3xl font-bold"
              aria-label={actionLabel ?? 'Acción'}
            >
              A
            </span> */}
            <span
              className="m-auto p-4 md:p-0 bg-blue-700 md:bg-transparent flex items-center justify-center text-3xl font-bold z-10"
              aria-label={actionLabel ?? 'Acción'}
            >
              SEND EMAIL
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailPanel;
