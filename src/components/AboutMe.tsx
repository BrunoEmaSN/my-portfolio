import SectionTitle from './SectionTitle';

const AboutMe = () => {
  const size = {
    sm: 100,
    md: 200,
    lg: 300,
    xl: 400
  }

  return (
    <section
      id="about-me">
      <SectionTitle label="ABOUT ME" textSize={size} className="text-8xl xs:text-9xl" />
    </section>
  );
};

export default AboutMe;
