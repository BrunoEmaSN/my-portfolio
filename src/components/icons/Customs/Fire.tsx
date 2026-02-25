import { GiFlamedLeaf } from "react-icons/gi"

export const Fire = () => {
    return (
        <div className="relative w-full h-full">
            <GiFlamedLeaf className="text-red-400 -skew-x-10 absolute top-0 left-0 rotate-50" size={24} />
        </div>
    )
}