import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
import AfricaMapSVG, { COUNTRY_NAMES } from './AfricaMapSVG';
import CountryPanel from './CountryPanel';
import type { Country as CountryType } from '@/types/domain';

interface AfricaExplorerSectionProps {
  countries: CountryType[];
}

// Mock startup counts by country (will be replaced with real data)
const MOCK_STARTUP_COUNTS: Record<string, number> = {
  NG: 890, KE: 520, ZA: 480, EG: 350, GH: 220,
  RW: 85, TZ: 75, ET: 120, SN: 95, CI: 60,
  MA: 180, TN: 90, UG: 110, CM: 45, DZ: 40,
  ZW: 25, BW: 15, ZM: 20, AO: 12, MZ: 18,
  CD: 8, MG: 5, ML: 10, BF: 8, NE: 5,
};

// Mock sector data by country
const MOCK_SECTORS: Record<string, { name: string; count: number }[]> = {
  NG: [
    { name: 'Fintech', count: 245 },
    { name: 'E-commerce', count: 120 },
    { name: 'Healthtech', count: 85 },
    { name: 'Agritech', count: 78 },
  ],
  KE: [
    { name: 'Fintech', count: 145 },
    { name: 'Agritech', count: 95 },
    { name: 'Logistics', count: 70 },
    { name: 'Healthtech', count: 55 },
  ],
  ZA: [
    { name: 'Fintech', count: 130 },
    { name: 'Insurtech', count: 85 },
    { name: 'E-commerce', count: 75 },
    { name: 'Cleantech', count: 60 },
  ],
  EG: [
    { name: 'Fintech', count: 95 },
    { name: 'E-commerce', count: 80 },
    { name: 'Edtech', count: 45 },
    { name: 'Logistics', count: 40 },
  ],
  GH: [
    { name: 'Fintech', count: 65 },
    { name: 'Agritech', count: 45 },
    { name: 'E-commerce', count: 35 },
    { name: 'Healthtech', count: 25 },
  ],
};

// Mock trending startups by country
const MOCK_TRENDING: Record<string, { id: string; name: string; sector: string }[]> = {
  NG: [
    { id: 'flutterwave', name: 'Flutterwave', sector: 'Fintech' },
    { id: 'paystack', name: 'Paystack', sector: 'Fintech' },
    { id: 'andela', name: 'Andela', sector: 'HR Tech' },
    { id: 'jumia', name: 'Jumia', sector: 'E-commerce' },
    { id: 'kobo360', name: 'Kobo360', sector: 'Logistics' },
  ],
  KE: [
    { id: 'mpesa', name: 'M-Pesa', sector: 'Fintech' },
    { id: 'twiga', name: 'Twiga Foods', sector: 'Agritech' },
    { id: 'sendy', name: 'Sendy', sector: 'Logistics' },
    { id: 'cellulant', name: 'Cellulant', sector: 'Fintech' },
  ],
  ZA: [
    { id: 'yoco', name: 'Yoco', sector: 'Fintech' },
    { id: 'takealot', name: 'Takealot', sector: 'E-commerce' },
    { id: 'discovery', name: 'Discovery Insure', sector: 'Insurtech' },
  ],
  EG: [
    { id: 'swvl', name: 'Swvl', sector: 'Transport' },
    { id: 'fawry', name: 'Fawry', sector: 'Fintech' },
    { id: 'maxab', name: 'MaxAB', sector: 'E-commerce' },
  ],
  GH: [
    { id: 'expresspay', name: 'ExpressPay', sector: 'Fintech' },
    { id: 'farmerline', name: 'Farmerline', sector: 'Agritech' },
    { id: 'complete-farmer', name: 'Complete Farmer', sector: 'Agritech' },
  ],
};

const AfricaExplorerSection = ({ countries }: AfricaExplorerSectionProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Get country info from the countries data
  const selectedCountryInfo = useMemo(() => {
    if (!selectedCountry) return null;
    const country = countries.find(c => c.code === selectedCountry);
    return {
      code: selectedCountry,
      name: country?.name || COUNTRY_NAMES[selectedCountry] || selectedCountry,
      flagEmoji: country?.flagEmoji || '🌍',
      startupCount: MOCK_STARTUP_COUNTS[selectedCountry] || 0,
      topSectors: MOCK_SECTORS[selectedCountry] || [],
      trendingStartups: MOCK_TRENDING[selectedCountry] || [],
    };
  }, [selectedCountry, countries]);

  // Get hovered country name for tooltip
  const hoveredCountryName = useMemo(() => {
    if (!hoveredCountry) return null;
    const country = countries.find(c => c.code === hoveredCountry);
    return country?.name || COUNTRY_NAMES[hoveredCountry] || hoveredCountry;
  }, [hoveredCountry, countries]);

  const handleCountryClick = (code: string) => {
    setSelectedCountry(selectedCountry === code ? null : code);
  };

  const handleClosePanel = () => {
    setSelectedCountry(null);
  };

  return (
    <section className="section bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-emerald" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald">
              Explore by Region
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Africa's Startup Ecosystems
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Click on any country to discover its startup landscape, top sectors, and trending companies.
          </p>
        </motion.div>

        {/* Map and Panel Container */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Hover tooltip */}
            {hoveredCountry && !selectedCountry && hoveredCountryName && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-card border border-border rounded-lg px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span className="font-medium text-foreground">{hoveredCountryName}</span>
                  <span className="text-sm text-muted-foreground">
                    {MOCK_STARTUP_COUNTS[hoveredCountry] || 0} startups
                  </span>
                </div>
              </motion.div>
            )}

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <AfricaMapSVG
                hoveredCountry={hoveredCountry}
                selectedCountry={selectedCountry}
                onCountryHover={setHoveredCountry}
                onCountryClick={handleCountryClick}
                className="max-w-md mx-auto lg:max-w-full"
              />
            </div>

            {/* Map legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted border border-border" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gold/60 border border-gold" />
                <span>Hover</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald border border-emerald" />
                <span>Selected</span>
              </div>
            </div>
          </motion.div>

          {/* Panel */}
          <div className="lg:col-span-2">
            {selectedCountryInfo ? (
              <CountryPanel
                countryCode={selectedCountryInfo.code}
                countryName={selectedCountryInfo.name}
                flagEmoji={selectedCountryInfo.flagEmoji}
                startupCount={selectedCountryInfo.startupCount}
                topSectors={selectedCountryInfo.topSectors}
                trendingStartups={selectedCountryInfo.trendingStartups}
                onClose={handleClosePanel}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Select a Country
                </h3>
                <p className="text-muted-foreground text-sm">
                  Click on any country on the map to view its startup ecosystem details.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AfricaExplorerSection;
