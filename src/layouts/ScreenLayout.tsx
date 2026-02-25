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
    xbox: ["B", "LB/RB ←→", "Stick der. ↑↓"],
  },
  [ROUTES.EXPERIENCES]: {
    keyboard: ["ESC", "↑", "↓"],
    playstation: ["Circle", "Share", "Stick der. ↑↓"],
    xbox: ["B", "Stick der. ↑↓"],
  },
  [ROUTES.TESTIMONIALS]: {
    keyboard: ["ESC", "↑", "↓"],
    playstation: ["Circle", "Share", "Stick der. ↑↓"],
    xbox: ["B", "Stick der. ↑↓"],
  },
  [ROUTES.CONTACT]: {
    keyboard: ["ESC", "ENTER", "W", "S" , "↑", "↓"],
    playstation: ["Circle", "Cross", "Share", "D-Pad ↑↓", "Stick der. ↑↓"],
    xbox: ["B", "A", "D-Pad ↑↓", "Stick der. ↑↓"],
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
        <main className="cmp-screen-layout">
            <div ref={layoutRef} className="cmp-screen-layout__inner" style={{ transformStyle: "preserve-3d" }}>
                <div className="cmp-screen-layout__content">
                    <button
                        id="button-esc"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            backAudioEffect()
                            navigate(ROUTES.HOME)
                        }}
                        className="cmp-screen-layout__back button-menu"
                    >
                        BACK
                    </button>
                    <div ref={outletWrapperRef} className="cmp-screen-layout__outlet">
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