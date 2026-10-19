'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { User, HardHat, Building, ClipboardList, ShieldCheck } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { activeRole, setActiveRole, currentLanguage, t } = useApp();

  const isFr = currentLanguage === 'fr';

  const roles: { role: UserRole; label: string; icon: React.ElementType }[] = [
    { role: 'client', label: isFr ? 'Client' : 'Client', icon: User },
    { role: 'worker', label: isFr ? 'Artisan' : 'Worker', icon: HardHat },
    { role: 'company', label: isFr ? 'Entreprise' : 'Company', icon: Building },
    { role: 'sitemanager', label: isFr ? 'Chef Chantier' : 'Site Manager', icon: ClipboardList },
    { role: 'admin', label: isFr ? 'Super Admin' : 'Admin', icon: ShieldCheck },
  ];

  return (
    <div className="flex items-center gap-1 bg-[#17324D]/10 p-1 rounded-lg border border-[#17324D]/20">
      <span className="text-[10px] uppercase font-bold text-[#17324D] px-2 hidden lg:inline-block">
        {t.roleLabel}
      </span>
      {roles.map(({ role, label, icon: Icon }) => {
        const isActive = activeRole === role;
        return (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              isActive
                ? 'bg-[#17324D] text-white shadow-xs'
                : 'text-[#17212B] hover:bg-slate-200/60'
            }`}
            title={`Passer en mode ${label}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline-block">{label}</span>
          </button>
        );
      })}
    </div>
  );
};
