'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ClipboardList, FileText } from 'lucide-react';

export default function SiteManagerDashboardPage() {
  const { projects, siteReports, setIsDailyReportModalOpen, t } = useApp();
  const project = projects[0];

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Card className="p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-t-4 border-t-[#17324D]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                  {t.dashboard}
                </span>
                <Badge variant="VERIFIED" size="sm">{t.statusVerified}</Badge>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#17324D]">
                Abena Osei (Responsable de Site)
              </h1>
              <p className="text-xs text-[#64748B] mt-1">
                Active Assignment: <strong>{project.name}</strong> ({project.location})
              </p>
            </div>

            <Button variant="primary" onClick={() => setIsDailyReportModalOpen(true)} className="w-full sm:w-auto gap-2 text-xs sm:text-sm">
              <FileText className="w-4 h-4" /> {t.btnLogDailyReport}
            </Button>
          </div>
        </Card>

        {/* Site Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.activeWorkers}</span>
            <span className="text-xl sm:text-2xl font-black text-[#17324D]">15 / 17</span>
            <span className="text-[10px] sm:text-[11px] text-[#16805C] font-semibold block truncate">{t.statusVerified}</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.projects}</span>
            <span className="text-xl sm:text-2xl font-black text-[#16805C]">{project.overallProgress}%</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">Slab Complete</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.dailyReports}</span>
            <span className="text-xl sm:text-2xl font-black text-[#245A7A]">{siteReports.length} Logs</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">Approved</span>
          </Card>

          <Card className="p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase block truncate">{t.statusDispute}</span>
            <span className="text-xl sm:text-2xl font-black text-[#16805C]">0</span>
            <span className="text-[10px] sm:text-[11px] text-[#16805C] font-semibold block truncate">No Delay</span>
          </Card>
        </div>

        {/* Reports & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-4 sm:p-6 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider pb-3 border-b border-slate-200">
                {t.dailyReports}
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {siteReports.map((r) => (
                  <div key={r.id} className="p-3 sm:p-4 bg-white rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center font-bold text-[#17324D]">
                      <span>{t.postedDate}: {r.date}</span>
                      <span className="text-[#16805C]">✓ Client Verified</span>
                    </div>
                    <p className="text-slate-600">{r.summary}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-slate-500 text-[11px]">
                      <span>Present: {r.workersPresent}</span>
                      <span>Weather: {r.weatherCondition}</span>
                      <span>Progress: {r.progressPercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">Site Actions</h3>
              <div className="space-y-2 text-xs">
                <Button variant="outline" fullWidth onClick={() => setIsDailyReportModalOpen(true)} className="justify-start gap-2">
                  <FileText className="w-4 h-4 text-[#245A7A]" /> {t.btnLogDailyReport}
                </Button>
                <Link href={`/projects/${project.id}`}>
                  <Button variant="outline" fullWidth className="justify-start gap-2 text-left mt-2">
                    <ClipboardList className="w-4 h-4 text-[#17324D]" /> View Full Site Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
