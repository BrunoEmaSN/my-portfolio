import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ANIMATION_CONFIG } from '../../constants';
export interface SocialDescriptionProps {
  name: string;
  description: string;
}

const SocialDescription = ({ name, description}: SocialDescriptionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current, { x: 120, opacity: 0 }, { x: 0, opacity: 1, duration: ANIMATION_CONFIG.fast, delay: 0.5, ease: 'power2.inOut' });
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current, { x: 15 }, { x: 0, duration: ANIMATION_CONFIG.fast, ease: 'power2.inOut' });
  }, { scope: containerRef, dependencies: [name] });

  return (
    <div ref={containerRef} className="cmp-social-desc">
      <div className="cmp-social-desc__triangle" style={{ clipPath: 'polygon(100% 46%, 0 100%, 100% 100%)' }} />
      <div className="cmp-social-desc__inner">
        <h2 className="cmp-social-desc__title">{name}</h2>
      </div>
      <p className="cmp-social-desc__text">{description}</p>
    </div>
  );
};

export default SocialDescription;
