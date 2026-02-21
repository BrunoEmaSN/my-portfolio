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
        className="lg:scale-x-40 origin-left"
      />
      <StepperButton
        direction="right"
        label="D"
        onClick={onRight}
        className="lg:scale-x-40 origin-right"
      />
    </div>
  );
};

export default NavigationArrows;
