'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const PostJobModal: React.FC = () => {
  const { isPostJobModalOpen, setIsPostJobModalOpen, addJob, currentCurrency, t } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Masonry & Concrete');
  const [companyName, setCompanyName] = useState('Apex Construction Ghana');
  const [location, setLocation] = useState('Accra, Ghana');
  const [country, setCountry] = useState('Ghana');
  const [dailyRateGHS, setDailyRateGHS] = useState(250);
  const [contractType, setContractType] = useState<'Full-time' | 'Contract' | 'Daily Wage' | 'Project-based'>('Contract');
  const [experienceRequired, setExperienceRequired] = useState('3+ years');
  const [workersNeeded, setWorkersNeeded] = useState(4);
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('Masonry, Blueprints, Concrete');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addJob({
      title,
      category,
      companyName,
      companyVerified: true,
      location,
      country,
      salaryRange: `${currentCurrency} ${dailyRateGHS} / day`,
      dailyRateGHS,
      contractType,
      experienceRequired,
      deadline: '2026-11-30',
      workersNeeded,
      description,
      requiredSkills: skillsInput.split(',').map((s) => s.trim()),
      availabilityRequired: 'Immediate',
      travelRequired: false,
    });

    setIsPostJobModalOpen(false);
    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isPostJobModalOpen}
      onClose={() => setIsPostJobModalOpen(false)}
      title={t.btnViewJobs}
      subtitle={t.jobsSubtitle}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#17212B]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Job Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Mason & Site Foreman"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            >
              <option value="Masonry & Concrete">Masonry & Concrete</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Painting">Painting</option>
              <option value="Tiling">Tiling</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Structural Welding">Structural Welding</option>
              <option value="Site Management">Site Management</option>
              <option value="Equipment Rental">Equipment Rental</option>
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
              {t.dailyRate} ({currentCurrency})
            </label>
            <input
              type="number"
              value={dailyRateGHS}
              onChange={(e) => setDailyRateGHS(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Contract Type
            </label>
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            >
              <option value="Contract">Contract</option>
              <option value="Full-time">Full-time</option>
              <option value="Daily Wage">Daily Wage</option>
              <option value="Project-based">Project-based</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              {t.workersNeeded}
            </label>
            <input
              type="number"
              value={workersNeeded}
              onChange={(e) => setWorkersNeeded(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Required Skills
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
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
            placeholder="Describe project responsibilities, site conditions, working hours..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setIsPostJobModalOpen(false)}>
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
