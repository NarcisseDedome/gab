import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let maxWidthClass = 'max-w-lg';
  if (maxWidth === 'sm') maxWidthClass = 'max-w-sm';
  if (maxWidth === 'md') maxWidthClass = 'max-w-md';
  if (maxWidth === 'xl') maxWidthClass = 'max-w-xl';
  if (maxWidth === '2xl') maxWidthClass = 'max-w-2xl';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#17212B]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`bg-white w-full ${maxWidthClass} rounded-t-2xl sm:rounded-xl shadow-modal border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-[#F5F7F9]">
          <div className="pr-3">
            <h3 className="text-base sm:text-lg font-bold text-[#17324D] line-clamp-1">{title}</h3>
            {subtitle && <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 line-clamp-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content with smooth scrolling */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
