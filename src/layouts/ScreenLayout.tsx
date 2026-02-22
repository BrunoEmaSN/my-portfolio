import clsx from "clsx"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ANIMATION_CONFIG, ROUTES } from "../../constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { backAudioEffect } from "../helpers/audioContext"

const ScreenLayout = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => {
    const navigate = useNavigate()
    const layoutRef = useRef<HTMLDivElement>(null)
    const outletWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                backAudioEffect();
                gsap.fromTo(layoutRef.current, { opacity: 1, scale: 1 }, {
                    opacity: 0,
                    scale: 1.3,
                    duration: ANIMATION_CONFIG.fast,
                    ease: ANIMATION_CONFIG.ease,
                    onComplete: () => {
                        navigate(ROUTES.HOME)
                    }
                })
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

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
                        <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg text-xs font-mono opacity-50">
                            CONTROLS: [ESC] return to menu
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ScreenLayout