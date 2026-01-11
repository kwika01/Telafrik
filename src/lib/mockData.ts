export interface Startup {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  description: string;
  yearFounded: number;
  hqCountry: string;
  operatingCountries: string[];
  sector: string;
  subSector: string;
  businessModel: 'B2B' | 'B2C' | 'B2B2C';
  domain: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  appLinks?: {
    ios?: string;
    android?: string;
  };
  revenue: {
    range: string;
    metricType: 'ARR' | 'MRR' | 'GMV' | 'Net Revenue';
    source: 'Verified' | 'Reported' | 'Estimated';
    confidenceScore: number;
  };
  valuation: {
    range: string;
    type: 'Pre-money' | 'Post-money';
    source: 'Verified' | 'Reported' | 'Estimated';
    confidenceScore: number;
  };
  totalFunding: string;
  fundingRounds: FundingRound[];
  founders: Founder[];
  headcount: string;
  hiringStatus: 'Actively Hiring' | 'Selectively Hiring' | 'Not Hiring';
  stage: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+' | 'Growth';
  trending?: boolean;
  recentlyFunded?: boolean;
}

export interface FundingRound {
  id: string;
  round: string;
  date: string;
  amount: string;
  investors: string[];
  valuation?: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface Investor {
  id: string;
  name: string;
  type: 'VC' | 'PE' | 'Angel' | 'Accelerator' | 'Corporate';
  logo: string;
  portfolioCount: number;
  geographyFocus: string[];
  sectorFocus: string[];
}

export const startups: Startup[] = [
  {
    id: '1',
    name: 'Flutterwave',
    slug: 'flutterwave',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop',
    tagline: 'Payments infrastructure for Africa',
    description: 'Flutterwave provides a payment infrastructure that allows businesses in Africa to make and accept payments from customers anywhere in the world. The company offers various payment solutions including card payments, bank transfers, mobile money, and QR payments.',
    yearFounded: 2016,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Rwanda', 'Uganda'],
    sector: 'Fintech',
    subSector: 'Payments',
    businessModel: 'B2B',
    domain: 'flutterwave.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/flutterwave',
      twitter: 'https://twitter.com/flaboratorywave',
    },
    revenue: {
      range: '$150M - $250M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 72,
    },
    valuation: {
      range: '$2.5B - $3.5B',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 85,
    },
    totalFunding: '$474M',
    fundingRounds: [
      { id: '1', round: 'Series D', date: '2024-02', amount: '$110M', investors: ['Alta Park Capital', 'Whale Rock'], valuation: '$3B' },
      { id: '2', round: 'Series C', date: '2021-03', amount: '$170M', investors: ['Avenir Growth', 'Tiger Global'], valuation: '$1B' },
      { id: '3', round: 'Series B', date: '2020-01', amount: '$35M', investors: ['Greycroft', 'eVentures'], valuation: '$200M' },
    ],
    founders: [
      { id: '1', name: 'Olugbenga Agboola', role: 'CEO & Co-founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', linkedin: 'https://linkedin.com/in/gbengaagboola' },
      { id: '2', name: 'Iyinoluwa Aboyeji', role: 'Co-founder', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', linkedin: 'https://linkedin.com/in/iyin' },
    ],
    headcount: '800-1000',
    hiringStatus: 'Actively Hiring',
    stage: 'Growth',
    trending: true,
    recentlyFunded: true,
  },
  {
    id: '2',
    name: 'Andela',
    slug: 'andela',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    tagline: 'Building distributed engineering teams',
    description: 'Andela is a global talent network that connects companies with vetted, remote engineers in emerging markets. The platform helps businesses scale their engineering teams with top African tech talent.',
    yearFounded: 2014,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Kenya', 'Ghana', 'Rwanda', 'Egypt'],
    sector: 'HR Tech',
    subSector: 'Talent Marketplace',
    businessModel: 'B2B',
    domain: 'andela.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/andela',
      twitter: 'https://twitter.com/andaboratory',
    },
    revenue: {
      range: '$80M - $120M',
      metricType: 'ARR',
      source: 'Estimated',
      confidenceScore: 65,
    },
    valuation: {
      range: '$1.2B - $1.8B',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 78,
    },
    totalFunding: '$381M',
    fundingRounds: [
      { id: '1', round: 'Series E', date: '2021-09', amount: '$200M', investors: ['Softbank Vision Fund'], valuation: '$1.5B' },
      { id: '2', round: 'Series D', date: '2019-01', amount: '$100M', investors: ['Generation Investment'], valuation: '$700M' },
    ],
    founders: [
      { id: '1', name: 'Jeremy Johnson', role: 'CEO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
      { id: '2', name: 'Christina Sass', role: 'President', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    ],
    headcount: '400-600',
    hiringStatus: 'Selectively Hiring',
    stage: 'Growth',
    trending: true,
  },
  {
    id: '3',
    name: 'Moniepoint',
    slug: 'moniepoint',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
    tagline: 'All-in-one financial services for African businesses',
    description: 'Moniepoint is a leading fintech platform providing payment, banking, credit, and business management solutions to over 600,000 businesses across Africa.',
    yearFounded: 2019,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Kenya'],
    sector: 'Fintech',
    subSector: 'Business Banking',
    businessModel: 'B2B',
    domain: 'moniepoint.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/moniepoint',
      twitter: 'https://twitter.com/moniepoint',
    },
    revenue: {
      range: '$100M - $200M',
      metricType: 'Net Revenue',
      source: 'Verified',
      confidenceScore: 92,
    },
    valuation: {
      range: '$1B - $1.5B',
      type: 'Post-money',
      source: 'Verified',
      confidenceScore: 95,
    },
    totalFunding: '$110M',
    fundingRounds: [
      { id: '1', round: 'Series C', date: '2024-01', amount: '$110M', investors: ['Development Partners International', 'Google Ventures'], valuation: '$1B' },
    ],
    founders: [
      { id: '1', name: 'Tosin Eniolorunda', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
    ],
    headcount: '1500-2000',
    hiringStatus: 'Actively Hiring',
    stage: 'Series C+',
    recentlyFunded: true,
    trending: true,
  },
  {
    id: '4',
    name: 'Yoco',
    slug: 'yoco',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop',
    tagline: 'Payment solutions for small businesses',
    description: 'Yoco provides point-of-sale payment solutions and business tools for small and medium businesses in South Africa and beyond.',
    yearFounded: 2013,
    hqCountry: 'South Africa',
    operatingCountries: ['South Africa'],
    sector: 'Fintech',
    subSector: 'POS & Payments',
    businessModel: 'B2B',
    domain: 'yoco.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/yoco',
      twitter: 'https://twitter.com/yaboratoryo',
    },
    revenue: {
      range: '$30M - $50M',
      metricType: 'ARR',
      source: 'Estimated',
      confidenceScore: 58,
    },
    valuation: {
      range: '$350M - $500M',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 75,
    },
    totalFunding: '$107M',
    fundingRounds: [
      { id: '1', round: 'Series C', date: '2021-11', amount: '$83M', investors: ['Dragoneer', 'Vulcan Capital'], valuation: '$400M' },
    ],
    founders: [
      { id: '1', name: 'Katlego Maphai', role: 'CEO', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    ],
    headcount: '300-400',
    hiringStatus: 'Actively Hiring',
    stage: 'Series C+',
  },
  {
    id: '5',
    name: 'Wave',
    slug: 'wave',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop',
    tagline: 'Mobile money for Africa',
    description: 'Wave is a mobile money platform providing financial services to the unbanked population in West Africa, offering free transfers, bill payments, and merchant payments.',
    yearFounded: 2018,
    hqCountry: 'Senegal',
    operatingCountries: ['Senegal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Uganda', 'Gambia'],
    sector: 'Fintech',
    subSector: 'Mobile Money',
    businessModel: 'B2C',
    domain: 'wave.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/wave-mobile-money',
      twitter: 'https://twitter.com/wave',
    },
    revenue: {
      range: '$100M - $180M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 68,
    },
    valuation: {
      range: '$1.5B - $2B',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 82,
    },
    totalFunding: '$200M',
    fundingRounds: [
      { id: '1', round: 'Series A', date: '2021-09', amount: '$200M', investors: ['Sequoia Heritage', 'Founders Fund', 'Stripe'], valuation: '$1.7B' },
    ],
    founders: [
      { id: '1', name: 'Drew Durbin', role: 'CEO', image: 'https://images.unsplash.com/photo-1480429370612-27c27e5c676c?w=200&h=200&fit=crop' },
      { id: '2', name: 'Lincoln Quirk', role: 'CTO', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop' },
    ],
    headcount: '1000-1500',
    hiringStatus: 'Actively Hiring',
    stage: 'Growth',
    trending: true,
  },
  {
    id: '6',
    name: 'Chipper Cash',
    slug: 'chipper-cash',
    logo: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=200&h=200&fit=crop',
    tagline: 'Cross-border payments made simple',
    description: 'Chipper Cash is a fintech platform enabling free peer-to-peer payments and cross-border money transfers across Africa.',
    yearFounded: 2018,
    hqCountry: 'USA',
    operatingCountries: ['Nigeria', 'Ghana', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'South Africa'],
    sector: 'Fintech',
    subSector: 'Cross-border Payments',
    businessModel: 'B2C',
    domain: 'chippercash.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/chippercash',
      twitter: 'https://twitter.com/chippercashapp',
    },
    revenue: {
      range: '$40M - $70M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 55,
    },
    valuation: {
      range: '$1.5B - $2.5B',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 70,
    },
    totalFunding: '$302M',
    fundingRounds: [
      { id: '1', round: 'Series C', date: '2021-11', amount: '$150M', investors: ['SVB Capital', 'FTX Ventures'], valuation: '$2B' },
    ],
    founders: [
      { id: '1', name: 'Ham Serunjogi', role: 'CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
      { id: '2', name: 'Maijid Moujaled', role: 'CTO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    ],
    headcount: '300-500',
    hiringStatus: 'Selectively Hiring',
    stage: 'Growth',
  },
];

export const sectors = [
  'Fintech',
  'HR Tech',
  'Healthtech',
  'Agritech',
  'Edtech',
  'Logistics',
  'E-commerce',
  'Cleantech',
  'PropTech',
  'InsurTech',
];

export const countries = [
  'Nigeria',
  'Kenya',
  'South Africa',
  'Egypt',
  'Ghana',
  'Senegal',
  'Rwanda',
  'Uganda',
  'Tanzania',
  'Ethiopia',
];

export const stages = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth'];

export const investors: Investor[] = [
  {
    id: '1',
    name: 'Partech Africa',
    type: 'VC',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    portfolioCount: 45,
    geographyFocus: ['Nigeria', 'Kenya', 'Egypt', 'South Africa'],
    sectorFocus: ['Fintech', 'Logistics', 'Healthtech'],
  },
  {
    id: '2',
    name: 'TLcom Capital',
    type: 'VC',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=200&fit=crop',
    portfolioCount: 32,
    geographyFocus: ['Nigeria', 'Kenya'],
    sectorFocus: ['Fintech', 'E-commerce', 'Agritech'],
  },
  {
    id: '3',
    name: 'Y Combinator',
    type: 'Accelerator',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',
    portfolioCount: 85,
    geographyFocus: ['Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ghana'],
    sectorFocus: ['Fintech', 'HR Tech', 'Healthtech', 'E-commerce'],
  },
];
