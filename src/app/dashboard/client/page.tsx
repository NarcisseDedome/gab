'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PlusCircle } from 'lucide-react';

export default function ClientDashboardPage() {
  const { projects, contracts, setIsCreateProjectModalOpen, currentCurrency, t } = useApp();

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                Client Portal
              </span>
              <Badge variant="VERIFIED" size="sm">{t.verifiedEmployer}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.dashboard} - Dr. Samuel Mensah
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              {t.heroSubtitle}
            </p>
          </div>

          <Button variant="primary" onClick={() => setIsCreateProjectModalOpen(true)} className="w-full sm:w-auto gap-2 text-xs sm:text-sm">
            <PlusCircle className="w-4 h-4" /> {t.btnPostProject}
          </Button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.activeProjects}</span>
            <span className="text-2xl sm:text-3xl font-black text-[#17324D]">3</span>
            <span className="text-[10px] sm:text-[11px] text-[#16805C] font-semibold block truncate">Accra & Tema</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.activeContracts}</span>
            <span className="text-2xl sm:text-3xl font-black text-[#245A7A]">5</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">Digitally Signed</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.totalSpent}</span>
            <span className="text-xl sm:text-2xl font-black text-[#17324D]">
              {currentCurrency} 250,000
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">Secured Escrow</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.pendingEscrow}</span>
            <span className="text-xl sm:text-2xl font-black text-[#D97706]">
              {currentCurrency} 45,000
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#D97706] font-semibold block truncate">Pending Approval</span>
          </Card>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Projects */}
            <Card className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider">
                  {t.activeProjects}
                </h3>
                <Link href="/projects" className="text-xs font-bold text-[#245A7A]">View All</Link>
              </div>

              <div className="space-y-4">
                {projects.map((p) => (
                  <div key={p.id} className="p-3 sm:p-4 bg-[#F5F7F9] rounded-lg border border-slate-200 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h4 className="font-bold text-[#17324D] text-sm">{p.name}</h4>
                        <span className="text-xs text-slate-500">{p.location} • Manager: {p.siteManagerName}</span>
                      </div>
                      <Link href={`/projects/${p.id}`}>
                        <Button size="sm" variant="outline" className="w-full sm:w-auto text-xs">Site Dashboard</Button>
                      </Link>
                    </div>
                    <ProgressBar progress={p.overallProgress} colorClass="bg-[#16805C]" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Contracts */}
            <Card className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider">
                  {t.activeContracts}
                </h3>
                <Link href="/contracts" className="text-xs font-bold text-[#245A7A]">View All</Link>
              </div>

              <div className="space-y-3">
                {contracts.map((c) => (
                  <div key={c.id} className="p-3 sm:p-4 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs">
                    <div>
                      <h4 className="font-bold text-[#17324D]">{c.title}</h4>
                      <span className="text-slate-500">Provider: {c.providerName}</span>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-center sm:items-end pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <span className="font-bold text-[#17324D]">
                        {currentCurrency} {c.totalAmountGHS.toLocaleString()}
                      </span>
                      <div className="text-[10px] text-amber-700">(GAB Fee: -{c.gabWorkFeeGHS.toLocaleString()})</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">Navigation</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs">
                <Link href="/workers" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → {t.findWorkers}
                </Link>
                <Link href="/companies" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → {t.companies}
                </Link>
                <Link href="/messages" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → Messages
                </Link>
                <Link href="/disputes" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → {t.disputeQueue}
                </Link>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
