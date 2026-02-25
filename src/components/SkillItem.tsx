import { type ReactNode } from 'react';
import clsx from 'clsx';

export interface SkillItemProps {
  name: string;
  icon: ReactNode;
  highlighted?: boolean;
  locked?: boolean;
}

const SkillItem = ({ name, icon, highlighted, locked }: SkillItemProps) => {
  return (
    <div className={clsx("cmp-skill-item", highlighted && "highlighted", locked && "locked")}>
      <span className="cmp-skill-item__icon">{icon}</span>
      <span className="cmp-skill-item__name">{name}</span>
    </div>
  );
};

export default SkillItem;
