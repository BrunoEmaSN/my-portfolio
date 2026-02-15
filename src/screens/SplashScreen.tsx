import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '../store';
import type { MobileProps } from '../types';
import MainTitle from '../components/MainTitle';
import clsx from 'clsx';

const SplashScreen = ({ isMobile }: MobileProps) => {
  const { toggleApp } = useAppStore();
  const splashRef = useRef<HTMLDivElement>(null);
  const revealBlockRef = useRef(null);

  const handleInteraction = () => {
    // Deslizar hacia la izquierda antes de iniciar
    gsap.to(splashRef.current, {
      xPercent: -100,
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => {
        toggleApp();
      },
    });
  };

  useGSAP(() => {
    if (!splashRef.current) return;

    // Reset position inicial
    gsap.set(splashRef.current, { xPercent: 0 });

    // Creamos la línea de tiempo
    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" }
    });

    tl.fromTo(
      revealBlockRef.current,
      { xPercent: 100 }, // Empieza 100% fuera de la vista a la izquierda
      { xPercent: 0, duration: 0.4, ease: "power3.out" } // Se desliza a su posición
    )
      .to(
        revealBlockRef.current,
        { xPercent: -100, duration: 0.4, ease: "power3.in" }, // Se desliza 100% fuera de la vista a la derecha
        "+=0.2" // Empieza 0.2 segundos después de que el texto haya sido revelado
      );

    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('keydown', handleInteraction);
    };
  }, { scope: splashRef, dependencies: [toggleApp] });

  return (
    <div
      onClick={handleInteraction}
      ref={splashRef}
      className="fixed inset-0 w-full h-screen flex items-center justify-start z-50 overflow-hidden bg-black"
    >
      <div className="overflow-hidden">
        <MainTitle isMobile={isMobile} text={isMobile ? 'TAP ANYWHERE' : 'PRESS ANY BUTTON'} />
        {/* Bloque Azul de Revelado */}
        <div
          ref={revealBlockRef}
          className={clsx("absolute top-1/2 -translate-y-1/2 size-128 w-full bg-blue-700 z-10", isMobile && 'h-16 md:h-44 w-full ')}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
