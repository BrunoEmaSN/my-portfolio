import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { navItems, SECTIONS } from '../../constants';
import { useAppStore } from '../store';
import type { MobileProps } from '../types';

const Menu = ({ isMobile }: MobileProps) => {
  const { activeSection, setActiveSection, selectSection, toggleApp, showSplash, showMenu } = useAppStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // References so that the keyboard "knows" which link to click on
  const linkRefs = useRef<HTMLButtonElement[]>([]);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const menuContainerRef = useRef<HTMLUListElement>(null);
  const hasAnimatedRef = useRef(false);

  // Synchronize selectedIndex with activeSection
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.id === activeSection);
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [activeSection, showMenu]);

  useEffect(() => {
    // Solo escuchar teclas cuando el menú está visible y el splash no está visible
    if (!showMenu || showSplash) return;

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
        event.preventDefault();
        event.stopPropagation();
        // Handle the selection
        const selectedItem = navItems[selectedIndex];
        if (selectedItem.id === SECTIONS.EXIT) {
          toggleApp();
        } else {
          selectSection(selectedItem.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, setActiveSection, selectSection, toggleApp, showMenu, showSplash]);

  // Animación stagger de los items del menu cuando aparece
  useGSAP(() => {
    if (!menuContainerRef.current || showSplash || hasAnimatedRef.current) return;

    // Inicializar items fuera de la vista (abajo)
    gsap.set(menuItemsRef.current, {
      opacity: 0,
      y: 50,
    });

    // Animar items con stagger
    gsap.to(menuItemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.3, // Esperar a que el bloque azul aparezca
      onComplete: () => {
        hasAnimatedRef.current = true;
      },
    });
  }, { scope: menuContainerRef, dependencies: [showSplash] });

  return (
    <>
      <div className="w-full h-full flex items-end justify-end pb-40">
        {/* FIXED NAVBAR */}
        <nav className="fixed max-w-md z-50">
          <ul ref={menuContainerRef} className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <li
                key={item.id}
                ref={(el: HTMLLIElement | null) => {
                  if (el) {
                    menuItemsRef.current[index] = el;
                  }
                }}
              >
                <button
                  id="button-menu"
                  ref={(el: HTMLButtonElement | null) => {
                    if (el) {
                      linkRefs.current[index] = el;
                    }
                  }}
                  onMouseEnter={() => setActiveSection(item.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.id === SECTIONS.EXIT) {
                      toggleApp();
                    } else {
                      selectSection(item.id);
                      setActiveSection(item.id)
                    }
                  }}
                  className={clsx(
                    'cursor-pointer relative pr-5 sm:pr-10 md:pr-20 lg:pr-30 xl:pr-50 w-full font-black text-4xl transition-all duration-300 block hover:bg-blue-700 uppercase',
                    {
                      'bg-blue-700 text-white scale-105 shadow-lg': selectedIndex === index,
                      'text-gray-500': selectedIndex !== index,
                    }
                  )}
                >
                  {item.label}
                </button>
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