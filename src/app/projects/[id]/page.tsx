'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  MapPin,
  Users,
  HardHat,
  DollarSign,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  Camera,
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function ProjectDetailDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { projects, siteReports, setIsDailyReportModalOpen, currentCurrency } = useApp();

  const projectId = params?.id as string;
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const projectReports = siteReports.filter((r) => r.projectId === project.id);

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#245A7A] hover:text-[#17324D] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects Directory
        </button>

        {/* Site Dashboard Header Banner */}
        <Card className="p-6 md:p-8 mb-8 border-t-4 border-t-[#17324D]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge variant="info" size="sm">{project.type}</Badge>
                <Badge variant={project.status === 'In Progress' ? 'AVAILABLE' : 'PENDING'} size="sm">
                  {project.status}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#17324D]">
                {project.name}
              </h1>

              <p className="text-xs text-[#64748B] flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-slate-400" /> {project.location} • Client: <strong>{project.clientName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={() => setIsDailyReportModalOpen(true)}
                className="gap-2 bg-[#17324D]"
              >
                <FileText className="w-4 h-4" /> Log Daily Site Report
              </Button>
            </div>
          </div>
        </Card>

        {/* Top Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Overall Progress</span>
            <span className="text-3xl font-black text-[#16805C]">{project.overallProgress}%</span>
            <div className="mt-2">
              <ProgressBar progress={project.overallProgress} showPercentage={false} colorClass="bg-[#16805C]" />
            </div>
          </Card>

          <Card className="p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Budget Spent</span>
            <span className="text-2xl font-extrabold text-[#17324D]">
              {currentCurrency} {project.spentGHS.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Out of {currentCurrency} {project.estimatedBudgetGHS.toLocaleString()}
            </span>
          </Card>

          <Card className="p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Workers on Site</span>
            <span className="text-3xl font-black text-[#245A7A]">{project.workersCount} / 20</span>
            <span className="text-xs text-[#16805C] font-semibold block mt-1">✓ Full Attendance Logged</span>
          </Card>

          <Card className="p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Site Manager</span>
            <span className="text-lg font-bold text-[#17324D] line-clamp-1">
              {project.siteManagerName || 'Abena Osei'}
            </span>
            <span className="text-xs text-[#245A7A] font-semibold block mt-1">Quantity Surveyor Certified</span>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Milestones & Progress Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Milestones Breakdown */}
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider">
                  Contract Milestone Breakdown & Escrow Approval
                </h3>
                <span className="text-xs text-slate-500">{project.milestones.length} Phases Total</span>
              </div>

              <div className="space-y-4">
                {project.milestones.map((m) => (
                  <div key={m.id} className="p-4 bg-[#F5F7F9] rounded-lg border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-[#17324D]">{m.name}</h4>
                        <span className="text-xs text-slate-500">Target Deadline: {m.deadline}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#17324D]">
                          {currentCurrency} {m.amountGHS.toLocaleString()}
                        </span>
                        <div className="mt-0.5">
                          <Badge
                            variant={
                              m.status === 'APPROVED' ? 'VERIFIED' : m.status === 'IN_PROGRESS' ? 'PENDING' : 'UNAVAILABLE'
                            }
                            size="sm"
                          >
                            {m.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <ProgressBar progress={m.progress} colorClass={m.status === 'APPROVED' ? 'bg-[#16805C]' : 'bg-[#245A7A]'} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Daily Site Reports Feed */}
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#245A7A]" />
                  Daily Site Logs & Inspection Reports
                </h3>
                <Button size="sm" variant="outline" onClick={() => setIsDailyReportModalOpen(true)}>
                  + Add Log
                </Button>
              </div>

              <div className="space-y-4">
                {projectReports.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No reports logged today yet.</p>
                ) : (
                  projectReports.map((rep) => (
                    <div key={rep.id} className="p-4 bg-white rounded-lg border border-slate-200 space-y-3 shadow-xs">
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
                        <span className="font-bold text-[#17324D]">Date: {rep.date}</span>
                        <span className="text-[#16805C] font-semibold">Logged by: {rep.siteManagerName}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 bg-[#F5F7F9] p-2.5 rounded">
                        <div>Workers Present: <strong>{rep.workersPresent}</strong></div>
                        <div>Workers Absent: <strong>{rep.workersAbsent}</strong></div>
                        <div>Weather: <strong>{rep.weatherCondition}</strong></div>
                      </div>

                      <p className="text-xs text-[#17212B] leading-relaxed">
                        <strong>Summary:</strong> {rep.summary}
                      </p>

                      {rep.issuesReported && rep.issuesReported !== 'None' && (
                        <div className="text-xs text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Issues: {rep.issuesReported}</span>
                        </div>
                      )}

                      {rep.photos.length > 0 && (
                        <div className="flex gap-2 pt-1">
                          {rep.photos.map((ph, idx) => (
                            <img
                              key={idx}
                              src={ph}
                              alt="Site update"
                              className="w-20 h-20 rounded border border-slate-200 object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>

          </div>

          {/* Right Column - Project Gallery & Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Project Gallery */}
            <Card className="p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17324D] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#245A7A]" />
                Recent Site Photos & Blueprint Plans
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {project.latestPhotos.map((photo, i) => (
                  <div key={i} className="h-44 rounded-lg overflow-hidden border border-slate-200 shadow-xs">
                    <img src={photo} alt="Building site" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Escrow Custody Status */}
            <Card className="p-5 space-y-3 bg-[#17324D] text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#16805C]" />
                <h4 className="text-sm font-bold">Secured Escrow Account</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Project funds are held in GAB-work digital custody. Milestones are released only after Site Manager verification and Client approval.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-amber-300 font-semibold">
                Transparent 10% Platform Commission Model Active.
              </div>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
