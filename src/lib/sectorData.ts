import { Sector } from './types';

export const sectorsData: Sector[] = [
  {
    id: '1',
    name: 'Fintech',
    slug: 'fintech',
    description: 'Financial technology companies transforming banking, payments, lending, and insurance across Africa.',
    marketOverview: 'African fintech is the continent\'s most funded sector, with over $3.5B raised in 2022 alone. Key subsectors include mobile money, payments infrastructure, digital banking, lending, and insurance. Nigeria, Kenya, Egypt, and South Africa lead the ecosystem, with companies like Flutterwave, Wave, and Moniepoint achieving unicorn status.',
    icon: 'Wallet',
    startupCount: 450,
  },
  {
    id: '2',
    name: 'HR Tech',
    slug: 'hr-tech',
    description: 'Human resources technology platforms for talent acquisition, management, and workforce solutions.',
    marketOverview: 'Africa\'s HR tech sector addresses the continent\'s young, growing workforce. Companies like Andela have pioneered remote talent placement, while platforms for payroll, benefits, and workforce management are rapidly growing. The sector benefits from Africa\'s 60% youth population and increasing digital adoption.',
    icon: 'Users',
    startupCount: 85,
  },
  {
    id: '3',
    name: 'Healthtech',
    slug: 'healthtech',
    description: 'Healthcare technology solutions including telemedicine, health records, diagnostics, and pharma.',
    marketOverview: 'African healthtech is addressing critical gaps in healthcare access. With only 1 doctor per 5,000 people in many regions, telemedicine and digital diagnostics are transforming care delivery. Key players focus on telemedicine, pharmacy delivery, health insurance, and maternal care. COVID-19 accelerated adoption significantly.',
    icon: 'Heart',
    startupCount: 120,
  },
  {
    id: '4',
    name: 'Agritech',
    slug: 'agritech',
    description: 'Agricultural technology improving farming productivity, supply chains, and market access.',
    marketOverview: 'With 60% of the world\'s arable land, Africa\'s agritech sector has massive potential. Startups are addressing challenges in input financing, market access, supply chain logistics, and precision farming. Key markets include Nigeria, Kenya, and Ghana, with focus on smallholder farmers who produce 80% of Africa\'s food.',
    icon: 'Leaf',
    startupCount: 95,
  },
  {
    id: '5',
    name: 'Edtech',
    slug: 'edtech',
    description: 'Education technology platforms for learning, skills development, and educational content.',
    marketOverview: 'Africa\'s edtech sector serves a continent where 40% of the population is under 15. Companies focus on K-12 learning, vocational training, and professional development. Mobile-first solutions dominate, addressing challenges like teacher shortages and curriculum gaps. The sector saw accelerated growth during COVID-19.',
    icon: 'GraduationCap',
    startupCount: 110,
  },
  {
    id: '6',
    name: 'Logistics',
    slug: 'logistics',
    description: 'Logistics and supply chain technology for delivery, freight, and warehousing.',
    marketOverview: 'African logistics startups are solving last-mile delivery and cross-border trade challenges. With e-commerce growing 25% annually, demand for efficient delivery is soaring. Companies focus on first/last-mile delivery, freight forwarding, and warehouse management. Key markets include Nigeria, Kenya, and Egypt.',
    icon: 'Truck',
    startupCount: 75,
  },
  {
    id: '7',
    name: 'E-commerce',
    slug: 'e-commerce',
    description: 'Online retail platforms, marketplaces, and commerce enablement solutions.',
    marketOverview: 'African e-commerce is projected to reach $75B by 2025. While Jumia pioneered the space, newer players focus on social commerce, B2B trade, and vertical marketplaces. Payment challenges and logistics remain key hurdles, driving integration with fintech and logistics startups.',
    icon: 'ShoppingBag',
    startupCount: 130,
  },
  {
    id: '8',
    name: 'Cleantech',
    slug: 'cleantech',
    description: 'Clean technology for renewable energy, sustainability, and environmental solutions.',
    marketOverview: 'With 600M Africans lacking electricity access, cleantech addresses a critical need. Solar home systems, mini-grids, and clean cooking solutions dominate. Companies like M-KOPA and d.light have scaled across multiple markets. The sector attracts significant development finance and impact investment.',
    icon: 'Leaf',
    startupCount: 65,
  },
  {
    id: '9',
    name: 'PropTech',
    slug: 'proptech',
    description: 'Property technology for real estate listings, transactions, and property management.',
    marketOverview: 'African proptech addresses a fragmented real estate market with limited transparency. Startups focus on property listings, mortgage origination, and property management. The sector is growing as urban populations expand and middle-class demand for housing increases.',
    icon: 'Building',
    startupCount: 45,
  },
  {
    id: '10',
    name: 'InsurTech',
    slug: 'insurtech',
    description: 'Insurance technology for distribution, underwriting, and claims processing.',
    marketOverview: 'With insurance penetration below 3% in most African countries, insurtech has significant growth potential. Companies focus on microinsurance, health coverage, and agricultural insurance. Mobile distribution and parametric products are key innovations enabling scale.',
    icon: 'Shield',
    startupCount: 40,
  },
];

export const getSectorBySlug = (slug: string): Sector | undefined => {
  return sectorsData.find(s => s.slug === slug);
};

export const getSectorById = (id: string): Sector | undefined => {
  return sectorsData.find(s => s.id === id);
};
