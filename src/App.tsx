import { useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { ScrollTrigger, SplitText } from "gsap/all"
import { gsap } from "gsap"
import SplashScreen from "./screens/SplashScreen"
import AboutMeScreen from "./screens/AboutMeScreen"
import ExperiencesScreen from "./screens/ExperiencesScreen"
import TestimonialsScreen from "./screens/TestimonialsScreen"
import ContactScreen from "./screens/ContactScreen"
import { ROUTES } from "../constants"
import ScreenLayout from "./layouts/ScreenLayout"
import HomeScreen from "./screens/HomeScreen"
import WeekdayBanner from "./components/WeekdayBanner"
import { useAppStore, getInputDeviceFromGamepadId } from "./store"

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const setInputDevice = useAppStore((s) => s.setInputDevice)

  // Initial detection and on gamepad connect/disconnect
  useEffect(() => {
    const detectConnected = () => {
      if (typeof navigator === 'undefined' || !navigator.getGamepads) return
      const pads = navigator.getGamepads()
      for (let i = 0; i < pads.length; i++) {
        const pad = pads[i]
        if (pad?.connected) {
          setInputDevice(getInputDeviceFromGamepadId(pad.id))
          return
        }
      }
      setInputDevice('keyboard')
    }

    detectConnected()

    const onConnect = (e: GamepadEvent) => {
      if (e.gamepad.connected) {
        setInputDevice(getInputDeviceFromGamepadId(e.gamepad.id))
      }
    }
    const onDisconnect = () => {
      if (typeof navigator === 'undefined' || !navigator.getGamepads) return
      const pads = navigator.getGamepads()
      const anyConnected = Array.from(pads).some((p) => p?.connected)
      if (!anyConnected) setInputDevice('keyboard')
    }

    window.addEventListener('gamepadconnected', onConnect)
    window.addEventListener('gamepaddisconnected', onDisconnect)
    return () => {
      window.removeEventListener('gamepadconnected', onConnect)
      window.removeEventListener('gamepaddisconnected', onDisconnect)
    }
  }, [setInputDevice])

  return (
    <div className="bg-black overflow-hidden relative">
      <div className={("absolute w-full h-full hidden md:flex justify-end items-start")}>
        <WeekdayBanner className="max-w-md" />
      </div>
      <Routes>
        <Route path={ROUTES.SPLASH}>
          <Route index element={<SplashScreen isMobile={isMobile} />} />
          <Route path={ROUTES.HOME} element={<HomeScreen isMobile={isMobile} />} />
          <Route element={<ScreenLayout isMobile={isMobile} children={<Outlet />} />}>
            <Route path={ROUTES.ABOUT_ME} element={<AboutMeScreen />} />
            <Route path={ROUTES.EXPERIENCES} element={<ExperiencesScreen />} />
            <Route path={ROUTES.TESTIMONIALS} element={<TestimonialsScreen />} />
            <Route path={ROUTES.CONTACT} element={<ContactScreen />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
