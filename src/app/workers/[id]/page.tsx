'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  MapPin,
  Star,
  Award,
  CheckCircle2,
  Globe,
  ArrowLeft,
  MessageSquare,
  FileText,
  Briefcase,
  Calendar,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function WorkerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { workers, setIsRequestQuoteModalOpen, setSelectedWorkerForQuote, showToast, setIsCreateProjectModalOpen, currentCurrency } = useApp();

  const workerId = params?.id as string;
  const worker = workers.find((w) => w.id === workerId) || workers[0];

  const handleHireClick = () => {
    showToast(`Initiating direct contract hire with ${worker.name}...`, 'info');
    router.push('/contracts');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#245A7A] hover:text-[#17324D] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Artisans Directory
        </button>

        {/* Profile Banner Card */}
        <Card className="p-6 md:p-8 mb-8 border-t-4 border-t-[#17324D]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-start md:items-center gap-5">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[#17324D] shrink-0 bg-slate-100 shadow-md">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-[#17324D]">{worker.name}</h1>
                  <Badge variant="VERIFIED" size="md">
                    {worker.verificationBadge}
                  </Badge>
                  <Badge variant={worker.availabilityStatus} size="md">
                    {worker.availability}
                  </Badge>
                </div>

                <p className="text-base font-bold text-[#245A7A]">{worker.trade}</p>

                <div className="flex items-center gap-4 text-xs text-[#64748B] flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400" /> {worker.city}, {worker.countryName}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {worker.rating} ({worker.reviewCount} Client Reviews)
                  </span>
                  <span className="font-semibold text-[#17324D]">
                    {worker.experienceYears} Years Active Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
              <Link href="/messages">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <MessageSquare className="w-4 h-4" /> Contact
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedWorkerForQuote(worker);
                  setIsRequestQuoteModalOpen(true);
                }}
                className="gap-1.5"
              >
                <FileText className="w-4 h-4" /> Request Quote
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateProjectModalOpen(true)}
                className="gap-1.5"
              >
                <Briefcase className="w-4 h-4" /> Invite to Project
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleHireClick}
                className="bg-[#16805C] hover:bg-[#16805C]/90 gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Direct Hire
              </Button>
            </div>

          </div>
        </Card>

        {/* Profile Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* About */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider mb-3">
                Professional Bio & Expertise
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                {worker.about}
              </p>
            </Card>

            {/* Skills & Technologies */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider mb-3">
                Verified Skills & Construction Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#17324D]/5 text-[#17324D] rounded-md text-xs font-semibold border border-[#17324D]/15"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Work Experience */}
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider mb-2">
                Work Experience Timeline
              </h3>
              <div className="space-y-4">
                {worker.workExperience.map((exp, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-[#17324D]">{exp.title}</h4>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#245A7A] mb-1">{exp.company}</p>
                    <p className="text-xs text-[#64748B] leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Completed Projects Showcase */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider mb-4">
                Portfolio & Site Photography
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {worker.portfolioPhotos.map((photo, i) => (
                  <div key={i} className="h-48 rounded-lg overflow-hidden border border-slate-200 shadow-xs">
                    <img src={photo} alt="Site Work" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Rates & Compensation */}
            <Card className="p-5 space-y-4 bg-white">
              <div className="pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-400 block">Daily Wage Standard</span>
                <span className="text-2xl font-black text-[#16805C]">
                  GHS {worker.dailyRateGHS} <span className="text-xs font-normal text-slate-500">/ day</span>
                </span>
                {worker.hourlyRateGHS && (
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Hourly equivalent: GHS {worker.hourlyRateGHS}/hr
                  </span>
                )}
              </div>

              <div className="space-y-2.5 text-xs text-[#17212B]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Completed Projects</span>
                  <span className="font-bold text-[#17324D]">{worker.completedProjectsCount} Completed</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Travel Readiness</span>
                  <span className="font-bold text-[#16805C]">{worker.travelReady ? 'Yes (Mobile)' : 'Local Only'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">International Mobility</span>
                  <span className="font-bold text-[#245A7A]">{worker.internationalAvailability ? 'Available' : 'No'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Languages</span>
                  <span className="font-bold text-[#17324D]">{worker.languages.join(', ')}</span>
                </div>
              </div>
            </Card>

            {/* Certifications & Document Verification */}
            <Card className="p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#17324D] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16805C]" />
                Identity & Certifications Verified
              </h4>

              <div className="space-y-2 text-xs">
                {worker.certifications.map((cert) => (
                  <div key={cert} className="p-2.5 bg-[#F5F7F9] rounded-md border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16805C] shrink-0" />
                    <span className="font-medium text-[#17324D]">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
