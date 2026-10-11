'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Smartphone, Landmark } from 'lucide-react';

export default function PaymentsPage() {
  const { payments, currentCurrency, showToast, t } = useApp();

  const handleWithdraw = () => {
    showToast('Withdrawal request initiated via MTN Mobile Money!', 'success');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#16805C] bg-[#16805C]/10 px-2.5 py-0.5 rounded">
                {t.escrowProtected}
              </span>
              <Badge variant="VERIFIED" size="sm">MTN MoMo & Bank Gateway</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.step4Title} & Escrow
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              {t.step4Desc}
            </p>
          </div>
        </div>

        {/* 3 Wallet Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 bg-[#17324D] text-white">
            <span className="text-xs font-bold uppercase text-slate-300 block">{t.netEarnings}</span>
            <span className="text-2xl sm:text-3xl font-black text-[#16805C]">{currentCurrency} 18,400</span>
            <div className="mt-3 sm:mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-[11px] sm:text-xs text-slate-300">Ready for Instant MoMo</span>
              <Button size="sm" variant="secondary" onClick={handleWithdraw} className="bg-[#16805C] hover:bg-[#16805C]/90 text-white text-xs">
                {t.btnSubmit}
              </Button>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <span className="text-xs font-bold uppercase text-slate-400 block">{t.pendingEscrow}</span>
            <span className="text-2xl sm:text-3xl font-black text-[#D97706]">{currentCurrency} 45,000</span>
            <span className="text-[11px] sm:text-xs text-slate-500 block mt-2">{t.trustSubtitle}</span>
          </Card>

          <Card className="p-4 sm:p-6 sm:col-span-2 md:col-span-1">
            <span className="text-xs font-bold uppercase text-slate-400 block">Payment Methods</span>
            <div className="space-y-2 mt-2 sm:mt-3 text-xs font-bold text-[#17324D]">
              <div className="flex items-center gap-2 p-2 bg-[#F5F7F9] rounded border border-slate-200">
                <Smartphone className="w-4 h-4 text-[#D97706] shrink-0" />
                <span className="truncate">MTN Mobile Money / Telecel Cash</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[#F5F7F9] rounded border border-slate-200">
                <Landmark className="w-4 h-4 text-[#245A7A] shrink-0" />
                <span className="truncate">Ghana Interbank Wire Transfer</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Transactions Table & Mobile Responsive Cards */}
        <Card className="p-4 sm:p-6 space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-[#17324D] uppercase tracking-wider pb-3 border-b border-slate-200">
            {t.escrowProtected} Ledger
          </h3>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-[#17212B]">
              <thead className="bg-[#F5F7F9] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">{t.contractValue}</th>
                  <th className="p-3">{t.platformFee}</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {payments.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-[#17324D]">{tx.reference}</td>
                    <td className="p-3 font-semibold text-[#245A7A]">{tx.contractTitle}</td>
                    <td className="p-3">{tx.type}</td>
                    <td className="p-3">{tx.paymentMethod}</td>
                    <td className="p-3 font-bold text-[#17324D]">{currentCurrency} {tx.amountGHS.toLocaleString()}</td>
                    <td className="p-3 text-amber-700 font-mono font-bold">{currentCurrency} {tx.feeGHS}</td>
                    <td className="p-3">
                      <Badge variant={tx.status === 'COMPLETED' ? 'AVAILABLE' : 'PENDING'} size="sm">
                        {tx.status === 'COMPLETED' ? t.statusVerified : t.statusPending}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Optimized for small screens) */}
          <div className="md:hidden space-y-3">
            {payments.map((tx) => (
              <div key={tx.id} className="p-3 bg-[#F5F7F9] rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-[#17324D]">{tx.reference}</span>
                  <Badge variant={tx.status === 'COMPLETED' ? 'AVAILABLE' : 'PENDING'} size="sm">
                    {tx.status === 'COMPLETED' ? t.statusVerified : t.statusPending}
                  </Badge>
                </div>
                <h4 className="font-semibold text-[#245A7A]">{tx.contractTitle}</h4>
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>{tx.type} • {tx.paymentMethod}</span>
                  <span className="font-bold text-[#16805C] text-xs">{currentCurrency} {tx.amountGHS.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-amber-700 font-mono text-right">
                  Fee: {currentCurrency} {tx.feeGHS}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
