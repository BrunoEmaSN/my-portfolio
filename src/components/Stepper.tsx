import { useState, useEffect } from 'react';
import clsx from 'clsx';
import StepperButton from './StepperButton';

export interface StepperItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface StepperProps {
  items: StepperItem[];
  onItemChange?: (item: StepperItem, index: number) => void;
  initialIndex?: number;
  className?: string;
}

const Stepper = ({ 
  items, 
  onItemChange, 
  initialIndex = 0,
  className = ''
}: StepperProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentItem = items[currentIndex];

  // Navegación con teclas A y D
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === 'a') {
        setCurrentIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : items.length - 1;
          return newIndex;
        });
      } else if (key === 'd') {
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
      onItemChange(currentItem, currentIndex);
    }
  }, [currentIndex, currentItem, onItemChange]);

  return (
    <div
      className={clsx(
        'absolute overflow-hidden bg-transparent -rotate-10 z-20',
        className
      )}
    >
      {/* Contenido principal */}
      <div className="relative z-10 h-full flex items-center justify-between px-4 gap-5">
        {/* Botón izquierdo con flecha */}
        <StepperButton
          direction="left"
          label="A"
          onClick={() => setCurrentIndex((prev) => prev > 0 ? prev - 1 : items.length - 1)}
        />

        {/* Centro: Nombre y puntos de navegación */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 pl-4 pr-4">
          {/* Nombre del personaje */}
          <div
            className="text-white font-black text-xl uppercase tracking-tight"
          >
            {currentItem?.name || ''}
          </div>

          {/* Puntos de navegación */}
          <div className="flex gap-2 sm:gap-3 items-center">
            {items.map((_, index) => (
              <div
                key={index}
                className={clsx(
                  index === currentIndex
                    ? 'border-2 border-white rounded-full'
                    : 'w-3 h-3 bg-white rounded-full opacity-70'
                )}
              >
                {index === currentIndex && <div className="w-2.5 h-2.5 m-0.5 bg-white rounded-full" />}
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
};

export default Stepper;
