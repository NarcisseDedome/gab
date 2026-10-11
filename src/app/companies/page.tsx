'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, ArrowRight } from 'lucide-react';

export default function CompaniesPage() {
  const { companies, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                {t.tabCompanies}
              </span>
              <span className="text-xs text-slate-500">• {filteredCompanies.length} {t.statusVerified}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.companies}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} hoverEffect className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 p-1">
                    <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-bold text-[#17324D]">{company.name}</h3>
                      {company.verified && <Badge variant="VERIFIED" size="sm">{t.statusVerified}</Badge>}
                    </div>
                    <p className="text-xs font-semibold text-[#245A7A] mb-1">{company.tagline}</p>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {company.city}, {company.country}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] mt-4 line-clamp-3 leading-relaxed">
                  {company.about}
                </p>

                <div className="mt-4 p-3 bg-[#F5F7F9] rounded-lg border border-slate-200/80 grid grid-cols-3 gap-2 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.employees}</span>
                    <span className="font-bold text-[#17324D]">{company.employeesCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.yearsExp}</span>
                    <span className="font-bold text-[#17324D]">{company.yearsInBusiness} {t.yearsExp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.reviewsCount}</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {company.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-semibold text-[#16805C]">
                  {company.activeJobsCount} {t.tabJobs}
                </span>

                <Link href={`/companies/${company.id}`}>
                  <Button variant="primary" size="sm" className="gap-1.5">
                    <span>{t.btnViewProfile}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
