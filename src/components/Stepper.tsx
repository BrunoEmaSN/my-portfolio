import { useState, useEffect, forwardRef } from 'react';
import clsx from 'clsx';
import StepperButton from './StepperButton';
import { menuAudioEffect } from '../helpers/audioContext';

export interface StepperItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface StepperProps {
  items: StepperItem[];
  onItemChange?: (index: number) => void;
  initialIndex?: number;
  className?: string;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(({ 
  items, 
  onItemChange, 
  initialIndex = 0,
  className = ''
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Navegación con teclas A y D
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === 'a') {
        menuAudioEffect()
        setCurrentIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : items.length - 1;
          return newIndex;
        });
      } else if (key === 'd') {
        menuAudioEffect()
        setCurrentIndex((prev) => {
          const newIndex = prev < items.length - 1 ? prev + 1 : 0;
          return newIndex;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length]);

  // Notificar cambios
  useEffect(() => {
    if (onItemChange) {
      onItemChange(currentIndex);
    }
  }, [currentIndex, onItemChange]);

  return (
    <div
      ref={ref}
      className={clsx(
        'overflow-hidden bg-transparent',
        className
      )}
    >
      {/* Contenido principal */}
      <div className="relative z-10 h-full flex items-center justify-between px-2 sm:px-3 md:px-4 gap-2 sm:gap-3 md:gap-5">
        {/* Botón izquierdo con flecha */}
        <StepperButton
          direction="left"
          label="A"
          onClick={() => setCurrentIndex((prev) => prev > 0 ? prev - 1 : items.length - 1)}
        />

        {/* Centro: Nombre y puntos de navegación */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 pl-2 sm:pl-3 md:pl-4 pr-2 sm:pr-3 md:pr-4">
          {/* Puntos de navegación */}
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center">
            {items.map((_, index) => (
              <div
                key={index}
                className={clsx(
                  index === currentIndex
                    ? 'border-2 border-white rounded-full'
                    : 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white rounded-full opacity-70'
                )}
              >
                {index === currentIndex && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 m-0.5 bg-white rounded-full" />}
              </div>
            ))}
          </div>
        </div>

        {/* Botón derecho con flecha */}
        <StepperButton
          direction="right"
          label="D"
          onClick={() => setCurrentIndex((prev) => prev < items.length - 1 ? prev + 1 : 0)}
        />
      </div>
    </div>
  );
});

Stepper.displayName = 'Stepper';

export default Stepper;
