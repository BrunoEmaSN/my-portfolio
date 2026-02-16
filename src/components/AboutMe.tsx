import SectionTitle from './SectionTitle';

const AboutMe = () => {

  return (
    <section
      id="about-me"
      className="relativeh-screen w-full h-full flex flex-col items-start justify-start bg-gray-900 text-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12"
    >
      <SectionTitle lines={['ABOUT', 'ME']} />
    </section>
  );
};

export default AboutMe;
