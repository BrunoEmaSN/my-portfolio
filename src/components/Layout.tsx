import { useEffect } from 'react';
import { useAppStore } from '../store';
import Skills from './Skills';
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
        onClick={backToMenu}
        className="fixed top-5 left-5 z-50 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/30 shadow-lg hover:scale-105"
      >
        Esc
      </button>

      {/* Sections */}
      {activeSection === SECTIONS.SKILLS && <Skills />}
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
