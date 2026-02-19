import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '../store';

export interface SocialLinkProps {
  /** Texto del banner superior (ej. "SEES") */
  bannerText?: string;
  /** Nombre de la arcana (ej. "Fool") */
  arcanaName: string;
  /** Rango actual de 1 a 10 */
  rank: number;
  /** Descripción en la sección inferior */
  description: string;
  /** Etiqueta diagonal (por defecto "ARCANA") */
  arcanaLabel?: string;
}

const MAX_RANK = 10;

const StarFilled = () => (
  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const StarEmpty = () => (
  <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SocialLink = ({
  bannerText = 'SEES',
  arcanaName,
  rank,
  description,
  arcanaLabel = 'ARCANA',
}: SocialLinkProps) => {
  const clampedRank = Math.min(MAX_RANK, Math.max(0, rank));
  const stars = Array.from({ length: MAX_RANK }, (_, i) => i < clampedRank);
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLSpanElement>(null);
  const arcanaLabelRef = useRef<HTMLSpanElement>(null);
  const arcanaNameRef = useRef<HTMLHeadingElement>(null);
  const rankRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const rankValueRef = useRef<HTMLSpanElement>(null);
  const { showMenu } = useAppStore();

  useGSAP(() => {
    if (showMenu || !containerRef.current) return;
    gsap.fromTo(containerRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.inOut' });
  }, { scope: containerRef, dependencies: [showMenu] });

  useGSAP(() => {
    if (showMenu || !bannerTextRef.current) return;
    gsap.fromTo(bannerTextRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
  }, { scope: bannerTextRef, dependencies: [bannerText] });

  useGSAP(() => {
    if (showMenu || !rankRef.current) return;
    gsap.fromTo(rankRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
  }, { scope: rankRef, dependencies: [rank] });

  useGSAP(() => {
    if (showMenu || !descriptionRef.current) return;
    gsap.fromTo(descriptionRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
  }, { scope: descriptionRef, dependencies: [bannerText] });

  useGSAP(() => {
    if (showMenu || !arcanaLabelRef.current) return;
    gsap.fromTo(arcanaLabelRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
  }, { scope: arcanaLabelRef, dependencies: [bannerText] });

  useGSAP(() => {
    if (showMenu || !arcanaNameRef.current) return;
    gsap.fromTo(arcanaNameRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
  }, { scope: arcanaNameRef, dependencies: [bannerText] });

  useGSAP(() => {
    if (showMenu || !rankValueRef.current) return;
    gsap.fromTo(rankValueRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
  }, { scope: rankValueRef, dependencies: [bannerText] });

  useGSAP(() => {
    if (showMenu || !starsRef.current) return;
    gsap.fromTo(starsRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
  }, { scope: starsRef, dependencies: [bannerText] });

  return (
    <div ref={containerRef} className="flex flex-col gap-5 md:gap-20">
      <div className="relative w-full max-w-xl mx-auto overflow-hidden border-t-8 border-r-4 border-white shadow-card-lg shadow-blue-900/50 bg-white -skew-x-10 scale-106 md:scale-150 md:translate-y-7">
        {/* Sección superior: encabezado e información */}
        <div className="md:pl-20 relative bg-white pt-8">
          {/* Banner superior negro */}
          {bannerText && (
            <div className="absolute top-0 left-0 right-0 pt-5 pb-2 bg-black flex items-center justify-center">
              <span ref={bannerTextRef} className="font-sans text-white font-bold text-sm tracking-widest uppercase skew-x-10">
                {bannerText}
              </span>
            </div>
          )}

          {/* Etiqueta diagonal ARCANA (cinta angular) */}
          <div
            className="absolute top-10 left-0 bg-black flex items-center justify-end pr-2 pl-2 pt-2 origin-left -rotate-20 translate-x-10 md:translate-x-30"
          >
            <span ref={arcanaLabelRef} className="text-white text-[10px] font-bold tracking-widest uppercase">
              {arcanaLabel}
            </span>
          </div>

          {/* Nombre de arcana + RANK */}
          <div className="grid grid-cols-3 items-center gap-4 pt-2 px-5">
            <h2 ref={arcanaNameRef} className="col-span-2 text-center text-3xl sm:text-4xl text-black font-bold">
              {arcanaName}
            </h2>
            <div className="flex items-center gap-2">
              <span ref={rankRef} className="text-black text-xs font-bold tracking-widest uppercase">
                RANK
              </span>
              <span ref={rankValueRef} className="bg-white leading-6 text-7xl text-black font-black leading-none z-10"
                style={{
                  lineHeight: '0.85',
                }}
              >
                {clampedRank}
              </span>
            </div>
          </div>

          {/* Estrellas */}
          <div ref={starsRef} className="flex justify-center gap-0.5 mt-3 -skew-x-15" role="img" aria-label={`Rango ${clampedRank} de ${MAX_RANK}`}>
            {stars.map((filled, i) => (
              <span key={i}>{filled ? <StarFilled /> : <StarEmpty />}</span>
            ))}
          </div>
        </div>

      </div>
      {/* Sección inferior: fondo azul y descripción */}
      <div className="md:pl-20 relative min-h-[140px] text-white overflow-hidden">
        {/* Patrón sutil de líneas verticales */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)',
          }}
        />
        {/* Silueta/figura tenue decorativa */}
        <div
          className="absolute bottom-0 right-0 w-48 h-32 opacity-10"
        />
        <p ref={descriptionRef} className="relative z-10 font-sans text-sm sm:text-base leading-relaxed p-5 text-white/95">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SocialLink;
