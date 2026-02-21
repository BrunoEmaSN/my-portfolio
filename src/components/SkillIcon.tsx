import clsx from "clsx";

export interface SkillIconProps {
  /** Color del ícono (nombre Tailwind o hex) */
  color?: string;
  /** Ícono como React node (emoji, SVG, etc.) */
  icon: React.ReactNode;
  /** Si está resaltado (doble borde blanco/azul) */
  highlighted?: boolean;
  /** Mostrar signo de exclamación debajo */
  showAlert?: boolean;
  className?: string;
}

const SkillIcon = ({
  color = "text-orange-400",
  icon,
  highlighted = false,
  showAlert = false,
  className = "",
}: SkillIconProps) => {
  return (
    <div className={clsx("flex flex-col items-center gap-1 translate-y-2", className)}>
      <div
        className={clsx(
          "relative overflow-hidden",
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          "bg-gray-900 border-2 border-gray-700",
          highlighted && "ring-2 ring-white ring-offset-2 ring-offset-blue-200 border-blue-300"
        )}
      >
        <span className={clsx("w-5 h-5 flex items-center justify-center text-lg", color)}>
          {icon}
        </span>
      </div>

      <span
        className={clsx(
          "absolute bottom-0 w-5 h-5 flex justify-center font-bold",
          showAlert && "text-6xl -skew-x-10 z-10 translate-y-2",
          !showAlert && "text-xl translate-y-5"
        )}
        style={{
          WebkitTextStroke: "2px black",
        }}
      >
        {showAlert ? "!" : "•" }
      </span>
    </div>
  );
};

export default SkillIcon;
