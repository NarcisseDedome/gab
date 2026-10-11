'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, MapPin, Building2, Zap, Droplets, Truck, ArrowRight } from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  const { services, currentCurrency, t } = useApp();

  const getIcon = (category: string) => {
    switch (category) {
      case 'Electrical':
        return Zap;
      case 'Plumbing':
        return Droplets;
      case 'Equipment Rental':
        return Truck;
      default:
        return Building2;
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#245A7A] bg-[#245A7A]/10 px-3 py-1 rounded-full">
              {t.servicesBadge}
            </span>
            <h2 className="text-3xl font-extrabold text-[#17324D] mt-3 tracking-tight">
              {t.servicesTitle}
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              {t.servicesSubtitle}
            </p>
          </div>
          
          <Link href="/services" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-2 text-[#17324D] border-[#17324D]">
              <span>{t.btnExploreServices}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = getIcon(service.category);
            return (
              <Card key={service.id} hoverEffect className="flex flex-col justify-between p-5">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 flex items-center justify-center text-[#17324D]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {service.verified && (
                      <Badge variant="VERIFIED" size="sm">
                        {t.statusVerified}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#17324D] line-clamp-2 leading-snug mb-1">
                    {service.title}
                  </h3>

                  <p className="text-xs font-medium text-[#245A7A] mb-3">
                    {service.providerName}
                  </p>

                  <p className="text-xs text-[#64748B] line-clamp-3 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {service.location}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {service.rating} ({service.projectsCompleted})
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">{t.startingFrom}</span>
                      <span className="text-sm font-extrabold text-[#17324D]">
                        {currentCurrency} {service.startingPriceGHS.toLocaleString()}
                      </span>
                    </div>

                    <Link href={`/services/${service.id}`}>
                      <Button variant="primary" size="sm">
                        {t.btnViewService}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
