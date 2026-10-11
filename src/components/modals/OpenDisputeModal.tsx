'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const OpenDisputeModal: React.FC = () => {
  const { isOpenDisputeModalOpen, setIsOpenDisputeModalOpen, addDispute, contracts, activeRole, t } = useApp();

  const [contractId, setContractId] = useState('cnt-101');
  const [reason, setReason] = useState('Non-compliant Material Specification or Delay');
  const [description, setDescription] = useState('');
  const [amountInQuestionGHS, setAmountInQuestionGHS] = useState(15000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCnt = contracts.find((c) => c.id === contractId);

    addDispute({
      contractId,
      contractTitle: targetCnt ? targetCnt.title : 'East Legon Villa Contract',
      openedBy: `${activeRole.toUpperCase()} (User)`,
      against: targetCnt ? targetCnt.providerName : 'Subcontractor',
      reason,
      description: description || 'Specification variance noted during site manager inspection.',
      amountInQuestionGHS,
      evidenceFilesCount: 2,
    });

    setIsOpenDisputeModalOpen(false);
  };

  return (
    <Modal
      isOpen={isOpenDisputeModalOpen}
      onClose={() => setIsOpenDisputeModalOpen(false)}
      title={t.btnOpenDispute}
      subtitle={t.statusDispute}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#17212B]">
        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Select Associated Contract *
          </label>
          <select
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          >
            {contracts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.contractNumber} - {c.title} (GHS {c.totalAmountGHS.toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Primary Reason *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            >
              <option value="Non-compliant Material Specification">Non-compliant Material Specification</option>
              <option value="Unexcused Milestone Deadline Breach">Unexcused Milestone Deadline Breach</option>
              <option value="Work Quality Defect / Failed Inspection">Work Quality Defect / Failed Inspection</option>
              <option value="Unapproved Subcontracting / Abandonment">Unapproved Subcontracting / Abandonment</option>
              <option value="Payment Release Withholding Dispute">Payment Release Withholding Dispute</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Disputed Escrow Amount (GHS)
            </label>
            <input
              type="number"
              value={amountInQuestionGHS}
              onChange={(e) => setAmountInQuestionGHS(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Detailed Claim Description & Evidence *
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="State exact timeline of events, milestone agreements, photos taken..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div className="p-3 bg-[#C2413B]/10 rounded-md text-[11px] text-[#C2413B] border border-[#C2413B]/20">
          <strong>Notice:</strong> Opening a dispute freezes pending escrow releases for this contract.
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setIsOpenDisputeModalOpen(false)}>
            {t.btnCancel}
          </Button>
          <Button type="submit" variant="danger">
            {t.btnOpenDispute}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
