import { Routes, Route, Outlet } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { ScrollTrigger, SplitText } from "gsap/all"
import { gsap } from "gsap"
import SplashScreen from "./screens/SplashScreen"
import GameScreen from "./screens/GameScreen"
import AboutMeScreen from "./screens/AboutMeScreen"
import ExperiencesScreen from "./screens/ExperiencesScreen"
import TestimonialsScreen from "./screens/TestimonialsScreen"
import ContactScreen from "./screens/ContactScreen"
import { ROUTES } from "../constants"

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <div className="bg-black">
      <Routes>
        <Route path={ROUTES.SPLASH} element={<Outlet />}>
          <Route index element={<SplashScreen isMobile={isMobile} />} />
          <Route element={<GameScreen isMobile={isMobile} />}>
            <Route path="menu" element={<></>} />
            <Route path="about-me" element={<AboutMeScreen />} />
            <Route path="experiences" element={<ExperiencesScreen />} />
            <Route path="testimonials" element={<TestimonialsScreen />} />
            <Route path="contact" element={<ContactScreen />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
