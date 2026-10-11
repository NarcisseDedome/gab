'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LanguageCode } from '@/i18n/translations';
import { Languages } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setCurrentLanguage } = useApp();

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <div className="flex items-center bg-slate-100 rounded-md px-2 py-1 border border-slate-200 text-xs">
      <Languages className="w-3.5 h-3.5 text-[#245A7A] mr-1.5" />
      <select
        value={currentLanguage}
        onChange={(e) => setCurrentLanguage(e.target.value as LanguageCode)}
        className="bg-transparent font-medium text-[#17212B] focus:outline-none cursor-pointer"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </div>
  );
};
