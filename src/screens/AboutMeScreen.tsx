import { useRef } from "react"
import SectionTitle from "../components/SectionTitle"
import SkillsList, { type SkillData } from "../components/SkillsList"
import StatsPanel, { type StatEntry } from "../components/StatsPanel"
import PersonaStatusPanel from "../components/PersonaStatusPanel"
import {
  CloverSpikedSlot,
  Cycle,
  CycleSlot,
  HealthNormalSlot,
  Punch,
  PunchSlot,
  SpikyEclipse,
  SpikyEclipseSlot,
} from "../components/icons"

const size = {
  sm: 100,
  md: 200,
  lg: 300,
  xl: 400,
}

const exampleStats: StatEntry[] = [
  { label: "St", value: 39, max: 100 },
  { label: "Ma", value: 21, max: 100 },
  { label: "En", value: 33, max: 100 },
  { label: "Ag", value: 25, max: 100 },
  { label: "Lu", value: 20, max: 100 },
]

const exampleSkills: SkillData[] = [
  { id: "1", name: "Swift Strike", icon: <PunchSlot />, highlighted: true },
  { id: "2", name: "Tarukaja", icon: <CloverSpikedSlot /> },
  { id: "3", name: "Cruel Attack", icon: <SpikyEclipseSlot /> },
  { id: "4", name: "Marakukaja", icon: <CloverSpikedSlot />, highlighted: true },
  { id: "5", name: "Arrow Rain", icon: <SpikyEclipseSlot />, highlighted: true },
  { id: "6", name: "Dekunda", icon: <CloverSpikedSlot /> },
  { id: "7", name: "Diarama", icon: <HealthNormalSlot /> },
  { id: "8", name: "Fast Heal", icon: <CycleSlot />, highlighted: true },
]

const exampleSkillsBar = [
  {
    color: "text-orange-400",
    icon: <Punch />
  },
  {
    color: "text-orange-400",
    icon: <SpikyEclipse />,
    highlighted: true,
    showAlert: true,
  },
  {
    color: "text-yellow-400",
    icon: <Cycle />,
  },
]

const AboutMeScreen = () => {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section ref={containerRef} id="about-me" className="relative w-full h-full gap-10 justify-between">
      <SectionTitle label="ABOUT ME" textSize={size} className="text-8xl xs:text-9xl" />

      <PersonaStatusPanel
        characterName="Aigis"
        arcana="Chariot"
        persona="Palladion"
        level={40}
        nextExp={1832}
        onNavigateLeft={() => { }}
        onNavigateRight={() => { }}
        skills={exampleSkillsBar}
      />

      <div className="flex flex-col lg:flex-row justify-between w-full gap-10 md:p-20">
        <div className="relative p-2 rounded-sm bg-slate-900 w-full lg:w-[min(40%,500px)]">
          <SkillsList
            skills={exampleSkills}
            nextSkillLevel={43}
            nextSkill={{
              id: "next",
              name: "Myriad Arrows",
              icon: <SpikyEclipseSlot />,
            }}
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
        <div className="w-full lg:w-[min(40%,500px)]">
          <StatsPanel stats={exampleStats} className="min-w-[200px]" />
        </div>
      </div>

    </section>
  )
}

export default AboutMeScreen
