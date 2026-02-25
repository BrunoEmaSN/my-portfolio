import type { ReactNode } from "react";
import type { POSITIONS } from "../../constants"

export type Position = typeof POSITIONS.center | typeof POSITIONS.left | typeof POSITIONS.right

export interface AnimationState {
  menu: Position
  layout: Position
}

export interface MobileProps {
  isMobile: boolean;
}

export interface SkillData {
  id: string;
  name: string;
  icon: ReactNode;
  highlighted?: boolean;
  locked?: boolean;
}

export interface StatEntry {
  label: string;
  value: number;
  max?: number;
}