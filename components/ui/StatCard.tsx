import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  targetValue: number;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, targetValue, suffix = '' }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-4xl md:text-5xl font-display font-semibold text-navy mb-2">
        <CountUp number={targetValue} suffix={suffix} />
      </div>
      <div className="text-sm font-body uppercase tracking-widest text-muted">
        {label}
      </div>
    </div>
  );
};

// Simple internal CountUp for StatCard if hook isn't global yet
function CountUp({ number, suffix }: { number: number; suffix: string }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = number;
    const duration = 2000;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [number]);

  return <span>{count}{suffix}</span>;
}
