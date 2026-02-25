import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Menu from "../components/Menu"
import ControlsHint from "../components/ControlsHint"
import type { MobileProps } from "../types"
import clsx from "clsx"
import { useAppStore, type InputDevice } from "../store"
import { ANIMATION_CONFIG } from "../../constants"
import Footer from "../components/Footer"

/** Main menu controls per device: navigate and confirm. */
const HOME_CONTROLS: Record<InputDevice, string[]> = {
  keyboard: ["W", "S", "ENTER"],
  playstation: ["D-Pad ↑↓", "Cross"],
  xbox: ["D-Pad ↑↓", "A"],
}

const HomeScreen = ({ isMobile }: MobileProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const revealBlockRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)
  const { selectedIndex, inputDevice } = useAppStore();

  useLayoutEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true
  }, [])

  useGSAP(() => {
    if (!revealBlockRef.current) return
    gsap.fromTo(revealBlockRef.current, {
      xPercent: -100,
    }, {
      xPercent: 100,
      duration: ANIMATION_CONFIG.fast,
      ease: ANIMATION_CONFIG.ease,
    })
    gsap.fromTo(footerRef.current, {
      y: 100,
    }, {
      y: 0,
      duration: ANIMATION_CONFIG.fast,
      ease: ANIMATION_CONFIG.ease,
    })
  }, { scope: containerRef, dependencies: [] })

  return (
    <main
      ref={containerRef}
      className="w-full h-screen overflow-hidden relative"
      style={{
        perspective: "1500px",
        perspectiveOrigin: "center center",
      }}
    >
      <div
        ref={menuRef}
        className="relative w-full h-full flex items-end justify-end pb-40"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={revealBlockRef}
          className={clsx(
            "absolute right-0 bg-blue-700 z-50 h-10 w-full",
          )}
          style={{
            bottom: 332 - (selectedIndex * 40)
          }}
        />
        <Menu />
      </div>
      {!isMobile && (
        <ControlsHint items={HOME_CONTROLS[inputDevice]} inputDevice={inputDevice} />
      )}
      <div className="relative" ref={footerRef}>
        <Footer />
      </div>
    </main>
  )
}

export default HomeScreen
