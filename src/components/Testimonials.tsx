import { useState } from 'react';
import clsx from 'clsx';
import SectionTitle from './SectionTitle';
import { useAppStore } from '../store';
import SocialLink from './SocialLink';
import { socialLinksData } from '../../constants';
import SocialDescription from './SocialDescription';
import ListMenu from './ListMenu';
import ImageGallery from './ImageGallery';

const personae = [
  'Mitsuru Kirijo',
  'Akihiko Sanada',
  'Shinjiro Aragaki',
  'Yukari Takeba',
  'Junpei Iori',
];

const personaeImages = [
  '/images/testimonials/fake-image-1.png',
  '/images/testimonials/fake-image-2.png',
  '/images/testimonials/fake-image-3.png',
  '/images/testimonials/fake-image-4.png',
  '/images/testimonials/fake-image-5.png',
];

const Testimonials = () => {
  const { showMenu } = useAppStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const size = {
    sm: 100,
    md: 120,
    lg: 200,
    xl: 250
  }
  return (
    <section id="testimonials" className="overflow-y-auto h-full w-full overflow-x-hidden">
      <SectionTitle label="HELP PROVIDED" textSize={size} className="text-5xl xs:text-9xl" />
      <div className={clsx("relative z-10 pointer-events-auto flex flex-col gap-12 w-full h-full pt-10 gap-5 items-between justify-center", showMenu ? "pointer-events-none" : "pointer-events-auto")}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h3 className="text-white text-5xl md:text-7xl -skew-x-10 font-bold translate-y-2">
              SOCIAL LINKS
            </h3>
            <div className="max-w-xl">
              {socialLinksData.map((socialLink) => (
                <SocialLink key={socialLink.id} {...socialLink} />
              ))}
            </div>
          </div>
          <div className="w-full h-[50vh] p-8">
            <ImageGallery images={personaeImages} imageCurrent={selectedIndex} />
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center pr-10 lg:pr-20 gap-5">
          <ListMenu items={personae} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
          <SocialDescription
            name="Mitsuru Kirijo"
            description="A third-year Gekkoukan High School student, Class D. A memeber of the fencing team. Also the student council president."
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
