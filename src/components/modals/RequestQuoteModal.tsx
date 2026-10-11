'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const RequestQuoteModal: React.FC = () => {
  const {
    isRequestQuoteModalOpen,
    setIsRequestQuoteModalOpen,
    selectedWorkerForQuote,
    showToast,
    currentCurrency,
    t
  } = useApp();

  const [projectTitle, setProjectTitle] = useState('East Legon Villa Construction');
  const [requiredService, setRequiredService] = useState('Masonry & Superstructure Blockwork');
  const [quantity, setQuantity] = useState('350 sq meters blockwork');
  const [budget, setBudget] = useState(25000);
  const [deadline, setDeadline] = useState('2026-11-15');
  const [description, setDescription] = useState('');

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Quote request sent to ${selectedWorkerForQuote?.name || 'Professional'}!`, 'success');
    setIsRequestQuoteModalOpen(false);
  };

  return (
    <Modal
      isOpen={isRequestQuoteModalOpen}
      onClose={() => setIsRequestQuoteModalOpen(false)}
      title={`${t.btnRequestQuote} - ${selectedWorkerForQuote?.name || 'Worker'}`}
      subtitle={`${selectedWorkerForQuote?.trade || 'BTP Specialist'} • ${t.dailyRate}: ${currentCurrency} ${selectedWorkerForQuote?.dailyRateGHS || 200}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSendQuote} className="space-y-4 text-xs text-[#17212B]">
        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Associated Project Title
          </label>
          <input
            type="text"
            required
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Service / Scope
            </label>
            <input
              type="text"
              required
              value={requiredService}
              onChange={(e) => setRequiredService(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Quantity / Measurement
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 250 sq meters / 14 days"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Budget ({currentCurrency})
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Detailed Notes
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Include specific requirements regarding scaffolding, equipment, materials supply..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div className="p-3 bg-slate-100 rounded-md text-[11px] text-slate-600 border border-slate-200">
          {t.howSubtitle}
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setIsRequestQuoteModalOpen(false)}>
            {t.btnCancel}
          </Button>
          <Button type="submit" variant="primary">
            {t.btnSubmit}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
