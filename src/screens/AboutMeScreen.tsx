import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SectionTitle from "../components/SectionTitle"
import Info from "../components/Info"
import Glass from "../components/Glass"
import Personality from "../components/Personality"
import { ANIMATION_CONFIG } from "../../constants"

const size = {
  sm: 100,
  md: 200,
  lg: 300,
  xl: 400,
}

const AboutMeScreen = () => {

  const infoRef = useRef<HTMLDivElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)
  const personalityRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      infoRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: ANIMATION_CONFIG.fast,
        ease: ANIMATION_CONFIG.ease,
      }
    )
    gsap.fromTo(
      personalityRef.current,
      { x: -120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: ANIMATION_CONFIG.fast,
        ease: ANIMATION_CONFIG.ease,
      }
    )
    gsap.fromTo(
      glassRef.current,
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: ANIMATION_CONFIG.fast,
        ease: ANIMATION_CONFIG.ease,
      }
    )
  }, [])

  return (
    <section ref={containerRef} id="about-me">
      <SectionTitle label="ABOUT ME" textSize={size} className="text-8xl xs:text-9xl" />
      <Personality ref={personalityRef} />
      <div className="h-full w-full flex justify-end items-end">
        <Glass ref={glassRef} />
      </div>
      <Info ref={infoRef} />
    </section>
  )
}

export default AboutMeScreen
