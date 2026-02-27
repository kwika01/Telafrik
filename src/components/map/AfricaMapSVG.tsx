/**
 * AfricaMapSVG — powered by react-simple-maps + world-atlas TopoJSON
 * Renders a geographically accurate choropleth map of Africa.
 */
import { memo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

// World Atlas 110m resolution — filtered to Africa on render
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO 3166-1 numeric → alpha-2 mapping (subset: African countries only)
const NUMERIC_TO_ALPHA2: Record<string, string> = {
  '012': 'DZ', '024': 'AO', '204': 'BJ', '072': 'BW', '854': 'BF',
  '108': 'BI', '132': 'CV', '120': 'CM', '140': 'CF', '148': 'TD',
  '174': 'KM', '178': 'CG', '180': 'CD', '384': 'CI', '262': 'DJ',
  '818': 'EG', '232': 'ER', '231': 'ET', '266': 'GA', '288': 'GH',
  '324': 'GN', '624': 'GW', '404': 'KE', '426': 'LS', '430': 'LR',
  '434': 'LY', '450': 'MG', '454': 'MW', '466': 'ML', '478': 'MR',
  '480': 'MU', '504': 'MA', '508': 'MZ', '516': 'NA', '562': 'NE',
  '566': 'NG', '646': 'RW', '678': 'ST', '686': 'SN', '694': 'SL',
  '706': 'SO', '710': 'ZA', '728': 'SS', '729': 'SD', '748': 'SZ',
  '834': 'TZ', '768': 'TG', '788': 'TN', '800': 'UG', '732': 'EH',
  '894': 'ZM', '716': 'ZW',
  // Equatorial Guinea
  '226': 'GQ',
  // Gambia
  '270': 'GM',
};

// African country numeric codes set for filtering
const AFRICA_NUMERIC = new Set(Object.keys(NUMERIC_TO_ALPHA2));

export const COUNTRY_NAMES: Record<string, string> = {
  DZ: 'Algeria', AO: 'Angola', BJ: 'Benin', BW: 'Botswana', BF: 'Burkina Faso',
  BI: 'Burundi', CV: 'Cabo Verde', CM: 'Cameroon', CF: 'Central African Republic',
  TD: 'Chad', KM: 'Comoros', CG: 'Congo', CD: 'DR Congo', CI: "Côte d'Ivoire",
  DJ: 'Djibouti', EG: 'Egypt', ER: 'Eritrea', ET: 'Ethiopia', GA: 'Gabon',
  GM: 'Gambia', GH: 'Ghana', GN: 'Guinea', GW: 'Guinea-Bissau', GQ: 'Equatorial Guinea',
  KE: 'Kenya', LS: 'Lesotho', LR: 'Liberia', LY: 'Libya', MG: 'Madagascar',
  MW: 'Malawi', ML: 'Mali', MR: 'Mauritania', MU: 'Mauritius', MA: 'Morocco',
  MZ: 'Mozambique', NA: 'Namibia', NE: 'Niger', NG: 'Nigeria', RW: 'Rwanda',
  ST: 'São Tomé & Príncipe', SN: 'Senegal', SL: 'Sierra Leone', SO: 'Somalia',
  ZA: 'South Africa', SS: 'South Sudan', SD: 'Sudan', SZ: 'Eswatini',
  TZ: 'Tanzania', TG: 'Togo', TN: 'Tunisia', UG: 'Uganda', ZM: 'Zambia',
  ZW: 'Zimbabwe',
};

/** Returns a choropleth fill based on startup count */
function getCountryFill(code: string, count: number, isHovered: boolean, isSelected: boolean): string {
  if (isSelected) return 'hsl(158, 90%, 38%)';
  if (isHovered) return 'hsl(43, 85%, 62%)';
  if (count === 0) return 'hsl(220, 15%, 88%)';
  if (count < 5)   return 'hsl(158, 55%, 82%)';
  if (count < 20)  return 'hsl(158, 65%, 68%)';
  if (count < 50)  return 'hsl(158, 72%, 54%)';
  if (count < 100) return 'hsl(158, 80%, 44%)';
  if (count < 200) return 'hsl(158, 88%, 36%)';
  return 'hsl(158, 95%, 28%)'; // 200+ — darkest
}

function getStrokeColor(isHovered: boolean, isSelected: boolean): string {
  if (isSelected) return 'hsl(158, 90%, 22%)';
  if (isHovered)  return 'hsl(43, 80%, 40%)';
  return 'hsl(220, 15%, 75%)';
}

interface AfricaMapSVGProps {
  hoveredCountry: string | null;
  selectedCountry: string | null;
  onCountryHover: (code: string | null) => void;
  onCountryClick: (code: string) => void;
  className?: string;
  startupCounts?: Map<string, number>;
}

const AfricaMapSVG = memo(({
  hoveredCountry,
  selectedCountry,
  onCountryHover,
  onCountryClick,
  className,
  startupCounts = new Map(),
}: AfricaMapSVGProps) => {
  const [loadError, setLoadError] = useState(false);

  return (
    <div className={className}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 340,
          center: [20, 2],
        }}
        width={700}
        height={720}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies
          geography={GEO_URL}
          onError={() => setLoadError(true)}
        >
          {({ geographies }) =>
            geographies
              .filter((geo) => AFRICA_NUMERIC.has(geo.id))
              .map((geo) => {
                const code = NUMERIC_TO_ALPHA2[geo.id] || geo.id;
                const count = startupCounts.get(code) ?? 0;
                const isHovered  = hoveredCountry  === code;
                const isSelected = selectedCountry === code;
                const fill   = getCountryFill(code, count, isHovered, isSelected);
                const stroke = getStrokeColor(isHovered, isSelected);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isHovered || isSelected ? 1.5 : 0.6}
                    style={{
                      default: { outline: 'none', cursor: 'pointer', transition: 'fill 150ms ease' },
                      hover:   { outline: 'none', cursor: 'pointer' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => onCountryHover(code)}
                    onMouseLeave={() => onCountryHover(null)}
                    onClick={() => onCountryClick(code)}
                    role="button"
                    aria-label={`${COUNTRY_NAMES[code] || code}${count > 0 ? ` (${count} startups)` : ''}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onCountryClick(code);
                    }}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>

      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-400 text-sm">Map unavailable — check your connection</p>
        </div>
      )}
    </div>
  );
});

AfricaMapSVG.displayName = 'AfricaMapSVG';

export default AfricaMapSVG;
