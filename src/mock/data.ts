import {
  User,
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

export const MOCK_WORKERS: WorkerProfile[] = [
  {
    id: 'w-1',
    userId: 'u-101',
    name: 'Kwame Mensah',
    trade: 'Mason & Site Specialist',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    country: 'GH',
    countryName: 'Ghana',
    city: 'Accra, Greater Accra',
    experienceYears: 9,
    rating: 4.9,
    reviewCount: 38,
    availability: 'Available now',
    availabilityStatus: 'AVAILABLE',
    dailyRateGHS: 220,
    hourlyRateGHS: 30,
    verified: true,
    verificationBadge: 'Verified Professional',
    skills: ['Structural Masonry', 'Concrete Casting', 'Reinforced Blockwork', 'Bricklaying', 'Foundation Pouring'],
    about: 'Master builder and certified Mason with over 9 years of active high-rise and residential construction experience in Accra and Tema. Specializing in high-tolerance structural walls, foundation reinforcing, and modern masonry techniques.',
    workExperience: [
      {
        title: 'Lead Mason',
        company: 'West Africa High Rise Builders',
        duration: '2021 - Present',
        description: 'Supervised structural brickwork and masonry on 12-storey residential complex in East Legon.'
      },
      {
        title: 'Senior Concrete Specialist',
        company: 'Gold Coast Infrastructure Ltd',
        duration: '2017 - 2021',
        description: 'Led foundation pouring and structural concrete blockwork for commercial warehouses in Tema.'
      }
    ],
    certifications: ['NVTI Master Mason Certification Class I', 'Ghana OSHA Safety Level 2'],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80'
    ],
    completedProjectsCount: 42,
    travelReady: true,
    internationalAvailability: true,
    languages: ['English', 'Twi', 'Ga']
  },
  {
    id: 'w-2',
    userId: 'u-102',
    name: 'Kofi Owusu',
    trade: 'Master Electrician & Automation Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    country: 'GH',
    countryName: 'Ghana',
    city: 'Kumasi, Ashanti',
    experienceYears: 7,
    rating: 4.85,
    reviewCount: 24,
    availability: 'Available now',
    availabilityStatus: 'AVAILABLE',
    dailyRateGHS: 250,
    hourlyRateGHS: 35,
    verified: true,
    verificationBadge: 'Verified Professional',
    skills: ['Industrial Wiring', 'Solar System Installation', '3-Phase Power Distribution', 'DB Board Assembly', 'Fault Diagnostics'],
    about: 'Certified industrial electrician specialized in commercial wiring, solar power backup integration, and smart breaker installations across Ashanti Region and nationwide.',
    workExperience: [
      {
        title: 'Lead Electrical Contractor',
        company: 'Ashanti Power Solutions',
        duration: '2019 - Present',
        description: 'Installed 150kW commercial solar backup system for shopping center in Kumasi.'
      }
    ],
    certifications: ['Energy Commission Certified Electrical Wireman', 'Solar PV Installation Cert'],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80'
    ],
    completedProjectsCount: 31,
    travelReady: true,
    internationalAvailability: true,
    languages: ['English', 'Twi']
  },
  {
    id: 'w-3',
    userId: 'u-103',
    name: 'Abena Osei',
    trade: 'Quantity Surveyor & Site Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    country: 'GH',
    countryName: 'Ghana',
    city: 'Accra, Greater Accra',
    experienceYears: 11,
    rating: 4.95,
    reviewCount: 52,
    availability: 'Available from date',
    availableDate: '2026-10-20',
    availabilityStatus: 'PENDING',
    dailyRateGHS: 450,
    hourlyRateGHS: 65,
    verified: true,
    verificationBadge: 'Verified Professional',
    skills: ['Cost Estimation', 'BoQ Preparation', 'Site Supervision', 'Material Audit', 'Contract Administration'],
    about: 'Chartered Quantity Surveyor with extensive experience in commercial site management, cost engineering, and material reconciliation for multi-million GHS construction projects.',
    workExperience: [
      {
        title: 'Senior Site Manager',
        company: 'Cantonments Luxury Developments',
        duration: '2020 - Present',
        description: 'Managed budget compliance and site operations for 18 luxury residential units.'
      }
    ],
    certifications: ['GhIS Registered Quantity Surveyor', 'PMP Certified Project Manager'],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
    ],
    completedProjectsCount: 29,
    travelReady: true,
    internationalAvailability: true,
    languages: ['English', 'French', 'Fante']
  },
  {
    id: 'w-4',
    userId: 'u-104',
    name: 'Emmanuel Koffi',
    trade: 'Structural Welder & Metal Fabricator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    country: 'CI',
    countryName: 'Ivory Coast',
    city: 'Abidjan / Accra (Mobile)',
    experienceYears: 8,
    rating: 4.8,
    reviewCount: 19,
    availability: 'Available for travel',
    availabilityStatus: 'AVAILABLE',
    dailyRateGHS: 280,
    hourlyRateGHS: 40,
    verified: true,
    verificationBadge: 'Verified Professional',
    skills: ['TIG/MIG Welding', 'Structural Steel Framing', 'Roof Truss Fabrication', 'Heavy Beam Assembly'],
    about: 'Precision steel fabricator with cross-border experience in Ghana, Ivory Coast, and Togo. Expert in heavy structural trusses, warehouse steel frames, and custom architectural metalwork.',
    workExperience: [
      {
        title: 'Master Structural Welder',
        company: 'SOGEA SATOM West Africa',
        duration: '2018 - 2024',
        description: 'Fabricated high-load steel bridge trusses and structural frame columns.'
      }
    ],
    certifications: ['ISO 9606 Structural Welding Certification'],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
    ],
    completedProjectsCount: 26,
    travelReady: true,
    internationalAvailability: true,
    languages: ['French', 'English']
  }
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c-1',
    name: 'Apex Construction & Engineering Ghana Ltd',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&auto=format&fit=crop&q=80',
    tagline: 'Leading Commercial & Residential Civil Engineering Firm in West Africa',
    verified: true,
    city: 'Accra',
    country: 'Ghana',
    employeesCount: 120,
    yearsInBusiness: 14,
    about: 'Apex Construction Ltd is a Grade A civil engineering contractor certified by the Ministry of Works and Housing, Ghana. We specialize in turn-key high-rise buildings, road infrastructure, and high-end residential estates.',
    services: ['General Construction', 'Structural Engineering', 'Architectural Design', 'Equipment Rental', 'Turn-key Project Management'],
    activeJobsCount: 6,
    completedProjectsCount: 84,
    rating: 4.9,
    reviewsCount: 67,
    certifications: ['Ministry of Works & Housing Financial Class K1/D1', 'ISO 9001:2015 Quality Management']
  },
  {
    id: 'c-2',
    name: 'Volta Electro-Mechanical & Solar Ltd',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    tagline: 'Premier Industrial Electrical & Plumbing Contractors',
    verified: true,
    city: 'Tema / Takoradi',
    country: 'Ghana',
    employeesCount: 45,
    yearsInBusiness: 9,
    about: 'Specialist MEP subcontractor delivering complex electrical installations, HVAC systems, industrial piping, and renewable solar microgrids across West Africa.',
    services: ['Electrical Engineering', 'Plumbing & Drainage', 'HVAC Installation', 'Solar Backup Microgrids'],
    activeJobsCount: 4,
    completedProjectsCount: 52,
    rating: 4.8,
    reviewsCount: 34,
    certifications: ['Energy Commission Class A Contractor', 'Ghana Fire Service Compliance Cert']
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j-1',
    title: 'Senior Mason & Site Foreman',
    category: 'Masonry & Concrete',
    companyId: 'c-1',
    companyName: 'Apex Construction Ghana Ltd',
    companyVerified: true,
    location: 'East Legon, Accra',
    country: 'Ghana',
    salaryRange: 'GHS 200 - GHS 260 / day',
    dailyRateGHS: 240,
    contractType: 'Contract',
    experienceRequired: '5+ years',
    postedDate: '2026-10-02',
    deadline: '2026-10-25',
    workersNeeded: 6,
    description: 'We are seeking experienced masons for blockwork laying, concrete slab preparation, and column reinforcement on a 6-unit luxury apartment development in East Legon.',
    requiredSkills: ['Masonry', 'Rebar Tying', 'Concrete Pouring', 'Blueprints Reading'],
    availabilityRequired: 'Immediate',
    travelRequired: false,
    status: 'OPEN'
  },
  {
    id: 'j-2',
    title: 'Commercial Solar & Electrical Engineer',
    category: 'Electrical',
    companyId: 'c-2',
    companyName: 'Volta Electro-Mechanical Ltd',
    companyVerified: true,
    location: 'Tema Industrial Area',
    country: 'Ghana',
    salaryRange: 'GHS 300 - GHS 400 / day',
    dailyRateGHS: 350,
    contractType: 'Project-based',
    experienceRequired: '4+ years',
    postedDate: '2026-10-05',
    deadline: '2026-10-30',
    workersNeeded: 3,
    description: 'Require certified electrical wireman to assist in high-capacity 200kW rooftop solar inverter assembly and distribution board wiring.',
    requiredSkills: ['Solar Inverters', '3-Phase Electrical', 'Cable Tray Route Installation', 'Testing & Commissioning'],
    availabilityRequired: 'Available within 1 week',
    travelRequired: true,
    status: 'OPEN'
  },
  {
    id: 'j-3',
    title: 'Site Quality & Safety Manager',
    category: 'Site Management',
    companyName: 'GoldKey Properties',
    companyVerified: true,
    location: 'Airport Residential Area, Accra',
    country: 'Ghana',
    salaryRange: 'GHS 8,500 - GHS 11,000 / month',
    dailyRateGHS: 420,
    contractType: 'Full-time',
    experienceRequired: '6+ years',
    postedDate: '2026-10-01',
    deadline: '2026-11-01',
    workersNeeded: 1,
    description: 'Oversee daily site operations, material testing, safety protocols compliance, worker attendance logging, and daily client reporting.',
    requiredSkills: ['HSE Standards', 'Quality Control', 'Daily Site Logs', 'BoQ Verification'],
    availabilityRequired: 'Immediate',
    travelRequired: false,
    status: 'OPEN'
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 's-1',
    title: 'Turn-key Structural Masonry & Concrete Works',
    category: 'Masonry',
    providerName: 'Apex Construction Ghana Ltd',
    providerType: 'Company',
    location: 'Accra & Tema Metro',
    startingPriceGHS: 180,
    priceUnit: 'per sq meter blockwork',
    rating: 4.9,
    projectsCompleted: 84,
    verified: true,
    description: 'High-precision reinforced concrete block laying, foundation raft pouring, and structural slab construction with certified quality testing.',
    iconName: 'Building2'
  },
  {
    id: 's-2',
    title: '3-Phase Industrial Electrical & Solar Grid Integration',
    category: 'Electrical',
    providerName: 'Kofi Owusu & Team',
    providerType: 'Independent Worker',
    location: 'Kumasi & Ashanti Region',
    startingPriceGHS: 250,
    priceUnit: 'daily rate / pro contractor',
    rating: 4.85,
    projectsCompleted: 31,
    verified: true,
    description: 'Complete building wiring, smart distribution board assembly, certified grounding systems, and hybrid solar setup.',
    iconName: 'Zap'
  },
  {
    id: 's-3',
    title: 'High-End Plumbing & Sewage System Fabrication',
    category: 'Plumbing',
    providerName: 'Tetteh Hydro-Plumbing Services',
    providerType: 'Company',
    location: 'Accra / Takoradi',
    startingPriceGHS: 220,
    priceUnit: 'per fixture point',
    rating: 4.9,
    projectsCompleted: 45,
    verified: true,
    description: 'PEX/PPR water supply networks, bio-digester septic tank installation, pressure booster pumps, and underground drainage.',
    iconName: 'Droplets'
  },
  {
    id: 's-4',
    title: 'Heavy Equipment Rental & Operator Provision',
    category: 'Equipment Rental',
    providerName: 'Ghana EarthMovers Heavy Plant Ltd',
    providerType: 'Company',
    location: 'Nationwide Ghana',
    startingPriceGHS: 1400,
    priceUnit: 'per day (Excavator / Backhoe)',
    rating: 4.95,
    projectsCompleted: 110,
    verified: true,
    description: 'CAT Excavators, JCB Backhoes, Concrete Pumps, and Tower Crane rental with certified heavy plant operators.',
    iconName: 'Truck'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p-1',
    name: 'East Legon 4-Bedroom Modern Villa Project',
    type: 'Residential Luxury Construction',
    location: 'East Legon, Accra, Ghana',
    clientName: 'Dr. Samuel Mensah (Client)',
    clientId: 'u-client-1',
    estimatedBudgetGHS: 220000,
    spentGHS: 184000,
    startDate: '2026-05-10',
    expectedCompletion: '2026-11-30',
    overallProgress: 78,
    workersCount: 17,
    siteManagerName: 'Abena Osei',
    status: 'In Progress',
    description: 'Two-storey contemporary villa with reinforced concrete superstructure, swimming pool foundation, and high-efficiency solar roof layout.',
    requiredSkills: ['Masonry', 'Structural Engineering', 'Electrical Automation', 'Plumbing', 'Tiling'],
    milestones: [
      {
        id: 'm-1',
        name: 'Foundation & Earthworks Excavation',
        amountGHS: 45000,
        progress: 100,
        status: 'APPROVED',
        deadline: '2026-06-15'
      },
      {
        id: 'm-2',
        name: 'Ground Floor Blockwork & First Slab Pouring',
        amountGHS: 65000,
        progress: 100,
        status: 'APPROVED',
        deadline: '2026-08-01'
      },
      {
        id: 'm-3',
        name: 'Roof Truss Installation & Waterproofing',
        amountGHS: 50000,
        progress: 75,
        status: 'IN_PROGRESS',
        deadline: '2026-10-15'
      },
      {
        id: 'm-4',
        name: 'Internal Plumbing & 3-Phase Electrical Conduit Piping',
        amountGHS: 35000,
        progress: 30,
        status: 'IN_PROGRESS',
        deadline: '2026-11-05'
      },
      {
        id: 'm-5',
        name: 'Plastering, Porcelain Tiling & Final Painting',
        amountGHS: 25000,
        progress: 0,
        status: 'PENDING',
        deadline: '2026-11-30'
      }
    ],
    latestPhotos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'p-2',
    name: 'Tema Logistics Commercial Warehouse Complex',
    type: 'Commercial / Steel Structure',
    location: 'Heavy Industrial Area, Tema, Ghana',
    clientName: 'Global Freight West Africa',
    clientId: 'u-client-2',
    estimatedBudgetGHS: 550000,
    spentGHS: 320000,
    startDate: '2026-03-01',
    expectedCompletion: '2026-12-20',
    overallProgress: 60,
    workersCount: 28,
    siteManagerName: 'Emmanuel Koffi',
    status: 'In Progress',
    description: '3,000 sq meter clear-span steel warehouse with heavy duty concrete hardstanding apron and administrative offices.',
    requiredSkills: ['Structural Steel Welding', 'Heavy Machinery', 'Concrete Apron Pouring'],
    milestones: [
      {
        id: 'pm-1',
        name: 'Site Grading & Pile Foundation',
        amountGHS: 120000,
        progress: 100,
        status: 'APPROVED',
        deadline: '2026-04-30'
      },
      {
        id: 'pm-2',
        name: 'Steel Frame Erection & Roof Cladding',
        amountGHS: 200000,
        progress: 80,
        status: 'IN_PROGRESS',
        deadline: '2026-10-30'
      }
    ],
    latestPhotos: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80'
    ]
  }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'cnt-101',
    contractNumber: 'GAB-CNT-2026-0891',
    title: 'East Legon Villa Masonry & Superstructure Contract',
    clientName: 'Dr. Samuel Mensah',
    clientId: 'u-client-1',
    providerName: 'Kwame Mensah (Mason)',
    providerId: 'w-1',
    projectName: 'East Legon 4-Bedroom Modern Villa Project',
    projectId: 'p-1',
    totalAmountGHS: 100000,
    gabWorkFeeGHS: 10000, // Explicit 10%
    netProviderAmountGHS: 90000,
    startDate: '2026-05-15',
    endDate: '2026-11-15',
    status: 'ACTIVE',
    signedDate: '2026-05-12',
    paymentTerms: 'Milestone Escrow Release upon Site Manager & Client Approval',
    milestones: [
      {
        id: 'm-1',
        name: 'Foundation & Earthworks Concrete Pouring',
        amountGHS: 35000,
        progress: 100,
        status: 'APPROVED',
        deadline: '2026-06-15'
      },
      {
        id: 'm-2',
        name: 'Ground Floor Blockwork & First Floor Slab',
        amountGHS: 40000,
        progress: 100,
        status: 'APPROVED',
        deadline: '2026-08-01'
      },
      {
        id: 'm-3',
        name: 'Roof Level Ring Beam & Parapet Masonry',
        amountGHS: 25000,
        progress: 75,
        status: 'IN_PROGRESS',
        deadline: '2026-10-15'
      }
    ]
  },
  {
    id: 'cnt-102',
    contractNumber: 'GAB-CNT-2026-0944',
    title: 'Villa Electrical Installation & Solar Wiring Contract',
    clientName: 'Dr. Samuel Mensah',
    clientId: 'u-client-1',
    providerName: 'Kofi Owusu (Electrician)',
    providerId: 'w-2',
    projectName: 'East Legon 4-Bedroom Modern Villa Project',
    projectId: 'p-1',
    totalAmountGHS: 45000,
    gabWorkFeeGHS: 4500, // Explicit 10%
    netProviderAmountGHS: 40500,
    startDate: '2026-10-01',
    endDate: '2026-11-20',
    status: 'PENDING_SIGNATURE',
    paymentTerms: '50% Upfront Escrow Deposit, 50% Final Testing Validation',
    milestones: [
      {
        id: 'em-1',
        name: 'Conduit Piping & Backbox Chasing',
        amountGHS: 20000,
        progress: 40,
        status: 'IN_PROGRESS',
        deadline: '2026-10-25'
      },
      {
        id: 'em-2',
        name: 'Main Distribution Board & Solar Inverter Wiring',
        amountGHS: 25000,
        progress: 0,
        status: 'PENDING',
        deadline: '2026-11-20'
      }
    ]
  }
];

export const MOCK_SITE_REPORTS: DailySiteReport[] = [
  {
    id: 'rep-001',
    projectId: 'p-1',
    projectName: 'East Legon 4-Bedroom Modern Villa Project',
    siteManagerName: 'Abena Osei',
    date: '2026-10-07',
    workersPresent: 15,
    workersAbsent: 2,
    progressPercent: 78,
    weatherCondition: 'Clear / Sunny 31°C',
    summary: 'Completed upper storey ring beam reinforcement. Masonry team under Kwame Mensah completed outer parapet blockwork on northern elevation.',
    issuesReported: 'Minor delay in sand delivery (resolved by 11:00 AM). Quality testing of block mortar passed standard load resistance.',
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80'
    ],
    verifiedByClient: true
  }
];

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'dsp-001',
    disputeNumber: 'GAB-DSP-2026-004',
    contractId: 'cnt-098',
    contractTitle: 'Plumbing Works - Ridge Office Remodel',
    openedBy: 'Client (Kwaku Addo)',
    against: 'Subcontractor (FastPlumb Ghana)',
    reason: 'Delay in Material Delivery & Non-compliant Pipe Specification',
    description: 'Subcontractor installed PVC instead of agreed PPR hot/cold pressure piping on 2nd floor bathroom fixtures.',
    status: 'UNDER_REVIEW',
    amountInQuestionGHS: 12500,
    createdDate: '2026-09-28',
    evidenceFilesCount: 4
  }
];

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'tx-501',
    reference: 'GAB-MOMO-948271',
    contractId: 'cnt-101',
    contractTitle: 'East Legon Villa Masonry Contract',
    type: 'Milestone Release',
    amountGHS: 40000,
    feeGHS: 4000, // GAB-work 10%
    paymentMethod: 'MTN Mobile Money',
    status: 'COMPLETED',
    date: '2026-08-02'
  },
  {
    id: 'tx-502',
    reference: 'GAB-BANK-102948',
    contractId: 'cnt-102',
    contractTitle: 'Villa Electrical Installation Contract',
    type: 'Escrow Deposit',
    amountGHS: 22500,
    feeGHS: 2250,
    paymentMethod: 'Bank Transfer',
    status: 'COMPLETED',
    date: '2026-10-01'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'w-1',
    participantName: 'Kwame Mensah',
    participantAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    participantRole: 'Mason & Site Specialist',
    participantStatus: 'AVAILABLE',
    lastMessage: 'Good morning Dr. Mensah, the parapet blockwork on the 2nd floor is now complete. Site photos uploaded.',
    lastMessageDate: '10:45 AM',
    unreadCount: 1,
    projectRef: 'East Legon 4-Bedroom Villa'
  },
  {
    id: 'conv-2',
    participantId: 'w-2',
    participantName: 'Kofi Owusu',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    participantRole: 'Master Electrician',
    participantStatus: 'AVAILABLE',
    lastMessage: 'I have reviewed the electrical BoQ and signed the contract on GAB-work.',
    lastMessageDate: 'Yesterday',
    unreadCount: 0,
    projectRef: 'East Legon 4-Bedroom Villa'
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'm-1',
      conversationId: 'conv-1',
      senderId: 'u-client-1',
      senderName: 'Dr. Samuel Mensah',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      text: 'Hello Kwame, can you confirm the completion timeline for the roof ring beam blockwork?',
      timestamp: 'Yesterday 4:15 PM'
    },
    {
      id: 'm-2',
      conversationId: 'conv-1',
      senderId: 'w-1',
      senderName: 'Kwame Mensah',
      senderAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
      text: 'Good morning Dr. Mensah, the parapet blockwork on the 2nd floor is now complete. Site photos uploaded to the daily report.',
      timestamp: '10:45 AM',
      attachmentUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80',
      attachmentName: 'Site_Parapet_Progress_Oct07.jpg'
    }
  ]
};

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-101',
    actor: 'Dr. Samuel Mensah',
    actorRole: 'Client',
    action: 'CONTRACT_CREATED',
    resource: 'Contract GAB-CNT-2026-0944',
    timestamp: '2026-10-01 14:22:05 GMT',
    ipAddress: '102.176.54.12',
    details: 'Created electrical installation contract with Kofi Owusu for GHS 45,000 (10% GAB-work fee: GHS 4,500).'
  },
  {
    id: 'aud-102',
    actor: 'Abena Osei',
    actorRole: 'Site Manager',
    action: 'SITE_REPORT_SUBMITTED',
    resource: 'Project p-1 (East Legon Villa)',
    timestamp: '2026-10-07 17:30:11 GMT',
    ipAddress: '197.251.18.94',
    details: 'Logged daily report: 15 workers present, overall progress updated to 78%.'
  },
  {
    id: 'aud-103',
    actor: 'Kwame Mensah',
    actorRole: 'Worker',
    action: 'PROFILE_VERIFIED',
    resource: 'Verification ID #GH-NVTI-884',
    timestamp: '2026-09-15 09:10:00 GMT',
    ipAddress: '102.176.12.89',
    details: 'Admin approved NVTI Master Mason Level 1 certificate.'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'j-1',
    jobTitle: 'Senior Mason & Site Foreman',
    workerId: 'w-1',
    workerName: 'Kwame Mensah',
    workerTrade: 'Mason & Site Specialist',
    workerAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    appliedDate: '2026-10-03',
    proposedRateGHS: 230,
    status: 'SHORTLISTED',
    coverNote: 'I have 9 years of masonry experience in Accra and completed 42 projects. Ready for immediate deployment.'
  }
];

export const MOCK_USERS: Record<string, User> = {
  admin: {
    id: 'adm-1',
    name: 'Marc Dossou (Super Admin)',
    email: 'admin@gabwork.com',
    phone: '+233 30 000 0001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    role: 'admin',
    country: 'GH',
    city: 'Accra',
    verifiedStatus: 'VERIFIED',
    joinedDate: 'Jan 2026',
    bio: 'Super Administrateur & Auditeur KYC de la plateforme souveraine GAB-work.',
    completionRate: 100,
    kycDocuments: [
      {
        id: 'doc-adm1',
        type: 'ID_CARD',
        name: 'Mandat & Habilitation Super Administrateur GAB-work',
        status: 'APPROVED',
        uploadedAt: '2026-01-01'
      }
    ]
  }
};

