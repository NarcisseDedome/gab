'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { User, HardHat, Building, ClipboardList, ShieldCheck } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { activeRole, setActiveRole } = useApp();

  const roles: { role: UserRole; label: string; icon: React.ElementType }[] = [
    { role: 'client', label: 'Client', icon: User },
    { role: 'worker', label: 'Worker', icon: HardHat },
    { role: 'company', label: 'Company', icon: Building },
    { role: 'sitemanager', label: 'Site Manager', icon: ClipboardList },
    { role: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <div className="flex items-center gap-1 bg-[#17324D]/10 p-1 rounded-lg border border-[#17324D]/20">
      <span className="text-[10px] uppercase font-bold text-[#17324D] px-2 hidden lg:inline-block">
        Role:
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
            title={`Switch view to ${label}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline-block">{label}</span>
          </button>
        );
      })}
    </div>
  );
};
