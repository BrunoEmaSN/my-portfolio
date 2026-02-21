import { GameIconSlot } from "."
import { GameIconSpikyEclipse } from "./GameIcons"

export const GameIconSpikyEclipseSlot = () => {
  return (
    <GameIconSlot size="sm" className="relative">
      <GameIconSpikyEclipse className="text-orange-400 scale-130 absolute top-1 left-7" size={24} />
      <GameIconSpikyEclipse className="text-orange-400 scale-90 absolute top-2 left-2" size={24} />
      <GameIconSpikyEclipse className="text-transparent scale-150" size={24} />
    </GameIconSlot>
  )
}