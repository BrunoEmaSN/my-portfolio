import React, { useRef } from 'react';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ANIMATION_CONFIG } from '../../constants';

export interface TimelineExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceTimelineProps {
  experiences: TimelineExperience[];
  sectionRef: React.RefObject<HTMLElement | null>;
}

const STAGGER_DELAY = 0.18;
const SLIDE_DISTANCE = 100;

const ExperienceTimeline = ({ experiences, sectionRef }: ExperienceTimelineProps) => {
  const timelineRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const scroller = sectionRef?.current;
    const listEl = timelineRef.current;
    if (!scroller || !listEl) return;

    const items = listEl.querySelectorAll('li');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: listEl,
        scroller,
        start: 'top 82%',
      },
    });

    items.forEach((li, i) => {
      const isLeft = i % 2 === 0;
      const wrapper = li.firstElementChild as HTMLElement | null;
      if (!wrapper) return;
      const fromX = isLeft ? -SLIDE_DISTANCE : SLIDE_DISTANCE;
      tl.fromTo(
        wrapper,
        {x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: ANIMATION_CONFIG.fast,
          ease: ANIMATION_CONFIG.ease,
        },
        i * STAGGER_DELAY
      );
    });
  }, { scope: timelineRef, dependencies: [experiences.length, sectionRef] });

  return (
    <div id="experience-timeline">
      <div className="cmp-timeline__line" aria-hidden />

      <ul ref={timelineRef}>
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={`${exp.company}-${exp.period}`}
              className={clsx("cmp-timeline__item", isLeft ? "md-left" : "md-right")}
            >
              <div className={clsx("cmp-timeline__content-wrap", isLeft ? "md-left" : "md-right")}>
                <div className="cmp-timeline__box">
                  <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgb(59 130 246 / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(59 130 246 / 0.1) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className={clsx("relative z-10 space-y-2 text-left", isLeft && "md:text-right")}>
                    <h3 className="font-sans text-lg sm:text-xl text-white font-semibold tracking-wide skew-x-5">{exp.title}</h3>
                    <p className="font-sans text-xs sm:text-sm text-cyan-400 tracking-wide skew-x-5">
                      {exp.company} <span className="text-gray-500">|</span> {exp.period}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed skew-x-5">{exp.description}</p>
                  </div>
                </div>
              </div>
              <div className="cmp-timeline__dot" aria-hidden />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExperienceTimeline;
