import { GameIconSlot } from "."
import { GameIconHealthNormal } from "./GameIcons"

export const GameIconHealthNormalSlot = () => {
  return (
    <GameIconSlot size="sm" className="relative">
      <GameIconHealthNormal className="text-cyan-400 scale-130 absolute top-1 left-2" size={24} />
      <GameIconHealthNormal className="text-cyan-400 scale-90 absolute -top-1 left-8" size={24} />
      <GameIconHealthNormal className="text-transparent scale-150" size={24} />
    </GameIconSlot>
  )
}