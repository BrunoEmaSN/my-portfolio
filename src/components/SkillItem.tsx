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
    <div
      className={clsx(
        'flex items-center gap-3 px-3 transition-colors py-2 z-10',
        highlighted
          ? 'bg-slate-700/50 text-white'
          : 'text-white',
        locked && 'text-cyan-400/80',
      )}
    >
      <span className="shrink-0 flex items-center justify-center">
        {icon}
      </span>
      <span className="font-medium text-sm truncate">
        {name}
      </span>
    </div>
  );
};

export default SkillItem;
