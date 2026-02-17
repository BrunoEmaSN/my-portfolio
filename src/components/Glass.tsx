import { forwardRef } from 'react';

const Glass = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className="w-1/2 aspect-ratio-square">
            <div ref={ref} className="relative overflow-hidden">
                <div className="bg-gray-700/70 absolute left-3"
                    style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 50%, 40% 100%, 0 100%, 0 60%)' }}/>
                <div className="relative bg-gray-400/90 absolute left-0"
                    style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 50%, 40% 100%, 0 100%, 0 60%)' }}>
                    <img src="/images/photo-2.png" alt="Glass" className="absolute w-full h-full object-cover -translate-x-20 sm:-translate-x-30 md:-translate-x-40 scale-110 sm:scale-115 md:scale-120"/>
                    <img src="/images/photo.png" alt="Glass" className="w-full h-full object-cover translate-x-5 sm:translate-x-8 md:translate-x-10 scale-110 sm:scale-115 md:scale-120" />
                </div>
            </div>
        </div>
    );
});

Glass.displayName = 'Glass';

export default Glass;