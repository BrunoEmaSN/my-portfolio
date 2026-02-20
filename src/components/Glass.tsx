import { forwardRef } from 'react';

const Glass = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="w-full md:w-1/2 lg:w-1/2 h-full right-0 relative">
            <div className="relative overflow-hidden h-full">
                <div className="relative bg-gray-400/90 left-0 h-full"
                    style={{ clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 100%)' }}>
                    <img src="/images/photo.png" alt="Glass" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
});

Glass.displayName = 'Glass';

export default Glass;