import { type ReactNode } from 'react';
import SkillItem from './SkillItem';
import NextSkillLabel from './NextSkillLabel';

export interface SkillData {
  id: string;
  name: string;
  icon: ReactNode;
  highlighted?: boolean;
  locked?: boolean;
}

export interface SkillsListProps {
  skills: SkillData[];
  nextSkillLevel?: number;
  /** Próxima habilidad a desbloquear (ej. Myriad Arrows) */
  nextSkill?: SkillData;
  /** Habilidad bloqueada/no revelada (se muestra como ??????) */
  lockedSkill?: Pick<SkillData, 'id' | 'icon'>;
  className?: string;
}

const SkillsList = ({
  skills,
  nextSkillLevel = 43,
  nextSkill,
  className = '',
}: SkillsListProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-2">
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
      <div className="mt-6 mb-4 flex flex-wrap items-end gap-4 relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-blue-800 z-0"
          style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 30% 100%)" }}
        />
        <NextSkillLabel level={nextSkillLevel} className="z-10" />
        <div className="flex flex-col gap-1 min-w-[180px] z-10">
          {nextSkill && (
            <SkillItem
              key={nextSkill.id}
              name={nextSkill.name}
              icon={nextSkill.icon}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsList;
