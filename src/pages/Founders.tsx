import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Users,
  Building2,
  Linkedin,
  Twitter,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';

// Mock founders data
const founders = [
  {
    id: '1',
    name: 'Olugbenga Agboola',
    slug: 'olugbenga-agboola',
    title: 'CEO & Co-founder',
    company: 'Flutterwave',
    companySlug: 'flutterwave',
    location: 'San Francisco / Lagos',
    bio: 'Building Africa\'s payments infrastructure. Forbes 30 Under 30.',
    avatar: null,
    linkedin: 'https://linkedin.com/in/ikiagboola',
    twitter: 'https://twitter.com/gbaboroffice',
  },
  {
    id: '2',
    name: 'Jeremy Johnson',
    slug: 'jeremy-johnson',
    title: 'CEO & Co-founder',
    company: 'Andela',
    companySlug: 'andela',
    location: 'New York / Lagos',
    bio: 'Building a global network of tech talent from Africa.',
    avatar: null,
    linkedin: 'https://linkedin.com/in/jeremyj',
    twitter: 'https://twitter.com/jeremyj',
  },
  {
    id: '3',
    name: 'Emmanuel Okeke',
    slug: 'emmanuel-okeke',
    title: 'CEO & Founder',
    company: 'SeamlessHR',
    companySlug: 'seamlesshr',
    location: 'Lagos, Nigeria',
    bio: 'Transforming HR management across Africa.',
    avatar: null,
    linkedin: 'https://linkedin.com/in/emmanuelokeke',
    twitter: null,
  },
  {
    id: '4',
    name: 'Shola Akinlade',
    slug: 'shola-akinlade',
    title: 'CEO & Co-founder',
    company: 'Paystack',
    companySlug: 'paystack',
    location: 'Lagos, Nigeria',
    bio: 'Acquired by Stripe for $200M+. Payments pioneer.',
    avatar: null,
    linkedin: 'https://linkedin.com/in/shola',
    twitter: 'https://twitter.com/shlobooko',
  },
  {
    id: '5',
    name: 'Hiruy Amanuel',
    slug: 'hiruy-amanuel',
    title: 'CEO & Co-founder',
    company: 'Gebeya',
    companySlug: 'gebeya',
    location: 'Addis Ababa, Ethiopia',
    bio: 'Building Africa\'s talent marketplace.',
    avatar: null,
    linkedin: 'https://linkedin.com/in/hiruy',
    twitter: null,
  },
  {
    id: '6',
    name: 'Wiza Jalakasi',
    slug: 'wiza-jalakasi',
    title: 'CEO & Founder',
    company: 'Workpay',
    companySlug: 'workpay',
    location: 'Nairobi, Kenya',
    bio: 'Simplifying payroll and HR across Africa.',
    avatar: null,
    linkedin: 'https://linkedin.com/in/wiza',
    twitter: 'https://twitter.com/wizaj',
  },
];

const Founders = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFounders = founders.filter((founder) =>
    founder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    founder.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Founders</h1>
            <p className="text-muted-foreground mt-1">
              Profiles of African startup founders and executives
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {founders.length} founders tracked
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search founders or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFounders.map((founder) => (
            <div key={founder.id} className="data-card group">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Users className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{founder.title}</p>
                  <Link 
                    to={`/startup/${founder.companySlug}`}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                  >
                    <Building2 className="h-3 w-3" />
                    {founder.company}
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {founder.location}
              </div>

              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {founder.bio}
              </p>

              <div className="mt-4 flex items-center gap-2">
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {founder.twitter && (
                  <a
                    href={founder.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredFounders.length === 0 && (
          <div className="empty-state data-card py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No founders found</h3>
            <p className="text-muted-foreground">Try adjusting your search</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Founders;
