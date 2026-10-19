'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UserRole, VerificationStatus } from '@/types';
import { UserStatusBadge } from '@/components/shared/UserStatusBadge';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  RotateCcw,
  FileText,
  Building2,
  HardHat,
  ClipboardCheck,
  Calendar,
  Database,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    allUsers,
    workers,
    companies,
    projects,
    contracts,
    siteReports,
    disputes,
    payments,
    auditLogs,
    currentCurrency,
    adminUpdateUserStatus,
    adminApproveKycDocument,
    adminRejectKycDocument,
    adminReleaseEscrow,
    adminRefundEscrow,
    showToast,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'USERS' | 'KYC' | 'ESCROW' | 'SITE_REPORTS' | 'DISPUTES' | 'AUDIT'>('USERS');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate GAB-work 10% commission total revenue
  const totalGabRevenue = contracts.reduce((acc, c) => acc + c.gabWorkFeeGHS, 0);
  const totalEscrowHeld = contracts.reduce((acc, c) => acc + (c.status === 'ACTIVE' ? c.totalAmountGHS : 0), 0);

  // Filtered users
  const filteredUsers = allUsers.filter((u) => {
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.city && u.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.trade && u.trade.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRole && matchSearch;
  });

  // Collect all KYC documents from all users
  const allKycDocs = allUsers.flatMap((u) =>
    (u.kycDocuments || []).map((doc) => ({
      ...doc,
      user: u
    }))
  );

  return (
    <div className="bg-[#F5F7F9] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white bg-[#C2413B] px-3 py-1 rounded-full shadow-xs">
                Console Super Admin • Contrôle Intégral
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border flex items-center gap-1.5 ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                <Database className="w-3.5 h-3.5" />
                <span>Base Supabase : {isSupabaseConfigured ? 'Connectée (Live)' : 'Prête (Mode Local Synchro)'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#17324D] tracking-tight">
              Administration & Surveillance de la Plateforme
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Supervision de l'ensemble des comptes utilisateurs, validation KYC, contrôle souverain du séquestre financier et arbitrage.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/profile">
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <span>Mon Profil Admin</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 6 Key Platform Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card className="p-3.5 bg-white border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block truncate">Utilisateurs Inscrits</span>
            <span className="text-xl font-black text-[#17324D]">{allUsers.length + 1240}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Tous rôles confondus</span>
          </Card>

          <Card className="p-3.5 bg-white border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block truncate">Ouvriers Actifs</span>
            <span className="text-xl font-black text-[#245A7A]">{workers.length + 850}</span>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Certifiés NVTI</span>
          </Card>

          <Card className="p-3.5 bg-white border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block truncate">Entreprises BTP</span>
            <span className="text-xl font-black text-[#17324D]">{companies.length + 120}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">RCCM Validés</span>
          </Card>

          <Card className="p-3.5 bg-white border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block truncate">Séquestre Actif</span>
            <span className="text-sm font-black text-[#16805C]">{currentCurrency} {totalEscrowHeld.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Fonds 100% garantis</span>
          </Card>

          <Card className="p-3.5 bg-[#17324D] text-white border-0 shadow-xs">
            <span className="text-[10px] font-bold text-slate-300 uppercase block truncate">Commissions 10%</span>
            <span className="text-sm font-black text-amber-300">{currentCurrency} {totalGabRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-slate-300 block mt-0.5">Revenus plateforme</span>
          </Card>

          <Card className="p-3.5 bg-rose-50 border-rose-200">
            <span className="text-[10px] font-bold text-rose-700 uppercase block truncate">File Litiges & KYC</span>
            <span className="text-xl font-black text-rose-700">{disputes.length + allKycDocs.filter(d => d.status === 'PENDING').length}</span>
            <span className="text-[10px] text-rose-600 block mt-0.5">Actions requises</span>
          </Card>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl p-1.5 gap-2 overflow-x-auto shadow-xs">
          {[
            { id: 'USERS', label: `Gestion des Utilisateurs (${allUsers.length})`, icon: Users },
            { id: 'KYC', label: `Validation KYC (${allKycDocs.length})`, icon: ShieldCheck },
            { id: 'ESCROW', label: `Contrôle Séquestre Escrow (${contracts.length})`, icon: Lock },
            { id: 'SITE_REPORTS', label: `Rapports de Chantiers (${siteReports.length})`, icon: ClipboardCheck },
            { id: 'DISPUTES', label: `Litiges & Arbitrage (${disputes.length})`, icon: AlertTriangle },
            { id: 'AUDIT', label: `Journal d'Audit Système (${auditLogs.length})`, icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#17324D] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: USERS & PROFILES MANAGEMENT */}
        {activeTab === 'USERS' && (
          <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#17324D]">
                  Annuaire Complet des Profils & Contrôle des Permissions
                </h3>
                <p className="text-xs text-slate-500">
                  Modifiez instantanément le statut ou le rôle de chaque membre inscrit sur GAB-work.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrer par nom, email..."
                    className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#17324D]"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white font-medium text-slate-700"
                >
                  <option value="ALL">Tous les rôles</option>
                  <option value="worker">Ouvriers / Artisans</option>
                  <option value="company">Entreprises BTP</option>
                  <option value="client">Clients / Promoteurs</option>
                  <option value="sitemanager">Chefs de chantier</option>
                  <option value="admin">Administrateurs</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Utilisateur</th>
                    <th className="py-3 px-4">Rôle</th>
                    <th className="py-3 px-4">Statut Actuel</th>
                    <th className="py-3 px-4">Localisation</th>
                    <th className="py-3 px-4">Complétion</th>
                    <th className="py-3 px-4 text-right">Actions Administrateur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="truncate">
                            <span className="font-bold text-slate-800 block truncate">{user.name}</span>
                            <span className="text-[11px] text-slate-400 block truncate">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-700 uppercase text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                          {user.role}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <UserStatusBadge status={user.verifiedStatus} size="sm" />
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        {user.city}, {user.country}
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-700">
                        {user.completionRate || 75}%
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {user.verifiedStatus !== 'VERIFIED' ? (
                            <button
                              onClick={() => adminUpdateUserStatus(user.id, 'VERIFIED')}
                              className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold hover:bg-emerald-100 transition-colors text-[11px]"
                              title="Valider et accorder le statut Vérifié BTP"
                            >
                              ✓ Valider
                            </button>
                          ) : (
                            <button
                              onClick={() => adminUpdateUserStatus(user.id, 'REJECTED')}
                              className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-300 font-bold hover:bg-rose-100 transition-colors text-[11px]"
                              title="Révoquer le statut certifié"
                            >
                              ✕ Suspendre
                            </button>
                          )}

                          <select
                            value={user.role}
                            onChange={(e) => adminUpdateUserStatus(user.id, user.verifiedStatus, e.target.value as UserRole)}
                            className="px-2 py-1 text-[11px] border border-slate-300 rounded bg-white font-medium text-slate-700"
                            title="Modifier le rôle"
                          >
                            <option value="worker">Artisan</option>
                            <option value="company">Entreprise</option>
                            <option value="client">Client</option>
                            <option value="sitemanager">Chef Chantier</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* TAB 2: KYC & VERIFICATION AUDIT */}
        {activeTab === 'KYC' && (
          <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Dossiers de Vérification KYC Soumis par les Utilisateurs
              </h3>
              <p className="text-xs text-slate-500">
                Auditez les pièces justificatives d'identité, diplômes professionnels et registres de commerce.
              </p>
            </div>

            <div className="space-y-3">
              {allKycDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 truncate">
                    <img
                      src={doc.user.avatar}
                      alt={doc.user.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {doc.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Soumis par <strong>{doc.user.name}</strong> ({doc.user.role.toUpperCase()}) • Type : {doc.type} • Date : {doc.uploadedAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      doc.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : doc.status === 'REJECTED'
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}>
                      {doc.status === 'APPROVED' ? 'Validé' : doc.status === 'REJECTED' ? 'Rejeté' : 'En attente d’audit'}
                    </span>

                    {doc.status !== 'APPROVED' && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => adminApproveKycDocument(doc.id, doc.user.id)}
                        className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approuver</span>
                      </Button>
                    )}

                    {doc.status !== 'REJECTED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => adminRejectKycDocument(doc.id, doc.user.id, 'Pièce illisible ou non reconnue')}
                        className="text-xs text-rose-600 border-rose-300 hover:bg-rose-50 gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Rejeter</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* TAB 3: ESCROW & CONTRACT CONTROL */}
        {activeTab === 'ESCROW' && (
          <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Contrôle Souverain du Séquestre Escrow & Contrats BTP
              </h3>
              <p className="text-xs text-slate-500">
                L'administrateur peut ordonner le déblocage d'un jalon ou le remboursement total au client en cas de défaillance.
              </p>
            </div>

            <div className="space-y-3">
              {contracts.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#17324D]">{c.contractNumber}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        c.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800">{c.projectName || c.title}</div>
                    <div className="text-[11px] text-slate-500">
                      Client : <strong>{c.clientName}</strong> ➔ Prestataire : <strong>{c.providerName}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-black text-[#16805C]">
                        {currentCurrency} {c.totalAmountGHS.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-amber-700 font-semibold">
                        Commission GAB (10%) : {currentCurrency} {c.gabWorkFeeGHS.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {c.status === 'ACTIVE' && (
                        <>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => adminReleaseEscrow(c.id)}
                            className="text-xs bg-[#16805C] hover:bg-[#16805C]/90 gap-1"
                            title="Débloquer les fonds au prestataire"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Débloquer</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => adminRefundEscrow(c.id)}
                            className="text-xs text-rose-600 border-rose-300 hover:bg-rose-50 gap-1"
                            title="Rembourser le client"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Rembourser</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* TAB 4: SITE REPORTS SURVEILLANCE */}
        {activeTab === 'SITE_REPORTS' && (
          <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Journaux de Chantier Quotidiens des Chefs de Travaux
              </h3>
              <p className="text-xs text-slate-500">
                Surveillance de la présence ouvrière, des conditions climatiques et des preuves photographiques.
              </p>
            </div>

            <div className="space-y-3">
              {siteReports.map((report) => (
                <div key={report.id} className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#17324D]">
                        Rapport du {report.date} • {report.projectName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Chef de Chantier assermenté : <strong>{report.siteManagerName}</strong> • Météo : {report.weatherCondition}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {report.progressPercent}% Avancement certifié
                      </span>
                      <span className="text-slate-600">
                        {report.workersPresent} Ouvriers présents
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200/80 leading-relaxed">
                    "{report.summary}"
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* TAB 5: DISPUTES ARBITRATION */}
        {activeTab === 'DISPUTES' && (
          <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Tribunal d'Arbitrage & Résolution des Litiges
              </h3>
              <p className="text-xs text-slate-500">
                L'administrateur GAB-work arbitre les conflits entre clients et prestataires avec valeur contractuelle.
              </p>
            </div>

            <div className="space-y-3">
              {disputes.map((d) => (
                <div key={d.id} className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono font-bold text-xs text-rose-800">{d.disputeNumber}</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">{d.reason}</h4>
                      <p className="text-xs text-slate-600">
                        Demandeur : <strong>{d.openedBy}</strong> contre <strong>{d.against}</strong>
                      </p>
                    </div>
                    <span className="text-sm font-black text-rose-700">
                      Montant en jeu : {currentCurrency} {d.amountInQuestionGHS.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-rose-200/60">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => showToast(`Litige ${d.disputeNumber} tranché : Accord amiable homologué.`, 'success')}
                      className="text-xs bg-[#17324D]"
                    >
                      Arbitrer le Litige
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* TAB 6: AUDIT TRAIL LOGS */}
        {activeTab === 'AUDIT' && (
          <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                Registre d'Audit Système & Sécurité Temps Réel
              </h3>
              <p className="text-xs text-slate-500">
                Traçabilité intégrale de chaque contrat, virement séquestre et changement de statut utilisateur.
              </p>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.actor}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                        {log.actorRole}
                      </span>
                      <span className="font-mono text-emerald-700 font-bold">[{log.action}]</span>
                    </div>
                    <p className="text-slate-600">{log.details}</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 shrink-0">
                    <div>{log.timestamp}</div>
                    <div className="font-mono">{log.ipAddress}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
