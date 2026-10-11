'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const DailySiteReportModal: React.FC = () => {
  const { isDailyReportModalOpen, setIsDailyReportModalOpen, addSiteReport, projects, t } = useApp();

  const [projectId, setProjectId] = useState('p-1');
  const [siteManagerName, setSiteManagerName] = useState('Abena Osei (Quantity Surveyor / Site Mgr)');
  const [date, setDate] = useState('2026-10-08');
  const [workersPresent, setWorkersPresent] = useState(16);
  const [workersAbsent, setWorkersAbsent] = useState(1);
  const [progressPercent, setProgressPercent] = useState(80);
  const [weatherCondition, setWeatherCondition] = useState('Clear / Dry 30°C');
  const [summary, setSummary] = useState('');
  const [issuesReported, setIssuesReported] = useState('None');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProj = projects.find((p) => p.id === projectId);

    addSiteReport({
      projectId,
      projectName: selectedProj ? selectedProj.name : 'Villa Project East Legon',
      siteManagerName,
      date,
      workersPresent,
      workersAbsent,
      progressPercent,
      weatherCondition,
      summary: summary || 'Completed upper floor slab reinforcement and waterproofing check.',
      issuesReported,
      photos: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80'
      ],
      verifiedByClient: true,
    });

    setIsDailyReportModalOpen(false);
  };

  return (
    <Modal
      isOpen={isDailyReportModalOpen}
      onClose={() => setIsDailyReportModalOpen(false)}
      title={t.btnLogDailyReport}
      subtitle={t.dailyReports}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#17212B]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Select Project *
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Report Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Present
            </label>
            <input
              type="number"
              value={workersPresent}
              onChange={(e) => setWorkersPresent(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Absent
            </label>
            <input
              type="number"
              value={workersAbsent}
              onChange={(e) => setWorkersAbsent(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Progress (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={progressPercent}
              onChange={(e) => setProgressPercent(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
              Weather
            </label>
            <input
              type="text"
              value={weatherCondition}
              onChange={(e) => setWeatherCondition(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Daily Work Executed Summary *
          </label>
          <textarea
            rows={3}
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Record blockwork square meters laid, electrical conduit progress..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div>
          <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-[#17324D]">
            Site Issues / Material Delays
          </label>
          <input
            type="text"
            value={issuesReported}
            onChange={(e) => setIssuesReported(e.target.value)}
            placeholder="Log any safety incidents, equipment breakdown, or material shortages..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
          />
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setIsDailyReportModalOpen(false)}>
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
