import { useState, useRef } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ANIMATION_CONFIG } from '../../constants';
import { menuAudioEffect } from '../helpers/audioContext';
import { useKeyboard } from '../hooks/useKeyboard';
import { useGamepad } from '../hooks/useGamepad';

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

  const movePrev = () => {
    menuAudioEffect();
    const prev = (selectedIndex - 1 + items.length) % items.length;
    handleSelect(prev);
    return true;
  };
  const moveNext = () => {
    menuAudioEffect();
    const next = (selectedIndex + 1) % items.length;
    handleSelect(next);
    return true;
  };

  useKeyboard(
    'list-menu',
    items.length === 0 ? {} : { w: movePrev, s: moveNext },
    { priority: 70 }
  );

  useGamepad(
    'list-menu',
    items.length === 0
      ? {}
      : {
          'dpad-up': movePrev,
          'dpad-down': moveNext,
        },
    { priority: 70 }
  );

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
      aria-label={`${title}. W/S to change.`}
      className={clsx("cmp-list-menu", className)}
    >
      <div className="cmp-list-menu__inner">
        <h2 className="cmp-list-menu__title" style={{ textShadow: '2px 2px 0 rgb(0 0 0 / 0.4), 1px 1px 0 rgb(0 0 0 / 0.3), 0 0 8px rgb(255 255 255 / 0.15)' }}>
          {title}
        </h2>

        <ul role="list">
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
                  className={clsx('cmp-list-menu__item', isSelected && 'is-selected')}
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
