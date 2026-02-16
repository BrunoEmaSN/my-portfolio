import SectionTitle from './SectionTitle';
import Stepper from './Stepper';
import { skillsItems } from '../../constants';
import Card from './Card';

const Skills = () => {
  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col items-start justify-start bg-gray-900 text-white"
    >
      <SectionTitle lines={['ABOUT', 'ME']} className="right-0" />
      <Card title="Cadenza" description="Restores 50% HP and increases Accuracy/Evasion for all alies." footer="THEURGY" />
      <div className="absolute w-full h-full flex items-end justify-end">
        <Stepper items={skillsItems} className="xl:mb-30 h-20 md:rotate-0" />
      </div>
    </section>
  );
};

export default Skills;
