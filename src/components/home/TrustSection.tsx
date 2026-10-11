'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Award, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';

export const TrustSection: React.FC = () => {
  const { t, currentCurrency } = useApp();

  return (
    <section className="py-16 bg-[#17324D] text-white border-b border-[#245A7A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300 bg-[#245A7A]/60 px-3 py-1 rounded-full border border-white/10">
              {t.trustBadge}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t.trustTitleLine1} <br />
              <span className="text-slate-300">{t.trustTitleLine2}</span>
            </h2>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              {t.trustSubtitle}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-[#16805C]/20 border border-[#16805C]/40 flex items-center justify-center text-[#16805C] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.escrowProtected}</h4>
                  <p className="text-xs text-slate-300">Funds are held safely in escrow and released only upon validated milestone completion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-[#245A7A] border border-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.step3Title}</h4>
                  <p className="text-xs text-slate-300">Legally binding BTP contracts with clear specifications, BoQ schedules, and resolution rights.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.verifiedWorkers}</h4>
                  <p className="text-xs text-slate-300">Worker NVTI certifications, company business registrations, and ID cards are thoroughly verified before approval.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/trust-safety">
                <Button variant="secondary" className="gap-2 shadow-sm">
                  <span>{t.trustSafety}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Transparent Fee & Commission Calculator Box */}
          <div className="lg:col-span-6">
            <div className="bg-[#245A7A]/50 border border-white/15 rounded-xl p-6 md:p-8 backdrop-blur-xs space-y-6">
              
              <div className="flex justify-between items-center pb-4 border-b border-white/15">
                <div>
                  <h3 className="text-lg font-bold text-white">{t.commissionModelTitle}</h3>
                  <p className="text-xs text-slate-300">{t.commissionModelDesc}</p>
                </div>
                <Badge variant="VERIFIED" className="bg-[#16805C] text-white border-0">
                  {t.statusVerified}
                </Badge>
              </div>

              {/* Commission Example Breakdown Box */}
              <div className="bg-[#17324D] rounded-lg p-5 border border-white/10 space-y-4">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  {t.sampleContract}
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{t.contractValue}</span>
                    <span className="font-mono font-bold text-white">{currentCurrency} 100,000</span>
                  </div>

                  <div className="flex justify-between items-center text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> {t.platformFee}
                    </span>
                    <span className="font-mono font-bold">- {currentCurrency} 10,000</span>
                  </div>

                  <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-base font-bold text-[#16805C]">
                    <span>{t.netPayout}</span>
                    <span className="font-mono text-lg text-white">{currentCurrency} 90,000</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-light italic">
                  * Platform fees cover escrow custody, site verification support, dispute arbitration, and digital contract execution.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center text-xs">
                <div className="p-3 rounded-lg bg-[#17324D]/60 border border-white/10">
                  <span className="block text-xl font-bold text-white">{currentCurrency} 2.4M+</span>
                  <span className="text-slate-300">{t.escrowVolume}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#17324D]/60 border border-white/10">
                  <span className="block text-xl font-bold text-[#16805C]">0% Fraud</span>
                  <span className="text-slate-300">Milestone Dispute Rate &lt; 0.2%</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
