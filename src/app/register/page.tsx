'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole, CountryCode, KYCDocument } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  User,
  HardHat,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Lock,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  AlertCircle
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('worker');

  // Step 2: Account credentials
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<CountryCode>('GH');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  // Step 3: Role specifics
  const [trade, setTrade] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [dailyRateGHS, setDailyRateGHS] = useState<number>(200);
  const [companyName, setCompanyName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [bio, setBio] = useState('');

  // Step 4: Verification docs
  const [idDocName, setIdDocName] = useState<string>('');
  const [tradeDocName, setTradeDocName] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const rolesList: {
    role: UserRole;
    title: string;
    subtitle: string;
    icon: any;
    features: string[];
    badge: string;
  }[] = [
    {
      role: 'worker',
      title: 'Artisan / Ouvrier Qualifié',
      subtitle: 'Maçons, électriciens, plombiers, coffreurs, peintres...',
      icon: HardHat,
      badge: 'Paiements Sécurisés',
      features: [
        'Postulez aux offres de chantiers vérifiés',
        'Garantie de paiement via compte séquestre',
        'Badge de confiance professionnel certifié'
      ]
    },
    {
      role: 'client',
      title: 'Client / Maître d’Ouvrage',
      subtitle: 'Particuliers, promoteurs, investisseurs diaspora...',
      icon: User,
      badge: 'Escrow 100% Garanti',
      features: [
        'Publiez vos chantiers et recevez des devis fiables',
        'Fonds protégés : déblocage sur audit de chaque jalon',
        'Suivi journalier avec rapports photos de terrain'
      ]
    },
    {
      role: 'company',
      title: 'Entreprise Générale BTP',
      subtitle: 'Sociétés de construction, bureaux d’études, TP...',
      icon: Building2,
      badge: 'Grands Projets B2B',
      features: [
        'Répondez aux appels d’offres majeurs et marchés publics',
        'Gérez vos équipes et contrats standardisés BoQ',
        'Facturation et traçabilité financière intégrée'
      ]
    },
    {
      role: 'sitemanager',
      title: 'Chef de Chantier / Conducteur',
      subtitle: 'Ingénieurs, techniciens supérieurs, contrôleurs...',
      icon: ClipboardCheck,
      badge: 'Supervision & Audit',
      features: [
        'Enregistrez les journaux de chantier quotidiens',
        'Auditez la conformité technique des jalons',
        'Rôle clé dans l’autorisation de déblocage des fonds'
      ]
    }
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!name.trim() || !email.trim() || !phone.trim() || !city.trim()) {
        showToast('Veuillez renseigner tous les champs obligatoires.', 'warning');
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!acceptedTerms) {
        showToast('Veuillez accepter la charte de vérification et les conditions de service.', 'warning');
        return;
      }

      // Final registration submit
      const kycDocs = [];
      if (idDocName) {
        kycDocs.push({
          id: 'doc-' + Math.random().toString(36).substring(2, 6),
          type: 'ID_CARD' as const,
          name: idDocName,
          status: 'PENDING' as const,
          uploadedAt: new Date().toISOString().split('T')[0]
        });
      }
      if (tradeDocName) {
        const docType: KYCDocument['type'] = selectedRole === 'company' ? 'BUSINESS_REGISTRATION' : 'TRADE_CERTIFICATE';
        kycDocs.push({
          id: 'doc-' + Math.random().toString(36).substring(2, 6),
          type: docType,
          name: tradeDocName,
          status: 'PENDING' as const,
          uploadedAt: new Date().toISOString().split('T')[0]
        });
      }

      registerUser({
        name,
        email,
        phone,
        country,
        city,
        role: selectedRole,
        trade: trade || (selectedRole === 'worker' ? 'Ouvrier Polyvalent' : undefined),
        experienceYears,
        dailyRateGHS: Number(dailyRateGHS),
        companyName: companyName || (selectedRole === 'company' ? name + ' BTP' : undefined),
        registrationNumber,
        bio: bio || `Professionnel du BTP enregistré sur la plateforme GAB-work.`,
        verifiedStatus: kycDocs.length > 0 ? 'PENDING' : 'UNVERIFIED',
        completionRate: kycDocs.length > 0 ? 80 : 60,
        kycDocuments: kycDocs
      });

      router.push('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Header */}
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
            Créer un compte professionnel
          </h1>
          <p className="mt-2 text-sm text-[#64748B] max-w-md mx-auto">
            Rejoignez la 1ère place de marché BTP avec contrats standardisés, séquestre financier et suivi journalier certifié.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 w-full z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#17324D] transition-all duration-300 z-0"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: 'Rôle' },
              { num: 2, label: 'Identifiants' },
              { num: 3, label: 'Profil Métier' },
              { num: 4, label: 'Statut & KYC' }
            ].map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all shadow-xs ${
                      isPassed
                        ? 'bg-[#16805C] text-white'
                        : isCurrent
                        ? 'bg-[#17324D] text-white ring-4 ring-slate-100'
                        : 'bg-white border-2 border-slate-300 text-slate-500'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`mt-1.5 text-[11px] sm:text-xs font-semibold ${
                      isCurrent ? 'text-[#17324D]' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <Card className="p-6 sm:p-8 border-slate-200 shadow-sm bg-white">
          <form onSubmit={handleNextStep}>
            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#17324D]">Choisissez votre profil sur GAB-work</h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Votre espace de travail et vos autorisations seront configurés selon votre rôle.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rolesList.map((r) => {
                    const isSelected = selectedRole === r.role;
                    const Icon = r.icon;
                    return (
                      <div
                        key={r.role}
                        onClick={() => setSelectedRole(r.role)}
                        className={`cursor-pointer rounded-xl p-4 sm:p-5 border-2 transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#17324D] bg-[#F5F7F9] shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-[#17324D] text-white' : 'bg-slate-100 text-[#17324D]'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                              {r.badge}
                            </span>
                          </div>

                          <h3 className="font-bold text-sm sm:text-base text-[#17212B]">{r.title}</h3>
                          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{r.subtitle}</p>

                          <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-3">
                            {r.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#16805C] shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-2 flex items-center justify-between text-xs font-semibold">
                          <span className={isSelected ? 'text-[#17324D]' : 'text-slate-400'}>
                            {isSelected ? '✓ Rôle sélectionné' : 'Cliquer pour choisir'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CREDENTIALS & CONTACT */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-[#17324D]">Coordonnées & Sécurité du Compte</h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Ces informations serviront à vous connecter et à établir vos contrats numériques sécurisés.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nom complet / Raison sociale <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Kwame Mensah ou Afrique BTP Sarl"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Adresse Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nom@exemple.com"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Téléphone Mobile (avec indicatif) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+233 24 000 0000"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pays d’intervention <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value as CountryCode)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D] bg-white"
                    >
                      <option value="GH">Ghana (GH)</option>
                      <option value="NG">Nigeria (NG)</option>
                      <option value="BJ">Bénin (BJ)</option>
                      <option value="TG">Togo (TG)</option>
                      <option value="CI">Côte d’Ivoire (CI)</option>
                      <option value="BF">Burkina Faso (BF)</option>
                      <option value="SN">Sénégal (SN)</option>
                      <option value="CM">Cameroun (CM)</option>
                      <option value="INT">International / Diaspora</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ville / Région <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex: Accra, Cotonou, Abidjan..."
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mot de passe de sécurité <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="•••••••••••• (au moins 8 caractères)"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ROLE-SPECIFIC FIELDS */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-[#17324D]">
                    Définition du Profil ({rolesList.find((r) => r.role === selectedRole)?.title})
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Renseignez vos spécialités afin que vos clients et partenaires connaissent exactement vos capacités.
                  </p>
                </div>

                {selectedRole === 'worker' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Corps d’état / Métier principal <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        placeholder="Ex: Maçon Gros Œuvre, Électricien Bâtiment..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Années d’expérience confirmées
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tarif journalier indicatif (GHS ou équivalent CFA)
                      </label>
                      <input
                        type="number"
                        min="50"
                        step="10"
                        value={dailyRateGHS}
                        onChange={(e) => setDailyRateGHS(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Disponibilité initiale
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D] bg-white">
                        <option value="AVAILABLE">Disponible immédiatement</option>
                        <option value="PENDING">Disponible sous 2 semaines</option>
                        <option value="TRAVEL_READY">Disponible pour mobilité régionale</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Présentation courte de vos compétences et réalisations
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Décrivez brièvement les types de travaux que vous maîtrisez (villas, fondations, pose de dalles, etc.)..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'company' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nom légal de la Société <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ex: West Africa Infrastructure Builders Ltd"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        N° Registre de Commerce (RCCM / TIN / Reg.)
                      </label>
                      <input
                        type="text"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        placeholder="Ex: CS-2024-8849 / TIN C0029"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Taille estimée de l’équipe
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D] bg-white">
                        <option>1 à 10 employés</option>
                        <option>11 à 50 employés</option>
                        <option>Plus de 50 employés</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Description de l'activité & grands projets réalisés
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Bâtiment résidentiel, génie civil, rénovation industrielle..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'client' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Type de projets principaux envisagés
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D] bg-white">
                        <option>Construction Villa individuelle / Résidence personnelle</option>
                        <option>Immeuble locatif / Projet commercial</option>
                        <option>Rénovation complète / Aménagement</option>
                        <option>Investissement diaspora depuis l'étranger</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        À propos de vos attentes de construction
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Présentez vos besoins : délais, budget cible, sécurité de suivi..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'sitemanager' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Qualification principale <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        placeholder="Ex: Ingénieur Génie Civil, Conducteur de Travaux"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Années de supervision de chantiers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Bio & Références de chantiers audités
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Types d'ouvrages supervisés, maîtrise du BoQ et des audits journaliers..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: KYC & STATUS VERIFICATION */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#17324D]">Statut & Dossier de Vérification (KYC)</h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    GAB-work garantit la confiance grâce à l’audit des pièces justificatives. Vous pouvez déposer vos documents maintenant pour obtenir le statut <strong>Vérifié</strong>.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-800 leading-relaxed">
                    <strong>Badge Vérifié GAB-work :</strong> Les profils vérifiés ont accès prioritaire aux contrats sécurisés avec séquestre financier et bénéficient de +70% de visibilité auprès des recruteurs et clients.
                  </div>
                </div>

                <div className="space-y-4">
                  {/* ID Doc */}
                  <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      1. Pièce d'Identité Officielle (CNI / Passeport / Permis)
                    </label>
                    <p className="text-[11px] text-slate-500 mb-3">Format PDF, JPG ou PNG (max 5 Mo)</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={idDocName}
                        onChange={(e) => setIdDocName(e.target.value)}
                        placeholder="Ex: CNI_Ghana_Card_Recto_Verso.pdf"
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#17324D]"
                      />
                      <button
                        type="button"
                        onClick={() => setIdDocName('CNI_Ghana_Card_Valid_2026.pdf')}
                        className="px-3 py-1.5 bg-[#17324D] text-white text-xs font-medium rounded-md hover:bg-[#245A7A] transition-colors flex items-center gap-1.5 shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Simuler Upload</span>
                      </button>
                    </div>
                  </div>

                  {/* Trade / Business Doc */}
                  <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      {selectedRole === 'company'
                        ? '2. Registre de Commerce / RCCM & Attestation Fiscale'
                        : selectedRole === 'client'
                        ? '2. Justificatif de Domicile ou Titre Foncier (Optionnel)'
                        : '2. Diplôme BTP / Certificat NVTI / Attestation Professionnelle'}
                    </label>
                    <p className="text-[11px] text-slate-500 mb-3">Permet de valider votre statut d'expert agréé.</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={tradeDocName}
                        onChange={(e) => setTradeDocName(e.target.value)}
                        placeholder="Ex: Diplome_Ingenieur_BTP_ou_RCCM.pdf"
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#17324D]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setTradeDocName(
                            selectedRole === 'company'
                              ? 'RCCM_Registre_Entreprise_2026.pdf'
                              : 'Certificat_BTP_Qualification_Pro.pdf'
                          )
                        }
                        className="px-3 py-1.5 bg-slate-700 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1.5 shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Simuler Upload</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#17324D] focus:ring-[#17324D]"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      J'accepte la charte de confiance GAB-work, les règles de paiement par séquestre (*Escrow*) et j'atteste sur l'honneur l'exactitude des informations fournies pour l'attribution de mon statut professionnel.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Stepper Buttons */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(step - 1)}
                  className="gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </Button>
              ) : (
                <div />
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="gap-2 shadow-sm font-semibold"
              >
                <span>{step === 4 ? 'Créer mon compte et mon profil' : 'Continuer'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Bottom Login Link */}
        <p className="mt-6 text-center text-xs sm:text-sm text-[#64748B]">
          Vous avez déjà un compte ?{' '}
          <Link href="/login" className="font-bold text-[#17324D] hover:underline">
            Se connecter directement
          </Link>
        </p>
      </div>
    </div>
  );
}
