import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { navItems } from '../../constants';
import { useAppStore } from '../store';
import type { MobileProps } from '../types';

const Menu = ({ isMobile }: MobileProps) => {
  const { activeSection, setActiveSection, selectSection, toggleApp } = useAppStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // References so that the keyboard "knows" which link to click on
  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  // Synchronize selectedIndex with activeSection
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.id === activeSection);
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === 'w') {
        setSelectedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : navItems.length - 1;
          setActiveSection(navItems[newIndex].id);
          return newIndex;
        });
      } else if (key === 's') {
        setSelectedIndex((prev) => {
          const newIndex = prev < navItems.length - 1 ? prev + 1 : 0;
          setActiveSection(navItems[newIndex].id);
          return newIndex;
        });
      } else if (key === 'enter') {
        // Handle the selection
        const selectedItem = navItems[selectedIndex];
        if (selectedItem.id === 'exit') {
          toggleApp();
        } else {
          selectSection(selectedItem.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, setActiveSection, selectSection, toggleApp]);

  return (
    <>
      {/* FIXED NAVBAR */}
      <nav className="fixed w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-200">
        <ul className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                ref={(el: HTMLAnchorElement | null) => {
                  if (el) {
                    linkRefs.current[index] = el;
                  }
                }}
                onMouseEnter={() => setActiveSection(item.id)}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.id === 'exit') {
                    toggleApp();
                  } else {
                    selectSection(item.id);
                    setActiveSection(item.id)
                  }
                }}
                className={clsx(
                  'relative px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 block hover:bg-gray-900 min-w-[200px] text-center',
                  {
                    'bg-gray-900 text-white scale-105 shadow-lg': selectedIndex === index,
                    'text-gray-500': selectedIndex !== index,
                  }
                )}
              >
                {item.label}
                {selectedIndex === index && <span className="text-sm opacity-80 absolute top-3/5 right-5">
                  {item.subLabel}
                </span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* CONTROLS INDICATOR */}
      {!isMobile && (
        <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg text-xs font-mono opacity-50">
          CONTROLS: [W] [S] [ENTER]
        </div>
      )}
    </>
  );
};

export default Menu;