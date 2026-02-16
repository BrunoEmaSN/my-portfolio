import { forwardRef } from 'react';

interface CardProps {
    title: string;
    description: string;
    footer: string;
    className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ title, description, footer, className = '' }, ref) => {
    return (
        <div className="flex relative w-full h-full justify-end items-end pb-20">
            <div
                ref={ref}
                className={`
                    relative
                    w-full
                    -skew-x-6 sm:-skew-x-8 md:-skew-x-10
                    rotate-0 sm:-rotate-10 md:-rotate-10 lg:-rotate-10 xl:-rotate-10
                    bg-white
                    border-t-2 sm:border-t-3 md:border-t-4
                    border-red-600/50
                    duration-300
                    scale-x-120
                    ${className}
                `}
            >
                <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
                    <div />
                    <div className="col-span-2">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white/50 mt-2 sm:mt-3 md:mt-4 lg:mt-5 mb-2 sm:mb-3 uppercase tracking-tight bg-black pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-1 sm:pb-2 text-center italic">
                            {title}
                        </h3>
                        <div className="flex justify-center items-center">
                            <p className="text-black leading-relaxed p-2 sm:p-3 md:p-4 lg:p-5 text-xs sm:text-sm md:text-base max-w-lg mx-auto">
                                {description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="text-black/15 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-black italic flex justify-center items-center">
                            <span>{footer}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
