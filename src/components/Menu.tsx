import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { navItems, ROUTES } from '../../constants';
import type { MobileProps } from '../types';
import { useAppStore } from '../store';

const Menu = ({ isMobile }: MobileProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMenu = location.pathname === ROUTES.HOME;
  const {selectedIndex, setSelectedIndex} = useAppStore();

  const linkRefs = useRef<HTMLButtonElement[]>([]);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const menuContainerRef = useRef<HTMLUListElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isMenu) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === 'w') {
        const newIndex = selectedIndex > 0 ? selectedIndex - 1 : navItems.length - 1;
        setSelectedIndex(newIndex);
      }
      if (key === 's') {
        const newIndex = selectedIndex < navItems.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(newIndex);
      }
      if (key === 'enter') {
        event.preventDefault();
        event.stopPropagation();
        const selectedItem = navItems[selectedIndex];
        navigate(selectedItem.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, isMenu, navigate]);

  useGSAP(() => {
    if (!menuContainerRef.current || hasAnimatedRef.current) return;

    gsap.set(menuItemsRef.current, {
      opacity: 0,
      y: 50,
    });

    gsap.to(menuItemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.3,
      onComplete: () => {
        hasAnimatedRef.current = true;
      },
    });
  }, { scope: menuContainerRef });

  return (
    <>
      <div className={clsx("w-full h-full flex items-end justify-end pb-40")}>
        <nav className="fixed max-w-md z-50 bg-red-500">
          <ul ref={menuContainerRef} className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <li
                key={item.id}
                ref={(el: HTMLLIElement | null) => {
                  if (el) menuItemsRef.current[index] = el;
                }}
              >
                <button
                  id="button-menu"
                  ref={(el: HTMLButtonElement | null) => {
                    if (el) linkRefs.current[index] = el;
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.path) navigate(item.path);
                  }}
                  className={clsx(
                    'cursor-pointer relative pr-5 sm:pr-10 md:pr-20 lg:pr-30 xl:pr-50 w-full font-black text-4xl h-[40px] transition-all duration-300 block hover:bg-blue-700 uppercase',
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
      {!isMobile && isMenu && (
        <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg text-xs font-mono opacity-50">
          CONTROLS: [W] [S] [ENTER]
        </div>
      )}
    </>
  );
};

export default Menu;
