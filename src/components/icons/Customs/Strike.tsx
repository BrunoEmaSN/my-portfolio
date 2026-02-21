import { GiPunchBlast } from "react-icons/gi"

export const Strike = () => {
  return (
    <div className="relative">
      <div className="absolute bg-orange-400 w-6 h-full rounded-full" />
      <GiPunchBlast className="absolute text-gray-950 rotate-y-180 scale-180 -skew-x-15" size={24} />
      <GiPunchBlast className="text-transparent rotate-y-180 scale-130 -skew-x-15" size={24} />
    </div>
  )
}