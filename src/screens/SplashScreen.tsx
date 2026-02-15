import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '../store';
import type { MobileProps } from '../types';
import MainTitle from '../components/MainTitle';

const SplashScreen = ({ isMobile }: MobileProps) => {
  const { closeSplash } = useAppStore();
  const splashRef = useRef<HTMLDivElement>(null);
  const revealBlockRef = useRef(null);

  const startTransition = () => {
    // Deslizar hacia la izquierda antes de iniciar
    gsap.to(splashRef.current, {
      xPercent: -100,
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => {
        closeSplash();
      },
    });
  };

  const handleClick = () => {
    startTransition();
  };

  useGSAP(() => {
    if (!splashRef.current || !revealBlockRef.current) return;

    // Reset position inicial
    gsap.set(splashRef.current, { xPercent: 0 });
    
    // Establecer dimensiones fijas desde el inicio para evitar layout shift
    const blockElement = revealBlockRef.current as HTMLElement;
    if (blockElement) {
      // Establecer dimensiones iniciales antes de cualquier animación
      gsap.set(blockElement, {
        width: '100%',
        height: isMobile ? '64px' : '512px', // h-16 = 64px, size-128 = 512px (32 * 16)
        xPercent: 100, // Iniciar fuera de la vista
        immediateRender: true,
      });
    }

    // Creamos la línea de tiempo
    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" }
    });

    tl.to(
      revealBlockRef.current,
      { xPercent: 0, duration: 0.4, ease: "power3.out" } // Se desliza a su posición
    )
      .to(
        revealBlockRef.current,
        { xPercent: -100, duration: 0.4, ease: "power3.in" }, // Se desliza 100% fuera de la vista a la derecha
        "+=0.2" // Empieza 0.2 segundos después de que el texto haya sido revelado
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevenir que el evento se propague si es Enter
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
      }
      startTransition();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, { scope: splashRef, dependencies: [closeSplash, isMobile] });

  return (
    <div
      onClick={handleClick}
      ref={splashRef}
      className="fixed inset-0 w-full h-screen flex items-center justify-start z-50 overflow-hidden"
    >
      <div className="overflow-hidden">
        <MainTitle isMobile={isMobile} text={isMobile ? 'TAP ANYWHERE' : 'PRESS ANY BUTTON'} />
        <div
          ref={revealBlockRef}
          className="absolute top-1/2 -translate-y-1/2 w-full bg-blue-700 z-10"
          style={{
            height: isMobile ? '64px' : '512px',
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
