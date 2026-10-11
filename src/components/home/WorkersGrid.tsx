'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, MapPin, ArrowRight } from 'lucide-react';

export const WorkersGrid: React.FC = () => {
  const { workers, currentCurrency, setIsRequestQuoteModalOpen, setSelectedWorkerForQuote, t } = useApp();

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-3 py-1 rounded-full">
              {t.workersBadge}
            </span>
            <h2 className="text-3xl font-extrabold text-[#17324D] mt-3 tracking-tight">
              {t.workersTitle}
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              {t.workersSubtitle}
            </p>
          </div>

          <Link href="/workers" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-2 text-[#17324D] border-[#17324D]">
              <span>{t.btnBrowseWorkers}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workers.map((worker) => (
            <Card key={worker.id} hoverEffect className="p-5 flex flex-col justify-between">
              <div>
                {/* Header Profile Photo & Badges */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-base font-bold text-[#17324D] line-clamp-1">{worker.name}</h3>
                    </div>
                    <p className="text-xs font-semibold text-[#245A7A] leading-tight mb-1">{worker.trade}</p>
                    <Badge variant={worker.availabilityStatus} size="sm">
                      {worker.availabilityStatus === 'AVAILABLE' ? t.statusAvailable : worker.availabilityStatus === 'UNAVAILABLE' ? t.statusUnavailable : worker.availability}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#64748B] mb-4 bg-[#F5F7F9] p-3 rounded-md border border-slate-200/60">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {worker.city}
                    </span>
                    <span className="font-bold text-slate-700">{worker.experienceYears} {t.yearsExp}</span>
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {worker.rating} ({worker.reviewCount} {t.reviewsCount})
                    </span>
                    <span className="text-[#16805C] font-extrabold text-sm">
                      {currentCurrency} {worker.dailyRateGHS}/{t.dailyRate.toLowerCase()}
                    </span>
                  </div>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {worker.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium border border-slate-200">
                      {skill}
                    </span>
                  ))}
                  {worker.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 text-slate-400 text-[10px] font-medium">
                      +{worker.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <Link href={`/workers/${worker.id}`} className="flex-1">
                  <Button variant="outline" size="sm" fullWidth className="text-xs">
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
                  className="text-xs"
                >
                  {t.btnRequestQuote}
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
