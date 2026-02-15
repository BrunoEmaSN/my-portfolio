import SectionTitle from './SectionTitle';

const Contact = () => {
  return (
    <section
      id="contact"
      className="h-screen w-full flex flex-col items-start justify-start bg-purple-500 text-white"
    >
      <SectionTitle lines={['FORGE', 'BONDS']} />
      <p className="mt-4 text-xl opacity-80">Section with ID: #contact</p>
    </section>
  );
};

export default Contact;
