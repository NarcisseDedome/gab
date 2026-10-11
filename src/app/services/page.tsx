'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Building2, Star, MapPin } from 'lucide-react';

export default function ServicesPage() {
  const { services, currentCurrency, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Masonry', 'Electrical', 'Plumbing', 'Equipment Rental'];

  const filteredServices = services.filter((s) => {
    const matchesQuery =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                {t.servicesBadge}
              </span>
              <span className="text-xs text-slate-500">• {filteredServices.length} {t.services}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.servicesTitle}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.servicesSubtitle}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              />
            </div>

            <div className="md:col-span-4">
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
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} hoverEffect className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 flex items-center justify-center text-[#17324D]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  {service.verified && (
                    <Badge variant="VERIFIED" size="sm">
                      {t.statusVerified}
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#17324D] line-clamp-2 leading-snug mb-1">
                  {service.title}
                </h3>

                <p className="text-xs font-semibold text-[#245A7A] mb-3">{service.providerName}</p>

                <p className="text-xs text-[#64748B] line-clamp-3 mb-4 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {service.location}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {service.rating}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">{t.startingFrom}</span>
                    <span className="text-sm font-extrabold text-[#17324D]">
                      {currentCurrency} {service.startingPriceGHS.toLocaleString()}
                    </span>
                  </div>

                  <Link href={`/services/${service.id}`}>
                    <Button variant="primary" size="sm">
                      {t.btnViewService}
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
