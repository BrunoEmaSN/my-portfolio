import { useEffect } from 'react';
import { useAppStore } from '../store';
import AboutMe from './AboutMe';
import Experiences from './Experiences';
import Testimonials from './Testimonials';
import Contact from './Contact';
import type { MobileProps } from '../types';
import { SECTIONS } from '../../constants';

const Layout = ({ isMobile }: MobileProps) => {
  const { activeSection, backToMenu, showMenu } = useAppStore();

  // Handle the ESC key to return to the menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !showMenu) {
        backToMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [backToMenu, showMenu]);

  return (
    <div className="relative w-full h-screen">
      {/* Floating Esc button to the left */}
      <button
        id="button-esc"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          backToMenu();
          console.log('backToMenu');
        }}
        className="text-right button-menu absolute top-5 text-white/50 hover:text-white z-50 pointer-events-auto"
      >
        Esc
      </button>

      {/* Sections */}
      {activeSection === SECTIONS.ABOUT_ME && <AboutMe />}
      {activeSection === SECTIONS.EXPERIENCES && <Experiences />}
      {activeSection === SECTIONS.TESTIMONIALS && <Testimonials />}
      {activeSection === SECTIONS.CONTACT && <Contact />}
      {/* CONTROLS INDICATOR */}
      {!isMobile && (
        <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg text-xs font-mono opacity-50">
          CONTROLS: [ESC] to return
        </div>
      )}
    </div>
  );
};

export default Layout;
