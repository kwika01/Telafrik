import { Country, AfricanRegion } from './types';

export const countriesData: Country[] = [
  // West Africa
  { id: '1', name: 'Nigeria', code: 'NG', region: 'West Africa', flagEmoji: '🇳🇬' },
  { id: '2', name: 'Ghana', code: 'GH', region: 'West Africa', flagEmoji: '🇬🇭' },
  { id: '3', name: 'Senegal', code: 'SN', region: 'West Africa', flagEmoji: '🇸🇳' },
  { id: '4', name: 'Côte d\'Ivoire', code: 'CI', region: 'West Africa', flagEmoji: '🇨🇮' },
  { id: '5', name: 'Mali', code: 'ML', region: 'West Africa', flagEmoji: '🇲🇱' },
  { id: '6', name: 'Burkina Faso', code: 'BF', region: 'West Africa', flagEmoji: '🇧🇫' },
  { id: '7', name: 'Gambia', code: 'GM', region: 'West Africa', flagEmoji: '🇬🇲' },
  
  // East Africa
  { id: '8', name: 'Kenya', code: 'KE', region: 'East Africa', flagEmoji: '🇰🇪' },
  { id: '9', name: 'Uganda', code: 'UG', region: 'East Africa', flagEmoji: '🇺🇬' },
  { id: '10', name: 'Tanzania', code: 'TZ', region: 'East Africa', flagEmoji: '🇹🇿' },
  { id: '11', name: 'Rwanda', code: 'RW', region: 'East Africa', flagEmoji: '🇷🇼' },
  { id: '12', name: 'Ethiopia', code: 'ET', region: 'East Africa', flagEmoji: '🇪🇹' },
  
  // North Africa
  { id: '13', name: 'Egypt', code: 'EG', region: 'North Africa', flagEmoji: '🇪🇬' },
  { id: '14', name: 'Morocco', code: 'MA', region: 'North Africa', flagEmoji: '🇲🇦' },
  { id: '15', name: 'Tunisia', code: 'TN', region: 'North Africa', flagEmoji: '🇹🇳' },
  { id: '16', name: 'Algeria', code: 'DZ', region: 'North Africa', flagEmoji: '🇩🇿' },
  
  // Southern Africa
  { id: '17', name: 'South Africa', code: 'ZA', region: 'Southern Africa', flagEmoji: '🇿🇦' },
  { id: '18', name: 'Zimbabwe', code: 'ZW', region: 'Southern Africa', flagEmoji: '🇿🇼' },
  { id: '19', name: 'Botswana', code: 'BW', region: 'Southern Africa', flagEmoji: '🇧🇼' },
  { id: '20', name: 'Namibia', code: 'NA', region: 'Southern Africa', flagEmoji: '🇳🇦' },
  { id: '21', name: 'Zambia', code: 'ZM', region: 'Southern Africa', flagEmoji: '🇿🇲' },
  
  // Central Africa
  { id: '22', name: 'Cameroon', code: 'CM', region: 'Central Africa', flagEmoji: '🇨🇲' },
  { id: '23', name: 'Democratic Republic of Congo', code: 'CD', region: 'Central Africa', flagEmoji: '🇨🇩' },
  { id: '24', name: 'Congo', code: 'CG', region: 'Central Africa', flagEmoji: '🇨🇬' },
];

export const regions: AfricanRegion[] = [
  'West Africa',
  'East Africa',
  'North Africa',
  'Central Africa',
  'Southern Africa',
];

export const getCountryByCode = (code: string): Country | undefined => {
  return countriesData.find(c => c.code === code);
};

export const getCountriesByRegion = (region: AfricanRegion): Country[] => {
  return countriesData.filter(c => c.region === region);
};
