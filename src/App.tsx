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

  // GameScreen aparece cuando el splash screen se oculta
  useGSAP(() => {
    if (!gameScreenRef.current) return

    if (!showSplash) {
      // GameScreen visible inmediatamente (sin fade)
      gsap.set(gameScreenRef.current, {
        opacity: 1,
        visibility: 'visible',
      })
    }
  }, { scope: gameScreenRef, dependencies: [showSplash] })

  // GameScreen se oculta cuando el splash screen aparece
  useGSAP(() => {
    if (!gameScreenRef.current || !showSplash) return

    // GameScreen oculto cuando aparece el splash
    gsap.set(gameScreenRef.current, {
      opacity: 0,
      visibility: 'hidden',
    })
  }, { scope: gameScreenRef, dependencies: [showSplash] })

  return (
    <div className="bg-black">
      {showSplash && <SplashScreen isMobile={isMobile} />}
      <main
        ref={gameScreenRef}
        className="w-full h-screen overflow-hidden relative"
      >
        <GameScreen isMobile={isMobile} />
      </main>
    </div>
  )
}

export default App