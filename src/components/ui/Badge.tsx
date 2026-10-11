import React from 'react';
import { AvailabilityStatus, VerificationStatus, ContractStatus } from '@/types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'AVAILABLE' | 'VERIFIED' | 'PENDING' | 'UNAVAILABLE' | 'DISPUTE' | 'default' | 'outline' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  let bgClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  switch (variant) {
    case 'AVAILABLE':
      bgClasses = 'bg-[#16805C]/10 text-[#16805C] border-[#16805C]/30';
      break;
    case 'VERIFIED':
      bgClasses = 'bg-[#245A7A]/10 text-[#245A7A] border-[#245A7A]/30 font-medium';
      break;
    case 'PENDING':
      bgClasses = 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30';
      break;
    case 'UNAVAILABLE':
      bgClasses = 'bg-slate-200 text-[#64748B] border-slate-300';
      break;
    case 'DISPUTE':
      bgClasses = 'bg-[#C2413B]/10 text-[#C2413B] border-[#C2413B]/30 font-medium';
      break;
    case 'info':
      bgClasses = 'bg-[#17324D]/10 text-[#17324D] border-[#17324D]/30';
      break;
    case 'outline':
      bgClasses = 'bg-transparent text-[#64748B] border-[#E2E8F0]';
      break;
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs font-semibold' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border tracking-wide uppercase ${sizeClasses} ${bgClasses} ${className}`}
    >
      {variant === 'AVAILABLE' && <span className="w-1.5 h-1.5 rounded-full bg-[#16805C]" />}
      {variant === 'VERIFIED' && <span className="w-1.5 h-1.5 rounded-full bg-[#245A7A]" />}
      {variant === 'PENDING' && <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />}
      {variant === 'DISPUTE' && <span className="w-1.5 h-1.5 rounded-full bg-[#C2413B]" />}
      {children || variant}
    </span>
  );
};
