import { Check } from "lucide-react";
import Stepper from "./Stepper";
import { skillsItems, infoStats, infoFeatures } from "../../constants";
import { useState } from "react";

const STEPPER_ITEMS = [
  { id: 'info', name: "Info", description: "Proficient in programming, analysis, and systems design." },
  { id: 'skills', name: 'Skills', description: 'Full Stack development with a focus on frontend technologies.' },
  { id: 'stats', name: 'Stats', description: 'Awards and achievements' },
]

const Info = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <Stepper items={STEPPER_ITEMS} onItemChange={handleStepChange} />
      </div>
      <div className="w-full bg-white text-black border-t-3 border-red-600 pt-5 pb-5">
        <div>
          <div className="w-full bg-black flex flex-col gap-4 items-center justify-center p-4 text-white">
            <h2 className="text-xl">
              Hi. I'm <span className="text-blue-700 font-bold">Bruno Sanchez</span>, a creative developer passionate about technology.
            </h2>
          </div>
          <div className="w-full flex flex-col items-center justify-center p-4 gap-4">
            {
              STEPPER_ITEMS[currentStep].id === 'info' && (
                <ul className="flex flex-col gap-2">
                  {infoFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 bg-blue-700 rounded-full p-0.5" />
                      <p className="text-sm">{feature}</p>
                    </li>
                  ))}
                </ul>
              )
            }

            {
              STEPPER_ITEMS[currentStep].id === 'skills' && (
                <div className="grid grid-cols-6 gap-4">
                  {skillsItems.flatMap(item => item.values).map((value) => (
                    <div key={value.id} className="flex flex-col items-center justify-between min-w-20 gap-2">
                      <div className="rounded-md bg-gray-200 w-15 h-15 flex items-center justify-center">
                        <img src={value.logo} alt={value.name} className="w-10 ratio-square" />
                      </div>
                      <p className="text-sm text-lg font-bold">{value.name}</p>
                    </div>
                  ))}
                </div>
              )
            }
            {
              STEPPER_ITEMS[currentStep].id === 'stats' && (
                <div className="w-full flex items-center justify-center p-1 grid grid-cols-2 gap-4">
                  {infoStats.map((stat) => (
                    <p key={stat.label} className="text-xl font-bold text-center">
                      {stat.label} • <span className="text-blue-700 font-bold text-2xl">{stat.value}</span>
                    </p>
                  ))}
                </div>
              )
            }
          </div>
          <div className="w-full bg-black flex items-center justify-center p-1">
            <h3 className="text-xl font-bold text-white">{STEPPER_ITEMS[currentStep].name}</h3>
          </div>
          <p className="text-md text-center p-2 font-bold text-gray-500">{STEPPER_ITEMS[currentStep].description}</p>
        </div>
      </div>
    </>
  );

};

export default Info;