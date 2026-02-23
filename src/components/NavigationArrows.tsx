import { useMediaQuery } from "react-responsive";
import StepperButton from "./StepperButton";
import { useAppStore } from "../store";

export interface NavigationArrowsProps {
  onLeft?: () => void;
  onRight?: () => void;
  className?: string;
}

const NavigationArrows = ({ onLeft, onRight, className = "" }: NavigationArrowsProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px'})
  const inputDevice = useAppStore((s) => s.inputDevice);

  const getLeftLabel = () => {
    if (isMobile) return "";
    if (inputDevice === "playstation") return "L";
    if (inputDevice === "xbox") return "LB";
    return "A";
  }
  const getRightLabel = () => {
    if (isMobile) return "";
    if (inputDevice === "playstation") return "R";
    if (inputDevice === "xbox") return "RB";
    return "D";
  }

  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <StepperButton
        direction="left"
        label={getLeftLabel()}
        onClick={onLeft}
        className="lg:scale-x-40 origin-left"
      />
      <StepperButton
        direction="right"
        label={getRightLabel()}
        onClick={onRight}
        className="lg:scale-x-40 origin-right"
      />
    </div>
  );
};

export default NavigationArrows;
