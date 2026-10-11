'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HardHat, UserCheck, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function HowItWorksPage() {
  const { t } = useApp();

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-3 py-1 rounded-full">
            {t.processBadge}
          </span>
          <h1 className="text-4xl font-extrabold text-[#17324D]">
            {t.howTitle}
          </h1>
          <p className="text-sm text-[#64748B]">
            {t.howSubtitle}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* For Workers */}
          <Card className="p-6 space-y-4 border-t-4 border-t-[#17324D]">
            <div className="w-12 h-12 rounded-xl bg-[#17324D]/10 flex items-center justify-center text-[#17324D]">
              <HardHat className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#17324D]">{t.tabWorkers}</h2>
            <ol className="space-y-3 text-xs text-[#64748B] list-decimal pl-4">
              <li><strong>{t.step1Title}:</strong> {t.step1Desc}</li>
              <li><strong>{t.step2Title}:</strong> {t.step2Desc}</li>
              <li><strong>{t.step3Title}:</strong> {t.step3Desc}</li>
              <li><strong>{t.step4Title}:</strong> {t.step4Desc}</li>
            </ol>
            <Link href="/jobs" className="block pt-2">
              <Button variant="primary" fullWidth size="sm">{t.findJobs}</Button>
            </Link>
          </Card>

          {/* For Clients */}
          <Card className="p-6 space-y-4 border-t-4 border-t-[#245A7A]">
            <div className="w-12 h-12 rounded-xl bg-[#245A7A]/10 flex items-center justify-center text-[#245A7A]">
              <UserCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#17324D]">Client</h2>
            <ol className="space-y-3 text-xs text-[#64748B] list-decimal pl-4">
              <li><strong>{t.step1Title}:</strong> {t.step1Desc}</li>
              <li><strong>{t.step2Title}:</strong> {t.step2Desc}</li>
              <li><strong>{t.step3Title}:</strong> {t.step3Desc}</li>
              <li><strong>{t.step4Title}:</strong> {t.step4Desc}</li>
            </ol>
            <Link href="/workers" className="block pt-2">
              <Button variant="secondary" fullWidth size="sm">{t.findWorkers}</Button>
            </Link>
          </Card>

          {/* For Companies */}
          <Card className="p-6 space-y-4 border-t-4 border-t-[#16805C]">
            <div className="w-12 h-12 rounded-xl bg-[#16805C]/10 flex items-center justify-center text-[#16805C]">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#17324D]">{t.companies}</h2>
            <ol className="space-y-3 text-xs text-[#64748B] list-decimal pl-4">
              <li><strong>{t.step1Title}:</strong> {t.step1Desc}</li>
              <li><strong>{t.step2Title}:</strong> {t.step2Desc}</li>
              <li><strong>{t.step3Title}:</strong> {t.step3Desc}</li>
              <li><strong>{t.step4Title}:</strong> {t.step4Desc}</li>
            </ol>
            <Link href="/companies" className="block pt-2">
              <Button variant="outline" fullWidth size="sm">{t.companies}</Button>
            </Link>
          </Card>

        </div>

      </div>
    </div>
  );
}
