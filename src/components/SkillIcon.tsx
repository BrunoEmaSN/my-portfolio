import clsx from "clsx";
import { Resist } from "./icons";

export interface SkillIconProps {
  color?: string;
  icon: React.ReactNode;
  highlighted?: boolean;
  showAlert?: boolean;
  showResist?: boolean;
  className?: string;
}

const SkillIcon = ({
  color = "text-orange-400",
  icon,
  highlighted = false,
  showAlert = false,
  showResist = false,
  className = "",
}: SkillIconProps) => {
  let iconContent: React.ReactNode = "•";
  if (showAlert) {
    iconContent = "!";
  } else if (showResist) {
    iconContent = <Resist />;
  }
  return (
    <div className={clsx("cmp-skill-icon", className)}>
      <div className={clsx("cmp-skill-icon__circle", highlighted && "highlighted")}>
        <span className={clsx("cmp-skill-icon__icon", color)}>{icon}</span>
      </div>
      <span
        className={clsx("cmp-skill-icon__badge", showAlert && "alert")}
        style={{ WebkitTextStroke: "2px black" }}
      >
        {iconContent}
      </span>
    </div>
  );
};

export default SkillIcon;
