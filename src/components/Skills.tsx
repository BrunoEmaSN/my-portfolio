import SectionTitle from './SectionTitle';
import Stepper from './Stepper';
import { skillsItems } from '../../constants';
import Card from './Card';
import Glass from './Glass';

const Skills = ({isMobile}: {isMobile: boolean}) => {
  return (
    <section
      id="skills"
      className="relativeh-screen w-full h-full flex flex-col items-start justify-start bg-gray-900 text-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12"
    >
      <SectionTitle lines={['ABOUT', 'ME']} className="right-0" />
      <div className="absolute top-0 left-0 w-full h-5/6 sm:h-full md:h-full lg:h-full xl:h-full z-10">
        <Glass />
      </div>
      <Card title="Cadenza" description="Restores 50% HP and increases Accuracy/Evasion for all alies." footer="THEURGY" className={isMobile ? 'w-full z-30' : ''} />
      <div className="absolute w-full h-full flex items-end justify-end px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 lg:pb-12">
        <Stepper items={skillsItems} className="h-16 md:h-20 w-full sm:w-auto rotate-0 z-40" />
      </div>
    </section>
  );
};

export default Skills;
