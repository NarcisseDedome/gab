export type UserRole = 'client' | 'worker' | 'company' | 'sitemanager' | 'admin';

export type AvailabilityStatus = 'AVAILABLE' | 'PENDING' | 'UNAVAILABLE' | 'DISPUTE';

export type VerificationStatus = 'VERIFIED' | 'PENDING' | 'REJECTED' | 'ADDITIONAL_INFO_REQUIRED';

export type ContractStatus = 'DRAFT' | 'NEGOTIATION' | 'PENDING_SIGNATURE' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';

export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'INFORMATION_REQUIRED' | 'RESOLVED' | 'CLOSED';

export type CountryCode = 'GH' | 'NG' | 'BJ' | 'TG' | 'CI' | 'BF' | 'SN' | 'CM' | 'INT';

export type CurrencyCode = 'GHS' | 'XOF' | 'NGN' | 'USD' | 'EUR';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  country: CountryCode;
  city: string;
  verifiedStatus: VerificationStatus;
  joinedDate: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  name: string;
  trade: string;
  avatar: string;
  country: CountryCode;
  countryName: string;
  city: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  availability: 'Available now' | 'Available from date' | 'Unavailable' | 'Available for travel';
  availabilityStatus: AvailabilityStatus;
  availableDate?: string;
  dailyRateGHS: number;
  hourlyRateGHS?: number;
  verified: boolean;
  skills: string[];
  about: string;
  workExperience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  certifications: string[];
  portfolioPhotos: string[];
  completedProjectsCount: number;
  travelReady: boolean;
  internationalAvailability: boolean;
  languages: string[];
  verificationBadge: string; // 'Verified Professional'
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  verified: boolean;
  city: string;
  country: string;
  employeesCount: number;
  yearsInBusiness: number;
  about: string;
  services: string[];
  activeJobsCount: number;
  completedProjectsCount: number;
  rating: number;
  reviewsCount: number;
  certifications: string[];
}

export interface Job {
  id: string;
  title: string;
  category: string;
  companyId?: string;
  companyName: string;
  companyVerified: boolean;
  location: string;
  country: string;
  salaryRange: string;
  dailyRateGHS: number;
  contractType: 'Full-time' | 'Contract' | 'Daily Wage' | 'Project-based';
  experienceRequired: string;
  postedDate: string;
  deadline: string;
  workersNeeded: number;
  description: string;
  requiredSkills: string[];
  availabilityRequired: string;
  travelRequired: boolean;
  status: 'OPEN' | 'CLOSED' | 'IN_PROGRESS';
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  workerId: string;
  workerName: string;
  workerTrade: string;
  workerAvatar: string;
  appliedDate: string;
  proposedRateGHS: number;
  status: 'PENDING' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED';
  coverNote: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  providerName: string;
  providerType: 'Company' | 'Independent Worker';
  location: string;
  startingPriceGHS: number;
  priceUnit: string;
  rating: number;
  projectsCompleted: number;
  verified: boolean;
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  clientName: string;
  clientId: string;
  estimatedBudgetGHS: number;
  spentGHS: number;
  startDate: string;
  expectedCompletion: string;
  overallProgress: number; // percentage 0-100
  workersCount: number;
  siteManagerName?: string;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed';
  description: string;
  requiredSkills: string[];
  milestones: Milestone[];
  latestPhotos: string[];
}

export interface Milestone {
  id: string;
  name: string;
  amountGHS: number;
  progress: number; // percentage
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'APPROVED';
  deadline: string;
  evidenceUrl?: string;
}

export interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  clientName: string;
  clientId: string;
  providerName: string;
  providerId: string;
  projectName: string;
  projectId: string;
  totalAmountGHS: number;
  gabWorkFeeGHS: number; // 10% transparent fee
  netProviderAmountGHS: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  signedDate?: string;
  paymentTerms: string;
  milestones: Milestone[];
}

export interface DailySiteReport {
  id: string;
  projectId: string;
  projectName: string;
  siteManagerName: string;
  date: string;
  workersPresent: number;
  workersAbsent: number;
  progressPercent: number;
  weatherCondition: string;
  summary: string;
  issuesReported: string;
  photos: string[];
  verifiedByClient: boolean;
}

export interface Dispute {
  id: string;
  disputeNumber: string;
  contractId: string;
  contractTitle: string;
  openedBy: string;
  against: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  amountInQuestionGHS: number;
  createdDate: string;
  evidenceFilesCount: number;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  contractId: string;
  contractTitle: string;
  type: 'Escrow Deposit' | 'Milestone Release' | 'Commission Fee' | 'Withdrawal';
  amountGHS: number;
  feeGHS: number;
  paymentMethod: 'MTN Mobile Money' | 'Telecel Cash' | 'Bank Transfer' | 'Card';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  date: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  participantStatus: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
  projectRef?: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  rating: number;
  date: string;
  comment: string;
  qualityRating: number;
  communicationRating: number;
  reliabilityRating: number;
  deadlineRespectRating: number;
}

export interface AuditLog {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}
