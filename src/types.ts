export type ProjectStatus = 'Completed' | 'Live' | 'In Development' | 'Coming Soon';
export type ProductStatus = 'Live' | 'Coming Soon' | 'In Development';
export type EnquiryStatus = 'new' | 'in_discussion' | 'completed' | 'archived';

export interface CeoSettings {
  name: string;
  role: string;
  degree: string;
  badge?: string;
  initials?: string;
}

export interface FounderSettings {
  name: string;
  role: string;
  degree?: string;
  badge: string;
  bio: string;
  portfolioUrl: string;
  portfolioButtonText: string;
  initials: string;
  availabilityStatus: string;
  skills: string[];
  showcaseTitle: string;
  showcaseDescription: string;
  showcaseButtonText?: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  subtagline: string;
  description: string;
  primaryWhatsApp: string;
  primaryEmail: string;
  address: string;
  logoUrl?: string;
  promoVideoUrl?: string;
  promoBannerUrl?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube?: string;
  };
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    badgeText: string;
    videoUrl?: string;
  };
  ceo?: CeoSettings;
  founder?: FounderSettings;
  about: {
    heading: string;
    productDevText: string;
    techServicesText: string;
    mission: string;
    vision: string;
    foundedYear: string;
  };
  stats: {
    productsBuilt: number;
    projectsCompleted: number;
    technologiesCount: number;
    happyClients: number;
    productsBuiltLabel?: string;
    productsBuiltSubtext?: string;
    projectsCompletedLabel?: string;
    projectsCompletedSubtext?: string;
    technologiesLabel?: string;
    technologiesSubtext?: string;
    happyClientsLabel?: string;
    happyClientsSubtext?: string;
    uptimePercentage?: string;
    satisfactionRate?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  status: ProductStatus;
  productUrl: string;
  githubUrl?: string;
  imageUrl: string;
  videoUrl?: string;
  featured: boolean;
  badge?: string;
  metrics?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  technologies: string[];
  deliverables: string[];
  active: boolean;
  order: number;
  pricingStartingAt?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  clientName?: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  videoUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  startDate?: string;
  completionDate?: string;
  whatsapp?: string;
  email?: string;
  offerPrice?: string;
  offerPromotionText?: string;
  keyHighlights: string[];
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  originalPrice: string;
  offerPrice: string;
  discount: string;
  validUntil: string;
  whatsapp?: string;
  email?: string;
  active: boolean;
  category: string;
  features: string[];
  badge?: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'owner' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: AdminUser;
}

export interface DashboardStats {
  totalProjects: number;
  activeOffers: number;
  totalProducts: number;
  totalServices: number;
  totalEnquiries: number;
  newEnquiriesCount: number;
  featuredProjectsCount: number;
  liveProductsCount: number;
}
