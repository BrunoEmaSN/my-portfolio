import StepperButton from "./StepperButton";

export interface NavigationArrowsProps {
  onLeft?: () => void;
  onRight?: () => void;
  className?: string;
}

const NavigationArrows = ({ onLeft, onRight, className = "" }: NavigationArrowsProps) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <StepperButton
        direction="left"
        label="A"
        onClick={onLeft}
        className="scale-x-60 origin-left"
      />
      <StepperButton
        direction="right"
        label="D"
        onClick={onRight}
        className="scale-x-60 origin-right"
      />
    </div>
  );
};

export default NavigationArrows;
