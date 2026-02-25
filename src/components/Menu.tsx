import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { navItems, ROUTES } from '../../constants';
import { useAppStore } from '../store';
import { backAudioEffect, menuAudioEffect, startAudioEffect } from '../helpers/audioContext';
import { useKeyboard } from '../hooks/useKeyboard';
import { useGamepad } from '../hooks/useGamepad';

const MENU_CONTEXT_ID = 'menu';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMenu = location.pathname === ROUTES.HOME;
  const { selectedIndex, setSelectedIndex, visibleWeekdayBanner, setVisibleWeekdayBanner } = useAppStore();

  const linkRefs = useRef<HTMLButtonElement[]>([]);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const menuContainerRef = useRef<HTMLUListElement>(null);
  const hasAnimatedRef = useRef(false);

  const movePrev = () => {
    menuAudioEffect();
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : navItems.length - 1;
    setSelectedIndex(newIndex);
    return true;
  };
  const moveNext = () => {
    menuAudioEffect();
    const newIndex = selectedIndex < navItems.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    return true;
  };
  const confirm = () => {
    if (selectedIndex === 4) {
      backAudioEffect();
    } else {
      startAudioEffect();
    }
    const selectedItem = navItems[selectedIndex];
    if(selectedIndex === 4) {
      setVisibleWeekdayBanner(false);
    }
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
  };

  useKeyboard(
    MENU_CONTEXT_ID,
    isMenu
      ? {
          w: movePrev,
          s: moveNext,
          Enter: (event) => {
            event.preventDefault();
            event.stopPropagation();
            return confirm();
          },
        }
      : {},
    { priority: 90 }
  );

  useGamepad(
    MENU_CONTEXT_ID,
    isMenu
      ? {
          'dpad-up': movePrev,
          'dpad-down': moveNext,
          a: confirm,
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

    if(!visibleWeekdayBanner) {
      setVisibleWeekdayBanner(true);
    }
  }, { scope: menuContainerRef });

  return (
    <nav className="cmp-menu">
      <ul ref={menuContainerRef}>
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
              className={clsx('cmp-menu__btn', selectedIndex === index && 'is-selected')}
            >
              <div className="cmp-menu__btn-label">
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
