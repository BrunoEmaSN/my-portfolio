import SectionTitle from './SectionTitle';

const Experiences = () => {
  const size = {
    sm: 100,
    md: 120,
    lg: 150,
    xl: 200
  }
  return (
    <section id="experiences">
      <SectionTitle label="WORK EXPERIENCES" textSize={size} className="text-5xl xs:text-9xl" />
    </section>
  );
};

export default Experiences;
