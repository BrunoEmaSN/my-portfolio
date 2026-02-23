import clsx from "clsx"
import type { InputDevice } from "../store"

export interface ControlsHintProps {
  /** List of keys or buttons to show, e.g. ['W', 'S', 'ENTER'] or ['D-Pad', 'A'] */
  items: string[];
  /** Current input device: keyboard shows text, xbox/playstation show button images when available. */
  inputDevice?: InputDevice;
  /** Label before the list. Default "CONTROLS:". */
  label?: string;
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
    "LB/RB ←→": ["xbox_LB_bumper.svg", "xbox_RB_bumper.svg"],
    "Stick der. ↑↓": ["xbox_R.svg"],
  }
  const playstation: Record<string, string[]> = {
    Cross: ["playstation_X_button.svg"],
    Circle: ["playstation_C_button.svg"],
    Share: ["playstation_Share_button.svg"],
    Options: ["playstation_Options_button.svg"],
    "D-Pad ↑↓": ["playstation_Up_button.svg", "playstation_Down_button.svg"],
    "L1/R1 ←→": ["playstation_button_L1.svg", "playstation_button_R1.svg"],
    "Stick der. ↑↓": ["playstation_button_L3.svg"],
  }
  const map = platform === "xbox" ? xbox : playstation
  return map[item] ?? null
}

const ControlsHint = ({
  items,
  inputDevice = "keyboard",
  label = "CONTROLS:",
  hideOnMobile = true,
  className,
}: ControlsHintProps) => {
  if (items.length === 0) return null

  const isGamepad = inputDevice === "xbox" || inputDevice === "playstation"
  const prefix = isGamepad ? `${CONTROLS_BASE}/${inputDevice}` : ""

  return (
    <div
      className={clsx(
        "absolute bottom-5 right-5 bg-blue-700 text-white p-4 rounded-lg text-xs font-mono opacity-50 flex flex-wrap items-center gap-1",
        hideOnMobile && "hidden md:flex",
        className
      )}
    >
      <span className="mr-2">{label}</span>
      {items.map((item) => {
        const images =
          isGamepad && (inputDevice === "xbox" || inputDevice === "playstation")
            ? getButtonImages(item, inputDevice)
            : null

        if (images && images.length > 0) {
          return (
            <span key={item} className="inline-flex items-center gap-0.5 mx-0.5">
              {images.map((src) => (
                <img
                  key={src}
                  src={`${prefix}/${src}`}
                  alt={item}
                  className="h-5 w-auto inline-block"
                  aria-hidden
                />
              ))}
            </span>
          )
        }

        return (
          <span key={item} className="mx-0.5">
            [{item}]
          </span>
        )
      })}
    </div>
  )
}

export default ControlsHint
