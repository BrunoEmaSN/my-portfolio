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

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <div className="bg-black overflow-hidden relative">
      <div className={("absolute w-full h-full hidden md:flex justify-end items-start")}>
        <WeekdayBanner
          date="11/12"
          dayLabel="Thu"
          subtitle="After School"
          limit={20}
          className="max-w-lg"
        />
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
