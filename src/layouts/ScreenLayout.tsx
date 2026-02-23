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

/** Controles por página (pathname). Solo rutas del layout: back + scroll o según pantalla. */
const PAGE_CONTROLS: Partial<Record<string, Record<InputDevice, string[]>>> = {
  [ROUTES.ABOUT_ME]: {
    keyboard: ["ESC", "A", "D", "↑", "↓"],
    playstation: ["Circle", "Share", "L1/R1 ←→", "Stick der. ↑↓"],
    xbox: ["B", "View", "LB/RB ←→", "Stick der. ↑↓"],
  },
  [ROUTES.EXPERIENCES]: {
    keyboard: ["ESC", "↑", "↓"],
    playstation: ["Circle", "Share", "Stick der. ↑↓"],
    xbox: ["B", "View", "Stick der. ↑↓"],
  },
  [ROUTES.TESTIMONIALS]: {
    keyboard: ["ESC", "↑", "↓"],
    playstation: ["Circle", "Share", "Stick der. ↑↓"],
    xbox: ["B", "View", "Stick der. ↑↓"],
  },
  [ROUTES.CONTACT]: {
    keyboard: ["ESC", "↑", "↓", "ENTER"],
    playstation: ["Circle", "Share", "D-Pad ↑↓", "Stick der. ↑↓", "Cross"],
    xbox: ["B", "View", "D-Pad ↑↓", "Stick der. ↑↓", "A"],
  },
}

const ScreenLayout = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const inputDevice = useAppStore((s) => s.inputDevice)
    const pageControls = PAGE_CONTROLS[location.pathname]
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
                    {!isMobile && pageControls && (
                        <ControlsHint items={pageControls[inputDevice]} inputDevice={inputDevice} />
                    )}
                </div>
            </div>
        </main>
    )
}

export default ScreenLayout