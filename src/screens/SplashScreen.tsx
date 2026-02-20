import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import type { MobileProps } from '../types';
import MainTitle from '../components/MainTitle';
import { ANIMATION_CONFIG, ROUTES } from '../../constants';
import { playP3RStartSound } from '../helpers/audioContext';

const SplashScreen = ({ isMobile }: MobileProps) => {
  const navigate = useNavigate();
  const splashRef = useRef<HTMLDivElement>(null);
  const revealBlockRef = useRef(null);

  const startTransition = () => {
    playP3RStartSound();
    gsap.to(splashRef.current, {
      xPercent: -100,
      duration: ANIMATION_CONFIG.duration,
      ease: 'power3.in',
      onComplete: () => {
        navigate(ROUTES.HOME);
      },
    });
  };

  const handleClick = () => {
    startTransition();
  };

  useGSAP(() => {
    if (!splashRef.current || !revealBlockRef.current) return;

    gsap.set(splashRef.current, { xPercent: 0 });
    const blockElement = revealBlockRef.current as HTMLElement;

    if (blockElement) {
      gsap.set(blockElement, {
        width: '100%',
        xPercent: 100,
        immediateRender: true,
      });
    }

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" }
    });

    tl.to(
      revealBlockRef.current,
      { xPercent: 0, duration: ANIMATION_CONFIG.fast, ease: "power3.out" }
    )
      .to(
        revealBlockRef.current,
        { xPercent: -100, duration: ANIMATION_CONFIG.fast, ease: "power3.in" },
        "+=0.2"
      );

    const handleKeyDown = (event: KeyboardEvent) => {
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
  }, { scope: splashRef, dependencies: [navigate, isMobile] });

  return (
    <div
      onClick={handleClick}
      ref={splashRef}
      className="w-full h-screen flex items-center justify-start z-50 overflow-hidden"
    >
      <div className="overflow-hidden">
        <MainTitle isMobile={isMobile} text={isMobile ? 'TAP ANYWHERE' : 'PRESS ANY BUTTON'} />
        <div
          ref={revealBlockRef}
          className="absolute top-1/2 -translate-y-1/2 w-full bg-blue-700 z-10 h-16 md:h-44 lg:h-128"
          style={{
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
