import { GameIconSlot } from "."
import { GameIconPunch } from "./GameIcons"

export const GameIconPunchSlot = () => {
  return (
    <GameIconSlot size="sm">
      <GameIconPunch className="text-orange-400 rotate-y-180 scale-130 -skew-x-15" size={24} />
    </GameIconSlot>
  )
}