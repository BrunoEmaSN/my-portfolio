import SkillIcon from "./SkillIcon";

export interface SkillItem {
  icon?: React.ReactNode;
  color?: string;
  highlighted?: boolean;
  showAlert?: boolean;
}

export interface SkillIconsRowProps {
  skills: SkillItem[];
  className?: string;
}

const SkillIconsRow = ({ skills, className = "" }: SkillIconsRowProps) => {
  return (
    <div className={`flex items-end justify-center gap-3 flex-wrap ${className}`}>
      {skills.map((skill, i) => (
        <SkillIcon
          key={i}
          icon={skill.icon}
          color={skill.color}
          highlighted={skill.highlighted}
          showAlert={skill.showAlert}
        />
      ))}
    </div>
  );
};

export default SkillIconsRow;
