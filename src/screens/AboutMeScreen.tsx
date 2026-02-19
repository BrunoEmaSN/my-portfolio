import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import SectionTitle from "../components/SectionTitle"
import Info from "../components/Info"
import Glass from "../components/Glass"
import Personality from "../components/Personality"

const AboutMeScreen = () => {
  const size = {
    sm: 100,
    md: 200,
    lg: 300,
    xl: 400,
  }

  const infoRef = useRef<HTMLDivElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)
  const personalityRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const hasAnimatedRef = useRef(false)

  useGSAP(() => {
    if (!infoRef.current || !glassRef.current || !personalityRef.current || hasAnimatedRef.current) return

    hasAnimatedRef.current = true
    gsap.set(infoRef.current, { yPercent: 100, opacity: 0 })
    gsap.set(glassRef.current, { xPercent: 100, opacity: 0 })
    gsap.set(personalityRef.current, { xPercent: -100, opacity: 0 })

    const tl = gsap.timeline()
    tl.to(infoRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(glassRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .to(personalityRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
  }, { scope: containerRef, dependencies: [] })

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
