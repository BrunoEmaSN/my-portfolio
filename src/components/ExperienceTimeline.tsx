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
    <div id="experience-timeline" className="relative w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 skew-x-0 lg:-skew-x-5 overflow-hidden">
      <div
        className="absolute top-0 bottom-0 w-px bg-blue-900/60 left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2"
        aria-hidden
      />

      <ul ref={timelineRef} className="relative space-y-16 sm:space-y-20 md:space-y-24">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={`${exp.company}-${exp.period}`}
              className={clsx(
                "relative flex w-full items-center pl-12 sm:pl-14 md:pl-0",
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse',
                'flex-row'
              )}
            >
              <div
                className={clsx(
                  "w-full min-w-0 flex-1 md:flex-initial md:w-1/2 -skew-x-5 lg:skew-x-0",
                  isLeft ? 'md:pr-6 md:flex md:justify-end md:text-right' : 'md:pl-6 md:text-left',
                  'text-left'
                )}
              >
                <div
                  className="box relative w-full max-w-md border-2 border-blue-900 bg-blue-950/90 hover:border-blue-700 p-4 sm:p-5 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className={clsx("relative z-10 space-y-2 text-left", isLeft && "md:text-right")}>
                    <h3 className="font-sans text-lg sm:text-xl text-white font-semibold tracking-wide skew-x-5">
                      {exp.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-cyan-400 tracking-wide skew-x-5">
                      {exp.company} <span className="text-gray-500">|</span> {exp.period}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed skew-x-5">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-white/80 ring-5 ring-blue-700"
                aria-hidden
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExperienceTimeline;
