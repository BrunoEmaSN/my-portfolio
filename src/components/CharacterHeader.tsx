import { useRef } from "react";
import { ANIMATION_CONFIG } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";

export interface CharacterHeaderProps {
  name: string;
  arcanaLabel?: string;
  arcana: string;
  persona: string;
  level: number;
  nextExp: number;
  className?: string;
}

const ArcanaLabel = ({ arcanaLabel, arcana, persona }: { arcanaLabel: string, arcana: string, persona: string }) => {
  return (
    <div className="cmp-arcana-wrap">
      <div className="cmp-arcana-inner">
        <span className="cmp-arcana-label">{arcanaLabel}</span>
        <span className="cmp-arcana-name">{arcana}</span>
        <div className="cmp-arcana-persona-wrap">
          <span className="cmp-arcana-persona">{persona}</span>
        </div>
      </div>
    </div>
  )
}

const LevelLabel = ({ level, nextExp }: { level: number, nextExp: number }) => {
  return (
    <div className="cmp-level-wrap">
      <span className="cmp-level-lv">LV{level}</span>
      <div className="cmp-level-next-wrap">
        <span className="cmp-level-next-label">NEXT</span>
        <span className="cmp-level-next-value">{nextExp.toLocaleString()}</span>
      </div>
    </div>
  )
}

const CharacterHeader = ({
  name,
  arcanaLabel = "ARCANA",
  arcana,
  persona,
  level,
  nextExp,
  className = "",
}: CharacterHeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      {
        x: -4,
      },
      {
        x: 0,
        duration: ANIMATION_CONFIG.fast / 2,
        delay: ANIMATION_CONFIG.delay,
        ease: ANIMATION_CONFIG.ease,
      }
    )
  }, { scope: containerRef, dependencies: [arcanaLabel] })
  return (
    <div className={clsx("cmp-character-header cmp-root", className)}>
      <div className="cmp-screen-wrap">
        <div className="cmp-max-wrap">
          <div className="cmp-center-wrap">
            <div className="cmp-w-fit">
              <div className="cmp-name-title">{arcana}</div>
              <div className="cmp-name-sub">{name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cmp-divider" />
      <div ref={containerRef} className="cmp-white-bar">
        <div className="cmp-max-wrap">
          <ArcanaLabel arcanaLabel={arcanaLabel} arcana={arcana} persona={persona} />
          <LevelLabel level={level} nextExp={nextExp} />
        </div>
      </div>
    </div>
  );
};

export default CharacterHeader;
