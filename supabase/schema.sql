-- =========================================================================
-- SCHEMA SUPABASE POUR GAB-WORK (Plateforme BTP & Escrow Sécurisé)
-- Ce script est 100% idempotent : vous pouvez l'exécuter plusieurs fois sans erreur.
-- Copiez TOUT le contenu de ce fichier et collez-le dans le SQL Editor de Supabase.
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE UTILISATEURS (USERS & PROFILS)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    avatar TEXT,
    role TEXT DEFAULT 'client', -- 'client', 'worker', 'company', 'sitemanager', 'admin'
    country TEXT DEFAULT 'GH',
    city TEXT NOT NULL,
    verified_status TEXT DEFAULT 'PENDING', -- 'VERIFIED', 'PENDING', 'REJECTED', 'ADDITIONAL_INFO_REQUIRED', 'UNVERIFIED'
    bio TEXT,
    completion_rate INTEGER DEFAULT 70,
    trade TEXT,
    company_name TEXT,
    registration_number TEXT,
    experience_years INTEGER DEFAULT 0,
    daily_rate_ghs NUMERIC(10, 2) DEFAULT 0,
    availability_status TEXT DEFAULT 'AVAILABLE', -- 'AVAILABLE', 'PENDING', 'UNAVAILABLE', 'DISPUTE'
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE DOCUMENTS KYC (PIÈCES JUSTIFICATIVES BTP & IDENTITÉ)
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

-- 4. TABLE PROJETS DE CHANTIER
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client_id TEXT REFERENCES public.users(id) ON DELETE SET NULL,
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

-- 5. TABLE CONTRATS NUMÉRIQUES & SÉQUESTRE (ESCROW)
CREATE TABLE IF NOT EXISTS public.contracts (
    id TEXT PRIMARY KEY,
    contract_number TEXT UNIQUE NOT NULL,
    project_id TEXT,
    project_name TEXT NOT NULL,
    title TEXT,
    client_id TEXT,
    client_name TEXT NOT NULL,
    provider_id TEXT,
    provider_name TEXT NOT NULL,
    total_amount_ghs NUMERIC(12, 2) NOT NULL,
    gab_work_fee_ghs NUMERIC(12, 2) NOT NULL, -- Commission transparente 10%
    net_provider_amount_ghs NUMERIC(12, 2) NOT NULL,
    status TEXT DEFAULT 'ACTIVE', -- DRAFT, NEGOTIATION, ACTIVE, COMPLETED, CANCELLED, DISPUTED
    escrow_status TEXT DEFAULT 'FUNDED', -- NOT_FUNDED, FUNDED, PARTIALLY_RELEASED, RELEASED, REFUNDED
    escrow_held_ghs NUMERIC(12, 2) DEFAULT 0,
    escrow_released_ghs NUMERIC(12, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE RAPPORTS JOURNALIERS DE CHANTIER (SITE MANAGERS)
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

-- 7. TABLE LITIGES & ARBITRAGE ADMIN
CREATE TABLE IF NOT EXISTS public.disputes (
    id TEXT PRIMARY KEY,
    dispute_number TEXT UNIQUE NOT NULL,
    contract_id TEXT,
    contract_title TEXT,
    opened_by TEXT NOT NULL,
    against TEXT NOT NULL,
    amount_in_question_ghs NUMERIC(12, 2) NOT NULL DEFAULT 0,
    reason TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'OPEN', -- OPEN, UNDER_REVIEW, INFORMATION_REQUIRED, RESOLVED, CLOSED
    arbitrator_id TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLE AUDIT LOGS (SÉCURITÉ & TRAÇABILITÉ TEMPS RÉEL)
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

-- 9. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_site_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 10. POLITIQUES DE SÉCURITÉ RLS (IDEMPOTENTES AVEC DROP PRÉALABLE)
DROP POLICY IF EXISTS "Lecture utilisateurs" ON public.users;
CREATE POLICY "Lecture utilisateurs" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Ecriture utilisateurs" ON public.users;
CREATE POLICY "Ecriture utilisateurs" ON public.users FOR ALL USING (true);

DROP POLICY IF EXISTS "Accès complet KYC" ON public.kyc_documents;
CREATE POLICY "Accès complet KYC" ON public.kyc_documents FOR ALL USING (true);

DROP POLICY IF EXISTS "Accès complet chantiers" ON public.projects;
CREATE POLICY "Accès complet chantiers" ON public.projects FOR ALL USING (true);

DROP POLICY IF EXISTS "Accès complet contrats" ON public.contracts;
CREATE POLICY "Accès complet contrats" ON public.contracts FOR ALL USING (true);

DROP POLICY IF EXISTS "Accès rapports de chantier" ON public.daily_site_reports;
CREATE POLICY "Accès rapports de chantier" ON public.daily_site_reports FOR ALL USING (true);

DROP POLICY IF EXISTS "Accès litiges" ON public.disputes;
CREATE POLICY "Accès litiges" ON public.disputes FOR ALL USING (true);

DROP POLICY IF EXISTS "Accès audit logs" ON public.audit_logs;
CREATE POLICY "Accès audit logs" ON public.audit_logs FOR ALL USING (true);
