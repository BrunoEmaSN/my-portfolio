interface SectionTitleProps {
  lines: string[];
  className?: string;
}

const SectionTitle = ({ lines, className = '' }: SectionTitleProps) => {
  return (
    <h1
      className={`
        absolute
        flex
        flex-col
        leading-[0.85]
        font-black
        tracking-tighter
        transition-colors
        uppercase
        text-8xl
        sm:text-[70px]
        md:text-[120px]
        lg:text-[170px]
        xl:text-[300px]
        -rotate-10
        opacity-50
        ${className}
      `}
    >
      {lines.map((line, index) => (
        <span key={index}>{line}</span>
      ))}
    </h1>
  );
};

export default SectionTitle;
