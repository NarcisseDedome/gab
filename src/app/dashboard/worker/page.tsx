'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Star } from 'lucide-react';

export default function WorkerDashboardPage() {
  const { workers, contracts, applications, currentCurrency, showToast, t } = useApp();
  const worker = workers[0]; // Kwame Mensah

  const [availability, setAvailability] = useState<'AVAILABLE' | 'PENDING' | 'UNAVAILABLE'>('AVAILABLE');

  const toggleAvailability = (status: 'AVAILABLE' | 'PENDING' | 'UNAVAILABLE') => {
    setAvailability(status);
    showToast(`Availability status updated to ${status}!`, 'info');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Banner */}
        <Card className="p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-t-4 border-t-[#17324D]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-[#17324D] shrink-0 bg-slate-100">
                <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#17324D]">{t.welcomeBack}, {worker.name}</h1>
                <p className="text-xs font-semibold text-[#245A7A]">{worker.trade} • {worker.city}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] sm:text-xs text-slate-500 font-bold">{t.availabilityLabel}:</span>
                  <Badge variant={availability} size="sm">
                    {availability === 'AVAILABLE' ? t.statusAvailable : availability === 'UNAVAILABLE' ? t.statusUnavailable : t.statusPending}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Availability Toggle with mobile touch buttons */}
            <div className="w-full md:w-auto flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 overflow-x-auto">
              <button
                onClick={() => toggleAvailability('AVAILABLE')}
                className={`flex-1 md:flex-none px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap text-center ${availability === 'AVAILABLE' ? 'bg-[#16805C] text-white shadow-xs' : 'text-slate-600'}`}
              >
                {t.availableNow}
              </button>
              <button
                onClick={() => toggleAvailability('PENDING')}
                className={`flex-1 md:flex-none px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap text-center ${availability === 'PENDING' ? 'bg-[#D97706] text-white shadow-xs' : 'text-slate-600'}`}
              >
                {t.availableSoon}
              </button>
              <button
                onClick={() => toggleAvailability('UNAVAILABLE')}
                className={`flex-1 md:flex-none px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap text-center ${availability === 'UNAVAILABLE' ? 'bg-slate-400 text-white shadow-xs' : 'text-slate-600'}`}
              >
                {t.statusUnavailable}
              </button>
            </div>
          </div>
        </Card>

        {/* 5 Stats Cards (Responsive 2 cols on mobile, 5 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.applications}</span>
            <span className="text-xl sm:text-2xl font-black text-[#17324D]">8</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">3 Shortlisted</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.activeContracts}</span>
            <span className="text-xl sm:text-2xl font-black text-[#245A7A]">2</span>
            <span className="text-[10px] sm:text-[11px] text-[#16805C] font-semibold block truncate">In Progress</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.projectsCompleted}</span>
            <span className="text-xl sm:text-2xl font-black text-[#16805C]">27</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">Verified BTP</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.reviewsCount}</span>
            <span className="text-xl sm:text-2xl font-black text-amber-600 flex items-center gap-1">
              4.8 <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">38 {t.reviewsCount}</span>
          </Card>

          <Card className="p-3 sm:p-4 col-span-2 sm:col-span-1">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.netEarnings}</span>
            <span className="text-lg sm:text-xl font-black text-[#16805C]">
              {currentCurrency} 4,800
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">After 10% Fee</span>
          </Card>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider">
                  {t.activeContracts}
                </h3>
                <Link href="/contracts" className="text-xs font-bold text-[#245A7A]">View All</Link>
              </div>

              <div className="space-y-3">
                {contracts.slice(0, 2).map((cnt) => (
                  <div key={cnt.id} className="p-3 sm:p-4 bg-[#F5F7F9] rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs">
                    <div>
                      <h4 className="font-bold text-[#17324D]">{cnt.title}</h4>
                      <span className="text-slate-500">Client: {cnt.clientName}</span>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-center sm:items-end pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <span className="font-bold text-[#16805C]">
                        {currentCurrency} {cnt.netProviderAmountGHS.toLocaleString()}
                      </span>
                      <div className="text-[10px] text-slate-400">(10% GAB Fee deducted)</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Applications List */}
            <Card className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider">
                  {t.applications}
                </h3>
                <Link href="/jobs" className="text-xs font-bold text-[#245A7A]">{t.findJobs}</Link>
              </div>

              <div className="space-y-3 text-xs">
                {applications.map((app) => (
                  <div key={app.id} className="p-3 bg-white rounded border border-slate-200 flex justify-between items-center gap-2">
                    <div className="truncate">
                      <h4 className="font-bold text-[#17324D] truncate">{app.jobTitle}</h4>
                      <span className="text-slate-400 text-[11px]">{t.postedDate}: {app.appliedDate}</span>
                    </div>
                    <Badge variant={app.status === 'SHORTLISTED' ? 'VERIFIED' : 'PENDING'} size="sm" className="shrink-0 text-[10px]">
                      {app.status === 'SHORTLISTED' ? t.statusVerified : t.statusPending}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">Navigation</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs">
                <Link href="/jobs" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → {t.findJobs}
                </Link>
                <Link href="/contracts" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → {t.activeContracts}
                </Link>
                <Link href="/messages" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → Messages
                </Link>
                <Link href="/payments" className="block p-2.5 bg-[#F5F7F9] hover:bg-slate-200 rounded font-semibold text-[#17324D] text-center lg:text-left">
                  → Escrow & {t.revenue}
                </Link>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
