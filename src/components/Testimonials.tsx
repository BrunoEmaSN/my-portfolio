import SectionTitle from './SectionTitle';

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="h-screen w-full flex flex-col items-start justify-start bg-green-500 text-white p-10"
    >
      <SectionTitle lines={['HELP', 'PROVIDED']} />
      <p className="mt-4 text-xl opacity-80">Section with ID: #testimonials</p>
    </section>
  );
};

export default Testimonials;
