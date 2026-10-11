'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="bg-[#17324D] text-white pt-16 pb-12 border-t border-[#245A7A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#245A7A]/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-[#245A7A] flex items-center justify-center text-white font-bold text-lg border border-white/20">
                G▲
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                GAB<span className="text-[#94A3B8] font-normal">-work</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-sm font-light leading-relaxed">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-[#245A7A]/50 px-2.5 py-1 rounded border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#16805C]" /> {t.escrowProtected}
              </span>
              <span className="flex items-center gap-1.5 bg-[#245A7A]/50 px-2.5 py-1 rounded border border-white/10">
                <Award className="w-4 h-4 text-amber-400" /> {t.verifiedWorkers}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 border-l-2 border-[#245A7A] pl-2">
              {t.marketplaceHeader}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/jobs" className="hover:text-white transition-colors">{t.findJobs}</Link></li>
              <li><Link href="/workers" className="hover:text-white transition-colors">{t.findWorkers}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">{t.services}</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">{t.projects}</Link></li>
              <li><Link href="/companies" className="hover:text-white transition-colors">{t.companies}</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 border-l-2 border-[#245A7A] pl-2">
              {t.platformHeader}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t.howItWorks}</Link></li>
              <li><Link href="/trust-safety" className="hover:text-white transition-colors">{t.trustSafety}</Link></li>
              <li><Link href="/verification" className="hover:text-white transition-colors">Verification Center</Link></li>
              <li><Link href="/disputes" className="hover:text-white transition-colors">Resolution Center</Link></li>
              <li><Link href="/payments" className="hover:text-white transition-colors">Escrow & Commissions</Link></li>
            </ul>
          </div>

          {/* Regions & Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 border-l-2 border-[#245A7A] pl-2">
              {t.headquartersHeader}
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#245A7A] mt-1 shrink-0" />
                <span>East Legon Tech Hub, Airport West, Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#245A7A] shrink-0" />
                <span>support@gabwork.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#245A7A] shrink-0" />
                <span>+233 (0) 30 294 8820</span>
              </div>
              <div className="pt-2 text-xs font-semibold text-slate-400">
                Ghana • Ivory Coast • Nigeria • Togo • Benin • International
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 GAB-work Ltd. {t.copyright}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/trust-safety" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/trust-safety" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/trust-safety" className="hover:text-white transition-colors">Security Audit</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
