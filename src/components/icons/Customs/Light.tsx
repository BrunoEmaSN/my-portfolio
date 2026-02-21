import { GiEclipseFlare } from "react-icons/gi"

export const Light = () => {
    return (
        <div className="relative w-full h-full">
            <GiEclipseFlare className="absolute scale-110 text-gray-400 right-1 -skew-x-10 rotate-10" size={24} />
            <GiEclipseFlare className="absolute scale-70 text-gray-400 bottom-1 left-2 -skew-x-10 rotate-10" size={24} />
        </div>
    )
}