import SectionTitle from './SectionTitle';
import ExperienceTimeline, { type TimelineExperience } from './ExperienceTimeline';
import Card from './Card';

const experiencesData: TimelineExperience[] = [
  {
    title: 'Frontend Developer',
    company: 'Digital Solutions Co.',
    period: '2019 - 2021',
    description:
      'Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.',
  },
  {
    title: 'Senior Frontend Engineer',
    company: 'Tech Innovations Inc.',
    period: '2021 - Present',
    description:
      'Lead frontend architecture and mentor junior developers. Implemented design systems and improved performance across multiple product lines.',
  },
  {
    title: 'Web Developer',
    company: 'Creative Agency',
    period: '2017 - 2019',
    description:
      'Built and maintained client websites with modern JavaScript frameworks. Worked closely with design teams to implement pixel-perfect interfaces.',
  },
];

const Experiences = () => {
  const size = {
    sm: 100,
    md: 120,
    lg: 150,
    xl: 200,
  };
  return (
    <section id="experiences" className="overflow-y-auto h-full">
      <SectionTitle label="WORK EXPERIENCES" textSize={size} className="text-5xl xs:text-9xl" />
      <div className="relative z-10 pointer-events-auto flex flex-col gap-12 p-4 w-full items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-5/6">
          <Card
            title="Work Experience 1"
            description="Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products."
            windowTitle="Work Experience 1"
            image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80"
            imageAlt="Work Experience 1"
            tags={['Tag 1', 'Tag 2', 'Tag 3']}
          />
          <Card title="Work Experience 2" description="Work Experience 2" windowTitle="Work Experience 2" image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" imageAlt="Work Experience 2" />
          <Card title="Work Experience 3" description="Work Experience 3" windowTitle="Work Experience 3" image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" imageAlt="Work Experience 3" />
        </div>
        <div className="flex items-center justify-center w-full py-8">
          <ExperienceTimeline experiences={experiencesData} />
        </div>
      </div>
    </section>
  );
};

export default Experiences;
