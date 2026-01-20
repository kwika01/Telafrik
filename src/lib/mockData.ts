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
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flutterwave_Logo.png/320px-Flutterwave_Logo.png',
    tagline: 'Payments infrastructure for Africa',
    description: 'Flutterwave provides a payment infrastructure that allows businesses in Africa to make and accept payments from customers anywhere in the world.',
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
    ],
    founders: [
      { id: '1', name: 'Olugbenga Agboola', role: 'CEO & Co-founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
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
    logo: 'https://andela.com/wp-content/uploads/2023/01/Andela-logo-2.svg',
    tagline: 'Building distributed engineering teams',
    description: 'Andela is a global talent network that connects companies with vetted, remote engineers in emerging markets.',
    yearFounded: 2014,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Kenya', 'Ghana', 'Rwanda', 'Egypt'],
    sector: 'HR Tech',
    subSector: 'Talent Marketplace',
    businessModel: 'B2B',
    domain: 'andela.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/andela',
      twitter: 'https://twitter.com/andela',
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
    ],
    founders: [
      { id: '1', name: 'Jeremy Johnson', role: 'CEO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
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
    logo: 'https://moniepoint.com/static/images/moniepoint-logo.svg',
    tagline: 'All-in-one financial services for African businesses',
    description: 'Moniepoint is a leading fintech platform providing payment, banking, credit, and business management solutions.',
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
    name: 'M-KOPA',
    slug: 'm-kopa',
    logo: 'https://m-kopa.com/wp-content/uploads/2023/02/M-KOPA-logo.svg',
    tagline: 'Connected asset financing for Africa',
    description: 'M-KOPA provides pay-as-you-go financing for solar energy, smartphones, and other life-changing products across Africa.',
    yearFounded: 2011,
    hqCountry: 'Kenya',
    operatingCountries: ['Kenya', 'Uganda', 'Tanzania', 'Nigeria', 'Ghana'],
    sector: 'Cleantech',
    subSector: 'Solar Energy',
    businessModel: 'B2C',
    domain: 'm-kopa.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/m-kopa',
      twitter: 'https://twitter.com/mkaboratory',
    },
    revenue: {
      range: '$200M - $300M',
      metricType: 'Net Revenue',
      source: 'Reported',
      confidenceScore: 88,
    },
    valuation: {
      range: '$750M - $1B',
      type: 'Post-money',
      source: 'Estimated',
      confidenceScore: 70,
    },
    totalFunding: '$190M',
    fundingRounds: [
      { id: '1', round: 'Series C', date: '2021-02', amount: '$75M', investors: ['Generation Investment', 'CDC Group'], valuation: '$500M' },
    ],
    founders: [
      { id: '1', name: 'Jesse Moore', role: 'CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    ],
    headcount: '2000-3000',
    hiringStatus: 'Actively Hiring',
    stage: 'Growth',
    trending: true,
  },
  {
    id: '5',
    name: 'Paystack',
    slug: 'paystack',
    logo: 'https://paystack.com/assets/img/logos/paystack-logo.svg',
    tagline: 'Modern payments for Africa',
    description: 'Paystack helps businesses in Africa get paid by anyone, anywhere in the world. Acquired by Stripe for $200M+.',
    yearFounded: 2015,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Ghana', 'South Africa', 'Kenya'],
    sector: 'Fintech',
    subSector: 'Payments',
    businessModel: 'B2B',
    domain: 'paystack.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/paystack',
      twitter: 'https://twitter.com/payaboratorstack',
    },
    revenue: {
      range: '$50M - $80M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 65,
    },
    valuation: {
      range: '$200M+',
      type: 'Post-money',
      source: 'Verified',
      confidenceScore: 100,
    },
    totalFunding: '$10M',
    fundingRounds: [
      { id: '1', round: 'Series A', date: '2018-08', amount: '$8M', investors: ['Stripe', 'Y Combinator', 'Tencent'], valuation: '$50M' },
    ],
    founders: [
      { id: '1', name: 'Shola Akinlade', role: 'CEO', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    ],
    headcount: '200-300',
    hiringStatus: 'Actively Hiring',
    stage: 'Growth',
  },
  {
    id: '6',
    name: 'Jumia',
    slug: 'jumia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Jumia_logo.png',
    tagline: 'Africa\'s leading e-commerce platform',
    description: 'Jumia is a leading pan-African e-commerce platform, connecting millions of consumers and sellers through its marketplace.',
    yearFounded: 2012,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Egypt', 'Morocco', 'Kenya', 'Côte d\'Ivoire', 'Ghana'],
    sector: 'E-commerce',
    subSector: 'Marketplace',
    businessModel: 'B2B2C',
    domain: 'jumia.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/jumia',
      twitter: 'https://twitter.com/jumiagroup',
    },
    revenue: {
      range: '$180M - $220M',
      metricType: 'GMV',
      source: 'Verified',
      confidenceScore: 95,
    },
    valuation: {
      range: '$500M - $800M',
      type: 'Post-money',
      source: 'Verified',
      confidenceScore: 100,
    },
    totalFunding: '$900M+',
    fundingRounds: [
      { id: '1', round: 'IPO', date: '2019-04', amount: '$196M', investors: ['Public Markets'], valuation: '$1.5B' },
    ],
    founders: [
      { id: '1', name: 'Sacha Poignonnec', role: 'Co-CEO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
    ],
    headcount: '3000-5000',
    hiringStatus: 'Selectively Hiring',
    stage: 'Growth',
    trending: true,
  },
  {
    id: '7',
    name: 'Twiga Foods',
    slug: 'twiga-foods',
    logo: 'https://twiga.com/wp-content/uploads/2023/01/twiga-logo.svg',
    tagline: 'B2B food distribution platform',
    description: 'Twiga Foods connects farmers to urban retailers through a mobile-based supply chain, reducing food waste and costs.',
    yearFounded: 2014,
    hqCountry: 'Kenya',
    operatingCountries: ['Kenya', 'Uganda'],
    sector: 'Agritech',
    subSector: 'Supply Chain',
    businessModel: 'B2B',
    domain: 'twiga.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/twigafoods',
      twitter: 'https://twitter.com/twigafoods',
    },
    revenue: {
      range: '$60M - $100M',
      metricType: 'GMV',
      source: 'Estimated',
      confidenceScore: 60,
    },
    valuation: {
      range: '$400M - $600M',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 75,
    },
    totalFunding: '$160M',
    fundingRounds: [
      { id: '1', round: 'Series C', date: '2022-02', amount: '$50M', investors: ['Creadev', 'Goldman Sachs'], valuation: '$400M' },
    ],
    founders: [
      { id: '1', name: 'Peter Njonjo', role: 'CEO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
    ],
    headcount: '500-800',
    hiringStatus: 'Actively Hiring',
    stage: 'Series C+',
    trending: true,
  },
  {
    id: '8',
    name: 'Kobo360',
    slug: 'kobo360',
    logo: 'https://kobo360.com/wp-content/uploads/2023/01/kobo360-logo.png',
    tagline: 'Digital logistics network for Africa',
    description: 'Kobo360 connects cargo owners with truck owners and drivers through an AI-powered logistics platform.',
    yearFounded: 2017,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Kenya', 'Uganda', 'Ghana', 'Togo'],
    sector: 'Logistics',
    subSector: 'Freight',
    businessModel: 'B2B',
    domain: 'kobo360.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/kobo360',
      twitter: 'https://twitter.com/kobo360',
    },
    revenue: {
      range: '$30M - $50M',
      metricType: 'GMV',
      source: 'Estimated',
      confidenceScore: 55,
    },
    valuation: {
      range: '$150M - $250M',
      type: 'Post-money',
      source: 'Estimated',
      confidenceScore: 60,
    },
    totalFunding: '$37M',
    fundingRounds: [
      { id: '1', round: 'Series A', date: '2019-08', amount: '$30M', investors: ['Goldman Sachs', 'IFC'], valuation: '$150M' },
    ],
    founders: [
      { id: '1', name: 'Obi Ozor', role: 'CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    ],
    headcount: '200-300',
    hiringStatus: 'Selectively Hiring',
    stage: 'Series A',
  },
  {
    id: '9',
    name: 'uLesson',
    slug: 'ulesson',
    logo: 'https://ulesson.com/static/images/ulesson-logo.svg',
    tagline: 'Personalized learning for African students',
    description: 'uLesson provides affordable, high-quality educational content to students across Africa via mobile app.',
    yearFounded: 2019,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Ghana', 'Sierra Leone', 'Liberia', 'The Gambia'],
    sector: 'Edtech',
    subSector: 'K-12 Learning',
    businessModel: 'B2C',
    domain: 'ulesson.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/ulesson',
      twitter: 'https://twitter.com/ulessonapp',
    },
    revenue: {
      range: '$5M - $15M',
      metricType: 'ARR',
      source: 'Estimated',
      confidenceScore: 50,
    },
    valuation: {
      range: '$50M - $100M',
      type: 'Post-money',
      source: 'Estimated',
      confidenceScore: 55,
    },
    totalFunding: '$15M',
    fundingRounds: [
      { id: '1', round: 'Series A', date: '2021-01', amount: '$7.5M', investors: ['Owl Ventures', 'TLcom Capital'], valuation: '$40M' },
    ],
    founders: [
      { id: '1', name: 'Sim Shagaya', role: 'CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    ],
    headcount: '100-200',
    hiringStatus: 'Actively Hiring',
    stage: 'Series A',
    trending: true,
  },
  {
    id: '10',
    name: 'Lipa Later',
    slug: 'lipa-later',
    logo: 'https://lipalater.com/wp-content/uploads/2023/01/lipa-later-logo.svg',
    tagline: 'Buy now, pay later for Africa',
    description: 'Lipa Later is East Africa\'s leading Buy Now Pay Later platform for consumers and merchants.',
    yearFounded: 2018,
    hqCountry: 'Kenya',
    operatingCountries: ['Kenya', 'Rwanda', 'Uganda'],
    sector: 'Fintech',
    subSector: 'BNPL',
    businessModel: 'B2B2C',
    domain: 'lipalater.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/lipa-later',
      twitter: 'https://twitter.com/lipalater',
    },
    revenue: {
      range: '$10M - $20M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 50,
    },
    valuation: {
      range: '$50M - $80M',
      type: 'Post-money',
      source: 'Estimated',
      confidenceScore: 55,
    },
    totalFunding: '$12M',
    fundingRounds: [
      { id: '1', round: 'Series A', date: '2022-06', amount: '$12M', investors: ['Cauris Finance', 'HAVAÍC'], valuation: '$50M' },
    ],
    founders: [
      { id: '1', name: 'Eric Muli', role: 'CEO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
    ],
    headcount: '100-150',
    hiringStatus: 'Actively Hiring',
    stage: 'Series A',
  },
  {
    id: '11',
    name: 'Helium Health',
    slug: 'helium-health',
    logo: 'https://heliumhealth.com/wp-content/uploads/2023/01/helium-logo.svg',
    tagline: 'Healthcare software for Africa',
    description: 'Helium Health provides electronic medical records and hospital management software across Africa.',
    yearFounded: 2016,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Kenya', 'Ghana', 'Senegal', 'Liberia'],
    sector: 'Healthtech',
    subSector: 'Healthcare Software',
    businessModel: 'B2B',
    domain: 'heliumhealth.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/helium-health',
      twitter: 'https://twitter.com/heliumhealth',
    },
    revenue: {
      range: '$5M - $10M',
      metricType: 'ARR',
      source: 'Estimated',
      confidenceScore: 55,
    },
    valuation: {
      range: '$30M - $50M',
      type: 'Post-money',
      source: 'Estimated',
      confidenceScore: 50,
    },
    totalFunding: '$12M',
    fundingRounds: [
      { id: '1', round: 'Series A', date: '2020-02', amount: '$10M', investors: ['Tencent', 'Global Ventures'], valuation: '$30M' },
    ],
    founders: [
      { id: '1', name: 'Adegoke Olubusi', role: 'CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    ],
    headcount: '100-200',
    hiringStatus: 'Actively Hiring',
    stage: 'Series A',
    trending: true,
  },
  {
    id: '12',
    name: 'Yassir',
    slug: 'yassir',
    logo: 'https://yassir.com/wp-content/uploads/2023/01/yassir-logo.svg',
    tagline: 'Super app for North Africa',
    description: 'Yassir is a super app offering ride-hailing, delivery, and payment services across North and West Africa.',
    yearFounded: 2017,
    hqCountry: 'Algeria',
    operatingCountries: ['Algeria', 'Morocco', 'Tunisia', 'Senegal', 'South Africa'],
    sector: 'Logistics',
    subSector: 'Ride-hailing',
    businessModel: 'B2C',
    domain: 'yassir.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/yassir',
      twitter: 'https://twitter.com/yassirapp',
    },
    revenue: {
      range: '$50M - $80M',
      metricType: 'GMV',
      source: 'Estimated',
      confidenceScore: 60,
    },
    valuation: {
      range: '$150M - $250M',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 70,
    },
    totalFunding: '$150M',
    fundingRounds: [
      { id: '1', round: 'Series B', date: '2022-09', amount: '$150M', investors: ['BOND', 'DN Capital'], valuation: '$200M' },
    ],
    founders: [
      { id: '1', name: 'Noureddine Tayebi', role: 'CEO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
    ],
    headcount: '500-1000',
    hiringStatus: 'Actively Hiring',
    stage: 'Series B',
    trending: true,
    recentlyFunded: true,
  },
  {
    id: '13',
    name: 'Swvl',
    slug: 'swvl',
    logo: 'https://swvl.com/wp-content/uploads/2023/01/swvl-logo.svg',
    tagline: 'Mass transit technology',
    description: 'Swvl offers a platform for booking intercity and mass transit rides across Africa and the Middle East.',
    yearFounded: 2017,
    hqCountry: 'Egypt',
    operatingCountries: ['Egypt', 'Kenya', 'Pakistan', 'UAE'],
    sector: 'Logistics',
    subSector: 'Mass Transit',
    businessModel: 'B2C',
    domain: 'swvl.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/swvl',
      twitter: 'https://twitter.com/swvlofficial',
    },
    revenue: {
      range: '$20M - $40M',
      metricType: 'Net Revenue',
      source: 'Verified',
      confidenceScore: 90,
    },
    valuation: {
      range: '$100M - $200M',
      type: 'Post-money',
      source: 'Verified',
      confidenceScore: 95,
    },
    totalFunding: '$170M',
    fundingRounds: [
      { id: '1', round: 'SPAC', date: '2022-03', amount: '$100M', investors: ['Queen\'s Gambit Growth Capital'], valuation: '$1.5B' },
    ],
    founders: [
      { id: '1', name: 'Mostafa Kandil', role: 'CEO', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    ],
    headcount: '200-400',
    hiringStatus: 'Not Hiring',
    stage: 'Growth',
  },
  {
    id: '14',
    name: 'TymeBank',
    slug: 'tymebank',
    logo: 'https://tymebank.co.za/wp-content/uploads/2023/01/tymebank-logo.svg',
    tagline: 'Digital banking for South Africa',
    description: 'TymeBank is South Africa\'s first fully digital bank, offering affordable banking services to underserved communities.',
    yearFounded: 2018,
    hqCountry: 'South Africa',
    operatingCountries: ['South Africa', 'Philippines'],
    sector: 'Fintech',
    subSector: 'Digital Banking',
    businessModel: 'B2C',
    domain: 'tymebank.co.za',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/tymebank',
      twitter: 'https://twitter.com/taboratorymebank',
    },
    revenue: {
      range: '$40M - $70M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 65,
    },
    valuation: {
      range: '$900M - $1.2B',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 80,
    },
    totalFunding: '$210M',
    fundingRounds: [
      { id: '1', round: 'Series B', date: '2022-12', amount: '$110M', investors: ['Tencent', 'Norrsken22'], valuation: '$1B' },
    ],
    founders: [
      { id: '1', name: 'Coen Jonker', role: 'CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    ],
    headcount: '400-600',
    hiringStatus: 'Actively Hiring',
    stage: 'Series B',
    trending: true,
  },
  {
    id: '15',
    name: 'Wasoko',
    slug: 'wasoko',
    logo: 'https://wasoko.com/wp-content/uploads/2023/01/wasoko-logo.svg',
    tagline: 'B2B e-commerce for informal retail',
    description: 'Wasoko (formerly Sokowatch) provides last-mile delivery of essential goods to informal retailers in East Africa.',
    yearFounded: 2015,
    hqCountry: 'Kenya',
    operatingCountries: ['Kenya', 'Tanzania', 'Rwanda', 'Uganda', 'Côte d\'Ivoire', 'Senegal'],
    sector: 'E-commerce',
    subSector: 'B2B Retail',
    businessModel: 'B2B',
    domain: 'wasoko.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/wasoko',
      twitter: 'https://twitter.com/wasokohq',
    },
    revenue: {
      range: '$100M - $150M',
      metricType: 'GMV',
      source: 'Estimated',
      confidenceScore: 60,
    },
    valuation: {
      range: '$500M - $700M',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 75,
    },
    totalFunding: '$125M',
    fundingRounds: [
      { id: '1', round: 'Series B', date: '2022-03', amount: '$125M', investors: ['Tiger Global', 'Avenir'], valuation: '$625M' },
    ],
    founders: [
      { id: '1', name: 'Daniel Yu', role: 'CEO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
    ],
    headcount: '800-1000',
    hiringStatus: 'Actively Hiring',
    stage: 'Series B',
    trending: true,
    recentlyFunded: true,
  },
  {
    id: '16',
    name: 'Paga',
    slug: 'paga',
    logo: 'https://mypaga.com/wp-content/uploads/2023/01/paga-logo.svg',
    tagline: 'Mobile payments pioneer in Nigeria',
    description: 'Paga is a mobile money platform enabling payments, transfers, and bill payments across Nigeria.',
    yearFounded: 2009,
    hqCountry: 'Nigeria',
    operatingCountries: ['Nigeria', 'Mexico', 'Ethiopia'],
    sector: 'Fintech',
    subSector: 'Mobile Money',
    businessModel: 'B2C',
    domain: 'mypaga.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/paga',
      twitter: 'https://twitter.com/mypaga',
    },
    revenue: {
      range: '$20M - $35M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 55,
    },
    valuation: {
      range: '$150M - $250M',
      type: 'Post-money',
      source: 'Estimated',
      confidenceScore: 60,
    },
    totalFunding: '$45M',
    fundingRounds: [
      { id: '1', round: 'Series B', date: '2019-06', amount: '$10M', investors: ['Adlevo Capital', 'Global Innovation Fund'], valuation: '$100M' },
    ],
    founders: [
      { id: '1', name: 'Tayo Oviosu', role: 'CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    ],
    headcount: '300-500',
    hiringStatus: 'Selectively Hiring',
    stage: 'Series B',
  },
  {
    id: '17',
    name: 'Turaco',
    slug: 'turaco',
    logo: 'https://turaco.insure/wp-content/uploads/2023/01/turaco-logo.svg',
    tagline: 'Insurance for emerging markets',
    description: 'Turaco provides affordable insurance products embedded into everyday transactions across East Africa.',
    yearFounded: 2019,
    hqCountry: 'Kenya',
    operatingCountries: ['Kenya', 'Uganda', 'Nigeria'],
    sector: 'InsurTech',
    subSector: 'Embedded Insurance',
    businessModel: 'B2B2C',
    domain: 'turaco.insure',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/turaco-insure',
      twitter: 'https://twitter.com/turacoinsure',
    },
    revenue: {
      range: '$3M - $8M',
      metricType: 'ARR',
      source: 'Estimated',
      confidenceScore: 50,
    },
    valuation: {
      range: '$20M - $40M',
      type: 'Post-money',
      source: 'Estimated',
      confidenceScore: 50,
    },
    totalFunding: '$12M',
    fundingRounds: [
      { id: '1', round: 'Series A', date: '2022-10', amount: '$10M', investors: ['Zephyr Acorn', 'Mobility 54'], valuation: '$30M' },
    ],
    founders: [
      { id: '1', name: 'Ted Pantone', role: 'CEO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
    ],
    headcount: '50-80',
    hiringStatus: 'Actively Hiring',
    stage: 'Series A',
    trending: true,
  },
  {
    id: '18',
    name: 'Halan',
    slug: 'halan',
    logo: 'https://halan.com/wp-content/uploads/2023/01/halan-logo.svg',
    tagline: 'Financial inclusion for the underbanked',
    description: 'Halan provides consumer lending, payments, and financial services to the underbanked in Egypt.',
    yearFounded: 2017,
    hqCountry: 'Egypt',
    operatingCountries: ['Egypt'],
    sector: 'Fintech',
    subSector: 'Lending',
    businessModel: 'B2C',
    domain: 'halan.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/halan',
      twitter: 'https://twitter.com/halanapp',
    },
    revenue: {
      range: '$50M - $80M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 65,
    },
    valuation: {
      range: '$800M - $1.2B',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 75,
    },
    totalFunding: '$175M',
    fundingRounds: [
      { id: '1', round: 'Series C', date: '2023-09', amount: '$100M', investors: ['Development Finance Corporation'], valuation: '$1B' },
    ],
    founders: [
      { id: '1', name: 'Mounir Nakhla', role: 'CEO', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    ],
    headcount: '500-800',
    hiringStatus: 'Actively Hiring',
    stage: 'Series C+',
    trending: true,
    recentlyFunded: true,
  },
  {
    id: '19',
    name: 'Carry1st',
    slug: 'carry1st',
    logo: 'https://carry1st.com/wp-content/uploads/2023/01/carry1st-logo.svg',
    tagline: 'Mobile gaming publisher for Africa',
    description: 'Carry1st is a mobile games publisher and payments platform helping games monetize in Africa.',
    yearFounded: 2018,
    hqCountry: 'South Africa',
    operatingCountries: ['South Africa', 'Nigeria', 'Kenya', 'Egypt'],
    sector: 'E-commerce',
    subSector: 'Gaming',
    businessModel: 'B2C',
    domain: 'carry1st.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/carry1st',
      twitter: 'https://twitter.com/carry1st',
    },
    revenue: {
      range: '$10M - $20M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 55,
    },
    valuation: {
      range: '$80M - $120M',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 70,
    },
    totalFunding: '$45M',
    fundingRounds: [
      { id: '1', round: 'Series B', date: '2023-05', amount: '$27M', investors: ['a16z', 'Bitkraft'], valuation: '$100M' },
    ],
    founders: [
      { id: '1', name: 'Cordel Robbin-Coker', role: 'CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    ],
    headcount: '80-120',
    hiringStatus: 'Actively Hiring',
    stage: 'Series B',
    trending: true,
  },
  {
    id: '20',
    name: 'JUMO',
    slug: 'jumo',
    logo: 'https://jumo.world/wp-content/uploads/2023/01/jumo-logo.svg',
    tagline: 'AI-powered financial services',
    description: 'JUMO builds AI-powered infrastructure to help financial service providers reach underserved populations.',
    yearFounded: 2014,
    hqCountry: 'South Africa',
    operatingCountries: ['Ghana', 'Kenya', 'Tanzania', 'Zambia', 'Uganda', 'Pakistan'],
    sector: 'Fintech',
    subSector: 'Financial Infrastructure',
    businessModel: 'B2B',
    domain: 'jumo.world',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/jumoworld',
      twitter: 'https://twitter.com/jumoworld',
    },
    revenue: {
      range: '$30M - $60M',
      metricType: 'Net Revenue',
      source: 'Estimated',
      confidenceScore: 60,
    },
    valuation: {
      range: '$400M - $600M',
      type: 'Post-money',
      source: 'Reported',
      confidenceScore: 70,
    },
    totalFunding: '$200M',
    fundingRounds: [
      { id: '1', round: 'Series D', date: '2023-01', amount: '$120M', investors: ['Fidelity', 'Visa'], valuation: '$500M' },
    ],
    founders: [
      { id: '1', name: 'Andrew Watkins-Ball', role: 'CEO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
    ],
    headcount: '400-600',
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
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Rwanda', flag: '🇷🇼' },
  { name: 'Uganda', flag: '🇺🇬' },
  { name: 'Tanzania', flag: '🇹🇿' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Algeria', flag: '🇩🇿' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Tunisia', flag: '🇹🇳' },
  { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { name: 'Cameroon', flag: '🇨🇲' },
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
  {
    id: '4',
    name: 'Tiger Global',
    type: 'VC',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    portfolioCount: 25,
    geographyFocus: ['Nigeria', 'Kenya', 'Egypt'],
    sectorFocus: ['Fintech', 'E-commerce'],
  },
  {
    id: '5',
    name: 'Sequoia',
    type: 'VC',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=200&fit=crop',
    portfolioCount: 15,
    geographyFocus: ['Nigeria', 'Kenya', 'South Africa'],
    sectorFocus: ['Fintech', 'Logistics', 'Cleantech'],
  },
];
