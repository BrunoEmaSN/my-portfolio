import SectionTitle from './SectionTitle';
import Stepper from './Stepper';
import { skillsItems } from '../../constants';

const Skills = () => {
  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col items-start justify-start bg-gray-900 text-white"
    >
      <SectionTitle lines={['ABOUT', 'ME']} />
      <Stepper items={skillsItems} />
    </section>
  );
};

export default Skills;
