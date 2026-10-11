'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MapPin, Briefcase, Calendar, Clock, ShieldCheck, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, applyForJob, showToast, currentCurrency } = useApp();

  const jobId = params?.id as string;
  const job = jobs.find((j) => j.id === jobId) || jobs[0];

  const [coverNote, setCoverNote] = useState('');
  const [proposedRate, setProposedRate] = useState(job.dailyRateGHS);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverNote.trim()) return;

    applyForJob(job.id, coverNote, proposedRate);
    setIsApplying(false);
    setCoverNote('');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#245A7A] hover:text-[#17324D] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Job Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Details Column */}
          <div className="lg:col-span-8 space-y-6">
            
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <Badge variant="info">{job.category}</Badge>
                  {job.companyVerified && (
                    <Badge variant="VERIFIED">Verified Employer</Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
                  {job.title}
                </h1>

                <p className="text-base font-semibold text-[#245A7A]">{job.companyName}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F5F7F9] rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Location</span>
                    <span className="font-bold text-[#17324D]">{job.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Contract</span>
                    <span className="font-bold text-[#17324D]">{job.contractType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Experience</span>
                    <span className="font-bold text-[#17324D]">{job.experienceRequired}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Workers Needed</span>
                    <span className="font-bold text-[#16805C]">{job.workersNeeded} Workers</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17324D] uppercase tracking-wider mb-2">
                    Job Description & Site Responsibilities
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17324D] uppercase tracking-wider mb-2">
                    Required Technical Skills & Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((s) => (
                      <span key={s} className="px-3 py-1 bg-slate-100 text-[#17324D] rounded-md text-xs font-semibold border border-slate-200">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </Card>

            {/* Application Card Form */}
            <Card className="p-6 border-l-4 border-l-[#17324D]">
              <h3 className="text-lg font-bold text-[#17324D] mb-1">
                Apply for this Position
              </h3>
              <p className="text-xs text-[#64748B] mb-4">
                Submit your application directly to the employer on GAB-work.
              </p>

              {!isApplying ? (
                <Button variant="primary" onClick={() => setIsApplying(true)} className="gap-2">
                  <Send className="w-4 h-4" /> Start Application
                </Button>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#17324D] mb-1 uppercase tracking-wider text-[11px]">
                      Proposed Daily Rate ({currentCurrency})
                    </label>
                    <input
                      type="number"
                      required
                      value={proposedRate}
                      onChange={(e) => setProposedRate(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#17324D] mb-1 uppercase tracking-wider text-[11px]">
                      Cover Note / Relevant Experience Summary *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Highlight your previous BTP sites, NVTI certificates, and availability date..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsApplying(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Submit Job Application
                    </Button>
                  </div>
                </form>
              )}
            </Card>

          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5 space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-400 block font-semibold uppercase">Offered Compensation</span>
                <span className="text-2xl font-black text-[#16805C]">
                  {job.salaryRange}
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#17212B]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16805C]" />
                  <span>Verified GAB-work Contract Employer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#245A7A]" />
                  <span>Application Deadline: {job.deadline}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                GAB-work guarantees that payments are held in digital escrow for all active contract hours logged and verified by the Site Manager.
              </div>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
