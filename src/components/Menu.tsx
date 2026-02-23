import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { navItems, ROUTES } from '../../constants';
import { useAppStore } from '../store';
import { backAudioEffect, menuAudioEffect, startAudioEffect } from '../helpers/audioContext';
import { useKeyboard } from '../hooks/useKeyboard';

const MENU_CONTEXT_ID = 'menu';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMenu = location.pathname === ROUTES.HOME;
  const { selectedIndex, setSelectedIndex } = useAppStore();

  const linkRefs = useRef<HTMLButtonElement[]>([]);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const menuContainerRef = useRef<HTMLUListElement>(null);
  const hasAnimatedRef = useRef(false);

  useKeyboard(
    MENU_CONTEXT_ID,
    isMenu
      ? {
          w: () => {
            menuAudioEffect();
            const newIndex = selectedIndex > 0 ? selectedIndex - 1 : navItems.length - 1;
            setSelectedIndex(newIndex);
            return true;
          },
          s: () => {
            menuAudioEffect();
            const newIndex = selectedIndex < navItems.length - 1 ? selectedIndex + 1 : 0;
            setSelectedIndex(newIndex);
            return true;
          },
          Enter: (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (selectedIndex === 4) {
              backAudioEffect();
            } else {
              startAudioEffect();
            }
            const selectedItem = navItems[selectedIndex];
            gsap.to(menuContainerRef.current, {
              xPercent: 100,
              duration: 0.3,
              ease: 'power3.in',
              onComplete: () => {
                navigate(selectedItem.path);
                if (selectedIndex === 4) setSelectedIndex(0);
              },
            });
            return true;
          },
        }
      : {},
    { priority: 90 }
  );

  useGSAP(() => {
    if (!menuContainerRef.current || hasAnimatedRef.current) return;

    gsap.set(menuItemsRef.current, {
      opacity: 0,
      y: 50,
    });

    gsap.to(menuItemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.3,
      onComplete: () => {
        hasAnimatedRef.current = true;
      },
    });
  }, { scope: menuContainerRef });

  return (
    <nav className="fixed w-full md:max-w-md z-50">
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
              onMouseEnter={() => {
                setSelectedIndex(index)
                menuAudioEffect()
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (selectedIndex === 4) {
                  backAudioEffect()
                } else {
                  startAudioEffect();
                }
                if (item.path) navigate(item.path);
              }}
              className={clsx(
                'cursor-pointer relative pr-5 sm:pr-10 md:pr-20 lg:pr-30 w-full font-black text-4xl h-[40px] transition-all duration-300 block hover:bg-blue-700 uppercase',
                {
                  'bg-blue-700 text-white scale-105': selectedIndex === index,
                  'text-gray-500': selectedIndex !== index,
                }
              )}
            >
              <div className="text-right">
                {item.label}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
