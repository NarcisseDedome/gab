'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, MapPin, Star } from 'lucide-react';

export default function WorkersPage() {
  const { workers, currentCurrency, setIsRequestQuoteModalOpen, setSelectedWorkerForQuote, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  const trades = ['All', 'Mason & Site Specialist', 'Master Electrician', 'Quantity Surveyor', 'Structural Welder'];

  const filteredWorkers = workers.filter((w) => {
    const matchesQuery =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTrade = selectedTrade === 'All' || w.trade.includes(selectedTrade);
    const matchesAvailability = availabilityFilter === 'All' || w.availabilityStatus === availabilityFilter;

    return matchesQuery && matchesTrade && matchesAvailability;
  });

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                {t.workersBadge}
              </span>
              <span className="text-xs text-slate-500">• {filteredWorkers.length} {t.statusAvailable}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.workersTitle}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.workersSubtitle}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
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

            <div className="md:col-span-3">
              <select
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              >
                {trades.map((tr) => (
                  <option key={tr} value={tr}>
                    {tr}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              >
                <option value="All">{t.availabilityLabel}: All</option>
                <option value="AVAILABLE">{t.availableNow}</option>
                <option value="PENDING">{t.availableSoon}</option>
                <option value="UNAVAILABLE">{t.statusUnavailable}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <Card key={worker.id} hoverEffect className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17324D]">{worker.name}</h3>
                    <p className="text-xs font-semibold text-[#245A7A] mb-1.5">{worker.trade}</p>
                    <Badge variant={worker.availabilityStatus} size="sm">
                      {worker.availabilityStatus === 'AVAILABLE' ? t.statusAvailable : worker.availabilityStatus === 'UNAVAILABLE' ? t.statusUnavailable : worker.availability}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] mt-4 line-clamp-3 leading-relaxed">
                  {worker.about}
                </p>

                <div className="mt-4 p-3 bg-[#F5F7F9] rounded-lg border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {worker.city}
                    </span>
                    <span className="font-semibold text-slate-800">{worker.experienceYears} {t.yearsExp}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {worker.rating} ({worker.reviewCount} {t.reviewsCount})
                    </span>
                    <span className="text-sm font-extrabold text-[#16805C]">
                      {currentCurrency} {worker.dailyRateGHS} / {t.dailyRate.toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {worker.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <Link href={`/workers/${worker.id}`} className="flex-1">
                  <Button variant="outline" size="sm" fullWidth>
                    {t.btnViewProfile}
                  </Button>
                </Link>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedWorkerForQuote(worker);
                    setIsRequestQuoteModalOpen(true);
                  }}
                >
                  {t.btnRequestQuote}
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
