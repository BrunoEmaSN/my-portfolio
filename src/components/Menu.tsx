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
      <div className="w-full h-full flex items-end justify-end pb-40">
        {/* FIXED NAVBAR */}
        <nav className="fixed max-w-md z-50">
          <ul className="flex flex-col gap-1">
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
                    'relative pr-50 font-black text-4xl transition-all duration-300 block hover:bg-blue-700 text-right uppercase',
                    {
                      'bg-blue-700 text-white scale-105 shadow-lg': selectedIndex === index,
                      'text-gray-500': selectedIndex !== index,
                    }
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </div>
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