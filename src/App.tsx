import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useAppStore } from "./store"
import SplashScreen from "./screens/SplashScreen"
import GameScreen from "./screens/GameScreen"
import { useMediaQuery } from "react-responsive"

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { showSplash } = useAppStore((state) => state)
  const gameScreenRef = useRef<HTMLDivElement>(null)

  // GameScreen FadeIn when the application starts (from splash screen)
  useGSAP(() => {
    if (!gameScreenRef.current) return

    if (!showSplash) {
      // GameScreen fade-in after splash screen fade-out
      gsap.fromTo(
        gameScreenRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 }
      )
    }
  }, { scope: gameScreenRef, dependencies: [showSplash] })

  // GameScreen fadeout when the splash screen appears
  useGSAP(() => {
    if (!gameScreenRef.current || !showSplash) return

    // GameScreen fade-out before showing the splash
    gsap.to(gameScreenRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    })
  }, { scope: gameScreenRef, dependencies: [showSplash] })

  return (
    <>
      {showSplash && <SplashScreen isMobile={isMobile} />}
      <main
        ref={gameScreenRef}
        className="w-full h-screen overflow-hidden relative"
        style={{ opacity: showSplash ? 0 : 1, visibility: showSplash ? 'hidden' : 'visible' }}
      >
        <GameScreen isMobile={isMobile} />
      </main>
    </>
  )
}

export default App