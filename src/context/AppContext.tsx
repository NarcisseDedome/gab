'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  User,
  KYCDocument,
  UserRole,
  VerificationStatus,
  CountryCode,
  CurrencyCode,
  WorkerProfile,
  Company,
  Job,
  Service,
  Project,
  Contract,
  DailySiteReport,
  Dispute,
  PaymentTransaction,
  Conversation,
  Message,
  AuditLog,
  Application
} from '../types';
import { LanguageCode, TranslationDictionary, TRANSLATIONS } from '../i18n/translations';
import {
  MOCK_USERS,
  MOCK_WORKERS,
  MOCK_COMPANIES,
  MOCK_JOBS,
  MOCK_SERVICES,
  MOCK_PROJECTS,
  MOCK_CONTRACTS,
  MOCK_SITE_REPORTS,
  MOCK_DISPUTES,
  MOCK_PAYMENTS,
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
  MOCK_AUDIT_LOGS,
  MOCK_APPLICATIONS
} from '../mock/data';
import { supabaseService } from '../lib/supabaseService';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  allUsers: User[];
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  loginAsRole: (role: UserRole) => void;
  registerUser: (userData: Partial<User>) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  submitKycDocument: (type: KYCDocument['type'], name: string) => void;
  logout: () => void;

  // Admin Sovereign Controls
  adminUpdateUserStatus: (userId: string, newStatus: VerificationStatus, newRole?: UserRole) => void;
  adminApproveKycDocument: (docId: string, userId: string) => void;
  adminRejectKycDocument: (docId: string, userId: string, reason?: string) => void;
  adminReleaseEscrow: (contractId: string) => void;
  adminRefundEscrow: (contractId: string) => void;

  currentCountry: CountryCode;
  setCurrentCountry: (country: CountryCode) => void;
  currentCurrency: CurrencyCode;
  setCurrentCurrency: (currency: CurrencyCode) => void;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  workers: WorkerProfile[];
  companies: Company[];
  jobs: Job[];
  services: Service[];
  projects: Project[];
  contracts: Contract[];
  siteReports: DailySiteReport[];
  disputes: Dispute[];
  payments: PaymentTransaction[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  auditLogs: AuditLog[];
  applications: Application[];
  
  // Modals state
  isPostJobModalOpen: boolean;
  setIsPostJobModalOpen: (open: boolean) => void;
  isCreateProjectModalOpen: boolean;
  setIsCreateProjectModalOpen: (open: boolean) => void;
  isRequestQuoteModalOpen: boolean;
  setIsRequestQuoteModalOpen: (open: boolean) => void;
  selectedWorkerForQuote: WorkerProfile | null;
  setSelectedWorkerForQuote: (worker: WorkerProfile | null) => void;
  isDailyReportModalOpen: boolean;
  setIsDailyReportModalOpen: (open: boolean) => void;
  isOpenDisputeModalOpen: boolean;
  setIsOpenDisputeModalOpen: (open: boolean) => void;

  // Actions
  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'status'>) => void;
  addProject: (project: Omit<Project, 'id' | 'overallProgress' | 'spentGHS' | 'status' | 'milestones'>) => void;
  addSiteReport: (report: Omit<DailySiteReport, 'id'>) => void;
  addDispute: (dispute: Omit<Dispute, 'id' | 'disputeNumber' | 'createdDate' | 'status'>) => void;
  addContract: (contract: Omit<Contract, 'id' | 'contractNumber' | 'gabWorkFeeGHS' | 'netProviderAmountGHS'>) => void;
  applyForJob: (jobId: string, coverNote: string, proposedRateGHS: number) => void;
  toasts: NotificationToast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeRole, setActiveRoleState] = useState<UserRole>('client');
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS['client'] || null);
  const [allUsers, setAllUsers] = useState<User[]>(Object.values(MOCK_USERS));

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    if (MOCK_USERS[role]) {
      setCurrentUser(MOCK_USERS[role]);
    }
  };

  const loginAsRole = (role: UserRole) => {
    setActiveRoleState(role);
    if (MOCK_USERS[role]) {
      setCurrentUser(MOCK_USERS[role]);
      showToast(`Connecté en tant que ${MOCK_USERS[role].name} (${role.toUpperCase()})`, 'success');
    }
  };

  const registerUser = (userData: Partial<User>) => {
    const role = userData.role || 'client';
    const newUser: User = {
      id: 'u-' + Math.random().toString(36).substring(2, 8),
      name: userData.name || 'Nouvel Utilisateur',
      email: userData.email || '',
      phone: userData.phone || '',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      role: role,
      country: userData.country || 'GH',
      city: userData.city || 'Accra',
      verifiedStatus: userData.verifiedStatus || 'PENDING',
      joinedDate: 'Oct 2026',
      bio: userData.bio || '',
      completionRate: userData.completionRate || 75,
      trade: userData.trade,
      companyName: userData.companyName,
      registrationNumber: userData.registrationNumber,
      experienceYears: userData.experienceYears,
      dailyRateGHS: userData.dailyRateGHS,
      availabilityStatus: userData.availabilityStatus || 'AVAILABLE',
      address: userData.address,
      kycDocuments: userData.kycDocuments || [
        {
          id: 'doc-' + Math.random().toString(36).substring(2, 6),
          type: 'ID_CARD',
          name: 'Pièce d’identité officielle soumise',
          status: 'PENDING',
          uploadedAt: new Date().toISOString().split('T')[0]
        }
      ]
    };

    setCurrentUser(newUser);
    setAllUsers((prev) => [newUser, ...prev]);
    setActiveRoleState(role);
    supabaseService.saveUser(newUser);
    showToast(`Compte créé avec succès ! Bienvenue sur GAB-work, ${newUser.name}.`, 'success');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    supabaseService.saveUser(updated);
    showToast('Profil mis à jour avec succès.', 'success');
  };

  const submitKycDocument = (type: KYCDocument['type'], name: string) => {
    if (!currentUser) return;
    const newDoc: KYCDocument = {
      id: 'doc-' + Math.random().toString(36).substring(2, 7),
      type,
      name,
      status: 'PENDING',
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    const updatedDocs = [...(currentUser.kycDocuments || []), newDoc];
    const updatedUser: User = {
      ...currentUser,
      kycDocuments: updatedDocs,
      verifiedStatus: 'PENDING',
      completionRate: Math.min(100, (currentUser.completionRate || 70) + 15)
    };
    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    supabaseService.saveKycDocument(currentUser.id, newDoc);
    showToast(`Document "${name}" soumis pour vérification. Statut : En attente.`, 'info');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Vous avez été déconnecté.', 'info');
  };

  // ADMIN SOVEREIGN CONTROLS
  const adminUpdateUserStatus = (userId: string, newStatus: VerificationStatus, newRole?: UserRole) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            verifiedStatus: newStatus,
            role: newRole || u.role
          };
        }
        return u;
      })
    );

    if (currentUser?.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, verifiedStatus: newStatus, role: newRole || prev.role } : null));
    }

    supabaseService.updateUserStatus(userId, newStatus, newRole);

    const log: AuditLog = {
      id: 'aud-' + Date.now(),
      actor: 'Marc Dossou (Admin)',
      actorRole: 'Admin',
      action: 'STATUS_UPDATED',
      resource: `User ID #${userId}`,
      timestamp: new Date().toISOString(),
      ipAddress: '197.234.221.14',
      details: `Admin a défini le statut sur ${newStatus}${newRole ? ` et le rôle sur ${newRole}` : ''}.`
    };
    setAuditLogs((prev) => [log, ...prev]);
    supabaseService.logAuditEvent(log);

    showToast(`Statut de l'utilisateur #${userId} mis à jour : ${newStatus}`, 'success');
  };

  const adminApproveKycDocument = (docId: string, userId: string) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updatedDocs = (u.kycDocuments || []).map((d) => (d.id === docId ? { ...d, status: 'APPROVED' as const } : d));
          return {
            ...u,
            verifiedStatus: 'VERIFIED' as const,
            completionRate: 100,
            kycDocuments: updatedDocs
          };
        }
        return u;
      })
    );

    if (currentUser?.id === userId) {
      setCurrentUser((prev) => {
        if (!prev) return null;
        const updatedDocs = (prev.kycDocuments || []).map((d) => (d.id === docId ? { ...d, status: 'APPROVED' as const } : d));
        return { ...prev, verifiedStatus: 'VERIFIED', completionRate: 100, kycDocuments: updatedDocs };
      });
    }

    supabaseService.updateKycDocumentStatus(docId, 'APPROVED');

    const log: AuditLog = {
      id: 'aud-' + Date.now(),
      actor: 'Marc Dossou (Admin)',
      actorRole: 'Admin',
      action: 'KYC_APPROVED',
      resource: `KYC Document #${docId}`,
      timestamp: new Date().toISOString(),
      ipAddress: '197.234.221.14',
      details: `Admin a validé le document KYC #${docId} pour l'utilisateur #${userId}. Profil passé à VÉRIFIÉ.`
    };
    setAuditLogs((prev) => [log, ...prev]);
    supabaseService.logAuditEvent(log);

    showToast(`Document #${docId} validé avec succès ! Profil utilisateur certifié.`, 'success');
  };

  const adminRejectKycDocument = (docId: string, userId: string, reason: string = 'Document non conforme ou illisible') => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updatedDocs = (u.kycDocuments || []).map((d) =>
            d.id === docId ? { ...d, status: 'REJECTED' as const, rejectionReason: reason } : d
          );
          return {
            ...u,
            verifiedStatus: 'REJECTED' as const,
            kycDocuments: updatedDocs
          };
        }
        return u;
      })
    );

    supabaseService.updateKycDocumentStatus(docId, 'REJECTED', reason);
    showToast(`Document rejeté : ${reason}`, 'warning');
  };

  const adminReleaseEscrow = (contractId: string) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === contractId ? { ...c, status: 'COMPLETED' as const } : c))
    );

    const log: AuditLog = {
      id: 'aud-' + Date.now(),
      actor: 'Marc Dossou (Admin)',
      actorRole: 'Admin',
      action: 'ESCROW_RELEASED',
      resource: `Contract #${contractId}`,
      timestamp: new Date().toISOString(),
      ipAddress: '197.234.221.14',
      details: `Déblocage manuel des fonds séquestre au prestataire suite à audit concluant.`
    };
    setAuditLogs((prev) => [log, ...prev]);
    supabaseService.logAuditEvent(log);

    showToast(`Fonds séquestre débloqués avec succès pour le contrat #${contractId} !`, 'success');
  };

  const adminRefundEscrow = (contractId: string) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === contractId ? { ...c, status: 'CANCELLED' as const } : c))
    );

    const log: AuditLog = {
      id: 'aud-' + Date.now(),
      actor: 'Marc Dossou (Admin)',
      actorRole: 'Admin',
      action: 'ESCROW_REFUNDED',
      resource: `Contract #${contractId}`,
      timestamp: new Date().toISOString(),
      ipAddress: '197.234.221.14',
      details: `Remboursement intégral des fonds séquestre au client suite à annulation / arbitrage.`
    };
    setAuditLogs((prev) => [log, ...prev]);
    supabaseService.logAuditEvent(log);

    showToast(`Fonds séquestre remboursés intégralement au client (Contrat #${contractId})`, 'info');
  };

  const [currentCountry, setCurrentCountry] = useState<CountryCode>('GH');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('GHS');
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>('fr'); // Default to French for user request or EN

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const setCurrentLanguage = (lang: LanguageCode) => {
    setCurrentLanguageState(lang);
    showToast(`Language switched to ${lang === 'fr' ? 'Français' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : 'English'}!`, 'info');
  };

  const [workers, setWorkers] = useState<WorkerProfile[]>(MOCK_WORKERS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [siteReports, setSiteReports] = useState<DailySiteReport[]>(MOCK_SITE_REPORTS);
  const [disputes, setDisputes] = useState<Dispute[]>(MOCK_DISPUTES);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);

  // Modals state
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isRequestQuoteModalOpen, setIsRequestQuoteModalOpen] = useState(false);
  const [selectedWorkerForQuote, setSelectedWorkerForQuote] = useState<WorkerProfile | null>(null);
  const [isDailyReportModalOpen, setIsDailyReportModalOpen] = useState(false);
  const [isOpenDisputeModalOpen, setIsOpenDisputeModalOpen] = useState(false);

  // Toast feedback
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'status'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `j-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'OPEN',
    };
    setJobs((prev) => [newJob, ...prev]);
    showToast('Job offer published successfully on GAB-work!', 'success');
  };

  const addProject = (newProjData: Omit<Project, 'id' | 'overallProgress' | 'spentGHS' | 'status' | 'milestones'>) => {
    const newProject: Project = {
      ...newProjData,
      id: `p-${Date.now()}`,
      spentGHS: 0,
      overallProgress: 0,
      status: 'Planning',
      milestones: [
        { id: `m-${Date.now()}-1`, name: 'Phase 1: Foundation & Excavation', amountGHS: newProjData.estimatedBudgetGHS * 0.3, progress: 0, status: 'PENDING', deadline: '2026-11-15' },
        { id: `m-${Date.now()}-2`, name: 'Phase 2: Superstructure & Masonry', amountGHS: newProjData.estimatedBudgetGHS * 0.4, progress: 0, status: 'PENDING', deadline: '2026-12-15' },
        { id: `m-${Date.now()}-3`, name: 'Phase 3: MEP & Finishing', amountGHS: newProjData.estimatedBudgetGHS * 0.3, progress: 0, status: 'PENDING', deadline: '2027-01-30' },
      ],
      latestPhotos: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80'
      ]
    };
    setProjects((prev) => [newProject, ...prev]);
    showToast(`Project "${newProject.name}" published on GAB-work!`, 'success');
  };

  const addSiteReport = (reportData: Omit<DailySiteReport, 'id'>) => {
    const newReport: DailySiteReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
    };
    setSiteReports((prev) => [newReport, ...prev]);
    showToast('Daily Site Log recorded successfully!', 'success');

    setProjects((prev) =>
      prev.map((p) =>
        p.id === reportData.projectId
          ? { ...p, overallProgress: reportData.progressPercent }
          : p
      )
    );
  };

  const addDispute = (disputeData: Omit<Dispute, 'id' | 'disputeNumber' | 'createdDate' | 'status'>) => {
    const newDispute: Dispute = {
      ...disputeData,
      id: `dsp-${Date.now()}`,
      disputeNumber: `GAB-DSP-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'OPEN',
    };
    setDisputes((prev) => [newDispute, ...prev]);
    showToast('Dispute opened and submitted to GAB-work Resolution Center.', 'warning');
  };

  const addContract = (contractData: Omit<Contract, 'id' | 'contractNumber' | 'gabWorkFeeGHS' | 'netProviderAmountGHS'>) => {
    const totalAmount = contractData.totalAmountGHS;
    const gabFee = Math.round(totalAmount * 0.1);
    const netProvider = totalAmount - gabFee;

    const newContract: Contract = {
      ...contractData,
      id: `cnt-${Date.now()}`,
      contractNumber: `GAB-CNT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      gabWorkFeeGHS: gabFee,
      netProviderAmountGHS: netProvider,
    };

    setContracts((prev) => [newContract, ...prev]);
    showToast(`Digital Contract created! Total: GHS ${totalAmount.toLocaleString()} (GAB Fee 10%: GHS ${gabFee.toLocaleString()})`, 'success');
  };

  const applyForJob = (jobId: string, coverNote: string, proposedRateGHS: number) => {
    const targetJob = jobs.find((j) => j.id === jobId);
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob ? targetJob.title : 'Masonry Role',
      workerId: 'w-1',
      workerName: 'Kwame Mensah',
      workerTrade: 'Mason & Site Specialist',
      workerAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
      appliedDate: new Date().toISOString().split('T')[0],
      proposedRateGHS,
      status: 'PENDING',
      coverNote,
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast('Application submitted to employer!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        activeRole,
        setActiveRole,
        loginAsRole,
        registerUser,
        updateUserProfile,
        submitKycDocument,
        logout,
        adminUpdateUserStatus,
        adminApproveKycDocument,
        adminRejectKycDocument,
        adminReleaseEscrow,
        adminRefundEscrow,
        currentCountry,
        setCurrentCountry,
        currentCurrency,
        setCurrentCurrency,
        currentLanguage,
        setCurrentLanguage,
        t,
        workers,
        companies,
        jobs,
        services,
        projects,
        contracts,
        siteReports,
        disputes,
        payments,
        conversations,
        messages,
        auditLogs,
        applications,
        isPostJobModalOpen,
        setIsPostJobModalOpen,
        isCreateProjectModalOpen,
        setIsCreateProjectModalOpen,
        isRequestQuoteModalOpen,
        setIsRequestQuoteModalOpen,
        selectedWorkerForQuote,
        setSelectedWorkerForQuote,
        isDailyReportModalOpen,
        setIsDailyReportModalOpen,
        isOpenDisputeModalOpen,
        setIsOpenDisputeModalOpen,
        addJob,
        addProject,
        addSiteReport,
        addDispute,
        addContract,
        applyForJob,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
