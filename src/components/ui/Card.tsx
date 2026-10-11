import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}) => {
  const hoverStyles = hoverEffect ? 'hover:shadow-md hover:border-slate-300 transition-all cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-[#E2E8F0] shadow-card overflow-hidden ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};
