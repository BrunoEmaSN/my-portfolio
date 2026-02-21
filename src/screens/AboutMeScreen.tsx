import { useEffect, useRef } from "react"
import gsap from "gsap"
import SectionTitle from "../components/SectionTitle"
import SkillsList from "../components/SkillsList"
import StatsPanel from "../components/StatsPanel"
import PersonaStatusPanel from "../components/PersonaStatusPanel"
import { useGSAP } from "@gsap/react"
import { ANIMATION_CONFIG } from "../../constants"
import { menuAudioEffect } from "../helpers/audioContext"
import { AboutMeProvider, useAboutMe } from "../context/AboutMeContext"

const size = {
  sm: 100,
  md: 200,
  lg: 300,
  xl: 400,
}

const AboutMeSection = () => {
  const containerRef = useRef<HTMLElement>(null)
  const personaPanelRef = useRef<HTMLDivElement>(null)
  const bottomSectionRef = useRef<HTMLDivElement>(null)
  const { currentData, panelData, goLeft: ctxGoLeft, goRight: ctxGoRight } = useAboutMe()

  const goLeft = () => {
    menuAudioEffect()
    ctxGoLeft()
  }
  const goRight = () => {
    menuAudioEffect()
    ctxGoRight()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "a") {
        goLeft()
      } else if (e.key === "d") {
        goRight()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goLeft, goRight])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (personaPanelRef.current) {
        gsap.from(personaPanelRef.current, {
          y: -80,
          opacity: 0,
          duration: ANIMATION_CONFIG.fast,
          delay: ANIMATION_CONFIG.delay,
          ease: ANIMATION_CONFIG.ease,
        })
      }
      if (bottomSectionRef.current) {
        gsap.from(bottomSectionRef.current, {
          y: 80,
          opacity: 0,
          duration: ANIMATION_CONFIG.fast,
          ease: ANIMATION_CONFIG.ease,
          delay: ANIMATION_CONFIG.delay,
        })
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const skillsListRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.fromTo(skillsListRef.current,
      {
        x: -4,
      },
      {
        x: 0,
        duration: ANIMATION_CONFIG.fast / 2,
        delay: ANIMATION_CONFIG.delay,
        ease: ANIMATION_CONFIG.ease,
      }
    )
  }, { scope: skillsListRef, dependencies: [currentData.arcanaLabel] })

  return (
    <section ref={containerRef} id="about-me" className="relative w-full h-full overflow-y-auto overflow-x-hidden gap-10 justify-between">
      <SectionTitle label="ABOUT ME" textSize={size} className="text-8xl xs:text-9xl" />

      <div ref={personaPanelRef}>
        <PersonaStatusPanel
          characterName={panelData.characterName}
          arcanaLabel={currentData.arcanaLabel}
          arcana={currentData.arcana}
          persona={currentData.persona}
          level={currentData.level}
          nextExp={currentData.nextExp}
          onNavigateLeft={goLeft}
          onNavigateRight={goRight}
          skills={currentData.skillsBar}
        />
      </div>

      <div ref={bottomSectionRef} className="flex flex-col lg:flex-row justify-between w-full gap-10 md:p-20">
        <div ref={skillsListRef} className="relative p-2 rounded-sm bg-slate-900 w-full lg:max-w-2xl">
          <SkillsList
            skills={currentData.skills}
            nextSkillLevel={currentData.nextSkillLevel}
            nextSkill={currentData.nextSkill}
          />
          <span
            className="font-black text-3xl absolute bottom-0 right-0 text-cyan-400 pr-5"
            style={{
              WebkitTextStroke: "2px #1447E6",
            }}
          >
            ??????
          </span>
        </div>
        <div className="w-full lg:max-w-xl">
          <StatsPanel stats={currentData.stats} className="min-w-[200px]" />
        </div>
      </div>
    </section>
  )
}

const AboutMeScreen = () => {
  return (
    <AboutMeProvider>
      <AboutMeSection />
    </AboutMeProvider>
  )
}

export default AboutMeScreen
