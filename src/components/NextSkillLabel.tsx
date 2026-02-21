import clsx from 'clsx';

export interface NextSkillLabelProps {
  level: number;
  className?: string;
}

const NextSkillLabel = ({ level, className }: NextSkillLabelProps) => {
  return (
    <div
      className={clsx(
        className,
      )}
    >
      <p
        className="text-2xl flex -translate-y-3 font-black text-blue-700 uppercase -skew-x-15 -rotate-15 font-rodin"
      >
        Next Skill
      </p>
      <p className="text-2xl font-black text-cyan-400 uppercase -skew-x-15 -rotate-15 text-right">
        <span className="text-base font-bold">Lv</span>{level}
      </p>
    </div>
  );
};

export default NextSkillLabel;
