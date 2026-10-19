'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Veuillez saisir votre adresse email.', 'warning');
      return;
    }

    setLoading(true);
    const success = login(email, password);
    setLoading(false);

    if (success) {
      if (email.toLowerCase().trim() === 'admin@gabwork.com' || email.toLowerCase().trim() === 'admin@gab.com') {
        router.push('/dashboard/admin');
      } else {
        router.push('/profile');
      }
    }
  };

  const handleAdminQuickFill = () => {
    setEmail('admin@gabwork.com');
    setPassword('••••••••••••');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#17324D] flex items-center justify-center text-white font-bold text-xl border border-[#245A7A] shadow-sm">
              <span className="text-[#F5F7F9]">G</span>
              <span className="text-[#245A7A] text-xs leading-none">▲</span>
            </div>
            <span className="text-2xl font-black text-[#17324D] tracking-tight">
              GAB<span className="text-[#245A7A] font-semibold">-work</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            Connexion à votre espace
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#64748B]">
            Accédez à vos chantiers, vos contrats BTP et vos garanties de paiement séquestre.
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 sm:p-8 bg-white border-slate-200 shadow-md rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Adresse Email professionnelle
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@domaine.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mot de passe
                </label>
                <a href="#" className="text-xs text-[#245A7A] hover:underline font-semibold">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full justify-center gap-2 shadow-xs font-bold mt-2 py-3 rounded-xl bg-[#17324D] hover:bg-[#17324D]/90"
            >
              <span>{loading ? 'Connexion en cours...' : 'Se connecter'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Quick Admin Access */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              Espace Administrateur ?
            </span>
            <button
              type="button"
              onClick={handleAdminQuickFill}
              className="text-[#17324D] hover:underline font-bold flex items-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Identifiant Super Admin</span>
            </button>
          </div>
        </Card>

        {/* Guarantees */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-white/70 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Vérification KYC BTP</span>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#245A7A] shrink-0" />
            <span className="font-semibold">Paiements Séquestre</span>
          </div>
        </div>

        {/* Register CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Vous n’avez pas encore de compte sur GAB-work ?
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 mt-2 font-bold text-[#17324D] hover:text-[#245A7A] text-sm underline decoration-2 underline-offset-4"
          >
            <span>Créer un compte professionnel (Artisan, Entreprise, Client, Chef de Chantier)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
