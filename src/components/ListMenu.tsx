import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ANIMATION_CONFIG } from '../../constants';
import { menuAudioEffect } from '../helpers/audioContext';
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
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevSelectedRef = useRef(selectedIndex);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: ANIMATION_CONFIG.fast, delay: 0.5, ease: 'power2.inOut' });
  }, { scope: containerRef, dependencies: [] });

  const handleSelect = (index: number) => {
    if (!isControlled) setInternalIndex(index);
    onSelect?.(index);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (items.length === 0) return;
    if (e.key === 'w' || e.key === 'W') {
      menuAudioEffect();
      e.preventDefault();
      const prev = (selectedIndex - 1 + items.length) % items.length;
      handleSelect(prev);
    } else if (e.key === 's' || e.key === 'S') {
      menuAudioEffect();
      e.preventDefault();
      const next = (selectedIndex + 1) % items.length;
      handleSelect(next);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /** GSAP transition on selected item change: scale down previous, scale up + bounce on next. */
  useGSAP(() => {
    if (prevSelectedRef.current === selectedIndex) return;
    const prev = prevSelectedRef.current;
    prevSelectedRef.current = selectedIndex;

    const prevEl = buttonRefs.current[prev];
    const nextEl = buttonRefs.current[selectedIndex];
    if (prevEl) {
      gsap.to(prevEl, { scale: 1, duration: 0.2, ease: 'power2.out' });
    }
    if (nextEl) {
      gsap.fromTo(nextEl, { scale: 1 }, { scale: 1.02, duration: ANIMATION_CONFIG.fast, ease: 'back.out(1.4)' });
      gsap.to(nextEl, { scale: 1, duration: ANIMATION_CONFIG.fast, delay: 0.1, ease: 'power2.out' });
    }
  }, { scope: buttonRefs, dependencies: [selectedIndex] });

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="listbox"
      aria-label={`${title}. Usa W y S para cambiar.`}
      className={clsx("relative w-full max-w-xs outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-inset rounded", className)}
    >
      <div className="relative z-10 p-4 flex flex-col h-full max-h-[min(40vh,28rem)]">
        <h2
          className="text-2xl font-black tracking-tight text-white uppercase mb-4 shrink-0"
          style={{
            textShadow:
              '2px 2px 0 rgb(0 0 0 / 0.4), 1px 1px 0 rgb(0 0 0 / 0.3), 0 0 8px rgb(255 255 255 / 0.15)',
          }}
        >
          {title}
        </h2>

        <ul
          className="space-y-1 w-full overflow-y-auto overflow-x-hidden overscroll-contain pr-1 min-h-0"
          role="list"
        >
          {items.map((label, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li key={`${label}-${index}`}>
                <button
                  ref={(el) => { buttonRefs.current[index] = el }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(index)}
                  className={clsx(
                    'text-center px-4 py-3 rounded transition-all duration-150 w-full',
                    isSelected
                      ? 'bg-white shadow-list-menu shadow-red-500 text-black font-bold text-lg'
                      : 'bg-blue-950/50 text-cyan-400 font-bold text-base hover:bg-blue-950 hover:text-white'
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
