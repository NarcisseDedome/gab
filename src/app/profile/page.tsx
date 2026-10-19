'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AvailabilityStatus, KYCDocument } from '@/types';
import { UserStatusBadge, AvailabilityBadge } from '@/components/shared/UserStatusBadge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Save,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Building2,
  HardHat,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  ExternalLink,
  Lock,
  Plus
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateUserProfile, submitKycDocument, activeRole, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'permissions'>('profile');

  // Form states initialized with current user
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [trade, setTrade] = useState(currentUser?.trade || '');
  const [dailyRateGHS, setDailyRateGHS] = useState(currentUser?.dailyRateGHS || 220);
  const [availability, setAvailability] = useState<AvailabilityStatus>(
    currentUser?.availabilityStatus || 'AVAILABLE'
  );
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [registrationNumber, setRegistrationNumber] = useState(currentUser?.registrationNumber || '');

  // New KYC document modal/form state
  const [newDocType, setNewDocType] = useState<KYCDocument['type']>('ID_CARD');
  const [newDocName, setNewDocName] = useState('');
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Aucun utilisateur connecté</h2>
        <p className="text-sm text-slate-600 mb-6">Veuillez vous connecter pour accéder à votre profil.</p>
        <Link href="/login">
          <Button variant="primary">Se connecter</Button>
        </Link>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      city,
      bio,
      trade,
      dailyRateGHS: Number(dailyRateGHS),
      availabilityStatus: availability,
      companyName,
      registrationNumber
    });
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) {
      showToast('Veuillez saisir le nom ou la référence du document.', 'warning');
      return;
    }
    submitKycDocument(newDocType, newDocName.trim());
    setNewDocName('');
    setIsUploadingDoc(false);
  };

  const getDashboardLink = () => {
    switch (currentUser.role) {
      case 'worker':
        return '/dashboard/worker';
      case 'company':
        return '/dashboard/company';
      case 'sitemanager':
        return '/dashboard/sitemanager';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard/client';
    }
  };

  const getRoleTitle = () => {
    switch (currentUser.role) {
      case 'worker':
        return 'Artisan / Ouvrier Spécialiste';
      case 'company':
        return 'Entreprise Générale de Construction';
      case 'sitemanager':
        return 'Chef de Chantier / Conducteur de Travaux';
      case 'admin':
        return 'Super Administrateur & Auditeur KYC';
      default:
        return 'Client / Maître d’Ouvrage';
    }
  };

  const permissionsByRole: Record<string, { label: string; allowed: boolean; detail: string }[]> = {
    client: [
      { label: 'Publication de chantiers & projets', allowed: true, detail: 'Peut créer des appels d’offres publics et privés' },
      { label: 'Approvisionnement du séquestre (Escrow)', allowed: true, detail: 'Dépôt des fonds sécurisés par carte bancaire ou Mobile Money' },
      { label: 'Validation des jalons de travaux', allowed: true, detail: 'Donne l’accord final pour libérer le paiement du prestataire' },
      { label: 'Postuler aux offres d’emploi', allowed: false, detail: 'Réservé aux profils Ouvriers et Entreprises' },
      { label: 'Rapports journaliers de chantier', allowed: false, detail: 'Réservé aux Chefs de chantier assermentés' }
    ],
    worker: [
      { label: 'Postuler aux missions & chantiers', allowed: true, detail: 'Accès illimité aux offres vérifiées de la région' },
      { label: 'Garantie de paiement sous séquestre', allowed: true, detail: 'Paiements garantis et transférables vers Mobile Money' },
      { label: 'Gestion de sa disponibilité temps réel', allowed: true, detail: 'Affichage du statut Disponible / Occupé auprès des clients' },
      { label: 'Publication d’appels d’offres', allowed: false, detail: 'Réservé aux Clients et Entreprises' },
      { label: 'Arbitrage des litiges financiers', allowed: false, detail: 'Réservé aux Administrateurs' }
    ],
    company: [
      { label: 'Réponse aux appels d’offres majeurs', allowed: true, detail: 'Soumission de devis d’entreprise détaillés avec BoQ' },
      { label: 'Gestion d’équipes et sous-traitants', allowed: true, detail: 'Coordination de multiples ouvriers sur le même chantier' },
      { label: 'Contrats BTP certifiés & facturation', allowed: true, detail: 'Émission de factures professionnelles avec TVA et retenues' },
      { label: 'Rapports de supervision externe', allowed: false, detail: 'L’audit indépendant est assuré par le Site Manager' },
      { label: 'Gestion administrative globale', allowed: false, detail: 'Réservé aux Super Admins' }
    ],
    sitemanager: [
      { label: 'Enregistrement des journaux journaliers', allowed: true, detail: 'Saisie présence, météo, pourcentage d’avancement et photos' },
      { label: 'Certification physique des jalons', allowed: true, detail: 'Atteste sur l’honneur de la conformité avant tout déblocage' },
      { label: 'Signalement d’alertes de sécurité', allowed: true, detail: 'Notification directe au client et à l’administrateur' },
      { label: 'Paiement direct des ouvriers', allowed: false, detail: 'Les flux transitent exclusivement par le compte séquestre GAB-work' },
      { label: 'Modification des termes du contrat', allowed: false, detail: 'Soumis à l’accord bilatéral Client - Prestataire' }
    ],
    admin: [
      { label: 'Audit & validation des dossiers KYC', allowed: true, detail: 'Validation des cartes d’identité, RCCM et diplômes' },
      { label: 'Arbitrage des litiges sur séquestre', allowed: true, detail: 'Pouvoir de déblocage ou remboursement après contre-expertise' },
      { label: 'Gestion des commissions de plateforme (10%)', allowed: true, detail: 'Visualisation de la rentabilité et des flux financiers' },
      { label: 'Supervision des logs de sécurité', allowed: true, detail: 'Traçabilité complète des actions selon la norme RGPD / Protection des données' },
      { label: 'Gestion des bannissements et suspensions', allowed: true, detail: 'Protection active de la communauté BTP' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Card Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="h-28 sm:h-36 bg-gradient-to-r from-[#17324D] via-[#1E4366] to-[#245A7A] relative p-6">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Link href={getDashboardLink()}>
                <Button variant="secondary" size="sm" className="bg-white/95 text-[#17324D] hover:bg-white text-xs gap-1.5 shadow-sm">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Accéder à mon tableau de bord</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 sm:-mt-14 mb-4 gap-4">
              <div className="flex items-end gap-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
                />
                <div className="mb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-[#17212B] tracking-tight">
                      {currentUser.name}
                    </h1>
                    <UserStatusBadge status={currentUser.verifiedStatus} size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#245A7A] mt-0.5">
                    {getRoleTitle()} {currentUser.trade ? `• ${currentUser.trade}` : ''}
                  </p>
                </div>
              </div>

              {/* Status & Availability Quick Indicators */}
              <div className="flex flex-wrap items-center gap-2">
                {currentUser.role === 'worker' && (
                  <AvailabilityBadge status={currentUser.availabilityStatus || 'AVAILABLE'} />
                )}
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 font-semibold text-slate-700 border border-slate-200">
                  Rôle : {currentUser.role.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Quick Meta Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{currentUser.city}, {currentUser.country}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{currentUser.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Membre depuis {currentUser.joinedDate}</span>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-4 bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200/80">
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-bold text-[#17324D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16805C]" />
                  Niveau de complétion de votre profil professionnel
                </span>
                <span className="font-extrabold text-[#16805C]">{currentUser.completionRate || 85}%</span>
              </div>
              <ProgressBar progress={currentUser.completionRate || 85} showPercentage={false} colorClass="bg-[#16805C]" />
              <p className="text-[11px] text-[#64748B] mt-1.5">
                {currentUser.verifiedStatus === 'VERIFIED'
                  ? 'Félicitations ! Votre profil est complet et certifié pour les contrats sous séquestre.'
                  : 'Téléchargez vos documents officiels dans l’onglet Vérification pour atteindre 100% et obtenir le badge Vérifié.'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-xs">
          {[
            { id: 'profile', label: 'Mon Profil & Données Métier', icon: User },
            { id: 'kyc', label: `Vérification & Justificatifs (${currentUser.kycDocuments?.length || 0})`, icon: ShieldCheck },
            { id: 'permissions', label: 'Droits & Rôle de la Plateforme', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-[#17324D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EDIT PROFILE */}
        {activeTab === 'profile' && (
          <Card className="p-6 sm:p-8 bg-white border-slate-200 shadow-xs">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#17324D]">Informations Personnelles & Visibilité</h3>
                <p className="text-xs text-[#64748B]">
                  Ces renseignements sont présentés aux clients et partenaires pour attester de vos compétences et de votre statut.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet ou Titre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone de contact direct</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ville et Zone d'intervention</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                  />
                </div>

                {currentUser.role === 'worker' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Spécialité / Corps d’état</label>
                      <input
                        type="text"
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        placeholder="Ex: Maçon Gros Œuvre"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tarif Journalier indicatif (GHS)
                      </label>
                      <input
                        type="number"
                        value={dailyRateGHS}
                        onChange={(e) => setDailyRateGHS(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Statut d'Activité / Disponibilité
                      </label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D] bg-white"
                      >
                        <option value="AVAILABLE">🟢 Disponible immédiatement</option>
                        <option value="PENDING">🟡 Disponible prochainement</option>
                        <option value="UNAVAILABLE">⚪ Indisponible / En mission</option>
                      </select>
                    </div>
                  </>
                )}

                {currentUser.role === 'company' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nom légal de la Société</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">N° RCCM / Enregistrement</label>
                      <input
                        type="text"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                      />
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Présentation professionnelle & Description des chantiers
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <Button type="submit" variant="primary" size="md" className="gap-2 shadow-xs">
                  <Save className="w-4 h-4" />
                  <span>Enregistrer les modifications</span>
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* TAB 2: KYC & DOCUMENTS */}
        {activeTab === 'kyc' && (
          <div className="space-y-6">
            <Card className="p-6 bg-white border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#17324D]">Pièces Justificatives & Dossier de Statut</h3>
                  <p className="text-xs text-[#64748B]">
                    GAB-work exige des pièces vérifiées pour attribuer le statut certifié et protéger les paiements.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsUploadingDoc(true)}
                  className="gap-1.5 text-xs font-semibold shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un document</span>
                </Button>
              </div>

              {/* Upload Form Modal / Drawer */}
              {isUploadingDoc && (
                <div className="mb-6 p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wide">
                      Soumettre une nouvelle pièce d'audit
                    </h4>
                    <button
                      onClick={() => setIsUploadingDoc(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Annuler
                    </button>
                  </div>
                  <form onSubmit={handleAddDocument} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Type de Document</label>
                      <select
                        value={newDocType}
                        onChange={(e) => setNewDocType(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                      >
                        <option value="ID_CARD">Carte d'Identité / CNI</option>
                        <option value="PASSPORT">Passeport</option>
                        <option value="TRADE_CERTIFICATE">Diplôme / Certificat Métier</option>
                        <option value="BUSINESS_REGISTRATION">Registre de Commerce RCCM</option>
                        <option value="INSURANCE">Assurance Décennale / RC</option>
                        <option value="OTHER">Autre pièce officielle</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nom du fichier ou référence</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={newDocName}
                          onChange={(e) => setNewDocName(e.target.value)}
                          placeholder="Ex: Certificat_Qualification_Plomberie_2026.pdf"
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                        />
                        <Button type="submit" variant="primary" size="sm" className="gap-1 text-xs shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Envoyer</span>
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Document List */}
              <div className="space-y-3">
                {(!currentUser.kycDocuments || currentUser.kycDocuments.length === 0) ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    Aucun document soumis pour l'instant. Ajoutez une pièce d'identité pour démarrer la vérification.
                  </div>
                ) : (
                  currentUser.kycDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-9 h-9 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-800 truncate">{doc.name}</div>
                          <div className="text-[11px] text-slate-500">
                            Type : {doc.type} • Soumis le {doc.uploadedAt}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {doc.status === 'APPROVED' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Validé par l'Admin</span>
                          </span>
                        ) : doc.status === 'REJECTED' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Rejeté</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3.5 h-3.5" />
                            <span>En cours d'examen</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 3: ROLES & PERMISSIONS MATRIX */}
        {activeTab === 'permissions' && (
          <Card className="p-6 sm:p-8 bg-white border-slate-200 shadow-xs">
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#17324D]">
                Matrice des Rôles & Autorisations ({currentUser.role.toUpperCase()})
              </h3>
              <p className="text-xs text-[#64748B]">
                Aperçu des droits accordés à votre profil sur la plateforme GAB-work selon le modèle RBAC (*Role-Based Access Control*).
              </p>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {(permissionsByRole[currentUser.role] || []).map((perm, idx) => (
                <div key={idx} className="p-4 flex items-start justify-between gap-4 bg-white hover:bg-slate-50/50">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">{perm.label}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{perm.detail}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${
                      perm.allowed
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {perm.allowed ? '✓ Autorisé' : '✕ Verrouillé'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#17324D]">Besoin de changer de rôle ?</span>
                <p className="text-[11px] text-slate-500">
                  Vous pouvez à tout moment tester un autre espace grâce au sélecteur de rôle rapide ou créer un compte dédié.
                </p>
              </div>
              <Link href="/register">
                <Button variant="outline" size="sm" className="text-xs">
                  Créer un autre compte
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
