'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MapPin, PlusCircle, ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  const { projects, setIsCreateProjectModalOpen, currentCurrency, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-2.5 py-0.5 rounded">
                {t.tabProjects}
              </span>
              <span className="text-xs text-slate-500">• {filteredProjects.length} {t.activeProjects}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              {t.projects} & {t.dailyReports}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {t.heroSubtitle}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsCreateProjectModalOpen(true)}
            className="mt-4 md:mt-0 gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            {t.btnPostProject}
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} hoverEffect className="p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#245A7A]">
                      {project.type}
                    </span>
                    <h2 className="text-xl font-bold text-[#17324D] mt-1">{project.name}</h2>
                    <p className="text-xs text-[#64748B] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {project.location}
                    </p>
                  </div>
                  <Badge variant={project.status === 'In Progress' ? 'AVAILABLE' : 'PENDING'} size="sm">
                    {project.status}
                  </Badge>
                </div>

                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="bg-[#F5F7F9] p-4 rounded-lg border border-slate-200/80 space-y-2">
                  <ProgressBar
                    progress={project.overallProgress}
                    label="Construction Site Progress"
                    colorClass="bg-[#16805C]"
                  />

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200/60 font-semibold text-slate-700">
                    <span>
                      {t.totalSpent}: {currentCurrency} {project.spentGHS.toLocaleString()} / {project.estimatedBudgetGHS.toLocaleString()}
                    </span>
                    <span>{project.workersCount} {t.activeWorkers}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Client: <strong>{project.clientName}</strong></span>
                  <span>Responsable: <strong>{project.siteManagerName || 'Assigned'}</strong></span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="text-xs text-slate-500">
                  Target: <strong>{project.expectedCompletion}</strong>
                </div>

                <Link href={`/projects/${project.id}`}>
                  <Button variant="primary" size="sm" className="gap-1.5">
                    <span>{t.tabProjects}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
