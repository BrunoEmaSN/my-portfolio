import { useRef, useLayoutEffect, useMemo } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useAppStore } from "../store"
import Menu from "../components/Menu"
import Layout from "../components/Layout"
import type { Position, AnimationState, MobileProps } from "../types"
import { STATES, ANIMATION_CONFIG, POSITIONS } from "../../constants"
import clsx from "clsx"

const GameScreen = ({ isMobile }: MobileProps) => {
  const { showMenu, showSplash } = useAppStore((state) => state)
  const menuRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const revealBlockRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  // Memoize the current state to avoid recalculations
  const currentState = useMemo(() => STATES[showMenu ? 'true' : 'false'], [showMenu])
  const previousState = useMemo(() => STATES[showMenu ? 'false' : 'true'], [showMenu])

  // Helper to set positions
  const setPositions = (layoutPos: Position, immediate = true) => {
    if (!menuRef.current || !layoutRef.current) return
    
    // Menú siempre estático en posición center
    gsap.set(menuRef.current, { ...POSITIONS.center, immediateRender: immediate })
    gsap.set(layoutRef.current, { ...layoutPos, immediateRender: immediate })
  }

  // Helper to animate from/to positions
  const animateFromTo = (from: AnimationState, to: AnimationState, immediate = false) => {
    if (!menuRef.current || !layoutRef.current) return

    // Menú siempre estático - no se anima
    gsap.set(menuRef.current, { ...POSITIONS.center, immediateRender: immediate })
    
    // Solo animar el layout (secciones) con zoom y fadeIn
    gsap.fromTo(
      layoutRef.current,
      from.layout,
      {
        ...to.layout,
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        immediateRender: immediate,
      }
    )
  }

  // Set initial positions only on the first render
  useLayoutEffect(() => {
    if (isInitialized.current) return
    
    setPositions(currentState.layout, true)
    isInitialized.current = true
  }, [currentState])

  // Animation of movement between menu and sections
  useGSAP(() => {
    if (!isInitialized.current) return

    animateFromTo(previousState, currentState, false)
  }, { scope: containerRef, dependencies: [showMenu, currentState, previousState] })

  // Animación del bloque azul de revelado cuando aparece GameScreen
  useGSAP(() => {
    if (!revealBlockRef.current || showSplash) return

    // Inicializar bloque fuera de la vista (izquierda)
    gsap.fromTo(revealBlockRef.current, {
      xPercent: -100,
    }, {
      xPercent: 100,
      duration: 0.5,
      ease: "power3.out",
    })
  }, { scope: containerRef, dependencies: [showSplash] })

  return (
    <div
      ref={containerRef}
      className="absolute w-full h-full"
      style={{
        perspective: "1500px",
        perspectiveOrigin: "center center",
      }}
    >
      {/* Menu - initially in front */}
      <div
        ref={menuRef}
        className="absolute w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Bloque Azul de Revelado - centrado abajo en posición del menú */}
        <div
          ref={revealBlockRef}
          className={clsx(
            "absolute bottom-84 right-0 bg-blue-700 z-10 h-10 w-full"
          )}
        />
        <Menu isMobile={isMobile} />
      </div>

      {/* Sections - initially to the right */}
      <div
        ref={layoutRef}
        className="absolute w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <Layout isMobile={isMobile} />
      </div>
    </div>
  )
}

export default GameScreen
