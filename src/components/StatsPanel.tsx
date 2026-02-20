import clsx from 'clsx';
import StatItem from './StatItem';

export interface StatEntry {
  label: string;
  value: number;
  max?: number;
}

export interface StatsPanelProps {
  stats: StatEntry[];
  className?: string;
}

const StatsPanel = ({ stats, className = '' }: StatsPanelProps) => {
  return (
    <div
      className={clsx(
        "-rotate-5 -skew-x-10",
        "bg-[#010BC3] mask-internal py-4 shadow-lg border border-blue-800/50",
        className
      )}
    >
      <div className="flex flex-col gap-3 z-10">
        {stats.map((stat, index) => (
          <StatItem
            key={`${stat.label}-${index}`}
            label={stat.label}
            value={stat.value}
            max={stat.max}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
