import { GameIconSlot } from "."
import { GameIconCycle } from "./GameIcons"

export const GameIconCycleSlot = () => {
  return (
    <GameIconSlot size="sm">
      <GameIconCycle className="text-yellow-400 scale-x-130 rotate-y-180 skew-x-20" size={24} />
    </GameIconSlot>
  )
}