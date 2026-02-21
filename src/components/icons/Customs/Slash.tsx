import { GiTearing } from "react-icons/gi"

export const Slash = () => {
    return (
        <div className="relative w-full h-full">
            <GiTearing className="absolute text-orange-400 overflow-hidden skew-x-10 rotate-y-180" size={24} />
        </div>
    )
}