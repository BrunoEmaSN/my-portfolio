import { useState } from 'react';
import clsx from 'clsx';

export interface ListMenuProps {
  title?: string;
  items: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

const ListMenu = ({
  title = 'LIST',
  items,
  selectedIndex: controlledIndex,
  onSelect,
  className = '',
}: ListMenuProps) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = controlledIndex !== undefined;
  const selectedIndex = isControlled ? controlledIndex : internalIndex;

  const handleSelect = (index: number) => {
    if (!isControlled) setInternalIndex(index);
    onSelect?.(index);
  };

  return (
    <div
      className={`relative w-full max-w-xs md:translate-x-20 md:-translate-y-10 ${className}`}
      role="listbox"
      aria-label={title}
    >
      <div className="relative z-10 p-4 space-y-1">
        {/* Título LIST con estilo 3D/retro */}
        <h2
          className="text-2xl font-black tracking-tight text-white uppercase mb-4"
          style={{
            textShadow:
              '2px 2px 0 rgba(0,0,0,0.4), 1px 1px 0 rgba(0,0,0,0.3), 0 0 8px rgba(255,255,255,0.15)',
          }}
        >
          {title}
        </h2>

        {/* Elementos de la lista */}
        <ul className="space-y-1 w-full" role="list">
          {items.map((label, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li key={`${label}-${index}`}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(index)}
                  className={clsx(
                    'text-center px-4 py-3 rounded transition-all duration-150 w-full',
                    isSelected
                      ? 'bg-white shadow-list-menu shadow-red-500 text-black font-bold text-lg'
                      : 'bg-[#01003E]/50 text-cyan-400 font-bold text-base hover:bg-[#01003E] hover:text-white'
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ListMenu;
