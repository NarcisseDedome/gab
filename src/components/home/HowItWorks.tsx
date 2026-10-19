'use client';

import React from 'react';
import { UserCheck, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const HowItWorks: React.FC = () => {
  const { t } = useApp();

  const steps = [
    {
      number: '01',
      title: t.step1Title,
      description: t.step1Desc,
      icon: UserCheck
    },
    {
      number: '02',
      title: t.step2Title,
      description: t.step2Desc,
      icon: Search
    },
    {
      number: '03',
      title: t.step3Title,
      description: t.step3Desc,
      icon: ShieldCheck
    },
    {
      number: '04',
      title: t.step4Title,
      description: t.step4Desc,
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-16 bg-[#F5F7F9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-3 py-1 rounded-full">
            {t.processBadge}
          </span>
          <h2 className="text-3xl font-extrabold text-[#17324D] mt-3 tracking-tight">
            {t.howTitle}
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            {t.howSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-card relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#17324D]/20">{step.number}</span>
                    <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 flex items-center justify-center text-[#17324D]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#17324D] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{step.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-semibold text-[#245A7A] flex items-center gap-1">
                  <span>{t.stepVerified} {step.number}</span>
                  <span>✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
