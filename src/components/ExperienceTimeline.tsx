export interface TimelineExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceTimelineProps {
  experiences: TimelineExperience[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:skew-x-[-15deg]">
      {/* Línea vertical central — en md+ centrada; en móvil a la izquierda */}
      <div
        className="absolute top-0 bottom-0 w-px bg-blue-900/60 left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2 "
        aria-hidden
      />

      <ul className="relative space-y-12 sm:space-y-16">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={`${exp.company}-${exp.period}`}
              className={`relative flex w-full items-center pl-12 sm:pl-14 md:pl-0 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-row`}
            >
              {/* Contenido: tarjeta — en md cada lado ocupa 50% para alinear */}
              <div
                className={`w-full min-w-0 flex-1 md:flex-initial md:w-1/2 ${
                  isLeft
                    ? 'md:pr-6 md:flex md:justify-end md:text-right'
                    : 'md:pl-6 md:text-left'
                } text-left`}
              >
                <div className="relative w-full max-w-md border-2 border-blue-900 bg-blue-950/90 hover:border-blue-700 p-4 sm:p-5 transition-all duration-300 overflow-hidden skew-x-[-15deg] lg:skew-x-0">
                  {/* Patrón de cuadrícula sutil como en Card */}
                  <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className={`relative z-10 space-y-2 ${isLeft ? 'md:text-right' : ''} text-left`}>
                    <h3 className="font-sans text-lg sm:text-xl text-white font-semibold tracking-wide lg:skew-x-[15deg]">
                      {exp.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-cyan-400 tracking-wide lg:skew-x-[15deg]">
                      {exp.company} <span className="text-gray-500">|</span> {exp.period}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed lg:skew-x-[15deg]">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nodo: en móvil a la izquierda; en md+ centrado */}
              <div
                className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-white/80 ring-5 ring-blue-700"
                aria-hidden
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExperienceTimeline;
