'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2, Lock, AlertTriangle, DollarSign } from 'lucide-react';

export default function ContractDetailViewerPage() {
  const params = useParams();
  const router = useRouter();
  const { contracts, showToast, setIsOpenDisputeModalOpen, currentCurrency } = useApp();

  const contractId = params?.id as string;
  const contract = contracts.find((c) => c.id === contractId) || contracts[0];

  const [isSigned, setIsSigned] = useState(contract.status === 'ACTIVE' || contract.status === 'COMPLETED');

  const handleSignContract = () => {
    setIsSigned(true);
    showToast(`Contract ${contract.contractNumber} digitally signed! Escrow deposit initiated.`, 'success');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#245A7A] hover:text-[#17324D] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Digital Contracts
        </button>

        {/* Contract Header */}
        <Card className="p-6 md:p-8 mb-8 border-t-4 border-t-[#17324D]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                  {contract.contractNumber}
                </span>
                <Badge variant={isSigned ? 'AVAILABLE' : 'PENDING'} size="sm">
                  {isSigned ? 'ACTIVE' : contract.status}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#17324D]">
                {contract.title}
              </h1>

              <p className="text-xs text-[#64748B] mt-1">
                Site Project: <strong>{contract.projectName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isSigned && (
                <Button variant="primary" onClick={handleSignContract} className="bg-[#16805C] hover:bg-[#16805C]/90 gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Sign Digital Contract
                </Button>
              )}

              <Button
                variant="danger"
                size="sm"
                onClick={() => setIsOpenDisputeModalOpen(true)}
                className="gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" /> Open Dispute
              </Button>
            </div>
          </div>
        </Card>

        {/* Transparent Financial Model Box (Section 20 Requirement) */}
        <Card className="p-6 mb-8 bg-[#17324D] text-white border border-[#245A7A]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16805C]" />
            Financial & Transparent Commission Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
            <div className="p-4 rounded-lg bg-[#245A7A]/50 border border-white/10">
              <span className="text-xs font-sans text-slate-300 uppercase block font-bold">Total Contract Value</span>
              <span className="text-xl font-black text-white">{currentCurrency} {contract.totalAmountGHS.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-lg bg-[#245A7A]/50 border border-white/10">
              <span className="text-xs font-sans text-amber-300 uppercase block font-bold">GAB-work Fee (10%)</span>
              <span className="text-xl font-black text-amber-300">- {currentCurrency} {contract.gabWorkFeeGHS.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-lg bg-[#16805C]/20 border border-[#16805C]/40">
              <span className="text-xs font-sans text-[#16805C] uppercase block font-bold">Net Provider Amount</span>
              <span className="text-xl font-black text-[#16805C]">{currentCurrency} {contract.netProviderAmountGHS.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Contract Scope & Parties */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            
            <Card className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#17324D] uppercase tracking-wider pb-2 border-b border-slate-200">
                Contract Parties & Legal Terms
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Client / Employer</span>
                  <span className="font-bold text-[#17324D] text-sm">{contract.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Artisan / Contractor</span>
                  <span className="font-bold text-[#17324D] text-sm">{contract.providerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Start Date</span>
                  <span className="font-bold text-[#17324D]">{contract.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">End Date</span>
                  <span className="font-bold text-[#17324D]">{contract.endDate}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px] mb-1">Escrow Release Schedule</span>
                <p className="text-xs text-[#64748B] bg-[#F5F7F9] p-3 rounded border border-slate-200">
                  {contract.paymentTerms}
                </p>
              </div>
            </Card>

            {/* Milestones Schedule */}
            <Card className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#17324D] uppercase tracking-wider pb-2 border-b border-slate-200">
                Milestones & Escrow Release Status
              </h3>

              <div className="space-y-4">
                {contract.milestones.map((m) => (
                  <div key={m.id} className="p-4 bg-[#F5F7F9] rounded-lg border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <h4 className="font-bold text-[#17324D]">{m.name}</h4>
                        <span className="text-slate-400">Deadline: {m.deadline}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#17324D]">
                          {currentCurrency} {m.amountGHS.toLocaleString()}
                        </span>
                        <div>
                          <Badge variant={m.status === 'APPROVED' ? 'VERIFIED' : 'PENDING'} size="sm">
                            {m.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ProgressBar progress={m.progress} colorClass="bg-[#16805C]" />
                  </div>
                ))}
              </div>
            </Card>

          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase text-[#17324D]">Escrow Custody Status</h4>
              <div className="p-3 bg-[#16805C]/10 rounded border border-[#16805C]/30 text-xs text-[#16805C]">
                ✓ Escrow deposit active. Funds protected under GAB-work Guarantee.
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
