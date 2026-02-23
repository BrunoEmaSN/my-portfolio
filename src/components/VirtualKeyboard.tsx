import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useGamepad } from "../hooks/useGamepad";
import { menuAudioEffect } from "../helpers/audioContext";

type KeyAction = "backspace" | "done";

interface KeyCell {
  key: string;
  action?: KeyAction;
}

const ROW0: KeyCell[] = "1234567890".split("").map((k) => ({ key: k }));
const ROW1: KeyCell[] = "qwertyuiop".split("").map((k) => ({ key: k }));
const ROW2: KeyCell[] = "asdfghjkl".split("").map((k) => ({ key: k }));
const ROW3: KeyCell[] = "zxcvbnm".split("").map((k) => ({ key: k }));
const ROW4: KeyCell[] = [
  { key: "@" },
  { key: "." },
  { key: " " },
  { key: "-" },
  { key: "_" },
  { key: "⌫", action: "backspace" },
  { key: "Listo", action: "done" },
];

const GRID: KeyCell[][] = [ROW0, ROW1, ROW2, ROW3, ROW4];

export interface VirtualKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  visible: boolean;
  title?: string;
  /** Si true, el teclado físico no escribe y no se muestra (inputs readonly, bloqueo keydown). */
  disablePhysicalKeyboard?: boolean;
}

const VirtualKeyboard = ({
  value,
  onChange,
  onClose,
  visible,
  title = "Teclado",
  disablePhysicalKeyboard = true,
}: VirtualKeyboardProps) => {
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const row = GRID[selectedRow];
  const maxCol = row ? row.length - 1 : 0;
  const col = Math.min(selectedCol, maxCol);

  // Navegación con joystick/dpad (prioridad alta para capturar cuando está abierto)
  useGamepad(
    "virtual-keyboard",
    visible
      ? {
          "dpad-up": () => {
            menuAudioEffect();
            setSelectedRow((r) => Math.max(0, r - 1));
            return true;
          },
          "dpad-down": () => {
            menuAudioEffect();
            setSelectedRow((r) => Math.min(GRID.length - 1, r + 1));
            return true;
          },
          "dpad-left": () => {
            menuAudioEffect();
            setSelectedCol((c) => Math.max(0, c - 1));
            return true;
          },
          "dpad-right": () => {
            menuAudioEffect();
            setSelectedCol((c) => Math.min(GRID[selectedRow].length - 1, c + 1));
            return true;
          },
          "stick-left-up": () => {
            menuAudioEffect();
            setSelectedRow((r) => Math.max(0, r - 1));
            return true;
          },
          "stick-left-down": () => {
            menuAudioEffect();
            setSelectedRow((r) => Math.min(GRID.length - 1, r + 1));
            return true;
          },
          "stick-left-left": () => {
            menuAudioEffect();
            setSelectedCol((c) => Math.max(0, c - 1));
            return true;
          },
          "stick-left-right": () => {
            menuAudioEffect();
            setSelectedCol((c) => Math.min(GRID[selectedRow].length - 1, c + 1));
            return true;
          },
          a: () => {
            const cell = GRID[selectedRow]?.[col];
            if (!cell) return true;
            menuAudioEffect();
            if (cell.action === "backspace") {
              onChange(value.slice(0, -1));
            } else if (cell.action === "done") {
              onClose();
            } else {
              onChange(value + cell.key);
            }
            return true;
          },
          b: () => {
            menuAudioEffect();
            onClose();
            return true;
          },
        }
      : {},
    { priority: 200 }
  );

  // Sincronizar col cuando cambia la fila (por si la nueva fila tiene menos columnas)
  useEffect(() => {
    const max = GRID[selectedRow]?.length ?? 0;
    setSelectedCol((c) => (max ? Math.min(c, max - 1) : 0));
  }, [selectedRow]);

  // Bloquear teclado físico y atrapar foco cuando está visible
  useEffect(() => {
    if (!visible || !disablePhysicalKeyboard) return;
    overlayRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [visible, disablePhysicalKeyboard]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      className="absolute inset-0 z-[200] flex flex-col outline-none md:translate-y-30 lg:rotate-10 scale-100"
      aria-label={title}
    >
      <div
        className="flex h-full w-full flex-col p-4 md:p-6 lg:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <p className="mb-2 text-center text-lg font-semibold text-white md:mb-4 md:text-xl">
            {title}
          </p>
        )}
        <div className="mb-3 rounded-lg bg-neutral-900 px-4 py-3 text-xl font-mono text-white min-h-[3rem] break-all md:mb-4 md:min-h-[4rem] md:text-2xl">
          {value || "\u00a0"}
        </div>
        <div className="flex p-4 flex-col justify-center gap-2 md:gap-3 bg-black/90">
          {GRID.map((cells, r) => (
            <div key={r} className="flex justify-center gap-2 md:gap-3">
              {cells.map((cell, c) => {
                const isSelected = r === selectedRow && c === col;
                const isSpecial = cell.action != null;
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    disabled
                    aria-hidden
                    className={clsx(
                      "min-w-[2.5rem] rounded-lg px-3 py-3 text-base font-bold transition-all select-none md:min-w-[3rem] md:px-4 md:py-4 md:text-lg",
                      isSpecial && "min-w-[4rem] md:min-w-[5rem]",
                      cell.action === "done" && "min-w-[5rem] md:min-w-[6rem]",
                      isSelected
                        ? "bg-blue-600 text-white scale-110 ring-2 ring-white"
                        : "bg-neutral-700 text-gray-200"
                    )}
                  >
                    {cell.key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-gray-400 md:mt-4">
          D-Pad / Stick: mover · A: escribir · B: cerrar
        </p>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
