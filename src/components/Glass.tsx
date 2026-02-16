const Glass = () => {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="bg-gray-700/70 w-1/2 h-full absolute left-3"
                style={{ clipPath: 'polygon(45% 0, 100% 0, 97% 15%, 100% 54%, 78% 74%, 55% 100%, 0 100%, 0 60%, 23% 10%)' }}/>
            <div className="relative bg-gray-400/90 w-1/2 h-full absolute left-0"
                style={{ clipPath: 'polygon(45% 0, 100% 0, 97% 15%, 100% 54%, 78% 74%, 55% 100%, 0 100%, 0 60%, 23% 10%)' }}>
                <img src="/images/photo-2.png" alt="Glass" className="absolute w-full h-full object-cover -translate-x-40 scale-120"/>
                <img src="/images/photo.png" alt="Glass" className="w-full h-full object-cover translate-x-10 scale-120" />
                
            </div>
        </div>
    );
};

export default Glass;