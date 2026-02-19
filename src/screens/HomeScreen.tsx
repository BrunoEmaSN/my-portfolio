import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Menu from "../components/Menu"
import type { MobileProps } from "../types"
import clsx from "clsx"
import { useAppStore } from "../store"
import { ANIMATION_CONFIG } from "../../constants"

const HomeScreen = ({ isMobile }: MobileProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const revealBlockRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)
  const {selectedIndex} = useAppStore();

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
      ease: "power3.out",
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
        <div className="absolute bottom-5 right-5 bg-black text-white p-4 rounded-lg text-xs font-mono opacity-50">
          CONTROLS: [W] [S] [ENTER]
        </div>
      )}
    </main>
  )
}

export default HomeScreen
