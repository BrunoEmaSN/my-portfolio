export interface SocialDescriptionProps {
  /** Nombre de la persona (ej. "Mitsuru Kirijo") */
  name: string;
  /** Texto biográfico o descripción */
  description: string;
}

const SocialDescription = ({ name, description }: SocialDescriptionProps) => {
  return (
    <div className="relative max-w-lg rounded-sm bg-[#01003E]/50 px-10 md:-skew-x-10">
      {/* Sección del nombre con forma angular de resaltado */}
        <div
          className="absolute top-0 left-3 bg-blue-700 w-40 h-35 rotate-17 -skew-x-20 md:-skew-x-10 z-0 -translate-y-27 translate-x-10 md:translate-x-0"
          style={{
            clipPath: 'polygon(100% 46%, 0 100%, 100% 100%)',
          }}
        />
      <div className="relative">
        {/* Forma poligonal angular detrás del nombre (puntiaguda en los extremos) */}
        <h2
          className="relative text-xl sm:text-2xl md:text-3xl font-bold text-[#40D0FF] leading-tight -translate-y-2 md:skew-x-10"
        >
          {name}
        </h2>
      </div>

      {/* Descripción */}
      <p className="text-base md:text-lg text-white/95 leading-relaxed md:px-8 -translate-y-2 md:skew-x-10">
        {description}
      </p>
    </div>
  );
};

export default SocialDescription;
