import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  colorClass?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  colorClass = 'bg-[#17324D]',
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-[#17212B] mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-semibold">{clampedProgress}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
