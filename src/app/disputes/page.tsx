'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function DisputesPage() {
  const { disputes, setIsOpenDisputeModalOpen, currentCurrency, t } = useApp();

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C2413B] bg-[#C2413B]/10 px-2.5 py-0.5 rounded">
                {t.disputeQueue}
              </span>
              <span className="text-xs text-slate-500">• Neutral Arbitration</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.disputeQueue}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.trustSubtitle}
            </p>
          </div>

          <Button variant="danger" onClick={() => setIsOpenDisputeModalOpen(true)} className="mt-4 md:mt-0 gap-2">
            <AlertTriangle className="w-4 h-4" /> {t.btnOpenDispute}
          </Button>
        </div>

        {/* Disputes Queue */}
        <div className="space-y-4">
          {disputes.map((d) => (
            <Card key={d.id} hoverEffect className="p-6 border-l-4 border-l-[#C2413B]">
              <div className="space-y-3">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      {d.disputeNumber}
                    </span>
                    <h3 className="text-lg font-bold text-[#17324D] mt-1">{d.contractTitle}</h3>
                  </div>
                  <Badge variant="DISPUTE" size="sm">
                    {t.statusDispute}
                  </Badge>
                </div>

                <div className="p-3 bg-[#C2413B]/10 rounded border border-[#C2413B]/20 text-xs text-[#C2413B] font-bold">
                  Reason: {d.reason}
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {d.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div>Opened by: <strong>{d.openedBy}</strong></div>
                  <div>Against: <strong>{d.against}</strong></div>
                  <div>Evidence: <strong>{d.evidenceFilesCount} Files</strong></div>
                  <div>Disputed Value: <strong className="text-[#C2413B]">{currentCurrency} {d.amountInQuestionGHS.toLocaleString()}</strong></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
