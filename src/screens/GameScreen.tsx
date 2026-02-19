import { useRef, useLayoutEffect, useMemo, useEffect } from "react"
import { useLocation, Outlet, useNavigate } from "react-router-dom"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Menu from "../components/Menu"
import type { Position, AnimationState, MobileProps } from "../types"
import { STATES, ANIMATION_CONFIG, POSITIONS, ROUTES } from "../../constants"
import clsx from "clsx"

const CONTENT_ROUTES = [ROUTES.ABOUT_ME, ROUTES.EXPERIENCES, ROUTES.TESTIMONIALS, ROUTES.CONTACT] as const

const GameScreen = ({ isMobile }: MobileProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isMenu = location.pathname === ROUTES.MENU
  const menuRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const revealBlockRef = useRef<HTMLDivElement>(null)
  const outletWrapperRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  const currentState = useMemo(() => STATES[isMenu ? 'true' : 'false'], [isMenu])
  const previousState = useMemo(() => STATES[isMenu ? 'false' : 'true'], [isMenu])

  const setPositions = (layoutPos: Position, immediate = true) => {
    if (!menuRef.current || !layoutRef.current) return
    gsap.set(menuRef.current, { ...POSITIONS.center, immediateRender: immediate })
    gsap.set(layoutRef.current, { ...layoutPos, immediateRender: immediate })
  }

  const animateFromTo = (from: AnimationState, to: AnimationState, immediate = false) => {
    if (!menuRef.current || !layoutRef.current) return
    gsap.set(menuRef.current, { ...POSITIONS.center, immediateRender: immediate })
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

  useLayoutEffect(() => {
    if (isInitialized.current) return
    setPositions(currentState.layout, true)
    isInitialized.current = true
  }, [currentState])

  useGSAP(() => {
    if (!isInitialized.current) return
    animateFromTo(previousState, currentState, false)
  }, { scope: containerRef, dependencies: [isMenu, currentState, previousState] })

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

  useGSAP(() => {
    if (!outletWrapperRef.current || isMenu) return
    if (!CONTENT_ROUTES.some((r) => location.pathname === r)) return
    gsap.set(outletWrapperRef.current, { opacity: 0 })
    gsap.to(outletWrapperRef.current, {
      opacity: 1,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
    })
  }, { scope: containerRef, dependencies: [location.pathname, isMenu] })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isMenu) {
        navigate(ROUTES.MENU)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenu, navigate])

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
              "absolute bottom-84 right-0 bg-blue-700 z-50 h-10 w-full"
            )}
          />
          <Menu isMobile={isMobile} />
        </div>

        <div
          ref={layoutRef}
          className="absolute w-full h-full pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={clsx("relative w-full h-screen", isMenu ? "pointer-events-none" : "pointer-events-auto")}>
            <button
              id="button-esc"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                navigate(ROUTES.MENU)
              }}
              className="text-right button-menu absolute top-5 left-5 text-white/50 hover:text-white z-50"
            >
              Esc
            </button>
            <div ref={outletWrapperRef} className="w-full h-full">
              <Outlet />
            </div>
            {!isMobile && !isMenu && (
              <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg text-xs font-mono opacity-50">
                CONTROLS: [ESC] return to menu · Exit → Splash
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default GameScreen
