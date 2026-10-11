'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, Building2, ShieldCheck, ArrowLeft, Briefcase, CheckCircle2, FileText } from 'lucide-react';

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { companies, setIsCreateProjectModalOpen } = useApp();

  const companyId = params?.id as string;
  const company = companies.find((c) => c.id === companyId) || companies[0];

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#245A7A] hover:text-[#17324D] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </button>

        <Card className="p-6 md:p-8 mb-8 border-t-4 border-t-[#17324D]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 p-1">
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-[#17324D]">{company.name}</h1>
                  {company.verified && <Badge variant="VERIFIED">Verified Company</Badge>}
                </div>
                <p className="text-sm font-bold text-[#245A7A]">{company.tagline}</p>
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400" /> {company.city}, {company.country}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {company.rating} ({company.reviewsCount} Reviews)
                  </span>
                </div>
              </div>
            </div>

            <Button variant="primary" onClick={() => setIsCreateProjectModalOpen(true)} className="gap-2">
              <FileText className="w-4 h-4" /> Solicit Tender / Quote
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6">
              <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider mb-3">About the Company</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{company.about}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider mb-3">Provided Services</h3>
              <div className="flex flex-wrap gap-2">
                {company.services.map((s) => (
                  <span key={s} className="px-3 py-1 bg-[#17324D]/5 text-[#17324D] rounded-md text-xs font-semibold border border-[#17324D]/15">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#17324D] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16805C]" /> Official Certifications
              </h4>
              <div className="space-y-2 text-xs">
                {company.certifications.map((cert) => (
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
