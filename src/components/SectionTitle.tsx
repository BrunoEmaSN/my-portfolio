interface SectionTitleProps {
  label: string;
  className?: string;
  textSize?: Size;
}

interface Size {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const SectionTitle = ({
  label,
  className = '',
  textSize = {
    sm: 60,
    md: 100,
    lg: 150,
    xl: 250
  }
}: SectionTitleProps) => {
  return (
    <>
      <h1
        id="section-title"
        className={`
          sm:text-[${textSize.sm}px]
          md:text-[${textSize.md}px]
          lg:text-[${textSize.lg}px]
          xl:text-[${textSize.xl}px]
          ${className}
        `}
      >
        {label}
      </h1>
    </>
  );
};

export default SectionTitle;
