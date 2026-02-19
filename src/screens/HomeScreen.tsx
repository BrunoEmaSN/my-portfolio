import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Menu from "../components/Menu"
import type { MobileProps } from "../types"
import clsx from "clsx"
import { useAppStore } from "../store"

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
      duration: 0.5,
      ease: "power3.out",
    })
  }, { scope: containerRef, dependencies: [] })

  return (
    <main className="w-full h-screen overflow-hidden relative">
      <div
        ref={containerRef}
        className="absolute w-full h-full"
        style={{
          perspective: "1500px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          ref={menuRef}
          className="absolute w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={revealBlockRef}
            className={clsx(
              "absolute right-0 bg-blue-700 z-50 h-10 w-full",
              `bottom-${84 - selectedIndex}`
            )}
          />
          <Menu isMobile={isMobile} />
        </div>
      </div>
    </main>
  )
}

export default HomeScreen
