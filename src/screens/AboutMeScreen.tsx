import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import SectionTitle from "../components/SectionTitle"
import SkillsList from "../components/SkillsList"
import StatsPanel from "../components/StatsPanel"
import PersonaStatusPanel from "../components/PersonaStatusPanel"
import {
  Dark,
  Electricity,
  EnhanceSlot,
  Fire,
  Ice,
  Light,
  PassiveSlot,
  Pierce,
  PierceSlot,
  RecoverySlot,
  Slash,
  Strike,
  StrikeSlot,
  Wind,
} from "../components/icons"
import { useGSAP } from "@gsap/react"
import { ANIMATION_CONFIG } from "../../constants"
import { menuAudioEffect } from "../helpers/audioContext"
import { getLevelAndNextLevel } from "../helpers/getLevelAndNextLevel"

const size = {
  sm: 100,
  md: 200,
  lg: 300,
  xl: 400,
}

const { level, nextLevel } = getLevelAndNextLevel(new Date("2021-11-20"))

const panelData = {
  characterName: "Bruno",
}

const data = [
  {
    arcanaLabel: "Software",
    arcana: "Engineer",
    persona: "Advanced",
    level,
    nextExp: nextLevel,
    nextSkillLevel: level + 1,
    stats: [
      { label: "Lo", value: 80, max: 100 },
      { label: "Pe", value: 70, max: 100 },
      { label: "St", value: 70, max: 100 },
      { label: "Ag", value: 50, max: 100 },
      { label: "To", value: 90, max: 100 },
    ],
    skills: [
      { id: "1", name: "Hard Reboot", icon: <StrikeSlot />, highlighted: true },
      { id: "2", name: "Hotfix Deployment", icon: <EnhanceSlot /> },
      { id: "3", name: "Deep Debugging", icon: <PierceSlot /> },
      { id: "4", name: "Git Rollback", icon: <EnhanceSlot />, highlighted: true },
      { id: "5", name: "Code Review", icon: <PierceSlot />, highlighted: true },
      { id: "6", name: "Legacy Refactoring", icon: <EnhanceSlot /> },
      { id: "7", name: "Performance Optimization", icon: <RecoverySlot /> },
      { id: "8", name: "Security Audit", icon: <PassiveSlot />, highlighted: true },
    ],
    skillsBar: [
      { icon: <Slash />, showResist: true },
      { icon: <Strike /> },
      { icon: <Pierce />, showResist: true },
      { icon: <Fire /> },
      { icon: <Ice /> },
      { icon: <Electricity />, highlighted: true, showAlert: true },
      { icon: <Wind /> },
      { icon: <Light />, highlighted: true, },
      { icon: <Dark /> },
    ],
    nextSkill: {
      id: "next",
      name: "Web 3D Development",
      icon: <StrikeSlot />,
    }
  },
  {
    arcanaLabel: "IA",
    arcana: "Engineer",
    persona: "Beginner",
    level: level - 3,
    nextExp: nextLevel,
    nextSkillLevel: level - 2,
    stats: [
      { label: "Lo", value: 80, max: 100 },
      { label: "Pe", value: 50, max: 100 },
      { label: "St", value: 50, max: 100 },
      { label: "Ag", value: 25, max: 100 },
      { label: "To", value: 20, max: 100 },
    ],
    skills: [
      { id: "1", name: "Gradient Descent", icon: <StrikeSlot />, highlighted: true },
      { id: "2", name: "Hyperparameter Tuning", icon: <EnhanceSlot /> },
      { id: "3", name: "Data Augmentation", icon: <PierceSlot /> },
      { id: "4", name: "Transfer Learning", icon: <EnhanceSlot />, highlighted: true },
      { id: "5", name: "Model Interpretability", icon: <PierceSlot />, highlighted: true },
      { id: "6", name: "Predictive Scaling", icon: <EnhanceSlot /> },
      { id: "7", name: "Error Analysis", icon: <RecoverySlot /> },
      { id: "8", name: "Model Selection", icon: <PassiveSlot />, highlighted: true },
    ],
    skillsBar: [
      { icon: <Slash /> },
      { icon: <Strike /> },
      { icon: <Pierce />, showResist: true },
      { icon: <Fire /> },
      { icon: <Ice /> },
      { icon: <Electricity />, highlighted: true, showAlert: true },
      { icon: <Wind /> },
      { icon: <Light /> },
      { icon: <Dark /> },
    ],
    nextSkill: {
      id: "next",
      name: "AI Automation",
      icon: <EnhanceSlot />,
    }
  },
  {
    arcanaLabel: "Data",
    arcana: "Engineer",
    persona: "Beginner",
    level: level - 3,
    nextExp: nextLevel,
    nextSkillLevel: level - 2,
    stats: [
      { label: "Lo", value: 80, max: 100 },
      { label: "Pe", value: 40, max: 100 },
      { label: "St", value: 40, max: 100 },
      { label: "Ag", value: 30, max: 100 },
      { label: "To", value: 20, max: 100 },
    ],
    skills: [
      { id: "1", name: "Data Warehouse", icon: <StrikeSlot />, highlighted: true },
      { id: "2", name: "High Availability Shield", icon: <EnhanceSlot /> },
      { id: "3", name: "ETL Drill", icon: <PierceSlot /> },
      { id: "4", name: "Load Balancing", icon: <EnhanceSlot />, highlighted: true },
      { id: "5", name: "SQL Injection", icon: <PierceSlot />, highlighted: true },
      { id: "6", name: "Data Integrity Check", icon: <EnhanceSlot /> },
      { id: "7", name: "Data Optimization", icon: <RecoverySlot /> },
      { id: "8", name: "Data Quality Assurance", icon: <PassiveSlot />, highlighted: true },
    ],
    skillsBar: [
      { icon: <Slash /> },
      { icon: <Strike /> },
      { icon: <Pierce />, showResist: true },
      { icon: <Fire />, highlighted: true, showAlert: true  },
      { icon: <Ice /> },
      { icon: <Electricity />, highlighted: true, showAlert: true },
      { icon: <Wind /> },
      { icon: <Light /> },
      { icon: <Dark /> , showResist: true},
    ],
    nextSkill: {
      id: "next",
      name: "Pipeline Crush",
      icon: <StrikeSlot />,
    }
  }
]

const AboutMeScreen = () => {
  const containerRef = useRef<HTMLElement>(null)
  const personaPanelRef = useRef<HTMLDivElement>(null)
  const bottomSectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentData = data[currentIndex]

  const goLeft = () => {
    menuAudioEffect()
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
  }
  const goRight = () => {
    menuAudioEffect()
    setCurrentIndex((prev) => (prev + 1) % data.length)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "a") {
        menuAudioEffect()
        setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
      } else if (e.key === "d") {
        menuAudioEffect()
        setCurrentIndex((prev) => (prev + 1) % data.length)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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

export default AboutMeScreen
