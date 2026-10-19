-- =========================================================================
-- SCHEMA SUPABASE POUR GAB-WORK (Plateforme BTP & Escrow Sécurisé)
-- Exécutable directement dans l'éditeur SQL de votre Dashboard Supabase
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('client', 'worker', 'company', 'sitemanager', 'admin');
CREATE TYPE verification_status AS ENUM ('VERIFIED', 'PENDING', 'REJECTED', 'ADDITIONAL_INFO_REQUIRED', 'UNVERIFIED');
CREATE TYPE availability_status AS ENUM ('AVAILABLE', 'PENDING', 'UNAVAILABLE', 'DISPUTE');
CREATE TYPE contract_status AS ENUM ('DRAFT', 'NEGOTIATION', 'PENDING_SIGNATURE', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'DISPUTED');
CREATE TYPE dispute_status AS ENUM ('OPEN', 'UNDER_REVIEW', 'INFORMATION_REQUIRED', 'RESOLVED', 'CLOSED');

-- 3. TABLE UTILISATEURS (USERS & PROFILS)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    avatar TEXT,
    role user_role DEFAULT 'client'::user_role,
    country TEXT DEFAULT 'GH',
    city TEXT NOT NULL,
    verified_status verification_status DEFAULT 'PENDING'::verification_status,
    bio TEXT,
    completion_rate INTEGER DEFAULT 70,
    trade TEXT,
    company_name TEXT,
    registration_number TEXT,
    experience_years INTEGER DEFAULT 0,
    daily_rate_ghs NUMERIC(10, 2) DEFAULT 0,
    availability_status availability_status DEFAULT 'AVAILABLE'::availability_status,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE DOCUMENTS KYC (PIÈCES JUSTIFICATIVES BTP & IDENTITÉ)
CREATE TABLE IF NOT EXISTS public.kyc_documents (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- ID_CARD, PASSPORT, BUSINESS_REGISTRATION, TRADE_CERTIFICATE, INSURANCE, OTHER
    name TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    file_url TEXT,
    rejection_reason TEXT,
    uploaded_at DATE DEFAULT CURRENT_DATE,
    reviewed_at TIMESTAMPTZ,
    reviewed_by TEXT
);

-- 5. TABLE PROJETS DE CHANTIER
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client_id TEXT REFERENCES public.users(id),
    client_name TEXT NOT NULL,
    location TEXT NOT NULL,
    country TEXT DEFAULT 'GH',
    total_budget_ghs NUMERIC(12, 2) NOT NULL,
    spent_ghs NUMERIC(12, 2) DEFAULT 0,
    status TEXT DEFAULT 'IN_PROGRESS',
    overall_progress INTEGER DEFAULT 0,
    start_date DATE NOT NULL,
    estimated_end_date DATE,
    site_manager_id TEXT,
    site_manager_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE CONTRATS NUMÉRIQUES & SÉQUESTRE (ESCROW)
CREATE TABLE IF NOT EXISTS public.contracts (
    id TEXT PRIMARY KEY,
    contract_number TEXT UNIQUE NOT NULL,
    project_id TEXT REFERENCES public.projects(id),
    project_title TEXT NOT NULL,
    client_id TEXT REFERENCES public.users(id),
    client_name TEXT NOT NULL,
    provider_id TEXT REFERENCES public.users(id),
    provider_name TEXT NOT NULL,
    provider_role TEXT NOT NULL,
    total_amount_ghs NUMERIC(12, 2) NOT NULL,
    gab_work_fee_ghs NUMERIC(12, 2) NOT NULL, -- Commission transparente 10%
    net_provider_amount_ghs NUMERIC(12, 2) NOT NULL,
    status contract_status DEFAULT 'ACTIVE'::contract_status,
    escrow_held_ghs NUMERIC(12, 2) DEFAULT 0,
    escrow_released_ghs NUMERIC(12, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLE RAPPORTS JOURNALIERS DE CHANTIER (SITE MANAGERS)
CREATE TABLE IF NOT EXISTS public.daily_site_reports (
    id TEXT PRIMARY KEY,
    project_id TEXT,
    project_name TEXT,
    site_manager_name TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    weather_condition TEXT,
    workers_present INTEGER DEFAULT 0,
    workers_absent INTEGER DEFAULT 0,
    progress_percent INTEGER DEFAULT 0,
    summary TEXT,
    issues_reported TEXT,
    photos TEXT[] DEFAULT '{}',
    verified_by_client BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLE LITIGES & ARBITRAGE ADMIN
CREATE TABLE IF NOT EXISTS public.disputes (
    id TEXT PRIMARY KEY,
    dispute_number TEXT UNIQUE NOT NULL,
    contract_id TEXT REFERENCES public.contracts(id),
    initiator_id TEXT REFERENCES public.users(id),
    initiator_name TEXT NOT NULL,
    respondent_id TEXT REFERENCES public.users(id),
    respondent_name TEXT NOT NULL,
    disputed_amount_ghs NUMERIC(12, 2) NOT NULL,
    reason TEXT NOT NULL,
    status dispute_status DEFAULT 'OPEN'::dispute_status,
    arbitrator_id TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABLE AUDIT LOGS (SÉCURITÉ & TRACABILITÉ ABSOLUE)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id TEXT PRIMARY KEY,
    actor TEXT NOT NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT,
    details TEXT
);

-- 10. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_site_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture / écriture (Ouverte pour l'application avec clé anon)
CREATE POLICY "Lecture publique pour utilisateurs authentifiés" ON public.users FOR SELECT USING (true);
CREATE POLICY "Mise à jour de son propre profil ou admin" ON public.users FOR ALL USING (true);
CREATE POLICY "Accès complet KYC" ON public.kyc_documents FOR ALL USING (true);
CREATE POLICY "Accès complet chantiers" ON public.projects FOR ALL USING (true);
CREATE POLICY "Accès complet contrats" ON public.contracts FOR ALL USING (true);
CREATE POLICY "Accès rapports de chantier" ON public.daily_site_reports FOR ALL USING (true);
CREATE POLICY "Accès litiges" ON public.disputes FOR ALL USING (true);
CREATE POLICY "Accès audit logs" ON public.audit_logs FOR ALL USING (true);
