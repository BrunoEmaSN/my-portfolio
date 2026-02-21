import clsx from "clsx";
import CharacterHeader from "./CharacterHeader";
import NavigationArrows from "./NavigationArrows";
import SkillIconsRow from "./SkillIconsRow";
import type { SkillItem } from "./SkillIconsRow";

export interface PersonaStatusPanelProps {
  characterName: string;
  arcana: string;
  arcanaLabel?: string;
  persona: string;
  level: number;
  nextExp: number;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  skills?: SkillItem[];
  className?: string;
}

const DEFAULT_SKILLS: SkillItem[] = [
  { color: "text-orange-400" },
  { color: "text-orange-400" },
  { color: "text-white" },
  { color: "text-orange-400" },
  { color: "text-cyan-400" },
  { color: "text-green-300" },
  { color: "text-yellow-400", highlighted: true, showAlert: true },
  { color: "text-sky-300" },
  { color: "text-purple-400" },
];

const PersonaStatusPanel = ({
  characterName,
  arcana,
  arcanaLabel = "ARCANA",
  persona,
  level,
  nextExp,
  onNavigateLeft,
  onNavigateRight,
  skills = DEFAULT_SKILLS,
  className = "",
}: PersonaStatusPanelProps) => {
  return (
    <div
      className={clsx(
        "w-full mx-auto md:scale-103 md:-rotate-5 xl:-rotate-10 2xl:-rotate-5 md:-translate-y-12 lg:-translate-y-30 xl:-translate-y-45 md:-skew-x-10 lg:-skew-x-7 bg-white",
        className
      )}
    >
      {/* Zona superior: fondo blanco + barra azul oscuro */}
      <div className="bg-slate-900 lg:pt-27">
        <div className="flex flex-col lg:scale-x-200 lg:origin-left">
          <CharacterHeader
            name={characterName}
            arcanaLabel={arcanaLabel}
            arcana={arcana}
            persona={persona}
            level={level}
            nextExp={nextExp}
          />
          <div className="relative max-w-md -translate-y-5 lg:-translate-y-10 md:ml-5">
            <div className="absolute bottom-0 left-0 w-full">
              <NavigationArrows onLeft={onNavigateLeft} onRight={onNavigateRight} />
            </div>
          </div>
        </div>
      </div>

      {/* Zona inferior: fondo azul claro + íconos de habilidades */}
      <div
        className="relative px-4 bg-blue-700 shadow-sm"
      >
        <div className="max-w-4xl">
          <SkillIconsRow arcanaLabel={arcanaLabel} skills={skills} />
        </div>
      </div>
    </div>
  );
};

export default PersonaStatusPanel;
