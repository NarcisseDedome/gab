'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CountryCode, CurrencyCode } from '@/types';
import { Globe, DollarSign } from 'lucide-react';

export const CountryCurrencySelector: React.FC = () => {
  const { currentCountry, setCurrentCountry, currentCurrency, setCurrentCurrency } = useApp();

  const countries: { code: CountryCode; label: string; flag: string }[] = [
    { code: 'GH', label: 'Ghana', flag: '🇬🇭' },
    { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
    { code: 'CI', label: 'Ivory Coast', flag: '🇨🇮' },
    { code: 'TG', label: 'Togo', flag: '🇹🇬' },
    { code: 'BJ', label: 'Benin', flag: '🇧🇯' },
    { code: 'BF', label: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'SN', label: 'Senegal', flag: '🇸🇳' },
    { code: 'CM', label: 'Cameroon', flag: '🇨🇲' },
    { code: 'INT', label: 'International', flag: '🌐' },
  ];

  const currencies: CurrencyCode[] = ['GHS', 'XOF', 'NGN', 'USD', 'EUR'];

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="flex items-center bg-slate-100 rounded-md px-2 py-1 border border-slate-200">
        <Globe className="w-3.5 h-3.5 text-[#245A7A] mr-1.5" />
        <select
          value={currentCountry}
          onChange={(e) => setCurrentCountry(e.target.value as CountryCode)}
          className="bg-transparent font-medium text-[#17212B] focus:outline-none cursor-pointer"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center bg-slate-100 rounded-md px-2 py-1 border border-slate-200">
        <span className="font-semibold text-[#17324D] mr-1">$</span>
        <select
          value={currentCurrency}
          onChange={(e) => setCurrentCurrency(e.target.value as CurrencyCode)}
          className="bg-transparent font-semibold text-[#17324D] focus:outline-none cursor-pointer"
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
