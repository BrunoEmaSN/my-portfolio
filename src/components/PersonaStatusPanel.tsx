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
    <div className={clsx("cmp-persona-panel", className)}>
      <div className="cmp-persona-panel__top">
        <div className="cmp-persona-panel__scale">
          <CharacterHeader
            name={characterName}
            arcanaLabel={arcanaLabel}
            arcana={arcana}
            persona={persona}
            level={level}
            nextExp={nextExp}
          />
          <div className="cmp-persona-panel__arrows-wrap">
            <div className="cmp-persona-panel__arrows-inner">
              <NavigationArrows onLeft={onNavigateLeft} onRight={onNavigateRight} />
            </div>
          </div>
        </div>
      </div>

      <div className="cmp-persona-panel__bottom">
        <div className="cmp-persona-panel__bottom-inner">
          <SkillIconsRow arcanaLabel={arcanaLabel} skills={skills} />
        </div>
      </div>
    </div>
  );
};

export default PersonaStatusPanel;
