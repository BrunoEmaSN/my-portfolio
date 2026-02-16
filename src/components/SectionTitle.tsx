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
        text-4xl
        xs:text-5xl
        sm:text-[60px]
        md:text-[100px]
        lg:text-[150px]
        xl:text-[250px]
        2xl:text-[300px]
        -rotate-6
        sm:-rotate-8
        md:-rotate-10
        opacity-40
        sm:opacity-45
        md:opacity-50
        top-2
        sm:top-4
        md:top-0
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
