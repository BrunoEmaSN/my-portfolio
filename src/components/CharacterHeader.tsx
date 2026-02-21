export interface CharacterHeaderProps {
  /** Nombre del personaje (ej. "Aigis") */
  name: string;
  /** Etiqueta de arcana (ej. "ARCANA") */
  arcanaLabel?: string;
  /** Nombre de la arcana (ej. "Chariot") */
  arcana: string;
  /** Nombre del persona (ej. "Palladion") */
  persona: string;
  /** Nivel actual */
  level: number;
  /** EXP para siguiente nivel */
  nextExp: number;
  className?: string;
}

const ArcanaLabel = ({ arcanaLabel, arcana, persona }: { arcanaLabel: string, arcana: string, persona: string }) => {
  return (
    <div className="flex items-center justify-center w-full -skew-x-20">
      <div className="relative flex flex-col">
        <span className="text-xl text-gray-400 uppercase">
          {arcanaLabel}
        </span>
        <span className="text-4xl font-black text-gray-300">
          {arcana}
        </span>
        <div className="absolute top-0 left-0 w-full h-full flex justify-end items-end pb-1 translate-x-13">
          <span className="font-bold text-black z-10 skew-x-20">
            {persona}
          </span>
        </div>
      </div>
    </div>
  )
}

const LevelLabel = ({ level, nextExp }: { level: number, nextExp: number }) => {
  return (
    <div className="flex items-baseline gap-3 justify-center w-full items-end">
      <span className="text-2xl font-black text-black">
        LV{level}
      </span>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-black uppercase">NEXT</span>
        <span className="text-xl font-black text-black">
          {nextExp.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

const CharacterHeader = ({
  name,
  arcanaLabel = "ARCANA",
  arcana,
  persona,
  level,
  nextExp,
  className = "",
}: CharacterHeaderProps) => {
  return (
    <div className={`flex flex-col items-baseline justify-between ${className}`}>
      <div className="flex flex-col w-screen">
        <div className="max-w-sm">
          <div className="flex flex-col justify-center items-center">
            <div className="w-fit">
              <div className="text-4xl font-black text-transparent">
                {arcana}
              </div>
              <div className="text-lg font-bold text-cyan-400">
                {name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-3 border-red-700 w-screen" />
      <div className="bg-white w-screen py-4">
        <div className="max-w-sm">  
          <ArcanaLabel arcanaLabel={arcanaLabel} arcana={arcana} persona={persona} />
          <LevelLabel level={level} nextExp={nextExp} />
        </div>
      </div>
    </div>
  );
};

export default CharacterHeader;
