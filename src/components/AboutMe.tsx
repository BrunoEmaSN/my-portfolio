import SectionTitle from './SectionTitle';
import Info from './Info';
import Glass from './Glass';

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
      <div className="h-full w-full flex justify-end items-end">
        <Glass />
      </div>
      <Info />
    </section>
  );
};

export default AboutMe;
