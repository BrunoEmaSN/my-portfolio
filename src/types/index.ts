import type { POSITIONS } from "../../constants"

export type Position = typeof POSITIONS.center | typeof POSITIONS.left | typeof POSITIONS.right

export interface AnimationState {
  menu: Position
  layout: Position
}

export interface MobileProps {
  isMobile: boolean;
}