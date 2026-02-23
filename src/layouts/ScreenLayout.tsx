import clsx from "clsx"
import { useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ANIMATION_CONFIG, ROUTES } from "../../constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { backAudioEffect } from "../helpers/audioContext"
import { useKeyboard } from "../hooks/useKeyboard"
import { useGamepad } from "../hooks/useGamepad"
import ControlsHint from "../components/ControlsHint"
import { useAppStore, type InputDevice } from "../store"

/** Controls: back + scroll. */
const LAYOUT_CONTROLS: Record<InputDevice, string[]> = {
  keyboard: ["ESC", "↑", "↓"],
  playstation: ["Circle", "Share", "Stick der. ↑↓"],
  xbox: ["B", "View", "Stick der. ↑↓"],
}

/** Controls when the screen has horizontal movement (e.g. About Me): back + scroll + A/D or left stick. */
const LAYOUT_CONTROLS_WITH_HORIZONTAL: Record<InputDevice, string[]> = {
  keyboard: ["ESC", "A", "D", "↑", "↓"],
  playstation: ["Circle", "Share", "Stick izq. ←→", "Stick der. ↑↓"],
  xbox: ["B", "View", "Stick izq. ←→", "Stick der. ↑↓"],
}

const ScreenLayout = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const inputDevice = useAppStore((s) => s.inputDevice)
    const hasHorizontal = location.pathname === ROUTES.ABOUT_ME
    const layoutControls = hasHorizontal ? LAYOUT_CONTROLS_WITH_HORIZONTAL : LAYOUT_CONTROLS
    const layoutRef = useRef<HTMLDivElement>(null)
    const outletWrapperRef = useRef<HTMLDivElement>(null)

    const goBack = () => {
        backAudioEffect();
        gsap.fromTo(layoutRef.current, { opacity: 1, scale: 1 }, {
            opacity: 0,
            scale: 1.3,
            duration: ANIMATION_CONFIG.fast,
            ease: ANIMATION_CONFIG.ease,
            onComplete: () => {
                navigate(ROUTES.HOME)
            }
        });
        return true;
    };

    useKeyboard(
        'screen-layout',
        { Escape: goBack },
        { priority: 100 }
    );

    useGamepad(
        'screen-layout',
        { back: goBack, b: goBack },
        { priority: 100 }
    )

    useGSAP(() => {
        gsap.fromTo(layoutRef.current, { opacity: 0, scale: 1.3 }, {
            opacity: 1,
            scale: 1,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
        })
    })

    return (
        <main className="w-full h-screen relative">
            <div
                ref={layoutRef}
                className="absolute w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className={clsx("relative w-full h-full")}>
                    <button
                        id="button-esc"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            backAudioEffect()
                            navigate(ROUTES.HOME)
                        }}
                        className="text-right button-menu absolute bottom-5 text-white hover:scale-105 transition-all duration-300 z-100 bg-blue-700"
                    >
                        Esc
                    </button>
                    <div ref={outletWrapperRef} className="w-full h-full">
                        {children}
                    </div>
                    {!isMobile && (
                        <ControlsHint items={layoutControls[inputDevice]} />
                    )}
                </div>
            </div>
        </main>
    )
}

export default ScreenLayout