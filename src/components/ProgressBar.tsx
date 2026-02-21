import clsx from 'clsx';
import { ANIMATION_CONFIG } from '../../constants';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

const ProgressBar = ({ value, max, className }: ProgressBarProps) => {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const progressBarRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.fromTo(progressBarRef.current, {
      width: 0,
    }, {
      width: `${percent}%`,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
    })
  })
  return (
    <div
      className={clsx(
        'h-2.5 w-full overflow-hidden bg-[#173245] shadow-inner-lg -skew-x-10 shadow-card-sm shadow-[#070C62]',
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        ref={progressBarRef}
        className="h-full bg-cyan-400 transition-[width] duration-300 ease-out -skew-x-10"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
