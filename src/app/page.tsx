'use client';

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { JobsGrid } from '@/components/home/JobsGrid';
import { WorkersGrid } from '@/components/home/WorkersGrid';
import { TrustSection } from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <HowItWorks />
      <ServicesGrid />
      <JobsGrid />
      <WorkersGrid />
      <TrustSection />
    </div>
  );
}
