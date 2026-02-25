import SkillItem from './SkillItem';
import NextSkillLabel from './NextSkillLabel';
import type { SkillData } from '../types';
import clsx from 'clsx';



export interface SkillsListProps {
  skills: SkillData[];
  nextSkillLevel?: number;
  nextSkill?: SkillData;
  className?: string;
}

const SkillsList = ({
  skills,
  nextSkillLevel = 43,
  nextSkill,
  className = '',
}: SkillsListProps) => {
  return (
    <div className={clsx("cmp-skills-list", className)}>
      <div className="cmp-skills-list__grid">
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            name={skill.name}
            icon={skill.icon}
            highlighted={skill.highlighted}
            locked={skill.locked}
          />
        ))}
      </div>
      <div className="cmp-skills-list__bottom flex">
        <div className="cmp-skills-list__next-wrap">
          <NextSkillLabel level={nextSkillLevel} />
        </div>
        <div className="cmp-skills-list__next-item-wrap">
          <div className="cmp-skills-list__next-bg" style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }} />
          {nextSkill && (
            <SkillItem key={nextSkill.id} name={nextSkill.name} icon={nextSkill.icon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsList;
