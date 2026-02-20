import { useRef } from "react"
import { Zap, Sparkles, Crosshair, Shield, RotateCcw } from "lucide-react"
import SectionTitle from "../components/SectionTitle"
import SkillsList, { type SkillData } from "../components/SkillsList"
import StatsPanel, { type StatEntry } from "../components/StatsPanel"

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
  { id: "1", name: "Swift Strike", icon: <Zap className="text-orange-400" />,  highlighted: true },
  { id: "2", name: "Cruel Attack", icon: <Sparkles className="text-orange-400" /> },
  { id: "3", name: "Arrow Rain", icon: <Sparkles className="text-orange-400" />},
  { id: "4", name: "Diarama", icon: <Crosshair className="text-cyan-400" />,  highlighted: true },
  { id: "5", name: "Tarukaja", icon: <Shield className="text-blue-800" /> , highlighted: true},
  { id: "6", name: "Marakukaja", icon: <Shield className="text-blue-800" /> },
  { id: "7", name: "Dekunda", icon: <Shield className="text-blue-800" /> },
  { id: "8", name: "Fast Heal", icon: <RotateCcw className="text-yellow-400" />,  highlighted: true},
]

const AboutMeScreen = () => {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section ref={containerRef} id="about-me" className="relative w-full h-full gap-10">
      <SectionTitle label="ABOUT ME" textSize={size} className="text-8xl xs:text-9xl" />
      <div className="relative p-2 rounded-sm bg-slate-900 w-[min(40%,600px)]">
        <SkillsList
          skills={exampleSkills}
          nextSkillLevel={43}
          nextSkill={{
            id: "next",
            name: "Myriad Arrows",
            icon: <Sparkles className="text-orange-400" />,
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
      <div className="w-[min(40%,500px)]">
        <StatsPanel stats={exampleStats} className="min-w-[200px]" />
      </div>
    </section>
  )
}

export default AboutMeScreen
