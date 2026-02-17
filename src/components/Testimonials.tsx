import SectionTitle from './SectionTitle';

const Testimonials = () => {
  const size = {
    sm: 100,
    md: 120,
    lg: 200,
    xl: 250
  }
  return (
    <section id="testimonials">
      <SectionTitle label="HELP PROVIDED" textSize={size} className="text-5xl xs:text-9xl" />
    </section>
  );
};

export default Testimonials;
