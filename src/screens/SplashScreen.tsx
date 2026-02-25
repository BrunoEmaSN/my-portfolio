import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import type { MobileProps } from '../types';
import MainTitle from '../components/MainTitle';
import { ANIMATION_CONFIG, ROUTES } from '../../constants';
import { startAudioEffect } from '../helpers/audioContext';
import { useKeyboard } from '../hooks/useKeyboard';
import { useGamepad } from '../hooks/useGamepad';

const SplashScreen = ({ isMobile }: MobileProps) => {
  const navigate = useNavigate();
  const splashRef = useRef<HTMLDivElement>(null);
  const revealBlockRef = useRef(null);

  const startTransition = () => {
    startAudioEffect();
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

  useKeyboard(
    'splash',
    {
      Enter: (event) => {
        event.preventDefault();
        event.stopPropagation();
        startTransition();
        return true;
      },
    },
    { priority: 85 }
  );

  const anyButton = () => {
    startTransition();
    return true;
  };
  useGamepad(
    'splash',
    {
      a: anyButton,
      b: anyButton,
      x: anyButton,
      y: anyButton,
      lb: anyButton,
      rb: anyButton,
      lt: anyButton,
      rt: anyButton,
      back: anyButton,
      start: anyButton,
      l3: anyButton,
      r3: anyButton,
      'dpad-up': anyButton,
      'dpad-down': anyButton,
      'dpad-left': anyButton,
      'dpad-right': anyButton,
      'stick-right-up': anyButton,
      'stick-right-down': anyButton,
      'stick-right-left': anyButton,
      'stick-right-right': anyButton,
    },
    { priority: 85 }
  );

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
  }, { scope: splashRef, dependencies: [navigate, isMobile] });

  return (
    <div onClick={handleClick} ref={splashRef} className="cmp-splash">
      <div className="cmp-splash__inner">
        <MainTitle isMobile={isMobile} text={isMobile ? 'TAP ANYWHERE' : 'PRESS ANY BUTTON'} />
        <div ref={revealBlockRef} className="cmp-splash__reveal" style={{ willChange: 'transform' }} />
      </div>
    </div>
  );
};

export default SplashScreen;
