'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full">
      {toasts.map((toast) => {
        let bg = 'bg-[#17324D] text-white border-[#17324D]';
        let Icon = Info;

        if (toast.type === 'success') {
          bg = 'bg-[#16805C] text-white border-[#16805C]';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          bg = 'bg-[#D97706] text-white border-[#D97706]';
          Icon = AlertTriangle;
        } else if (toast.type === 'error') {
          bg = 'bg-[#C2413B] text-white border-[#C2413B]';
          Icon = XCircle;
        }

        return (
          <div
            key={toast.id}
            className={`flex items-start justify-between p-4 rounded-lg shadow-lg border text-sm animate-in slide-in-from-bottom-2 duration-300 ${bg}`}
          >
            <div className="flex items-start gap-3">
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white ml-2 p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
