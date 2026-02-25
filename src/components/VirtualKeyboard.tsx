import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useGamepad } from "../hooks/useGamepad";
import { backAudioEffect, confirmAudioEffect, keyboardAudioEffect } from "../helpers/audioContext";
import ControlsHint from "./ControlsHint";
import { useAppStore } from "../store";

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
  { key: "Done", action: "done" },
];

const GRID: KeyCell[][] = [ROW0, ROW1, ROW2, ROW3, ROW4];

export interface VirtualKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  visible: boolean;
  title?: string;
  /** If true, physical keyboard input is disabled and hidden (inputs readonly, keydown blocked). */
  disablePhysicalKeyboard?: boolean;
}

const CONTROLS = {
  "playstation": ["Circle", "Cross", "Share", "D-Pad ←→", "D-Pad ↑↓"],
  "xbox": ["B", "A", "View", "D-Pad ←→", "D-Pad ↑↓"],
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
  const inputDevice = useAppStore((s) => s.inputDevice)

  const row = GRID[selectedRow];
  const maxCol = row ? row.length - 1 : 0;
  const col = Math.min(selectedCol, maxCol);

  // Joystick/dpad navigation (high priority to capture when open)
  useGamepad(
    "virtual-keyboard",
    visible
      ? {
          "dpad-up": () => {
            keyboardAudioEffect();
            setSelectedRow((r) => Math.max(0, r - 1));
            return true;
          },
          "dpad-down": () => {
            keyboardAudioEffect();
            setSelectedRow((r) => Math.min(GRID.length - 1, r + 1));
            return true;
          },
          "dpad-left": () => {
            keyboardAudioEffect();
            setSelectedCol((c) => Math.max(0, c - 1));
            return true;
          },
          "dpad-right": () => {
            keyboardAudioEffect();
            setSelectedCol((c) => Math.min(GRID[selectedRow].length - 1, c + 1));
            return true;
          },
          a: () => {
            const cell = GRID[selectedRow]?.[col];
            if (!cell) return true;
            confirmAudioEffect();
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
            backAudioEffect();
            onClose();
            return true;
          },
        }
      : {},
    { priority: 200 }
  );

  // Sync col when row changes (in case the new row has fewer columns)
  useEffect(() => {
    const max = GRID[selectedRow]?.length ?? 0;
    setSelectedCol((c) => (max ? Math.min(c, max - 1) : 0));
  }, [selectedRow]);

  // Block physical keyboard and trap focus when visible
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
    <div ref={overlayRef} tabIndex={-1} className="cmp-virtual-keyboard" aria-label={title}>
      <div className="cmp-virtual-keyboard__dialog" role="dialog" aria-modal="true" aria-label={title}>
        {title && (
          <p className="cmp-virtual-keyboard__title">{title}</p>
        )}
        <div className="cmp-virtual-keyboard__input-wrap">
          {value || "\u00a0"}|
        </div>
        <div className="cmp-virtual-keyboard__grid-wrap pb-10">
          {GRID.map((cells, r) => (
            <div key={r} className="cmp-virtual-keyboard__row">
              {cells.map((cell, c) => {
                const isSelected = r === selectedRow && c === col;
                const isSpecial = cell.action != null;
                const isDone = cell.action === "done";
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    disabled
                    aria-hidden
                    className={clsx(
                      "cmp-virtual-keyboard__key",
                      isSpecial && "is-special",
                      isDone && "is-done",
                      isSelected && "is-selected"
                    )}
                  >
                    {cell.key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="cmp-virtual-keyboard__hint-wrap">
          <ControlsHint items={inputDevice === "playstation" || inputDevice === "xbox" ? CONTROLS[inputDevice] : []} inputDevice={inputDevice} />
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
