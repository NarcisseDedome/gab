'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, MapPin, Briefcase, Clock, PlusCircle } from 'lucide-react';

export default function JobsPage() {
  const { jobs, setIsPostJobModalOpen, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedContract, setSelectedContract] = useState('All');

  const categories = ['All', 'Masonry & Concrete', 'Electrical', 'Plumbing', 'Site Management', 'Equipment Rental'];
  const contractTypes = ['All', 'Contract', 'Full-time', 'Daily Wage', 'Project-based'];

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesContract = selectedContract === 'All' || job.contractType === selectedContract;

    return matchesQuery && matchesCategory && matchesContract;
  });

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                {t.jobsBadge}
              </span>
              <span className="text-xs text-slate-500">• {filteredJobs.length} {t.workersNeeded}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.jobsTitle}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.jobsSubtitle}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsPostJobModalOpen(true)}
            className="mt-4 md:mt-0 gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            {t.btnViewJobs}
          </Button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Contract Type Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              >
                {contractTypes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} hoverEffect className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="info" size="sm">
                      {job.category}
                    </Badge>
                    {job.companyVerified && (
                      <Badge variant="VERIFIED" size="sm">
                        {t.verifiedEmployer}
                      </Badge>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto md:ml-0">
                      <Clock className="w-3.5 h-3.5" /> {t.postedDate} {job.postedDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#17324D] hover:text-[#245A7A] transition-colors">
                    <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                  </h3>

                  <p className="text-sm font-semibold text-[#245A7A]">{job.companyName}</p>

                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                    <span className="flex items-center gap-1 font-medium text-[#17324D]">
                      <MapPin className="w-4 h-4 text-slate-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-[#17324D]">
                      <Briefcase className="w-4 h-4 text-slate-400" /> {job.contractType} • {job.experienceRequired} {t.yearsExp}
                    </span>
                    <span className="font-bold text-[#16805C]">
                      {t.workersNeeded}: {job.workersNeeded}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.compensation}</span>
                    <span className="text-lg font-extrabold text-[#16805C]">
                      {job.salaryRange}
                    </span>
                  </div>

                  <Link href={`/jobs/${job.id}`} className="w-full md:w-auto">
                    <Button variant="primary" size="md" fullWidth>
                      {t.btnViewJob}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
