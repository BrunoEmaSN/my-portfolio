import clsx from "clsx"
import type { InputDevice } from "../store"
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

export interface ControlsHintProps {
  /** List of keys or buttons to show, e.g. ['W', 'S', 'ENTER'] or ['D-Pad', 'A'] */
  items: string[];
  /** Current input device: keyboard shows text, xbox/playstation show button images when available. */
  inputDevice?: InputDevice;
  /** Hide on mobile (small viewport). Default true. */
  hideOnMobile?: boolean;
  className?: string;
}

const CONTROLS_BASE = "/images/controls"

/** Maps control label → one or more image filenames (no path). Null = use text. */
function getButtonImages(
  item: string,
  platform: "xbox" | "playstation"
): string[] | null {
  const xbox: Record<string, string[]> = {
    A: ["xbox_A_button.svg"],
    B: ["xbox_B_button.svg"],
    View: ["xbox_View_button.svg"],
    Menu: ["xbox_Menu_button.svg"],
    "D-Pad ↑↓": ["xbox_D-pad_(U).svg", "xbox_D-pad_(D).svg"],
    "D-Pad ←→": ["xbox_D-pad_(L).svg", "xbox_D-pad_(R).svg"],
    "LB/RB ←→": ["xbox_LB_bumper.svg", "xbox_RB_bumper.svg"],
    "Stick der. ↑↓": ["xbox_R.svg"],
  }
  const playstation: Record<string, string[]> = {
    Cross: ["playstation_X_button.svg"],
    Circle: ["playstation_C_button.svg"],
    Share: ["playstation_Share_button.svg"],
    Options: ["playstation_Options_button.svg"],
    "D-Pad ↑↓": ["playstation_Up_button.svg", "playstation_Down_button.svg"],
    "D-Pad ←→": ["playstation_Left_button.svg", "playstation_Right_button.svg"],
    "L1/R1 ←→": ["playstation_button_L1.svg", "playstation_button_R1.svg"],
    "Stick der. ↑↓": ["playstation_button_L3.svg"],
  }
  const map = platform === "xbox" ? xbox : playstation
  return map[item] ?? null
}

const ControlsHint = ({
  items,
  inputDevice = "keyboard",
  hideOnMobile = true,
  className,
}: ControlsHintProps) => {
  if (items.length === 0) return null

  const isGamepad = inputDevice === "xbox" || inputDevice === "playstation"
  const prefix = isGamepad ? `${CONTROLS_BASE}/${inputDevice}` : ""

  return (
    <div
      className={clsx(
        "cmp-controls-hint",
        hideOnMobile && "hide-mobile",
        className
      )}
    >
      {items.map((item) => {
        const images =
          isGamepad && (inputDevice === "xbox" || inputDevice === "playstation")
            ? getButtonImages(item, inputDevice)
            : null

        if (images && images.length > 0) {
          return (
            <span key={item} className="cmp-controls-hint__item">
              {images.map((src) => (
                <img
                  key={src}
                  src={`${prefix}/${src}`}
                  alt={item}
                  className="cmp-controls-hint__key"
                  style={{ filter: inputDevice === "xbox" ? "invert(100%)" : "invert(0%)" }}
                  aria-hidden
                />
              ))}
            </span>
          )
        }

        if (item === "↑") {
          return (
            <HiArrowSmUp size={24} key={item} className="border border-white" />
          )
        }

        if (item === "↓") {
          return (
            <HiArrowSmDown size={24} key={item} className="border border-white" />
          )
        }

        return (
          <span key={item} className="cmp-controls-hint__key-label">
            {item}
          </span>
        )
      })}
    </div>
  )
}

export default ControlsHint
