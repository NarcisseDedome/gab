'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const CreateProjectModal: React.FC = () => {
  const { isCreateProjectModalOpen, setIsCreateProjectModalOpen, addProject, currentCurrency, t } = useApp();

  const [name, setName] = useState('');
  const [type, setType] = useState('Residential Luxury Construction');
  const [location, setLocation] = useState('East Legon, Accra');
  const [estimatedBudgetGHS, setEstimatedBudgetGHS] = useState(150000);
  const [startDate, setStartDate] = useState('2026-11-01');
  const [expectedCompletion, setExpectedCompletion] = useState('2027-04-30');
  const [workersCount, setWorkersCount] = useState(12);
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('Masonry, Electrical, Plumbing, Tiling');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    addProject({
      name,
      type,
      location,
      clientName: 'Dr. Samuel Mensah (Client)',
      clientId: 'u-client-1',
      estimatedBudgetGHS,
      startDate,
      expectedCompletion,
      workersCount,
      siteManagerName: 'Abena Osei',
      description,
      requiredSkills: skillsInput.split(',').map((s) => s.trim()),
      latestPhotos: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80'
      ]
    });

    setIsCreateProjectModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isCreateProjectModalOpen}
      onClose={() => setIsCreateProjectModalOpen(false)}
      title={t.btnPostProject}
      subtitle={t.heroSubtitle}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#17212B]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cantonments 3-Storey Office Building"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Project Type *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            >
              <option value="Residential Luxury Construction">Residential Luxury Construction</option>
              <option value="Commercial Warehouse / High-Rise">Commercial Warehouse / High-Rise</option>
              <option value="Infrastructure & Civil Works">Infrastructure & Civil Works</option>
              <option value="Renovation & Fit-out">Renovation & Fit-out</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              {t.locationLabel}
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Budget ({currentCurrency})
            </label>
            <input
              type="number"
              value={estimatedBudgetGHS}
              onChange={(e) => setEstimatedBudgetGHS(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              {t.workersNeeded}
            </label>
            <input
              type="number"
              value={workersCount}
              onChange={(e) => setWorkersCount(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Expected Completion
            </label>
            <input
              type="date"
              value={expectedCompletion}
              onChange={(e) => setExpectedCompletion(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Required Trades / Skills
          </label>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Description *
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detail architectural scope, foundation specs, materials provision..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div className="bg-[#17324D]/5 p-3 rounded-md border border-[#17324D]/20 text-xs text-[#17324D] flex justify-between items-center">
          <span>{t.escrowProtected}</span>
          <span className="font-bold">10% Transparent Fee</span>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setIsCreateProjectModalOpen(false)}>
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
