'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, UploadCloud } from 'lucide-react';

export default function VerificationCenterPage() {
  const { showToast, t } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Document uploaded successfully!', 'success');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#16805C] bg-[#16805C]/10 px-2.5 py-0.5 rounded">
                {t.verifiedWorkers}
              </span>
              <Badge variant="VERIFIED">{t.statusVerified}</Badge>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              GAB-work Verification
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.step1Desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Status overview */}
            <Card className="p-6 border-l-4 border-l-[#16805C]">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#17324D]">{t.verifiedWorkers}</h3>
                  <p className="text-xs text-slate-500">Authenticated by GAB-work Governance Board</p>
                </div>
                <Badge variant="VERIFIED">{t.statusVerified}</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-[#F5F7F9] rounded border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16805C]" />
                  <span>Ghana National ID Verified</span>
                </div>
                <div className="p-3 bg-[#F5F7F9] rounded border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16805C]" />
                  <span>NVTI Master Certificate Verified</span>
                </div>
              </div>
            </Card>

            {/* Document Upload Form */}
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider pb-2 border-b border-slate-200">
                {t.step1Title}
              </h3>

              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#17324D] mb-1">Document Category</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md">
                    <option value="NVTI">NVTI Technical Trade Certificate</option>
                    <option value="ID">National Identity Card / Passport</option>
                    <option value="REG">Business Registration / RGD Ghana</option>
                    <option value="SAFETY">HSE Safety Certification</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-slate-300 p-8 rounded-lg text-center bg-slate-50 hover:bg-white transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="font-bold text-[#17324D] block text-xs">Click to browse or drag & drop files</span>
                  <span className="text-[10px] text-slate-400 block mt-1">PDF, JPG, PNG up to 15MB. Encrypted private storage.</span>
                </div>

                <Button type="submit" variant="primary">
                  {t.btnSubmit}
                </Button>
              </form>
            </Card>

          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5 space-y-3 bg-[#17324D] text-white">
              <h4 className="text-sm font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16805C]" /> Private Storage Notice
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.trustSubtitle}
              </p>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
