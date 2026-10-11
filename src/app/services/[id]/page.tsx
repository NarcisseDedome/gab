'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, ShieldCheck, ArrowLeft, Building2, CheckCircle2, FileText } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { services, setIsRequestQuoteModalOpen, currentCurrency } = useApp();

  const serviceId = params?.id as string;
  const service = services.find((s) => s.id === serviceId) || services[0];

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#245A7A] hover:text-[#17324D] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="info">{service.category}</Badge>
                  {service.verified && <Badge variant="VERIFIED">Verified Service</Badge>}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
                  {service.title}
                </h1>

                <p className="text-base font-bold text-[#245A7A]">{service.providerName}</p>

                <div className="p-4 bg-[#F5F7F9] rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Location</span>
                    <span className="font-bold text-[#17324D] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {service.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Reputation</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {service.rating} ({service.projectsCompleted} Projects Delivered)
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17324D] uppercase tracking-wider mb-2">
                    Service Description & Specifications
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5 space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-400 block font-semibold uppercase">Pricing Standard</span>
                <span className="text-2xl font-black text-[#17324D]">
                  {currentCurrency} {service.startingPriceGHS.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">{service.priceUnit}</span>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => setIsRequestQuoteModalOpen(true)}
                className="gap-2"
              >
                <FileText className="w-4 h-4" /> Request Quote for this Service
              </Button>

              <div className="p-3 bg-[#17324D]/5 rounded-md text-[11px] text-[#17324D] border border-[#17324D]/20 space-y-1">
                <div className="font-bold">100% Escrow Protection</div>
                <div>Funds are held securely by GAB-work until work is completed and verified.</div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
