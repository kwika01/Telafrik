/**
 * Sector domain type
 */

export interface Sector {
  id: string;
  name: string;
  slug: string;
  description: string;
  marketOverview: string;
  icon: string;
  startupCount?: number;
}
