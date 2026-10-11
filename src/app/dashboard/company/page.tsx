'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PlusCircle } from 'lucide-react';

export default function CompanyDashboardPage() {
  const { companies, jobs, setIsPostJobModalOpen, currentCurrency, t } = useApp();
  const company = companies[0];

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 p-1">
              <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#17324D]">{company.name}</h1>
                <Badge variant="VERIFIED" size="sm">{t.statusVerified}</Badge>
              </div>
              <p className="text-xs text-[#64748B] line-clamp-1">{company.tagline}</p>
            </div>
          </div>

          <Button variant="primary" onClick={() => setIsPostJobModalOpen(true)} className="w-full sm:w-auto gap-2 text-xs sm:text-sm">
            <PlusCircle className="w-4 h-4" /> {t.btnViewJobs}
          </Button>
        </div>

        {/* 6 Stats Cards (Responsive 2 cols on mobile, 3 on tablet, 6 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.activeProjects}</span>
            <span className="text-xl sm:text-2xl font-black text-[#17324D]">4</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.employees}</span>
            <span className="text-xl sm:text-2xl font-black text-[#245A7A]">{company.employeesCount}</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.tabJobs}</span>
            <span className="text-xl sm:text-2xl font-black text-[#16805C]">{company.activeJobsCount}</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.activeContracts}</span>
            <span className="text-xl sm:text-2xl font-black text-[#17324D]">12</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.revenue}</span>
            <span className="text-base sm:text-lg font-black text-[#16805C]">
              {currentCurrency} 980K
            </span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.pendingEscrow}</span>
            <span className="text-base sm:text-lg font-black text-[#D97706]">
              {currentCurrency} 85K
            </span>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-4 sm:p-6 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider pb-3 border-b border-slate-200">
                {t.jobsTitle}
              </h3>
              <div className="space-y-3 text-xs">
                {jobs.map((j) => (
                  <div key={j.id} className="p-3 bg-[#F5F7F9] rounded border border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <h4 className="font-bold text-[#17324D]">{j.title}</h4>
                      <span className="text-slate-400">{j.location} • {j.salaryRange}</span>
                    </div>
                    <Badge variant="VERIFIED" size="sm" className="w-fit">{t.statusAvailable}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">Company Portal</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs">
                <Link href="/projects" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">→ {t.projects}</Link>
                <Link href="/workers" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">→ {t.findWorkers}</Link>
                <Link href="/contracts" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">→ {t.activeContracts}</Link>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
