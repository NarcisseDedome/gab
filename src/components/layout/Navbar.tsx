'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { CountryCurrencySelector } from '@/components/ui/CountryCurrencySelector';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { RoleSwitcher } from '@/components/shared/RoleSwitcher';
import {
  Menu,
  X,
  PlusCircle,
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  FolderKanban,
  FileText,
  ShieldCheck,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { activeRole, setIsCreateProjectModalOpen, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Building2 },
    { href: '/jobs', label: t.findJobs, icon: Briefcase },
    { href: '/workers', label: t.findWorkers, icon: Users },
    { href: '/services', label: t.services, icon: Building2 },
    { href: '/projects', label: t.projects, icon: FolderKanban },
    { href: '/companies', label: t.companies, icon: Building2 },
    { href: '/how-it-works', label: t.howItWorks, icon: HelpCircle },
    { href: '/trust-safety', label: t.trustSafety, icon: ShieldCheck },
  ];

  const getDashboardHref = () => {
    switch (activeRole) {
      case 'worker':
        return '/dashboard/worker';
      case 'company':
        return '/dashboard/company';
      case 'sitemanager':
        return '/dashboard/sitemanager';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard/client';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-subtle">
        {/* Top Utility Bar */}
        <div className="bg-[#17324D] text-white py-1 px-3 sm:px-8 flex justify-between items-center text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16805C] animate-pulse shrink-0"></span>
            <span className="font-medium tracking-wide truncate">{t.topNotice}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSelector />
            <div className="hidden sm:block">
              <CountryCurrencySelector />
            </div>
            <div className="hidden md:block">
              <RoleSwitcher />
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#17324D] flex items-center justify-center text-white font-bold text-base sm:text-lg tracking-wider border border-[#245A7A] group-hover:bg-[#245A7A] transition-colors shadow-xs">
                <span className="text-[#F5F7F9]">G</span>
                <span className="text-[#245A7A] text-[10px] sm:text-xs leading-none">▲</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold text-[#17324D] tracking-tight">
                  GAB<span className="text-[#245A7A] font-semibold">-work</span>
                </span>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-[#64748B] font-medium -mt-1">
                  Architecture & Building
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-[#17324D] ${
                      isActive ? 'text-[#17324D] font-bold border-b-2 border-[#17324D] py-5' : 'text-[#64748B]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href={getDashboardHref()}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#17324D]" />
                  <span>{t.dashboard}</span>
                </Button>
              </Link>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateProjectModalOpen(true)}
                className="gap-1.5 shadow-xs text-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{t.postProject}</span>
              </Button>
            </div>

            {/* Mobile Actions Header */}
            <div className="flex xl:hidden items-center gap-1.5">
              <Link href={getDashboardHref()} className="sm:hidden p-2 text-[#17324D] hover:bg-slate-100 rounded-md">
                <LayoutDashboard className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#17212B] hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 max-h-[calc(100vh-60px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {/* Quick Selectors in Drawer */}
            <div className="p-3 bg-[#F5F7F9] rounded-lg border border-slate-200 flex flex-wrap gap-2.5 items-center justify-between">
              <div className="w-full sm:w-auto">
                <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Role Active</span>
                <RoleSwitcher />
              </div>
              <div className="w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Currency / Country</span>
                <CountryCurrencySelector />
              </div>
            </div>

            {/* Navigation links grid */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive ? 'bg-[#17324D] text-white shadow-xs' : 'text-[#17212B] bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 opacity-80" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <Link href={getDashboardHref()} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" fullWidth className="gap-2 text-xs py-2.5">
                  <LayoutDashboard className="w-4 h-4 text-[#17324D]" />
                  {t.dashboard} ({activeRole.toUpperCase()})
                </Button>
              </Link>

              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCreateProjectModalOpen(true);
                }}
                className="gap-2 text-xs py-2.5 shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                {t.postProject}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Fixed Navigation Bar (App-like feel for Smartphones) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 flex justify-around items-center shadow-lg">
        <Link
          href="/"
          className={`flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded ${
            pathname === '/' ? 'text-[#17324D] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/jobs"
          className={`flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded ${
            pathname === '/jobs' ? 'text-[#17324D] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4 mb-0.5" />
          <span>{t.tabJobs}</span>
        </Link>

        <button
          onClick={() => setIsCreateProjectModalOpen(true)}
          className="flex flex-col items-center -mt-4 bg-[#17324D] text-white p-2.5 rounded-full shadow-md border-2 border-white hover:bg-[#245A7A] transition-colors"
          aria-label="Post Project"
        >
          <PlusCircle className="w-5 h-5" />
        </button>

        <Link
          href="/workers"
          className={`flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded ${
            pathname === '/workers' ? 'text-[#17324D] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 mb-0.5" />
          <span>{t.tabWorkers}</span>
        </Link>

        <Link
          href={getDashboardHref()}
          className={`flex flex-col items-center text-[10px] font-semibold py-1 px-2 rounded ${
            pathname.startsWith('/dashboard') ? 'text-[#17324D] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>{t.dashboard}</span>
        </Link>
      </div>
    </>
  );
};
