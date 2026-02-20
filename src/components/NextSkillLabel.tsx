import clsx from 'clsx';

export interface NextSkillLabelProps {
  level: number;
  className?: string;
}

const NextSkillLabel = ({ level, className }: NextSkillLabelProps) => {
  return (
    <div
      className={clsx(
        'flex items-baseline gap-2',
        className
      )}
    >
      <p
        className="text-2xl -translate-y-3 font-black text-blue-700 uppercase -skew-x-15 -rotate-15 font-newrodin"
      >
        Next Skill
      </p>
      <p className="text-2xl font-black text-cyan-400 uppercase -skew-x-20 -rotate-15 -translate-x-10">
        <span className="text-base font-bold">Lv</span> {level}
      </p>
    </div>
  );
};

export default NextSkillLabel;
