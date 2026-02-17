import { Check } from "lucide-react";
import Stepper from "./Stepper";
import { skillsItems, infoStats, infoFeatures } from "../../constants";
import { useState, forwardRef } from "react";

const STEPPER_ITEMS = [
  { id: 'info', name: "Info", description: "Proficient in programming, analysis, and systems design." },
  { id: 'skills', name: 'Skills', description: 'Full Stack development with a focus on frontend technologies.' },
  { id: 'stats', name: 'Stats', description: 'Awards and achievements' },
]

const Info = forwardRef<HTMLDivElement>((_, ref) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  }

  return (
    <div ref={ref} className="h-full w-full flex flex-col justify-end items-center absolute">
      <div className="w-full bg-white text-black border-t-3 border-red-600 pt-3 pb-2">
        <div>
          <div className="w-full bg-black flex flex-col gap-4 items-center justify-center p-4 text-white">
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              Hi. I'm <span className="text-blue-700 font-bold">Bruno Sanchez</span>, a creative developer passionate about technology.
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center p-4 gap-4">
            {
              STEPPER_ITEMS[currentStep].id === 'info' && (
                <ul className="flex flex-col gap-2">
                  {infoFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-700 rounded-full p-0.5" />
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg">{feature}</p>
                    </li>
                  ))}
                </ul>
              )
            }

            {
              STEPPER_ITEMS[currentStep].id === 'skills' && (
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                  {skillsItems.flatMap(item => item.values).map((value) => (
                    <div key={value.id} className="flex flex-col items-start justify-between gap-4">
                      <div className="rounded-md bg-gray-200 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 flex items-center justify-center">
                        <img src={value.logo} alt={value.name} className="w-5 sm:w-7 md:w-10 lg:w-12 ratio-square" />
                      </div>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">{value.name}</p>
                    </div>
                  ))}
                </div>
              )
            }
            {
              STEPPER_ITEMS[currentStep].id === 'stats' && (
                <div className="p-1 grid grid-cols-2 gap-4">
                  {infoStats.map((stat) => (
                    <p key={stat.label} className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-start">
                      {stat.label} • <span className="text-blue-700 font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">{stat.value}</span>
                    </p>
                  ))}
                </div>
              )
            }
          </div>
          <div className="bg-black flex items-center justify-center p-1">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white text-start">{STEPPER_ITEMS[currentStep].name}</h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg p-2 font-bold text-gray-500 w-full text-center">{STEPPER_ITEMS[currentStep].description}</p>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-900">
        <Stepper items={STEPPER_ITEMS} onItemChange={handleStepChange} />
      </div>
    </div>
  );
});

Info.displayName = 'Info';

export default Info;