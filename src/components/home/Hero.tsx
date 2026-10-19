'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from './SearchBar';
import { ShieldCheck, HardHat, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsCreateProjectModalOpen, t } = useApp();

  return (
    <div className="relative bg-[#17324D] text-white overflow-hidden py-10 sm:py-16 md:py-24 border-b border-[#245A7A]">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#245A7A]/60 border border-white/10 text-[11px] sm:text-xs font-semibold tracking-wide text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16805C] shrink-0" />
              <span className="truncate">{t.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {t.heroTitleLine1} <br />
              <span className="text-slate-300">{t.heroTitleLine2}</span> <br />
              <span className="text-[#94A3B8]">{t.heroTitleLine3}</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 pt-2">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidth className="gap-2 shadow-md text-xs sm:text-sm">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{t.btnFindWork}</span>
                </Button>
              </Link>

              <Link href="/workers" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth className="gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20 text-xs sm:text-sm">
                  <HardHat className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{t.btnFindWorkers}</span>
                </Button>
              </Link>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsCreateProjectModalOpen(true)}
                className="w-full sm:w-auto bg-[#16805C] hover:bg-[#16805C]/90 text-white gap-2 shadow-md text-xs sm:text-sm"
              >
                <span>{t.btnPostProject}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 sm:pt-6 border-t border-[#245A7A]/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16805C] shrink-0" />
                <span>{t.escrowProtected}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16805C] shrink-0" />
                <span>{t.verifiedWorkers}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16805C] shrink-0" />
                <span>{t.dailyReports}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#245A7A]/40 backdrop-blur-xs p-2.5 sm:p-3">
              <div className="relative h-60 sm:h-80 w-full rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=1000&auto=format&fit=crop&q=80"
                  alt="Modern African Building Construction Site"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D] via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <Badge variant="VERIFIED" size="sm" className="bg-white text-[#17324D] shadow-md border-0 text-[10px] sm:text-xs">
                    {t.heroVerifiedTag}
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-lg bg-[#17324D]/90 backdrop-blur-md border border-white/10 text-white space-y-1.5">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span className="font-semibold text-white truncate mr-2">East Legon Villa Development</span>
                    <span className="text-[#16805C] font-bold shrink-0">78% {t.heroProgress}</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#16805C] h-full w-[78%]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 pt-1">
                    <span>17 {t.heroActiveWorkers}</span>
                    <span>{t.heroBudget}: GHS 220,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Search Bar Component */}
        <div className="mt-8 sm:mt-12">
          <SearchBar />
        </div>

      </div>
    </div>
  );
};
