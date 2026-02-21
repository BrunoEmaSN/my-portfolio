import { GiConcentricCrescents } from "react-icons/gi"

export const Dark = () => {
    return (
        <div className="relative w-full h-full">
            <GiConcentricCrescents className="absolute text-purple-500 scale-120 bottom-0.5 letf-3 skew-x-10 -rotate-60" size={40} />
            <GiConcentricCrescents className="text-transparent letf-3 skew-x-10 -rotate-60" size={24} />
        </div>
    )
}