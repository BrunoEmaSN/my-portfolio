import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
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
import { getLevelAndNextLevel } from "../helpers/getLevelAndNextLevel"

export interface AboutMeStat {
  label: string
  value: number
  max: number
}

export interface AboutMeSkill {
  id: string
  name: string
  icon: ReactNode
  highlighted?: boolean
}

export interface AboutMeSkillBarItem {
  icon: ReactNode
  showResist?: boolean
  highlighted?: boolean
  showAlert?: boolean
}

export interface AboutMePersonaItem {
  arcanaLabel: string
  arcana: string
  persona: string
  level: number
  nextExp: number
  nextSkillLevel: number
  stats: AboutMeStat[]
  skills: AboutMeSkill[]
  skillsBar: AboutMeSkillBarItem[]
  nextSkill: AboutMeSkill
}

export interface AboutMePanelData {
  characterName: string
}

interface AboutMeContextValue {
  data: AboutMePersonaItem[]
  currentIndex: number
  currentData: AboutMePersonaItem
  panelData: AboutMePanelData
  goLeft: () => void
  goRight: () => void
}

const AboutMeContext = createContext<AboutMeContextValue | null>(null)

const START_DATE = new Date("2021-11-20")

function buildAboutMeData(): AboutMePersonaItem[] {
  const { level, nextLevel } = getLevelAndNextLevel(START_DATE)

  return [
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
        { icon: <Light />, highlighted: true },
        { icon: <Dark /> },
      ],
      nextSkill: {
        id: "next",
        name: "Web 3D Development",
        icon: <StrikeSlot />,
      },
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
      },
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
        { icon: <Fire />, highlighted: true, showAlert: true },
        { icon: <Ice /> },
        { icon: <Electricity />, highlighted: true, showAlert: true },
        { icon: <Wind /> },
        { icon: <Light /> },
        { icon: <Dark />, showResist: true },
      ],
      nextSkill: {
        id: "next",
        name: "Pipeline Crush",
        icon: <StrikeSlot />,
      },
    },
  ]
}

const panelData: AboutMePanelData = {
  characterName: "Bruno",
}

export function AboutMeProvider({ children }: { children: ReactNode }) {
  const data = useMemo(() => buildAboutMeData(), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentData = data[currentIndex]

  const goLeft = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
  }, [data.length])

  const goRight = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % data.length)
  }, [data.length])

  const value = useMemo<AboutMeContextValue>(
    () => ({
      data,
      currentIndex,
      currentData,
      panelData,
      goLeft,
      goRight,
    }),
    [data, currentIndex, currentData, goLeft, goRight]
  )

  return (
    <AboutMeContext.Provider value={value}>{children}</AboutMeContext.Provider>
  )
}

export function useAboutMe(): AboutMeContextValue {
  const ctx = useContext(AboutMeContext)
  if (!ctx) {
    throw new Error("useAboutMe must be used within AboutMeProvider")
  }
  return ctx
}
