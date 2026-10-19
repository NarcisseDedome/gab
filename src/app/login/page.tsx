'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  HardHat,
  User,
  Building2,
  ClipboardCheck,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsRole, activeRole, currentUser, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Veuillez saisir votre email et votre mot de passe.', 'warning');
      return;
    }
    // Perform demo login with current active role
    loginAsRole(activeRole);
    router.push('/profile');
  };

  const handleQuickRoleLogin = (role: UserRole) => {
    loginAsRole(role);
    router.push('/profile');
  };

  const demoAccounts: {
    role: UserRole;
    name: string;
    roleLabel: string;
    status: string;
    icon: any;
    color: string;
  }[] = [
    {
      role: 'worker',
      name: 'Kwame Mensah',
      roleLabel: 'Artisan Maçon Qualifié',
      status: 'Vérifié • Disponible',
      icon: HardHat,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      role: 'client',
      name: 'Dr. Samuel Mensah',
      roleLabel: 'Client / Promoteur Privé',
      status: 'Vérifié • Porteur de 2 chantiers',
      icon: User,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      role: 'company',
      name: 'BuildCorp West Africa',
      roleLabel: 'Entreprise Générale BTP',
      status: 'Certifiée • RCCM & Assurance validés',
      icon: Building2,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      role: 'sitemanager',
      name: 'Abena Osei',
      roleLabel: 'Ingénieure Chef de Chantier',
      status: 'Vérifiée • Rapports quotidiens',
      icon: ClipboardCheck,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      role: 'admin',
      name: 'Marc Dossou',
      roleLabel: 'Super Admin & Auditeur KYC',
      status: 'Gestionnaire Escrow & Arbitrage',
      icon: ShieldAlert,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#17324D] flex items-center justify-center text-white font-bold text-lg border border-[#245A7A] shadow-xs">
              <span className="text-[#F5F7F9]">G</span>
              <span className="text-[#245A7A] text-xs leading-none">▲</span>
            </div>
            <span className="text-2xl font-extrabold text-[#17324D] tracking-tight">
              GAB<span className="text-[#245A7A] font-semibold">-work</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Connexion à votre espace
          </h1>
          <p className="mt-2 text-sm text-[#64748B]">
            Accédez à vos chantiers, vos contrats BTP et vos garanties de paiement séquestre.
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 sm:p-8 bg-white border-slate-200 shadow-sm">
          <form onSubmit={handleStandardLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse Email professionnelle
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Mot de passe
                </label>
                <a href="#" className="text-xs text-[#245A7A] hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center gap-2 shadow-xs font-semibold mt-2"
            >
              <span>Se connecter</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Quick Demo Accounts Switcher */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
                Comptes de Démonstration (Accès Rapide par Rôle)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Cliquez sur un profil pour tester instantanément la plateforme avec un rôle et statut précis :
            </p>

            <div className="space-y-2">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleQuickRoleLogin(acc.role)}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#17324D] group-hover:bg-[#17324D] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <span>{acc.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium border ${acc.color}`}>
                            {acc.roleLabel}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">{acc.status}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#17324D] transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Register CTA */}
        <p className="mt-6 text-center text-xs sm:text-sm text-[#64748B]">
          Vous n’avez pas encore de compte ?{' '}
          <Link href="/register" className="font-bold text-[#17324D] hover:underline">
            Créer un compte professionnel
          </Link>
        </p>
      </div>
    </div>
  );
}
