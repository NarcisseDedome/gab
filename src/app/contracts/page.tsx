'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ContractStatus } from '@/types';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function ContractsPage() {
  const { contracts, currentCurrency, t } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredContracts = contracts.filter((c) => {
    if (selectedStatus === 'ALL') return true;
    return c.status === selectedStatus;
  });

  const getStatusVariant = (status: ContractStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'AVAILABLE';
      case 'COMPLETED':
        return 'VERIFIED';
      case 'PENDING_SIGNATURE':
      case 'NEGOTIATION':
      case 'DRAFT':
        return 'PENDING';
      case 'DISPUTED':
        return 'DISPUTE';
      default:
        return 'UNAVAILABLE';
    }
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                {t.activeContracts}
              </span>
              <span className="text-xs text-slate-500">• {filteredContracts.length} {t.activeContracts}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.step3Title}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.step3Desc}
            </p>
          </div>
        </div>

        {/* Transparent Fee Banner */}
        <div className="bg-[#17324D] text-white p-5 rounded-xl border border-[#245A7A] mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#16805C] tracking-wider">
              <ShieldCheck className="w-4 h-4" /> {t.commissionModelTitle}
            </div>
            <p className="text-sm text-slate-200 font-medium">
              {t.commissionModelDesc}
            </p>
          </div>
          <div className="bg-[#245A7A]/60 px-4 py-2 rounded-lg border border-white/10 text-xs font-bold font-mono text-amber-300 shrink-0">
            {t.platformFee}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl p-2 gap-2 overflow-x-auto mb-6">
          {['ALL', 'ACTIVE', 'PENDING_SIGNATURE', 'COMPLETED', 'DISPUTED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
                selectedStatus === st
                  ? 'bg-[#17324D] text-white'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              {st === 'ALL' ? 'ALL' : st === 'ACTIVE' ? t.statusAvailable : st === 'COMPLETED' ? t.statusVerified : st === 'DISPUTED' ? t.statusDispute : t.statusPending}
            </button>
          ))}
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {filteredContracts.map((cnt) => (
            <Card key={cnt.id} hoverEffect className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      {cnt.contractNumber}
                    </span>
                    <Badge variant={getStatusVariant(cnt.status)} size="sm">
                      {cnt.status === 'ACTIVE' ? t.statusAvailable : cnt.status === 'COMPLETED' ? t.statusVerified : cnt.status === 'DISPUTED' ? t.statusDispute : t.statusPending}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      Duration: {cnt.startDate} to {cnt.endDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#17324D]">
                    <Link href={`/contracts/${cnt.id}`} className="hover:text-[#245A7A]">
                      {cnt.title}
                    </Link>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>Client: <strong>{cnt.clientName}</strong></div>
                    <div>Provider / Worker: <strong>{cnt.providerName}</strong></div>
                    <div>Site: <strong>{cnt.projectName}</strong></div>
                    <div>Terms: <strong>{cnt.paymentTerms}</strong></div>
                  </div>
                </div>

                {/* Explicit 10% Fee Breakdown Display */}
                <div className="bg-[#F5F7F9] p-4 rounded-lg border border-slate-200 text-xs space-y-1.5 w-full lg:w-72 shrink-0">
                  <div className="flex justify-between text-slate-600">
                    <span>{t.contractValue}</span>
                    <span className="font-mono font-bold text-[#17324D]">
                      {currentCurrency} {cnt.totalAmountGHS.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-amber-700">
                    <span>{t.platformFee}</span>
                    <span className="font-mono font-bold">
                      - {currentCurrency} {cnt.gabWorkFeeGHS.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-slate-200 flex justify-between text-sm font-bold text-[#16805C]">
                    <span>{t.netPayout}</span>
                    <span className="font-mono text-[#16805C]">
                      {currentCurrency} {cnt.netProviderAmountGHS.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-2">
                    <Link href={`/contracts/${cnt.id}`}>
                      <Button variant="primary" size="sm" fullWidth className="gap-1">
                        <span>{t.btnSignContract}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
