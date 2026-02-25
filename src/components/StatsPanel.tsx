import clsx from 'clsx';
import StatItem from './StatItem';
import type { StatEntry } from '../types';

interface StatsPanelProps {
  stats: StatEntry[];
  className?: string;
}

const StatsPanel = ({ stats, className = '' }: StatsPanelProps) => {
  return (
    <div className={clsx("cmp-stats-panel mask-internal", className)}>
      <div className="cmp-stats-panel__inner">
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
