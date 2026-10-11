'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, Lock, Award, FileText, AlertTriangle, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function TrustSafetyPage() {
  const { t } = useApp();

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#16805C] bg-[#16805C]/10 px-3 py-1 rounded-full">
            {t.trustBadge}
          </span>
          <h1 className="text-4xl font-extrabold text-[#17324D]">
            {t.trustTitleLine1} {t.trustTitleLine2}
          </h1>
          <p className="text-sm text-[#64748B]">
            {t.trustSubtitle}
          </p>
        </div>

        {/* 6 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#16805C]/10 flex items-center justify-center text-[#16805C]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17324D]">{t.escrowProtected}</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t.trustSubtitle}
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 flex items-center justify-center text-[#17324D]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17324D]">{t.commissionModelTitle}</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t.commissionModelDesc}
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#245A7A]/10 flex items-center justify-center text-[#245A7A]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17324D]">{t.verifiedWorkers}</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t.step1Desc}
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17324D]">{t.dailyReports}</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t.step4Desc}
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C2413B]/10 flex items-center justify-center text-[#C2413B]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17324D]">{t.disputeQueue}</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t.statusDispute} - Neutral arbitration and resolution.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 flex items-center justify-center text-[#17324D]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17324D]">{t.reviewsCount}</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t.step4Desc}
            </p>
          </Card>

        </div>

      </div>
    </div>
  );
}
