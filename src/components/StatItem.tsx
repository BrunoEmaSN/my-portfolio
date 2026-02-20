import ProgressBar from './ProgressBar';

export interface StatItemProps {
  label: string;
  value: number;
  max?: number;
}

const StatItem = ({ label, value, max = 50 }: StatItemProps) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      <div className="flex items-baseline justify-between gap-2">
        <span
          className="font-black text-black text-2xl italic"
          style={{
            WebkitTextStroke: "1.5px #00D3F2"
          }}
        >
          {label}
        </span>
        <span
          className="font-black text-white text-2xl italic"
          style={{
            WebkitTextStroke: "1.5px black"
          }}
        >
          {value}
        </span>
      </div>
      <ProgressBar value={value} max={max} />
    </div>
  );
};

export default StatItem;
