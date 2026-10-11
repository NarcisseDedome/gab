import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  let baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  let variantStyles = 'bg-[#17324D] text-white hover:bg-[#17324D]/90 focus:ring-[#17324D]';
  
  if (variant === 'secondary') {
    variantStyles = 'bg-[#245A7A] text-white hover:bg-[#245A7A]/90 focus:ring-[#245A7A]';
  } else if (variant === 'outline') {
    variantStyles = 'bg-white text-[#17324D] border border-[#17324D]/30 hover:bg-[#F5F7F9] focus:ring-[#17324D]';
  } else if (variant === 'ghost') {
    variantStyles = 'bg-transparent text-[#17212B] hover:bg-slate-100 focus:ring-slate-400';
  } else if (variant === 'danger') {
    variantStyles = 'bg-[#C2413B] text-white hover:bg-[#C2413B]/90 focus:ring-[#C2413B]';
  }

  let sizeStyles = 'px-4 py-2 text-sm';
  if (size === 'sm') {
    sizeStyles = 'px-3 py-1.5 text-xs';
  } else if (size === 'lg') {
    sizeStyles = 'px-6 py-3 text-base font-semibold';
  }

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
