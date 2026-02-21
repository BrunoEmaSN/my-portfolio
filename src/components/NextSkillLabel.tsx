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
        "absolute bottom-0 right-0 translate-y-7 w-full",
      )}
    >
      <p
        className="text-2xl lg:text-3xl flex font-black text-blue-700 uppercase -skew-x-15 -rotate-10"
      >
        Next Skill
      </p>
      <p className="text-2xl lg:text-3xl font-black text-cyan-400 uppercase -skew-x-15 -rotate-10 text-right font-rodin">
        <span className="text-base lg:text-2xl font-bold">Lv</span>{level}
      </p>
    </div>
  );
};

export default NextSkillLabel;
