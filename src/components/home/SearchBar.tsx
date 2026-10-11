'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';

type SearchCategory = 'Jobs' | 'Workers' | 'Services' | 'Companies' | 'Projects';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<SearchCategory>('Workers');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Accra, Ghana');
  const [availability, setAvailability] = useState('Available now');

  const tabs: { key: SearchCategory; label: string }[] = [
    { key: 'Jobs', label: t.tabJobs },
    { key: 'Workers', label: t.tabWorkers },
    { key: 'Services', label: t.tabServices },
    { key: 'Companies', label: t.tabCompanies },
    { key: 'Projects', label: t.tabProjects },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const route = activeTab.toLowerCase();
    router.push(`/${route}?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(location)}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-[#17212B]">
      {/* Search Category Tabs with smooth touch scrolling */}
      <div className="flex border-b border-slate-200 bg-[#F5F7F9] overflow-x-auto scrollbar-none scroll-smooth">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap border-b-2 text-center ${
                isActive
                  ? 'border-[#17324D] text-[#17324D] bg-white'
                  : 'border-transparent text-[#64748B] hover:text-[#17324D]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form inputs */}
      <form onSubmit={handleSearch} className="p-3 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Main Search Query */}
        <div className="md:col-span-5 relative">
          <label className="block text-[10px] sm:text-[11px] font-bold text-[#17324D] uppercase tracking-wider mb-1">
            {t.searchTitle}
          </label>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="md:col-span-3 relative">
          <label className="block text-[10px] sm:text-[11px] font-bold text-[#17324D] uppercase tracking-wider mb-1">
            {t.locationLabel}
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D] appearance-none"
            >
              <option value="Accra, Ghana">Accra, Ghana</option>
              <option value="Kumasi, Ghana">Kumasi, Ghana</option>
              <option value="Tema, Ghana">Tema, Ghana</option>
              <option value="Takoradi, Ghana">Takoradi, Ghana</option>
              <option value="Tamale, Ghana">Tamale, Ghana</option>
              <option value="Lagos, Nigeria">Lagos, Nigeria</option>
              <option value="Abidjan, Ivory Coast">Abidjan, Ivory Coast</option>
              <option value="Lome, Togo">Lomé, Togo</option>
              <option value="Cotonou, Benin">Cotonou, Benin</option>
              <option value="All Countries">{t.allCountries}</option>
            </select>
          </div>
        </div>

        {/* Availability Filter */}
        <div className="md:col-span-2 relative">
          <label className="block text-[10px] sm:text-[11px] font-bold text-[#17324D] uppercase tracking-wider mb-1">
            {t.availabilityLabel}
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D] appearance-none"
            >
              <option value="Available now">{t.availableNow}</option>
              <option value="Available from date">{t.availableSoon}</option>
              <option value="Available for travel">{t.travelReady}</option>
              <option value="International">{t.allCountries}</option>
            </select>
          </div>
        </div>

        {/* Submit button */}
        <div className="md:col-span-2 flex items-end pt-1 md:pt-0">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="h-[38px] text-xs sm:text-sm font-bold gap-2 mt-auto shadow-xs"
          >
            <Search className="w-4 h-4" />
            {t.btnSearch}
          </Button>
        </div>
      </form>
    </div>
  );
};
