export type LanguageCode = 'en' | 'fr' | 'es' | 'de';

export interface TranslationDictionary {
  // Top bar & Header
  topNotice: string;
  findJobs: string;
  findWorkers: string;
  services: string;
  projects: string;
  companies: string;
  howItWorks: string;
  trustSafety: string;
  dashboard: string;
  postProject: string;
  roleLabel: string;
  tagline: string;

  // Hero Section
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleLine3: string;
  heroSubtitle: string;
  btnFindWork: string;
  btnFindWorkers: string;
  btnPostProject: string;
  escrowProtected: string;
  verifiedWorkers: string;
  dailyReports: string;
  activeWorkers: string;

  // Search Bar
  searchTitle: string;
  searchPlaceholder: string;
  locationLabel: string;
  availabilityLabel: string;
  btnSearch: string;
  tabJobs: string;
  tabWorkers: string;
  tabServices: string;
  tabCompanies: string;
  tabProjects: string;
  availableNow: string;
  availableSoon: string;
  travelReady: string;
  allCountries: string;

  // How it works
  processBadge: string;
  howTitle: string;
  howSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Services Section
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  btnExploreServices: string;
  btnViewService: string;
  startingFrom: string;
  projectsCompleted: string;

  // Jobs Section
  jobsBadge: string;
  jobsTitle: string;
  jobsSubtitle: string;
  btnViewJobs: string;
  btnViewJob: string;
  compensation: string;
  postedDate: string;
  workersNeeded: string;
  experienceRequired: string;
  verifiedEmployer: string;

  // Workers Section
  workersBadge: string;
  workersTitle: string;
  workersSubtitle: string;
  btnBrowseWorkers: string;
  btnViewProfile: string;
  btnRequestQuote: string;
  yearsExp: string;
  dailyRate: string;
  reviewsCount: string;

  // Trust Section
  trustBadge: string;
  trustTitleLine1: string;
  trustTitleLine2: string;
  trustSubtitle: string;
  commissionModelTitle: string;
  commissionModelDesc: string;
  contractValue: string;
  platformFee: string;
  netPayout: string;
  sampleContract: string;
  escrowVolume: string;

  // Status Badges
  statusAvailable: string;
  statusVerified: string;
  statusPending: string;
  statusUnavailable: string;
  statusDispute: string;

  // Modals & Actions
  btnCancel: string;
  btnSubmit: string;
  btnApply: string;
  btnHire: string;
  btnContact: string;
  btnInvite: string;
  btnSignContract: string;
  btnLogDailyReport: string;
  btnOpenDispute: string;

  // Dashboards
  welcomeBack: string;
  applications: string;
  activeContracts: string;
  netEarnings: string;
  activeProjects: string;
  totalSpent: string;
  pendingEscrow: string;
  revenue: string;
  employees: string;
  auditLogs: string;
  disputeQueue: string;

  // Footer & Legal
  footerDesc: string;
  marketplaceHeader: string;
  platformHeader: string;
  headquartersHeader: string;
  copyright: string;

  // Navigation & Auth
  home: string;
  login: string;
  register: string;
  myProfile: string;
  logout: string;
  verificationCenter: string;
  resolutionCenter: string;
  escrowAndFees: string;
  termsOfService: string;
  privacyPolicy: string;
  securityAudit: string;
  stepVerified: string;
  heroProgress: string;
  heroActiveWorkers: string;
  heroBudget: string;
  heroVerifiedTag: string;
  zeroFraud: string;
  disputeRateLow: string;
  platformFeesNote: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    home: "Home",
    login: "Login",
    register: "Register",
    myProfile: "My Profile",
    logout: "Log Out",
    verificationCenter: "Verification Center",
    resolutionCenter: "Resolution Center",
    escrowAndFees: "Escrow & Commissions",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    securityAudit: "Security Audit",
    stepVerified: "Step Verified",
    heroProgress: "Progress",
    heroActiveWorkers: "Active Workers",
    heroBudget: "Budget",
    heroVerifiedTag: "VERIFIED BTP PROJECT",
    zeroFraud: "0% Fraud",
    disputeRateLow: "Milestone Dispute Rate < 0.2%",
    platformFeesNote: "* Platform fees cover escrow custody, site verification support, dispute arbitration, and digital contract execution.",

    topNotice: "Ghana & West Africa's Premier Verified Construction Marketplace",
    findJobs: "Find Jobs",
    findWorkers: "Find Workers",
    services: "Services",
    projects: "Projects",
    companies: "Companies",
    howItWorks: "How it Works",
    trustSafety: "Trust & Safety",
    dashboard: "Dashboard",
    postProject: "Post a Project",
    roleLabel: "Role:",
    tagline: "Global Architecture & Building Work",

    heroBadge: "West Africa's #1 Secured Construction Escrow Platform",
    heroTitleLine1: "Build your future.",
    heroTitleLine2: "Find the right people.",
    heroTitleLine3: "Work with confidence.",
    heroSubtitle: "GAB-work connects construction professionals, workers, companies and clients through a secure and professional digital marketplace across Ghana and West Africa.",
    btnFindWork: "Find Work",
    btnFindWorkers: "Find Workers",
    btnPostProject: "Post a Project",
    escrowProtected: "100% Escrow Protection",
    verifiedWorkers: "NVTI & ID Verified",
    dailyReports: "Daily Site Tracking",
    activeWorkers: "Active Workers",

    searchTitle: "What are you looking for?",
    searchPlaceholder: "Search (e.g. Mason, Electrician, Villa project...)",
    locationLabel: "Location",
    availabilityLabel: "Availability",
    btnSearch: "Search",
    tabJobs: "Jobs",
    tabWorkers: "Workers",
    tabServices: "Services",
    tabCompanies: "Companies",
    tabProjects: "Projects",
    availableNow: "Available now",
    availableSoon: "Available soon",
    travelReady: "Travel ready",
    allCountries: "All Africa & International",

    processBadge: "Transparent Process",
    howTitle: "How GAB-work Works",
    howSubtitle: "A seamless, secure 4-step workflow built to eliminate risk and bring absolute trust to the building sector.",
    step1Title: "Create your profile",
    step1Desc: "Register as a Worker, Company, or Client. Submit your identity and professional NVTI/trade certificates for instant verification.",
    step2Title: "Find the right opportunity",
    step2Desc: "Search verified job offers, browse certified construction workers, or publish your project specifications in Ghana and West Africa.",
    step3Title: "Work through a secure contract",
    step3Desc: "Sign a transparent GAB-work digital contract with milestone escrow breakdown and explicit 10% platform fee transparency.",
    step4Title: "Complete and get paid",
    step4Desc: "Track daily site progress logs, approve completed milestones, and receive instant payouts via Mobile Money or Bank Transfer.",

    servicesBadge: "BTP Solutions",
    servicesTitle: "Construction Services",
    servicesSubtitle: "Turn-key trade solutions provided by verified contractors and master artisans across Ghana.",
    btnExploreServices: "Explore All Services",
    btnViewService: "View Service",
    startingFrom: "Starting from",
    projectsCompleted: "Projects Delivered",

    jobsBadge: "Recruitment & Hiring",
    jobsTitle: "Latest Construction Jobs",
    jobsSubtitle: "Apply to active BTP contracts and full-time vacancies posted by verified building companies.",
    btnViewJobs: "View All Job Vacancies",
    btnViewJob: "View Job",
    compensation: "Compensation",
    postedDate: "Posted Date",
    workersNeeded: "Workers Needed",
    experienceRequired: "Experience Required",
    verifiedEmployer: "Verified Employer",

    workersBadge: "Verified Artisans & Craftsmen",
    workersTitle: "Find Skilled Workers",
    workersSubtitle: "Hire vetted masons, electricians, plumbers, site managers, and certified welders.",
    btnBrowseWorkers: "Browse All Workers",
    btnViewProfile: "View Profile",
    btnRequestQuote: "Request Quote",
    yearsExp: "Years Exp",
    dailyRate: "Daily Rate",
    reviewsCount: "Reviews",

    trustBadge: "Why Trust GAB-work?",
    trustTitleLine1: "Absolute Financial Security",
    trustTitleLine2: "& Transparent Contracts",
    trustSubtitle: "GAB-work safeguards every construction dollar through secured milestone escrow accounts. Client funds are protected until work is verified on site by the Site Manager.",
    commissionModelTitle: "10% Transparent Commission Model",
    commissionModelDesc: "No hidden costs. Full breakdown disclosed before contract signature.",
    contractValue: "Total Agreed Contract Value:",
    platformFee: "GAB-work Platform Commission (10%):",
    netPayout: "Net Provider Payout:",
    sampleContract: "Sample Contract Fee Calculation",
    escrowVolume: "Secured in Escrow",

    statusAvailable: "AVAILABLE",
    statusVerified: "VERIFIED",
    statusPending: "PENDING",
    statusUnavailable: "UNAVAILABLE",
    statusDispute: "DISPUTE",

    btnCancel: "Cancel",
    btnSubmit: "Submit",
    btnApply: "Apply Now",
    btnHire: "Direct Hire",
    btnContact: "Contact",
    btnInvite: "Invite to Project",
    btnSignContract: "Sign Digital Contract",
    btnLogDailyReport: "Log Daily Site Report",
    btnOpenDispute: "Open Dispute Claim",

    welcomeBack: "Welcome back",
    applications: "Applications",
    activeContracts: "Active Contracts",
    netEarnings: "Net Earnings",
    activeProjects: "Active Projects",
    totalSpent: "Total Spent",
    pendingEscrow: "Pending Escrow Release",
    revenue: "Revenue",
    employees: "Employees",
    auditLogs: "System Audit Logs",
    disputeQueue: "Dispute Arbitration Queue",

    footerDesc: "Global Architecture & Building Work. The trusted digital marketplace connecting construction workers, companies, and clients through secured milestone contracts and daily site monitoring.",
    marketplaceHeader: "Marketplace",
    platformHeader: "Platform & Trust",
    headquartersHeader: "Headquarters & Regions",
    copyright: "All rights reserved. Build. Work. Connect. Trust.",
  },
  fr: {
    home: "Accueil",
    login: "Connexion",
    register: "S'inscrire",
    myProfile: "Mon Profil",
    logout: "Déconnexion",
    verificationCenter: "Centre de Vérification BTP",
    resolutionCenter: "Centre d'Arbitrage des Litiges",
    escrowAndFees: "Séquestre Escrow & Commissions",
    termsOfService: "Conditions Générales d'Utilisation",
    privacyPolicy: "Politique de Confidentialité",
    securityAudit: "Audit & Sécurité",
    stepVerified: "Étape Vérifiée",
    heroProgress: "Avancement",
    heroActiveWorkers: "Ouvriers Actifs",
    heroBudget: "Budget Alloué",
    heroVerifiedTag: "PROJET BTP CERTIFIÉ",
    zeroFraud: "0% Fraude",
    disputeRateLow: "Taux de litige par jalon < 0,2%",
    platformFeesNote: "* Les frais de plateforme couvrent la gestion sous séquestre, la vérification physique sur chantier, l'arbitrage des litiges et les contrats numériques certifiés.",

    topNotice: "Première Marketplace BTP Vérifiée au Ghana et en Afrique de l'Ouest",
    findJobs: "Trouver un Emploi",
    findWorkers: "Trouver des Ouvriers",
    services: "Services BTP",
    projects: "Projets & Chantiers",
    companies: "Entreprises BTP",
    howItWorks: "Comment ça Marche",
    trustSafety: "Confiance & Sécurité",
    dashboard: "Tableau de bord",
    postProject: "Publier un Projet",
    roleLabel: "Rôle :",
    tagline: "Architecture Globale et Travaux du Bâtiment",

    heroBadge: "Plateforme N°1 de Séquestre Escrow BTP en Afrique de l'Ouest",
    heroTitleLine1: "Construisez votre avenir.",
    heroTitleLine2: "Trouvez les bons experts.",
    heroTitleLine3: "Travaillez en toute confiance.",
    heroSubtitle: "GAB-work connecte les professionnels de la construction, les ouvriers, les entreprises et les clients via une marketplace numérique sécurisée au Ghana et en Afrique.",
    btnFindWork: "Trouver du Travail",
    btnFindWorkers: "Trouver des Ouvriers",
    btnPostProject: "Publier un Projet",
    escrowProtected: "Protection Escrow 100%",
    verifiedWorkers: "Identité & NVTI Vérifiés",
    dailyReports: "Suivi Journalier de Chantier",
    activeWorkers: "Ouvriers Actifs",

    searchTitle: "Que recherchez-vous ?",
    searchPlaceholder: "Rechercher (ex: Maçon, Électricien, Projet Villa...)",
    locationLabel: "Localisation",
    availabilityLabel: "Disponibilité",
    btnSearch: "Rechercher",
    tabJobs: "Emplois",
    tabWorkers: "Ouvriers",
    tabServices: "Services",
    tabCompanies: "Entreprises",
    tabProjects: "Projets",
    availableNow: "Disponible de suite",
    availableSoon: "Disponible sous peu",
    travelReady: "Prêt au déplacement",
    allCountries: "Toute l'Afrique & International",

    processBadge: "Processus Transparent",
    howTitle: "Comment Fonctionne GAB-work",
    howSubtitle: "Un flux sécurisé en 4 étapes pour éliminer les risques et garantir une confiance absolue dans le secteur du bâtiment.",
    step1Title: "Créez votre profil",
    step1Desc: "Inscrivez-vous comme Ouvrier, Entreprise ou Client. Soumettez votre identité et vos certificats professionnels NVTI pour validation instantanée.",
    step2Title: "Trouvez la bonne opportunité",
    step2Desc: "Parcourez les offres d'emploi vérifiées, découvrez des ouvriers certifiés ou publiez le cahier des charges de votre projet BTP.",
    step3Title: "Travaillez via un contrat sécurisé",
    step3Desc: "Signez un contrat numérique GAB-work avec décompte par jalons et transparence totale sur la commission de 10 %.",
    step4Title: "Réalisez et recevez le paiement",
    step4Desc: "Suivez les rapports quotidiens de chantier, validez les étapes terminées et recevez vos paiements instantanés via Mobile Money ou Virement.",

    servicesBadge: "Solutions BTP",
    servicesTitle: "Services de Construction",
    servicesSubtitle: "Prestations clé en main fournies par des entreprises et des maîtres artisans vérifiés au Ghana.",
    btnExploreServices: "Explorer les Services",
    btnViewService: "Voir le Service",
    startingFrom: "À partir de",
    projectsCompleted: "Projets Livrés",

    jobsBadge: "Recrutement & Emploi",
    jobsTitle: "Dernières Offres d'Emploi BTP",
    jobsSubtitle: "Postulez aux contrats BTP actifs et aux postes à temps plein publiés par des entreprises vérifiées.",
    btnViewJobs: "Voir Toutes les Offres",
    btnViewJob: "Voir l'Offre",
    compensation: "Rémunération",
    postedDate: "Date de Publication",
    workersNeeded: "Ouvriers Requis",
    experienceRequired: "Expérience Requise",
    verifiedEmployer: "Employeur Vérifié",

    workersBadge: "Artisans & Ouvriers Qualifiés",
    workersTitle: "Trouver des Ouvriers Qualifiés",
    workersSubtitle: "Recrutez des maçons, électriciens, plombiers, chefs de chantier et soudeurs qualifiés.",
    btnBrowseWorkers: "Parcourir les Profils",
    btnViewProfile: "Voir le Profil",
    btnRequestQuote: "Demander un Devis",
    yearsExp: "ans d'exp",
    dailyRate: "Tarif Journalier",
    reviewsCount: "Avis",

    trustBadge: "Pourquoi faire confiance à GAB-work ?",
    trustTitleLine1: "Sécurité Financière Absolue",
    trustTitleLine2: "& Contrats Transparents",
    trustSubtitle: "GAB-work sécurise chaque montant via des comptes sous séquestre. Les fonds du client sont protégés jusqu'à la validation du chantier par le Responsable de Site.",
    commissionModelTitle: "Modèle de Commission Transparente à 10%",
    commissionModelDesc: "Aucun frais caché. Décompte complet affiché avant la signature du contrat.",
    contractValue: "Valeur Totale du Contrat :",
    platformFee: "Commission GAB-work (10%) :",
    netPayout: "Montant Net Prestataire :",
    sampleContract: "Exemple de Décompte Contractuel",
    escrowVolume: "Sécurisé en Escrow",

    statusAvailable: "DISPONIBLE",
    statusVerified: "VÉRIFIÉ",
    statusPending: "EN ATTENTE",
    statusUnavailable: "INDISPONIBLE",
    statusDispute: "LITIGE",

    btnCancel: "Annuler",
    btnSubmit: "Soumettre",
    btnApply: "Postuler",
    btnHire: "Recruter",
    btnContact: "Contacter",
    btnInvite: "Inviter au Projet",
    btnSignContract: "Signer le Contrat Numérique",
    btnLogDailyReport: "Ajouter Rapport de Chantier",
    btnOpenDispute: "Ouvrir une Déclaration de Litige",

    welcomeBack: "Bienvenue",
    applications: "Candidatures",
    activeContracts: "Contrats Actifs",
    netEarnings: "Gains Nets",
    activeProjects: "Projets Actifs",
    totalSpent: "Total Dépensé",
    pendingEscrow: "Escrow en Attente",
    revenue: "Chiffre d'Affaires",
    employees: "Employés",
    auditLogs: "Registre d'Audit Système",
    disputeQueue: "File d'Arbitrage des Litiges",

    footerDesc: "Architecture Globale et Travaux du Bâtiment. La marketplace numérique de confiance reliant ouvriers, entreprises et clients via des contrats d'escrow sécurisés.",
    marketplaceHeader: "Marketplace",
    platformHeader: "Plateforme & Confiance",
    headquartersHeader: "Siège & Régions",
    copyright: "Tous droits réservés. Build. Work. Connect. Trust.",
  },
  es: {
    home: "Inicio",
    login: "Iniciar Sesión",
    register: "Registrarse",
    myProfile: "Mi Perfil",
    logout: "Cerrar Sesión",
    verificationCenter: "Centro de Verificación BTP",
    resolutionCenter: "Centro de Resolución de Conflictos",
    escrowAndFees: "Depósito en Custodia y Comisiones",
    termsOfService: "Términos del Servicio",
    privacyPolicy: "Política de Privacidad",
    securityAudit: "Auditoría de Seguridad",
    stepVerified: "Paso Verificado",
    heroProgress: "Progreso",
    heroActiveWorkers: "Trabajadores Activos",
    heroBudget: "Presupuesto",
    heroVerifiedTag: "PROYECTO BTP VERIFICADO",
    zeroFraud: "0% Fraude",
    disputeRateLow: "Tasa de conflicto por hito < 0.2%",
    platformFeesNote: "* Las tarifas cubren la custodia en depósito, verificación en obra, resolución de disputas y ejecución contractual digital.",

    topNotice: "El Mercado de Construcción Verificado Líder en Ghana y África Occidental",
    findJobs: "Buscar Empleo",
    findWorkers: "Buscar Trabajadores",
    services: "Servicios de Construcción",
    projects: "Proyectos y Obras",
    companies: "Empresas BTP",
    howItWorks: "Cómo Funciona",
    trustSafety: "Confianza y Seguridad",
    dashboard: "Panel de Control",
    postProject: "Publicar Proyecto",
    roleLabel: "Rol:",
    tagline: "Arquitectura Global y Trabajos de Construcción",

    heroBadge: "Plataforma N°1 de Fideicomiso Escrow para Construcción en África Occidental",
    heroTitleLine1: "Construye tu futuro.",
    heroTitleLine2: "Encuentra el equipo adecuado.",
    heroTitleLine3: "Trabaja con confianza.",
    heroSubtitle: "GAB-work conecta a profesionales de la construcción, trabajadores, empresas y clientes mediante un mercado digital seguro en Ghana y África.",
    btnFindWork: "Buscar Trabajo",
    btnFindWorkers: "Buscar Trabajadores",
    btnPostProject: "Publicar Proyecto",
    escrowProtected: "Protección Escrow 100%",
    verifiedWorkers: "Identidad y Certificados NVTI",
    dailyReports: "Seguimiento Diario de Obra",
    activeWorkers: "Trabajadores Activos",

    searchTitle: "¿Qué estás buscando?",
    searchPlaceholder: "Buscar (ej. Albañil, Electricista, Proyecto Villa...)",
    locationLabel: "Ubicación",
    availabilityLabel: "Disponibilidad",
    btnSearch: "Buscar",
    tabJobs: "Empleos",
    tabWorkers: "Trabajadores",
    tabServices: "Servicios",
    tabCompanies: "Empresas",
    tabProjects: "Proyectos",
    availableNow: "Disponible ahora",
    availableSoon: "Disponible pronto",
    travelReady: "Listo para viajar",
    allCountries: "Toda África e Internacional",

    processBadge: "Proceso Transparente",
    howTitle: "Cómo Funciona GAB-work",
    howSubtitle: "Un flujo de trabajo de 4 pasos diseñado para eliminar riesgos y brindar total confianza al sector de la construcción.",
    step1Title: "Crea tu perfil",
    step1Desc: "Regístrate como Trabajador, Empresa o Cliente. Envía tus documentos de identidad y certificados profesionales NVTI para verificación instantánea.",
    step2Title: "Encuentra la oportunidad ideal",
    step2Desc: "Explora ofertas de empleo verificadas, busca artesanos certificados o publica los requerimientos de tu proyecto en Ghana y África.",
    step3Title: "Trabaja con un contrato seguro",
    step3Desc: "Firma un contrato digital GAB-work con desglose de pagos por hitos y total transparencia en la comisión del 10%.",
    step4Title: "Completa y recibe el pago",
    step4Desc: "Supervisa los informes diarios de obra, aprueba los hitos completados y recibe pagos instantáneos mediante Mobile Money o transferencia.",

    servicesBadge: "Soluciones de Construcción",
    servicesTitle: "Servicios de Construcción",
    servicesSubtitle: "Soluciones llave en mano ofrecidas por empresas y maestros artesanos verificados.",
    btnExploreServices: "Explorar Servicios",
    btnViewService: "Ver Servicio",
    startingFrom: "Desde",
    projectsCompleted: "Proyectos Entregados",

    jobsBadge: "Reclutamiento y Empleo",
    jobsTitle: "Últimos Empleos de Construcción",
    jobsSubtitle: "Postula a contratos BTP activos y puestos de tiempo completo publicados por empresas verificadas.",
    btnViewJobs: "Ver Todas las Vacantes",
    btnViewJob: "Ver Empleo",
    compensation: "Compensación",
    postedDate: "Fecha de Publicación",
    workersNeeded: "Trabajadores Requeridos",
    experienceRequired: "Experiencia Requerida",
    verifiedEmployer: "Empleador Verificado",

    workersBadge: "Artesanos y Operarios Calificados",
    workersTitle: "Encontrar Trabajadores Calificados",
    workersSubtitle: "Contrata albañiles, electricistas, fontaneros, jefes de obra y soldadores certificados.",
    btnBrowseWorkers: "Explorar Perfiles",
    btnViewProfile: "Ver Perfil",
    btnRequestQuote: "Solicitar Cotización",
    yearsExp: "años de exp",
    dailyRate: "Tarifa Diaria",
    reviewsCount: "Reseñas",

    trustBadge: "¿Por qué confiar en GAB-work?",
    trustTitleLine1: "Seguridad Financiera Absoluta",
    trustTitleLine2: "y Contratos Transparentes",
    trustSubtitle: "GAB-work protege cada fondo a través de cuentas en custodia de fideicomiso. Los fondos se liberan solo tras la verificación en obra.",
    commissionModelTitle: "Modelo de Comisión Transparente del 10%",
    commissionModelDesc: "Sin costos ocultos. Desglose completo mostrado antes de firmar el contrato.",
    contractValue: "Valor Total del Contrato:",
    platformFee: "Comisión de Plataforma GAB-work (10%):",
    netPayout: "Pago Neto al Proveedor:",
    sampleContract: "Ejemplo de Cálculo de Contrato",
    escrowVolume: "Asegurado en Custodia",

    statusAvailable: "DISPONIBLE",
    statusVerified: "VERIFICADO",
    statusPending: "PENDIENTE",
    statusUnavailable: "NO DISPONIBLE",
    statusDispute: "DISPUTA",

    btnCancel: "Cancelar",
    btnSubmit: "Enviar",
    btnApply: "Postular",
    btnHire: "Contratar",
    btnContact: "Contactar",
    btnInvite: "Invitar al Proyecto",
    btnSignContract: "Firmar Contrato Digital",
    btnLogDailyReport: "Registrar Reporte Diario",
    btnOpenDispute: "Abrir Reclamación",

    welcomeBack: "Bienvenido",
    applications: "Postulaciones",
    activeContracts: "Contratos Activos",
    netEarnings: "Ganancias Netas",
    activeProjects: "Proyectos Activos",
    totalSpent: "Total Gastado",
    pendingEscrow: "Custodia Pendiente",
    revenue: "Ingresos",
    employees: "Empleados",
    auditLogs: "Registros de Auditoría",
    disputeQueue: "Cola de Arbitraje de Disputas",

    footerDesc: "Arquitectura Global y Trabajos de Construcción. El mercado digital seguro que conecta a trabajadores, empresas y clientes.",
    marketplaceHeader: "Mercado",
    platformHeader: "Plataforma y Confianza",
    headquartersHeader: "Sede y Regiones",
    copyright: "Todos los derechos reservados. Build. Work. Connect. Trust.",
  },
  de: {
    home: "Startseite",
    login: "Anmelden",
    register: "Registrieren",
    myProfile: "Mein Profil",
    logout: "Abmelden",
    verificationCenter: "Verifizierungszentrum BTP",
    resolutionCenter: "Schlichtungszentrum für Konflikte",
    escrowAndFees: "Treuhand & Provisionen",
    termsOfService: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    securityAudit: "Sicherheitsprüfung",
    stepVerified: "Schritt Verifiziert",
    heroProgress: "Fortschritt",
    heroActiveWorkers: "Aktive Handwerker",
    heroBudget: "Budget",
    heroVerifiedTag: "GEPRÜFTES BTP-PROJEKT",
    zeroFraud: "0% Betrug",
    disputeRateLow: "Streitquote pro Meilenstein < 0,2%",
    platformFeesNote: "* Plattformgebühren decken Treuhandverwahrung, Vor-Ort-Verifizierung, Streitbeilegung und digitale Verträge ab.",

    topNotice: "Deutschlands & Westafrikas führender verifizierter Bau-Marktplatz",
    findJobs: "Stellen Finden",
    findWorkers: "Fachkräfte Finden",
    services: "Bau-Dienstleistungen",
    projects: "Bauprojekte",
    companies: "Bauunternehmen",
    howItWorks: "Wie Es Funktioniert",
    trustSafety: "Vertrauen & Sicherheit",
    dashboard: "Dashboard",
    postProject: "Projekt Inserieren",
    roleLabel: "Rolle:",
    tagline: "Globale Architektur und Bauarbeiten",

    heroBadge: "Westafrikas Nr. 1 Treuhand-Plattform für Bauprojekte",
    heroTitleLine1: "Bauen Sie Ihre Zukunft.",
    heroTitleLine2: "Finden Sie die besten Experten.",
    heroTitleLine3: "Arbeiten Sie mit Vertrauen.",
    heroSubtitle: "GAB-work verbindet Bauprofis, Handwerker, Unternehmen und Kunden über einen sicheren digitalen Marktplatz in Ghana und Westafrika.",
    btnFindWork: "Arbeit Finden",
    btnFindWorkers: "Handwerker Finden",
    btnPostProject: "Projekt Inserieren",
    escrowProtected: "100% Treuhand-Schutz",
    verifiedWorkers: "Geprüfte Identität & NVTI",
    dailyReports: "Tägliches Baustellen-Tracking",
    activeWorkers: "Aktive Handwerker",

    searchTitle: "Wonach suchen Sie?",
    searchPlaceholder: "Suchen (z.B. Maurermeister, Elektriker, Villenbau...)",
    locationLabel: "Standort",
    availabilityLabel: "Verfügbarkeit",
    btnSearch: "Suchen",
    tabJobs: "Stellen",
    tabWorkers: "Handwerker",
    tabServices: "Dienste",
    tabCompanies: "Firmen",
    tabProjects: "Projekte",
    availableNow: "Sofort verfügbar",
    availableSoon: "Demnächst verfügbar",
    travelReady: "Reisebereit",
    allCountries: "Ganz Afrika & International",

    processBadge: "Transparenter Ablauf",
    howTitle: "Wie GAB-work Funktioniert",
    howSubtitle: "Ein sicherer 4-Schritte-Prozess zur Eliminierung von Risiken und Schaffung absoluten Vertrauens im Bausektor.",
    step1Title: "Profil erstellen",
    step1Desc: "Registrieren Sie sich als Handwerker, Firma oder Kunde. Reichen Sie Ihre Ausweise und Zertifikate zur Überprüfung ein.",
    step2Title: "Passende Gelegenheit finden",
    step2Desc: "Durchsuchen Sie verifizierte Stellenangebote, finden Sie geprüfte Handwerker oder veröffentlichen Sie Bauprojekte.",
    step3Title: "Sichere Verträge abschließen",
    step3Desc: "Unterzeichnen Sie digitale GAB-work-Verträge mit Meilenstein-Treuhand und 10% Provisions-Transparenz.",
    step4Title: "Projekt abschließen & Auszahlung erhalten",
    step4Desc: "Verfolgen Sie tägliche Baustellenberichte, geben Sie Meilensteine frei und erhalten Sie Auszahlungen per Mobile Money oder Überweisung.",

    servicesBadge: "Bau-Lösungen",
    servicesTitle: "Bau-Dienstleistungen",
    servicesSubtitle: "Schlüsselfertige Handwerksleistungen von verifizierten Fachbetrieben in Ghana.",
    btnExploreServices: "Alle Dienste Anzeigen",
    btnViewService: "Dienst Ansehen",
    startingFrom: "Ab",
    projectsCompleted: "Fertiggestellte Projekte",

    jobsBadge: "Recruiting & Jobs",
    jobsTitle: "Aktuelle Bau-Stellenangebote",
    jobsSubtitle: "Bewerben Sie sich auf aktive Bauverträge und Vollzeitstellen geprüfter Bauunternehmen.",
    btnViewJobs: "Alle Stellen Anzeigen",
    btnViewJob: "Stelle Ansehen",
    compensation: "Vergütung",
    postedDate: "Veröffentlicht am",
    workersNeeded: "Benötigte Kräfte",
    experienceRequired: "Erforderliche Erfahrung",
    verifiedEmployer: "Verifizierter Arbeitgeber",

    workersBadge: "Geprüfte Handwerker & Spezialisten",
    workersTitle: "Qualifizierte Fachkräfte Finden",
    workersSubtitle: "Engagieren Sie geprüfte Maurer, Elektriker, Installateure und Bauleiter.",
    btnBrowseWorkers: "Alle Profile Durchsuchen",
    btnViewProfile: "Profil Ansehen",
    btnRequestQuote: "Angebot Anfordern",
    yearsExp: "Jahre Erf.",
    dailyRate: "Tagessatz",
    reviewsCount: "Bewertungen",

    trustBadge: "Warum GAB-work vertrauen?",
    trustTitleLine1: "Absolute Finanzielle Sicherheit",
    trustTitleLine2: "& Transparente Verträge",
    trustSubtitle: "GAB-work sichert Ihr Budget über geschützte Treuhandkonten. Kundengelder werden erst nach Baustellenprüfung freigegeben.",
    commissionModelTitle: "10% Transparente Provision",
    commissionModelDesc: "Keine versteckten Kosten. Vollständige Aufschlüsselung vor Vertragsabschluss.",
    contractValue: "Gesamter Vertragswert:",
    platformFee: "GAB-work Plattform-Provision (10%):",
    netPayout: "Nettobetrag für Auftragnehmer:",
    sampleContract: "Beispiel-Vertragsberechnung",
    escrowVolume: "Treuhand-Volumen",

    statusAvailable: "VERFÜGBAR",
    statusVerified: "VERIFIZIERT",
    statusPending: "AUSSTEHEND",
    statusUnavailable: "NICHT VERFÜGBAR",
    statusDispute: "STREITFALL",

    btnCancel: "Abbrechen",
    btnSubmit: "Absenden",
    btnApply: "Jetzt Bewerben",
    btnHire: "Beauftragen",
    btnContact: "Kontaktieren",
    btnInvite: "Zum Projekt Einladen",
    btnSignContract: "Vertrag Unterzeichnen",
    btnLogDailyReport: "Baustellenbericht Eintragen",
    btnOpenDispute: "Streitfall Melden",

    welcomeBack: "Willkommen zurück",
    applications: "Bewerbungen",
    activeContracts: "Aktive Verträge",
    netEarnings: "Netto-Einnahmen",
    activeProjects: "Aktive Projekte",
    totalSpent: "Gesamtausgaben",
    pendingEscrow: "Treuhand Ausstehend",
    revenue: "Umsatz",
    employees: "Mitarbeiter",
    auditLogs: "System-Audit-Protokolle",
    disputeQueue: "Schlichtung-Warteschlange",

    footerDesc: "Globale Architektur und Bauarbeiten. Der vertrauenswürdige digitale Marktplatz für Bauhandwerker, Firmen und Kunden.",
    marketplaceHeader: "Marktplatz",
    platformHeader: "Plattform & Vertrauen",
    headquartersHeader: "Zentrale & Regionen",
    copyright: "Alle Rechte vorbehalten. Build. Work. Connect. Trust.",
  }
};
