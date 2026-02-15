import SectionTitle from './SectionTitle';

const Skills = () => {
  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col items-start justify-start bg-red-500 text-white"
    >
      <SectionTitle lines={['ABOUT', 'ME']} />
      <p className="mt-4 text-xl opacity-80">Section with ID: #skills</p>
    </section>
  );
};

export default Skills;
