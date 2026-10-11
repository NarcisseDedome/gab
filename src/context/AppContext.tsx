'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  UserRole,
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

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
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
  const [activeRole, setActiveRole] = useState<UserRole>('client');
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
        activeRole,
        setActiveRole,
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
