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
      <div className="mt-6 mb-4 flex flex-col md:flex-row justify-center items-end gap-4 relative">
        <div className="relative z-10 w-full">
          <NextSkillLabel level={nextSkillLevel} />
        </div>
        <div className="relative flex items-center gap-3 w-full">
          <div
            className="absolute top-0 left-0 w-full h-full bg-blue-800 z-0"
            style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
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
