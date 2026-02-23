import { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "../../constants";
import { HiMail, HiUser } from "react-icons/hi";
import { menuAudioEffect } from "../helpers/audioContext";
import { useKeyboard } from "../hooks/useKeyboard";
import { Mark } from "./Mark";

export interface MailFormData {
  fromName: string;
  fromEmail: string;
  subject: string;
  message: string;
}

export interface MailPanelProps {
  backgroundImage: string;
  backgroundImageAlt?: string;
  onSend?: (data: MailFormData) => void;
  actionLabel?: string;
  className?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOCUSABLE_COUNT = 5; // name, email, subject, message, submit button

const MailPanel = ({
  backgroundImage,
  backgroundImageAlt = 'Mail background',
  onSend,
  actionLabel,
  className = '',
}: MailPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const focusableRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null)[]>([]);
  const selectedTargetRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fromNameValue, setFromNameValue] = useState("");
  const [fromEmailValue, setFromEmailValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const clearStatus = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
  }, []);

  const focusAt = useCallback((index: number) => {
    const el = focusableRefs.current[index];
    if (el && 'focus' in el) el.focus();
  }, []);

  useEffect(() => {
    selectedTargetRef.current = focusableRefs.current[selectedIndex] ?? null;
  }, [selectedIndex]);

  useKeyboard(
    'contact-form',
    {
      w: () => {
        menuAudioEffect();
        const prev = (selectedIndex - 1 + FOCUSABLE_COUNT) % FOCUSABLE_COUNT;
        setSelectedIndex(prev);
        focusAt(prev);
        return true;
      },
      s: () => {
        menuAudioEffect();
        const next = (selectedIndex + 1) % FOCUSABLE_COUNT;
        setSelectedIndex(next);
        focusAt(next);
        return true;
      },
      Enter: (e) => {
        if (selectedIndex === 4) {
          e.preventDefault();
          handleSubmit();
          return true;
        }
        focusAt(selectedIndex);
        return true;
      },
    },
    { priority: 70, ignoreInInputs: false }
  );

  const handleSubmit = () => {
    setErrorMessage("");
    const trimmedEmail = fromEmailValue.trim();
    const trimmedMessage = messageValue.trim();
    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage("Introduce tu email.");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage("Email no válido.");
      return;
    }
    if (!trimmedMessage) {
      setStatus('error');
      setErrorMessage("Escribe un mensaje.");
      return;
    }
    setStatus('sending');
    const data: MailFormData = {
      fromName: fromNameValue.trim(),
      fromEmail: trimmedEmail,
      subject: subjectValue.trim(),
      message: trimmedMessage,
    };
    onSend?.(data);
    setStatus('success');
  };

  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: ANIMATION_CONFIG.fast, delay: 0.2, ease: 'power2.out' }
    );
  }, { scope: panelRef, dependencies: [] });

  return (
    <div
      ref={panelRef}
      className={clsx("relative w-full max-w-3xl h-full rounded-lg bg-neutral-800 md:-translate-y-15 lg:-rotate-10 scale-103 pointer-events-auto", className)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-800/50 lg:translate-x-20 lg:translate-y-10 rounded-lg lg:rotate-3" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-2/3">
          <div className="absolute top-0 left-0 w-full h-full" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 0)' }}>
            <img
              src={backgroundImage}
              alt={backgroundImageAlt}
              className="object-cover h-full w-full opacity-20 grayscale -translate-x-20 rotate-y-180"
            />
          </div>
          <div
            className="absolute top-0 right-0 w-full h-full bg-neutral-800"
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

      <div className="relative z-50 flex h-full flex-col p-5 sm:p-6 md:p-8 lg:rotate-10 lg:translate-x-20">
        <Mark targetRef={selectedTargetRef} targetKey={selectedIndex} />
        <div className="flex flex-col items-center gap-1 pt-50">
          <div className="w-fit">
            <div className="flex items-end gap-2">
              <span className="text-transparent text-5xl font-black" style={{ WebkitTextStroke: "1px white" }}>
                From
              </span>
            </div>
            <div className="flex items-center gap-2 font-sans text-sm text-gray-300">
              <div className="relative">
                <HiUser size={20} strokeWidth={0.5} color="#262626" fill="white" />
              </div>
              <input
                ref={(el) => { focusableRefs.current[0] = el; }}
                type="text"
                placeholder="Your name..."
                value={fromNameValue}
                onChange={(e) => { setFromNameValue(e.target.value); clearStatus(); }}
                onFocus={() => setSelectedIndex(0)}
                className={clsx(
                  "text-xl font-bold bg-transparent outline-none w-full min-w-0 text-gray-300 truncate focus:border-b-2 focus:border-blue-500")}
              />
            </div>
            <div className="flex items-center gap-2 font-sans text-sm text-gray-300">
              <div className="relative">
                <HiMail size={20} strokeWidth={0.5} color="#262626" fill="white" />
              </div>
              <input
                ref={(el) => { focusableRefs.current[1] = el; }}
                type="email"
                placeholder="Your email..."
                value={fromEmailValue}
                onChange={(e) => { setFromEmailValue(e.target.value); clearStatus(); }}
                onFocus={() => setSelectedIndex(1)}
                className={clsx(
                  "text-xl font-bold bg-transparent outline-none w-full min-w-0 text-gray-300 truncate focus:border-b-2 focus:border-blue-500"
                )}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center h-full max-h-[min(70vh,35rem)]">
          <div className="max-w-md w-full h-full">
            <input
              ref={(el) => { focusableRefs.current[2] = el; }}
              type="text"
              placeholder="Subject..."
              value={subjectValue}
              onChange={(e) => { setSubjectValue(e.target.value); clearStatus(); }}
              onFocus={() => setSelectedIndex(2)}
              className={clsx(
                "w-full rounded shadow-card shadow-blue-700 bg-white px-4 py-3 text-center text-2xl text-black font-bold outline-none truncatefocus:border-b-2 focus:border-blue-500"
              )}
            />

            <textarea
              ref={(el) => { focusableRefs.current[3] = el; }}
              placeholder="Message..."
              value={messageValue}
              onChange={(e) => { setMessageValue(e.target.value); clearStatus(); }}
              onFocus={() => setSelectedIndex(3)}
              className={clsx(
                "mt-4 h-full text-2xl font-bold overflow-y-auto overflow-x-hidden overscroll-contain w-full resize-none bg-transparent outline-none text-inherit focus:border-b-2 focus:border-blue-500"
              )}
            />
            {errorMessage && (
              <p className="mt-2 text-red-400 text-sm font-medium" role="alert">{errorMessage}</p>
            )}
            {status === 'success' && (
              <p className="mt-2 text-green-400 text-sm font-medium">Listo. Abre tu cliente de correo para enviar.</p>
            )}
          </div>
        </div>
        <div className="flex justify-end items-end pt-20 md:pt-0">
          <button
            ref={(el) => { focusableRefs.current[4] = el; }}
            type="button"
            onClick={handleSubmit}
            onFocus={() => setSelectedIndex(4)}
            disabled={status === 'sending'}
            className={clsx(
              "w-full h-20 md:w-40 md:h-40 relative flex justify-end items-end hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:scale-105 focus:opacity-90"
            )}>
            <img
              src="/images/run.svg"
              alt="Mail button"
              className="absolute hidden md:block w-full h-full md:translate-x-5"
              style={{ filter: "invert(17%) sepia(89%) saturate(3464%) hue-rotate(226deg) brightness(95%) contrast(97%)" }}
            />
            <span
              className="m-auto p-4 md:p-0 bg-blue-700 md:bg-transparent flex items-center justify-center text-3xl font-bold z-10"
              aria-label={actionLabel ?? 'Enviar email'}
            >
              {status === 'sending' ? '...' : 'SEND EMAIL'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailPanel;
