'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const {
    workers,
    companies,
    jobs,
    projects,
    contracts,
    disputes,
    payments,
    auditLogs,
    currentCurrency,
    showToast,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'VERIFICATION' | 'DISPUTES' | 'AUDIT'>('OVERVIEW');

  // Calculate GAB-work 10% commission total revenue
  const totalGabRevenue = contracts.reduce((acc, c) => acc + c.gabWorkFeeGHS, 0);

  const handleApproveDocument = (userName: string) => {
    showToast(`Verification document for ${userName} approved!`, 'success');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C2413B] bg-[#C2413B]/10 px-2.5 py-0.5 rounded">
                Super Admin Console
              </span>
              <Badge variant="VERIFIED" size="sm">{t.statusVerified}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.dashboard} - GAB-work Administration
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              {t.trustSubtitle}
            </p>
          </div>
        </div>

        {/* 8 Metric Cards (Responsive 2 cols on mobile, 4 on tablet, 8 on large) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <Card className="p-2.5 sm:p-3">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block truncate">{t.tabWorkers}</span>
            <span className="text-lg sm:text-xl font-black text-[#17324D]">1,240</span>
          </Card>

          <Card className="p-2.5 sm:p-3">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block truncate">{t.activeWorkers}</span>
            <span className="text-lg sm:text-xl font-black text-[#245A7A]">{workers.length + 850}</span>
          </Card>

          <Card className="p-2.5 sm:p-3">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block truncate">{t.companies}</span>
            <span className="text-lg sm:text-xl font-black text-[#17324D]">{companies.length + 120}</span>
          </Card>

          <Card className="p-2.5 sm:p-3">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block truncate">{t.activeProjects}</span>
            <span className="text-lg sm:text-xl font-black text-[#16805C]">{projects.length + 18}</span>
          </Card>

          <Card className="p-2.5 sm:p-3">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block truncate">{t.activeContracts}</span>
            <span className="text-lg sm:text-xl font-black text-[#17324D]">{contracts.length + 42}</span>
          </Card>

          <Card className="p-2.5 sm:p-3">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block truncate">{t.escrowVolume}</span>
            <span className="text-xs sm:text-sm font-black text-[#16805C]">{currentCurrency} 2.4M</span>
          </Card>

          <Card className="p-2.5 sm:p-3 bg-[#17324D] text-white">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase block truncate">{t.revenue} (10%)</span>
            <span className="text-xs sm:text-sm font-black text-amber-300">{currentCurrency} {totalGabRevenue.toLocaleString()}</span>
          </Card>

          <Card className="p-2.5 sm:p-3 bg-[#C2413B]/10 border-[#C2413B]/30">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#C2413B] uppercase block truncate">{t.disputeQueue}</span>
            <span className="text-lg sm:text-xl font-black text-[#C2413B]">{disputes.length}</span>
          </Card>
        </div>

        {/* Tab Controls with touch scrollbar */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl p-1.5 sm:p-2 gap-1.5 overflow-x-auto mb-6 scrollbar-none">
          {[
            { id: 'OVERVIEW', label: t.platformHeader },
            { id: 'VERIFICATION', label: t.verifiedWorkers },
            { id: 'DISPUTES', label: t.disputeQueue },
            { id: 'AUDIT', label: t.auditLogs },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#17324D] text-white shadow-xs'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="p-4 sm:p-6 space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider pb-3 border-b border-slate-200">
                  {t.escrowProtected}
                </h3>
                <div className="space-y-3 text-xs">
                  {payments.map((p) => (
                    <div key={p.id} className="p-3 bg-[#F5F7F9] rounded border border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <span className="font-mono font-bold text-[#17324D]">{p.reference}</span>
                        <p className="text-slate-500">{p.contractTitle} • {p.type}</p>
                      </div>
                      <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-center sm:items-end pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                        <span className="font-bold text-[#16805C]">{currentCurrency} {p.amountGHS.toLocaleString()}</span>
                        <div className="text-[10px] text-amber-700">10% Fee: {currentCurrency} {p.feeGHS}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="p-4 sm:p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">System Status</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Escrow Vault Status</span>
                    <span className="font-bold text-[#16805C]">Operational 100%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>MTN MoMo API Gateway</span>
                    <span className="font-bold text-[#16805C]">Connected</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>NVTI Registry API</span>
                    <span className="font-bold text-[#16805C]">Verified</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'VERIFICATION' && (
          <Card className="p-4 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider pb-3 border-b border-slate-200">
              {t.verifiedWorkers}
            </h3>
            <div className="space-y-3">
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-bold text-[#17324D] text-sm">Kwame Mensah</h4>
                    <Badge variant="PENDING" size="sm">NVTI Master Mason Level 1</Badge>
                  </div>
                  <p className="text-slate-500 text-[11px] sm:text-xs">Document: Ghana National ID & NVTI Trade Certificate #NVTI-GH-9921</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" onClick={() => handleApproveDocument('Kwame Mensah')} className="w-full sm:w-auto bg-[#16805C] hover:bg-[#16805C]/90 text-xs">
                    {t.statusVerified}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'DISPUTES' && (
          <Card className="p-4 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider pb-3 border-b border-slate-200">
              {t.disputeQueue}
            </h3>
            <div className="space-y-4">
              {disputes.map((d) => (
                <div key={d.id} className="p-3 sm:p-4 bg-white rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center font-bold text-[#17324D]">
                    <span className="truncate pr-2">{d.disputeNumber} - {d.contractTitle}</span>
                    <Badge variant="DISPUTE" size="sm" className="shrink-0">{t.statusDispute}</Badge>
                  </div>
                  <p className="text-slate-600"><strong>Reason:</strong> {d.reason}</p>
                  <p className="text-slate-500">{d.description}</p>
                  <div className="pt-2 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="font-bold text-[#C2413B]">Disputed Amount: {currentCurrency} {d.amountInQuestionGHS.toLocaleString()}</span>
                    <Link href="/disputes">
                      <Button size="sm" variant="outline" className="w-full sm:w-auto text-xs">Arbitrate</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'AUDIT' && (
          <Card className="p-4 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider pb-3 border-b border-slate-200">
              {t.auditLogs}
            </h3>
            <div className="space-y-3 font-mono text-[11px] sm:text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-[#F5F7F9] rounded border border-slate-200 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between text-[#17324D] font-bold">
                    <span>[{log.action}] {log.actor}</span>
                    <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-600 truncate">Resource: {log.resource} • IP: {log.ipAddress}</div>
                  <div className="text-slate-500 font-sans italic text-[11px]">{log.details}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
