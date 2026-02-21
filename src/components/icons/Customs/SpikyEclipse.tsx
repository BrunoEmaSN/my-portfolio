import { GiSpikyEclipse } from "react-icons/gi"

export const SpikyEclipse = () => {
  return (
    <div className="relative">
        <GiSpikyEclipse className="text-orange-400 scale-130 absolute left-2" size={24} />
        <GiSpikyEclipse className="text-orange-400 scale-90 absolute top-1 right-2.5" size={24} />
        <GiSpikyEclipse className="text-transparent scale-150" size={24} />
    </div>
  )
}