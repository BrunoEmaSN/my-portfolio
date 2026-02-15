import SectionTitle from './SectionTitle';

const Experiences = () => {
  return (
    <section
      id="experiences"
      className="h-screen w-full flex flex-col items-start justify-start bg-blue-500 text-white"
    >
      <SectionTitle lines={['VIEW', 'PROJECTS']} />
      <p className="mt-4 text-xl opacity-80">Section with ID: #experiences</p>
    </section>
  );
};

export default Experiences;
