'use client';

import React from 'react';
import { VerificationStatus, AvailabilityStatus } from '@/types';
import { ShieldCheck, Clock, AlertCircle, XCircle, CheckCircle2 } from 'lucide-react';

interface UserStatusBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          label: 'Profil Vérifié BTP',
          bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          dotColor: 'bg-emerald-500',
          icon: ShieldCheck
        };
      case 'PENDING':
        return {
          label: 'Vérification en cours',
          bgColor: 'bg-amber-50 text-amber-700 border-amber-300',
          dotColor: 'bg-amber-500',
          icon: Clock
        };
      case 'ADDITIONAL_INFO_REQUIRED':
        return {
          label: 'Pièces complémentaires requises',
          bgColor: 'bg-orange-50 text-orange-700 border-orange-300',
          dotColor: 'bg-orange-500',
          icon: AlertCircle
        };
      case 'REJECTED':
        return {
          label: 'Dossier non validé',
          bgColor: 'bg-rose-50 text-rose-700 border-rose-300',
          dotColor: 'bg-rose-500',
          icon: XCircle
        };
      case 'UNVERIFIED':
      default:
        return {
          label: 'Profil non certifié',
          bgColor: 'bg-slate-50 text-slate-600 border-slate-300',
          dotColor: 'bg-slate-400',
          icon: AlertCircle
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-xs tracking-tight ${config.bgColor} ${sizeClasses} ${className}`}
    >
      {showIcon && <IconComponent className={`${iconSizes} shrink-0`} />}
      <span>{config.label}</span>
    </span>
  );
};

interface AvailabilityBadgeProps {
  status: AvailabilityStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const getAvailabilityConfig = () => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: 'Disponible immédiatement',
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'PENDING':
        return {
          label: 'Disponible prochainement',
          classes: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'DISPUTE':
        return {
          label: 'Mission en litige',
          classes: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500'
        };
      case 'UNAVAILABLE':
      default:
        return {
          label: 'Indisponible / En mission',
          classes: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400'
        };
    }
  };

  const config = getAvailabilityConfig();
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.classes} ${sizeClasses} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      <span>{config.label}</span>
    </span>
  );
};
