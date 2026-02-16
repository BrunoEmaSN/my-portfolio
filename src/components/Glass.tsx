const Glass = () => {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="bg-gray-700/70 w-5/6 sm:w-1/3 md:w-1/2 h-full absolute left-3"
                style={{ clipPath: 'polygon(45% 0, 100% 0, 97% 15%, 100% 54%, 78% 74%, 55% 100%, 0 100%, 0 60%, 23% 10%)' }}/>
            <div className="relative bg-gray-400/90 w-5/6 sm:w-1/3 md:w-1/2 h-full absolute left-0"
                style={{ clipPath: 'polygon(45% 0, 100% 0, 97% 15%, 100% 54%, 78% 74%, 55% 100%, 0 100%, 0 60%, 23% 10%)' }}>
                <img src="/images/photo-2.png" alt="Glass" className="absolute w-full h-full object-cover -translate-x-20 sm:-translate-x-30 md:-translate-x-40 scale-110 sm:scale-115 md:scale-120"/>
                <img src="/images/photo.png" alt="Glass" className="w-full h-full object-cover translate-x-5 sm:translate-x-8 md:translate-x-10 scale-110 sm:scale-115 md:scale-120" />
                
            </div>
        </div>
    );
};

export default Glass;