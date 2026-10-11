'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';

export const JobsGrid: React.FC = () => {
  const { jobs, t } = useApp();

  return (
    <section className="py-16 bg-[#F5F7F9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-3 py-1 rounded-full">
              {t.jobsBadge}
            </span>
            <h2 className="text-3xl font-extrabold text-[#17324D] mt-3 tracking-tight">
              {t.jobsTitle}
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              {t.jobsSubtitle}
            </p>
          </div>

          <Link href="/jobs" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-2 text-[#17324D] border-[#17324D]">
              <span>{t.btnViewJobs}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} hoverEffect className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" size="sm" className="bg-[#17324D]/5 text-[#17324D]">
                    {job.category}
                  </Badge>
                  {job.companyVerified && (
                    <Badge variant="VERIFIED" size="sm">
                      {t.verifiedEmployer}
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#17324D] leading-snug mb-1">
                  {job.title}
                </h3>

                <p className="text-xs font-semibold text-[#245A7A] mb-3">
                  {job.companyName}
                </p>

                <div className="space-y-2 text-xs text-[#64748B] mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{job.contractType} • {job.experienceRequired} {t.yearsExp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{t.postedDate} {job.postedDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.requiredSkills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">{t.compensation}</span>
                  <span className="text-sm font-extrabold text-[#16805C]">
                    {job.salaryRange}
                  </span>
                </div>

                <Link href={`/jobs/${job.id}`}>
                  <Button variant="primary" size="sm">
                    {t.btnViewJob}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
