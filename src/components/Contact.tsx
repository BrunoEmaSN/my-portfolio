import MailPanel from './MailPanel';
import SectionTitle from './SectionTitle';

const Contact = () => {
  const size = {
    sm: 100,
    md: 120,
    lg: 200,
    xl: 400
  }
  return (
    <section id="contact">
      <SectionTitle label="FORGE BONDS" textSize={size} className="text-5xl xs:text-9xl" />
      <MailPanel
        backgroundImage="/images/testimonials/fake-image-1.png"
      />
    </section>
  );
};

export default Contact;
