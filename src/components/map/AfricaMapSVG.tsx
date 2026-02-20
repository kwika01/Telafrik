import { memo } from 'react';
import { cn } from '@/lib/utils';

interface AfricaMapSVGProps {
  hoveredCountry: string | null;
  selectedCountry: string | null;
  onCountryHover: (code: string | null) => void;
  onCountryClick: (code: string) => void;
  className?: string;
  /** Live startup counts by country code from Supabase */
  startupCounts?: Map<string, number>;
}

/** Returns an emerald shade based on startup count for choropleth */
function getCountryFill(count: number): string {
  if (count === 0) return 'hsl(220, 13%, 93%)';
  if (count < 10) return 'hsl(158, 60%, 88%)';
  if (count < 30) return 'hsl(158, 70%, 75%)';
  if (count < 60) return 'hsl(158, 75%, 60%)';
  if (count < 100) return 'hsl(158, 80%, 48%)';
  return 'hsl(158, 94%, 35%)'; // 100+ startups - darkest emerald
}

// Simplified Africa map paths with ISO country codes
// Paths are approximate representations for visual purposes
const COUNTRY_PATHS: Record<string, string> = {
  // North Africa
  MA: 'M165,95 L180,80 L210,85 L215,105 L200,120 L170,115 Z', // Morocco
  DZ: 'M215,85 L280,75 L310,95 L300,150 L240,160 L200,120 L215,105 Z', // Algeria
  TN: 'M280,75 L295,70 L305,85 L300,105 L285,100 Z', // Tunisia
  LY: 'M300,95 L360,85 L380,130 L370,180 L310,175 L300,150 Z', // Libya
  EG: 'M360,85 L400,80 L410,130 L390,175 L370,180 L380,130 Z', // Egypt
  
  // West Africa
  MR: 'M140,145 L180,135 L200,160 L190,195 L150,200 L130,175 Z', // Mauritania
  ML: 'M180,160 L240,160 L250,200 L220,230 L180,220 L190,195 Z', // Mali
  SN: 'M120,200 L150,200 L155,215 L135,225 L115,215 Z', // Senegal
  GM: 'M120,215 L140,215 L140,222 L120,222 Z', // Gambia
  GW: 'M115,225 L130,225 L130,240 L115,240 Z', // Guinea-Bissau
  GN: 'M130,225 L160,220 L170,245 L145,260 L125,250 Z', // Guinea
  SL: 'M125,260 L145,260 L145,280 L125,280 Z', // Sierra Leone
  LR: 'M145,275 L170,270 L175,295 L150,300 Z', // Liberia
  CI: 'M170,250 L200,245 L210,290 L175,295 Z', // Côte d'Ivoire
  BF: 'M200,220 L240,215 L250,245 L220,255 L200,245 Z', // Burkina Faso
  GH: 'M210,255 L235,250 L240,295 L215,300 Z', // Ghana
  TG: 'M240,260 L250,260 L252,300 L242,300 Z', // Togo
  BJ: 'M252,255 L265,255 L268,300 L255,300 Z', // Benin
  NE: 'M250,175 L320,170 L340,210 L300,235 L260,220 Z', // Niger
  NG: 'M265,245 L320,235 L340,280 L310,310 L270,305 Z', // Nigeria
  
  // Central Africa
  TD: 'M320,175 L380,180 L375,240 L340,260 L320,235 Z', // Chad
  CM: 'M320,260 L355,255 L365,310 L330,330 L310,310 Z', // Cameroon
  CF: 'M355,260 L410,265 L405,305 L365,310 Z', // Central African Republic
  GQ: 'M305,325 L320,325 L320,340 L305,340 Z', // Equatorial Guinea
  GA: 'M305,340 L335,335 L340,375 L310,380 Z', // Gabon
  CG: 'M335,345 L365,340 L370,395 L340,400 L340,375 Z', // Congo
  CD: 'M365,310 L430,315 L450,400 L400,440 L350,420 L340,375 L365,340 Z', // DR Congo
  
  // East Africa
  SD: 'M370,175 L420,170 L440,230 L400,270 L375,240 Z', // Sudan
  SS: 'M400,265 L440,260 L445,310 L405,315 Z', // South Sudan
  ET: 'M420,230 L480,220 L490,280 L445,295 L440,260 Z', // Ethiopia
  ER: 'M440,200 L475,195 L480,220 L450,225 Z', // Eritrea
  DJ: 'M485,240 L498,238 L500,255 L488,258 Z', // Djibouti
  SO: 'M490,255 L520,230 L530,320 L495,340 L485,290 Z', // Somalia
  KE: 'M445,310 L490,300 L500,370 L465,385 L445,350 Z', // Kenya
  UG: 'M420,320 L450,315 L455,360 L425,365 Z', // Uganda
  RW: 'M418,365 L435,362 L438,380 L420,382 Z', // Rwanda
  BI: 'M420,385 L438,382 L440,400 L422,402 Z', // Burundi
  TZ: 'M440,365 L500,370 L495,450 L435,445 Z', // Tanzania
  
  // Southern Africa
  AO: 'M310,400 L370,395 L385,480 L330,495 L305,450 Z', // Angola
  ZM: 'M370,420 L435,415 L445,475 L385,485 Z', // Zambia
  MW: 'M445,420 L460,418 L465,480 L450,485 Z', // Malawi
  MZ: 'M460,435 L495,420 L510,530 L470,545 L455,490 Z', // Mozambique
  ZW: 'M400,485 L450,480 L455,525 L405,530 Z', // Zimbabwe
  BW: 'M370,500 L420,495 L430,560 L380,570 Z', // Botswana
  NA: 'M320,510 L375,500 L385,590 L340,610 L310,560 Z', // Namibia
  ZA: 'M355,575 L450,560 L480,630 L400,660 L350,630 Z', // South Africa
  LS: 'M420,610 L445,605 L448,630 L423,633 Z', // Lesotho
  SZ: 'M460,585 L475,582 L478,600 L463,603 Z', // Eswatini
  MG: 'M520,480 L560,470 L575,580 L535,600 L515,540 Z', // Madagascar
};

// Country names for accessibility
const COUNTRY_NAMES: Record<string, string> = {
  MA: 'Morocco', DZ: 'Algeria', TN: 'Tunisia', LY: 'Libya', EG: 'Egypt',
  MR: 'Mauritania', ML: 'Mali', SN: 'Senegal', GM: 'Gambia', GW: 'Guinea-Bissau',
  GN: 'Guinea', SL: 'Sierra Leone', LR: 'Liberia', CI: "Côte d'Ivoire", BF: 'Burkina Faso',
  GH: 'Ghana', TG: 'Togo', BJ: 'Benin', NE: 'Niger', NG: 'Nigeria',
  TD: 'Chad', CM: 'Cameroon', CF: 'Central African Republic', GQ: 'Equatorial Guinea',
  GA: 'Gabon', CG: 'Congo', CD: 'DR Congo', SD: 'Sudan', SS: 'South Sudan',
  ET: 'Ethiopia', ER: 'Eritrea', DJ: 'Djibouti', SO: 'Somalia', KE: 'Kenya',
  UG: 'Uganda', RW: 'Rwanda', BI: 'Burundi', TZ: 'Tanzania', AO: 'Angola',
  ZM: 'Zambia', MW: 'Malawi', MZ: 'Mozambique', ZW: 'Zimbabwe', BW: 'Botswana',
  NA: 'Namibia', ZA: 'South Africa', LS: 'Lesotho', SZ: 'Eswatini', MG: 'Madagascar',
};

// Key countries for labeling (major startup hubs)
const KEY_COUNTRIES = [
  { code: 'NG', label: 'Nigeria', x: 285, y: 280 },
  { code: 'ZA', label: 'South Africa', x: 405, y: 605 },
  { code: 'KE', label: 'Kenya', x: 475, y: 340 },
  { code: 'EG', label: 'Egypt', x: 385, y: 115 },
];

const AfricaMapSVG = memo(({
  hoveredCountry,
  selectedCountry,
  onCountryHover,
  onCountryClick,
  className,
  startupCounts = new Map(),
}: AfricaMapSVGProps) => {
  return (
    <svg
      viewBox="100 60 500 620"
      className={cn('w-full h-auto select-none', className)}
      role="img"
      aria-label="Interactive map of Africa"
    >
      {/* Defs for effects */}
      <defs>
        {/* Subtle backdrop gradient for warmth */}
        <radialGradient id="map-backdrop" cx="50%" cy="40%">
          <stop offset="0%" stopColor="hsl(158, 94%, 30%)" stopOpacity="0.03" />
          <stop offset="50%" stopColor="hsl(43, 74%, 52%)" stopOpacity="0.02" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        
        {/* Subtle inner shadow for depth */}
        <filter id="country-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.1" />
        </filter>
        
        {/* Glow effect for selected - stronger emerald */}
        <filter id="selected-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="hsl(158, 94%, 30%)" floodOpacity="0.6" />
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
        </filter>
        
        {/* Hover glow - brighter gold */}
        <filter id="hover-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="hsl(43, 74%, 52%)" floodOpacity="0.5" />
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Subtle tinted backdrop */}
      <rect x="100" y="60" width="500" height="620" fill="url(#map-backdrop)" />
      
      {/* Country paths - render in three passes for proper layering */}
      {/* First pass: non-selected, non-hovered countries */}
      {Object.entries(COUNTRY_PATHS).map(([code, path]) => {
        const isHovered = hoveredCountry === code;
        const isSelected = selectedCountry === code;
        const count = startupCounts.get(code) ?? 0;
        const fill = getCountryFill(count);
        
        if (isHovered || isSelected) return null;
        
        return (
          <path
            key={code}
            d={path}
            fill={fill}
            stroke="hsl(220, 13%, 80%)"
            strokeWidth="1.2"
            className="cursor-pointer transition-all duration-200 ease-out"
            style={{ 
              filter: 'url(#country-shadow)',
              transformOrigin: 'center',
            }}
            onMouseEnter={() => onCountryHover(code)}
            onMouseLeave={() => onCountryHover(null)}
            onClick={() => onCountryClick(code)}
            role="button"
            aria-label={`${COUNTRY_NAMES[code] || code}${count > 0 ? ` (${count} startups)` : ''}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onCountryClick(code);
              }
            }}
          />
        );
      })}
      
      {/* Second pass: hovered country (on top) */}
      {hoveredCountry && !selectedCountry && COUNTRY_PATHS[hoveredCountry] && (
        <path
          d={COUNTRY_PATHS[hoveredCountry]}
          fill="hsl(43, 74%, 68%)"
          stroke="hsl(43, 74%, 38%)"
          strokeWidth="3"
          className="cursor-pointer"
          style={{ 
            filter: 'url(#hover-glow)',
            transformOrigin: 'center',
            transform: 'scale(1.008)',
            transition: 'all 150ms ease-out',
          }}
          onMouseEnter={() => onCountryHover(hoveredCountry)}
          onMouseLeave={() => onCountryHover(null)}
          onClick={() => onCountryClick(hoveredCountry)}
          role="button"
          aria-label={COUNTRY_NAMES[hoveredCountry] || hoveredCountry}
        />
      )}
      
      {/* Third pass: selected country (topmost) */}
      {selectedCountry && COUNTRY_PATHS[selectedCountry] && (
        <path
          d={COUNTRY_PATHS[selectedCountry]}
          fill="hsl(158, 94%, 38%)"
          stroke="hsl(158, 94%, 26%)"
          strokeWidth="3.5"
          className="cursor-pointer"
          style={{ 
            filter: 'url(#selected-glow) drop-shadow(0 3px 6px hsl(158 94% 30% / 0.2))',
            transformOrigin: 'center',
            transform: 'scale(1.015)',
            transition: 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          onMouseEnter={() => onCountryHover(selectedCountry)}
          onMouseLeave={() => onCountryHover(null)}
          onClick={() => onCountryClick(selectedCountry)}
          role="button"
          aria-label={COUNTRY_NAMES[selectedCountry] || selectedCountry}
        />
      )}
      
      {/* Key country labels - only show when no interaction */}
      {!hoveredCountry && !selectedCountry && (
        <g className="pointer-events-none">
          {KEY_COUNTRIES.map(({ code, label, x, y }) => (
            <g key={code}>
              {/* Label background */}
              <rect
                x={x - label.length * 2.5}
                y={y - 8}
                width={label.length * 5}
                height={14}
                rx="3"
                fill="hsl(var(--background))"
                fillOpacity="0.85"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
              />
              {/* Label text */}
              <text
                x={x}
                y={y + 2}
                textAnchor="middle"
                fontSize="9"
                fontWeight="500"
                fill="hsl(var(--muted-foreground))"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {label}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
});

AfricaMapSVG.displayName = 'AfricaMapSVG';

export default AfricaMapSVG;
export { COUNTRY_NAMES };
