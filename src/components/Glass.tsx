import { forwardRef } from 'react';

const Glass = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className="w-full lg:w-1/3 h-full right-0 relative">
            <div ref={ref} className="relative overflow-hidden h-full">
                <div className="relative bg-gray-400/90 left-0 h-full"
                    style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 100%)' }}>
                    <img src="/images/photo.png" alt="Glass" className="w-full h-full object-cover -translate-y-10" />
                </div>
            </div>
        </div>
    );
});

Glass.displayName = 'Glass';

export default Glass;