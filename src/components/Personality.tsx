import { forwardRef } from 'react';

const Personality = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="absolute top-1/3 left-0 w-full md:w-1/2 lg:w-1/2 h-full z-10 flex flex-col">
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold skew-x-[-20deg] border-b-2 border-red-600 pb-2 w-fit pl-20 pr-5 text-black md:text-white lg:text-white">
        PERSONALITY
      </h3>
      <div className='gap-4 p-4'>  
        <div className='relative h-20 flex items-center'>
          <div className="skew-x-[-30deg] absolute top-0 left-0 w-20 h-20 bg-red-600"
          style={{ clipPath: 'polygon(0 0, 0 0, 45% 50%, 0 100%, 0 100%, 50% 56%, 100% 100%, 100% 100%, 55% 51%, 100% 0, 100% 0, 50% 47%)' }}/>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl pl-20 text-black md:text-white lg:text-white">
            Pulls from active knowledge of current technology landscape to promote best practices in web design and development.
          </p>
        </div>
        <div className='relative h-20 flex items-center'>
          <div className="skew-x-[-20deg] absolute top-0 left-0 w-20 h-20 bg-red-600"
          style={{ clipPath: 'polygon(0 0, 0 0, 45% 50%, 0 100%, 0 100%, 50% 56%, 100% 100%, 100% 100%, 55% 51%, 100% 0, 100% 0, 50% 47%)' }}/>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl pl-20 text-black md:text-white lg:text-white">
            Weakness boost
          </p>
        </div>
      </div>
    </div>
  );
});

Personality.displayName = 'Personality';

export default Personality;
