interface CardProps {
  windowTitle?: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  title: string;
  description: string;
  url?: string;
}

const Card = ({
  windowTitle = 'PROJECT_ALPHA',
  image,
  imageAlt = 'Card image',
  tags = [],
  title,
  description,
  url,
}: CardProps) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  }
  return (
    <div
      className="relative w-full h-full max-w-2xl mx-auto bg-blue-950 shadow-2xl overflow-hidden border-2 border-blue-900 hover:border-blue-700 hover:shadow-card hover:shadow-blue-900/50 hover:-translate-y-2 transition-all duration-100 flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      {/* Barra de título de la ventana */}
      <div className="relative z-20 bg-blue-900 px-4 py-3 flex items-center">
        {/* Patrones geométricos angulares sutiles en el fondo de la barra */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.3) 30%, rgba(6, 182, 212, 0.3) 70%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(6, 182, 212, 0.3) 30%, rgba(6, 182, 212, 0.3) 70%, transparent 70%)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 font-sans text-sm sm:text-base text-cyan-400 tracking-wide">
          {windowTitle}
        </div>
      </div>

      {/* Sección de imagen superior */}
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Contenido de la ventana */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <div className="relative w-full pb-80 overflow-hidden flex-shrink-0" />

        {/* Sección de texto inferior */}
        <div className="relative bg-blue-950/70 p-4 sm:p-6 space-y-3 flex-1 min-h-0">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="font-sans text-xs sm:text-sm text-cyan-400 font-medium tracking-wide"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Título */}
          <h3 className="font-sans text-lg sm:text-xl md:text-2xl text-white font-semibold tracking-wide">
            {title}
          </h3>

          {/* Descripción */}
          <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
