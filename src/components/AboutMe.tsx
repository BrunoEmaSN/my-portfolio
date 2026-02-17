import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '../store';
import { SECTIONS } from '../../constants';
import SectionTitle from './SectionTitle';
import Info from './Info';
import Glass from './Glass';
import Personality from './Personality';

const AboutMe = () => {
  const size = {
    sm: 100,
    md: 200,
    lg: 300,
    xl: 400
  }

  const { showMenu, activeSection } = useAppStore();
  const infoRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const personalityRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const previousShowMenuRef = useRef(showMenu);
  const hasAnimatedRef = useRef(false);

  useGSAP(() => {
    if (!infoRef.current || !glassRef.current || !personalityRef.current) return;
    
    // Resetear flag cuando se vuelve al menú
    if (showMenu) {
      hasAnimatedRef.current = false;
      previousShowMenuRef.current = showMenu;
      return;
    }
    
    // Detectar si acabamos de pasar del menú a about-me
    const justEnteredFromMenu = previousShowMenuRef.current === true && showMenu === false && activeSection === SECTIONS.ABOUT_ME;
    previousShowMenuRef.current = showMenu;
    
    // Si no es la transición del menú a about-me, mantener posiciones finales
    if (!justEnteredFromMenu || hasAnimatedRef.current) {
      // Si ya se animó o no es la transición correcta, establecer posiciones finales
      gsap.set(infoRef.current, { yPercent: 0, opacity: 1 });
      gsap.set(glassRef.current, { xPercent: 0, opacity: 1 });
      gsap.set(personalityRef.current, { xPercent: 0, opacity: 1 });
      return;
    }

    // Marcar que ya se ejecutó la animación
    hasAnimatedRef.current = true;

    // Configurar posiciones iniciales
    gsap.set(infoRef.current, { yPercent: 100, opacity: 0 });
    gsap.set(glassRef.current, { xPercent: 100, opacity: 0 });
    gsap.set(personalityRef.current, { xPercent: -100, opacity: 0 });

    // Crear timeline para secuencia
    const tl = gsap.timeline();

    // 1. Info: abajo hacia arriba
    tl.to(infoRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    // 2. Glass: derecha a izquierda
    .to(glassRef.current, {
      xPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4") // Empieza 0.4s antes de que termine Info
    // 3. Personality: izquierda a derecha
    .to(personalityRef.current, {
      xPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4"); // Empieza 0.4s antes de que termine Glass

  }, { scope: containerRef, dependencies: [showMenu, activeSection] });

  return (
    <section
      ref={containerRef}
      id="about-me">
      <SectionTitle label="ABOUT ME" textSize={size} className="text-8xl xs:text-9xl" />
      <Personality ref={personalityRef} />
      <div className="h-full w-full flex justify-end items-end">
        <Glass ref={glassRef} />
      </div>
      <Info ref={infoRef} />
    </section>
  );
};

export default AboutMe;
