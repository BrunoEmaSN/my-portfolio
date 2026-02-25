import { useRef } from "react";
import SkillIcon from "./SkillIcon";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "../../constants";
import clsx from "clsx";
import gsap from "gsap";

export interface SkillItem {
  icon?: React.ReactNode;
  color?: string;
  highlighted?: boolean;
  showAlert?: boolean;
  showResist?: boolean;
}

export interface SkillIconsRowProps {
  arcanaLabel: string;
  skills: SkillItem[];
  className?: string;
}

const SkillIconsRow = ({ arcanaLabel, skills, className = "" }: SkillIconsRowProps) => {
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
    <div ref={containerRef} className={clsx("cmp-skill-icons-row", className)}>
      {skills.map((skill, i) => (
        <SkillIcon
          key={i}
          icon={skill.icon}
          color={skill.color}
          highlighted={skill.highlighted}
          showAlert={skill.showAlert}
          showResist={skill.showResist}
        />
      ))}
    </div>
  );
};

export default SkillIconsRow;
