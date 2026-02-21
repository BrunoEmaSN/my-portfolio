import { useRef } from "react"
import SectionTitle from "../components/SectionTitle"
import SkillsList, { type SkillData } from "../components/SkillsList"
import StatsPanel, { type StatEntry } from "../components/StatsPanel"
import PersonaStatusPanel from "../components/PersonaStatusPanel"
import { GameIconPunchSlot } from "../components/icons/GameIconPunchSlot"
import { GameIconCloverSpikedSlot } from "../components/icons/GameIconCloverSpikedSlot"
import { GameIconSpikyEclipseSlot } from "../components/icons/GameIconSpikyEclipseSlot"
import { GameIconHealthNormalSlot } from "../components/icons/GameIconHealthNormalSlot"
import { GameIconCycleSlot } from "../components/icons/GameIconCycleSlot"
import { GameIconCycle, GameIconPunch, GameIconSpikyEclipse } from "../components/icons/GameIcons"

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
  { id: "1", name: "Swift Strike", icon: <GameIconPunchSlot />,  highlighted: true },
  { id: "2", name: "Tarukaja", icon: <GameIconCloverSpikedSlot />},
  { id: "3", name: "Cruel Attack", icon: <GameIconSpikyEclipseSlot /> },
  { id: "4", name: "Marakukaja", icon: <GameIconCloverSpikedSlot />, highlighted: true },
  { id: "5", name: "Arrow Rain", icon: <GameIconSpikyEclipseSlot />, highlighted: true},
  { id: "6", name: "Dekunda", icon:<GameIconCloverSpikedSlot /> },
  { id: "7", name: "Diarama", icon: <GameIconHealthNormalSlot /> },
  { id: "8", name: "Fast Heal", icon: <GameIconCycleSlot />,  highlighted: true},
]

const exampleSkillsBar = [
  {
    color: "text-orange-400",
    icon: <GameIconPunch />
  },
  {
    color: "text-orange-400",
    icon: <GameIconSpikyEclipse />,
    highlighted: true,
    showAlert: true,
  },
  {
    color: "text-yellow-400",
    icon: <GameIconCycle />,
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
        onNavigateLeft={() => {}}
        onNavigateRight={() => {}}
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
              icon: <GameIconSpikyEclipseSlot />,
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
