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
  // Generar un ID único basado en el label para evitar conflictos
  const uniqueId = `section-title-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <>
      <style>{`
        #${uniqueId} {
          font-size: ${textSize.sm}px !important;
        }
        @media (min-width: 640px) {
          #${uniqueId} {
            font-size: ${textSize.sm}px !important;
          }
        }
        @media (min-width: 768px) {
          #${uniqueId} {
            font-size: ${textSize.md}px !important;
          }
        }
        @media (min-width: 1024px) {
          #${uniqueId} {
            font-size: ${textSize.lg}px !important;
          }
        }
        @media (min-width: 1280px) {
          #${uniqueId} {
            font-size: ${textSize.xl}px !important;
          }
        }
      `}</style>
      <h1
        id={uniqueId}
        className={className}
      >
        {label}
      </h1>
    </>
  );
};

export default SectionTitle;
