import Glass from "./Glass";

interface CardProps {
    title: string;
    description: string;
    footer: string;
    className?: string;
}

const Card = ({ title, description, footer, className = '' }: CardProps) => {
    return (
        <div className="flex relative w-full h-full justify-end items-end pb-20">
            <div className="absolute top-0 left-0 w-full h-full z-10">
                <Glass />
            </div>
            <div
                className={`
                    relative
                    w-full
                    -skew-x-10
                    -rotate-10
                    bg-white
                    border-t-4
                    border-red-600/50
                    duration-300
                    scale-x-110
                    pt-10
                    pb-10
                    ${className}
                `}
            >
                <div className="grid grid-cols-3">
                    <div />
                    <div className="col-span-2">
                        <h3 className="text-xl font-bold text-white/50 mt-5 mb-3 uppercase tracking-tight bg-black pt-10 pb-2 text-center italic">
                            {title}
                        </h3>
                        <div className="flex justify-center items-center">
                            <p className="text-black leading-relaxed p-5">
                                {description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="text-black/15 text-9xl font-black italic flex justify-center items-center">
                            <span>{footer}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
