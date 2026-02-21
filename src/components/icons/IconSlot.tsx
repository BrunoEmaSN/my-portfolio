import clsx from "clsx";

export interface IconSlotProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-6",
  md: "h-12",
  lg: "h-24",
};

const IconSlot = ({
  children,
  size = "md",
  className = "",
}: IconSlotProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center overflow-hidden px-5 -skew-x-15",
        "bg-gray-950 text-white",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};

export default IconSlot;
