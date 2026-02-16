import clsx from 'clsx';

interface StepperButtonProps {
  direction: 'left' | 'right';
  label: string;
  onClick?: () => void;
  className?: string;
}

const StepperButton = ({ 
  direction, 
  label,
  className = '',
  onClick
}: StepperButtonProps) => {
  const isLeft = direction === 'left';

  return (
    <div className={clsx('flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5', className)}>
      {isLeft && (
        <div className="relative cursor-pointer hover:scale-110 transition-all duration-300" onClick={onClick}>
          <div 
            className="absolute p-1 sm:p-1.5 md:p-2 inset-0 bg-red-600 z-10 opacity-70" 
            style={{ clipPath: 'polygon(100% 0, 0 60%, 70% 100%)' }} 
          />
          {/* Flecha izquierda con borde */}
          <div className="relative translate-x-0.5 sm:translate-x-1">
            {/* Borde negro (más grande) */}
            <div 
              className="absolute w-4 h-5 sm:w-5 sm:h-6 md:w-6 md:h-8 bg-black"
              style={{ clipPath: 'polygon(100% 20%, 40% 60%, 75% 80%, 70% 100%, 0% 60%, 100% 0%)' }}
            />
            {/* Flecha blanca (más pequeña, encima del borde) */}
            <div 
              className="relative w-4 h-5 sm:w-5 sm:h-6 md:w-6 md:h-8 bg-white"
              style={{ 
                clipPath: 'polygon(100% 15%, 30% 60%, 75% 85%, 70% 100%, 0% 60%, 100% 0%)',
                transform: 'scale(0.85)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>
      )}

      {/* Botón con label */}
      <div 
        className="flex items-center justify-center"
      >
        <span className="text-white font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic [text-stroke:1px_black] sm:[text-stroke:1.5px_black] md:[text-stroke:2px_black] [-webkit-text-stroke:1px_black] sm:[-webkit-text-stroke:1.5px_black] md:[-webkit-text-stroke:2px_black]">
          {label}
        </span>
      </div>

      {!isLeft && (
        <div className="relative cursor-pointer hover:scale-110 transition-all duration-300" onClick={onClick}>
          <div 
            className="absolute p-1 sm:p-1.5 md:p-2 inset-0 bg-red-600 z-10 opacity-70" 
            style={{ clipPath: 'polygon(30% 0, 100% 40%, 0% 100%)' }} 
          />
          {/* Flecha derecha con borde */}
          <div className="relative -translate-x-0.5 sm:-translate-x-1">
            {/* Borde negro (más grande) */}
            <div 
              className="absolute w-4 h-5 sm:w-5 sm:h-6 md:w-6 md:h-8 bg-black"
              style={{ clipPath: 'polygon(25% 20%, 60% 60%, 0% 80%, 0% 100%, 100% 40%, 30% 0%)' }}
            />
            {/* Flecha blanca (más pequeña, encima del borde) */}
            <div 
              className="relative w-4 h-5 sm:w-5 sm:h-6 md:w-6 md:h-8 bg-white"
              style={{ 
                clipPath: 'polygon(25% 15%, 70% 40%, 0% 85%, 0% 100%, 100% 40%, 30% 0%)',
                transform: 'scale(0.85)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepperButton;
