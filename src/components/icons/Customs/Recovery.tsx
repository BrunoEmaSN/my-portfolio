import { GiHealthNormal } from "react-icons/gi"

export const Recovery = () => {
  return (
    <div className="relative">
      <GiHealthNormal className="text-cyan-400 scale-130 absolute top-1 right-2" size={24} />
      <GiHealthNormal className="text-cyan-400 scale-90 absolute bottom-1 left-3" size={24} />
      <GiHealthNormal className="text-transparent scale-150" size={24} />
    </div>
  )
}