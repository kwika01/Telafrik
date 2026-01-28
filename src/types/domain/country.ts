/**
 * Country domain type
 */
import type { AfricanRegion } from './common';

export interface Country {
  id: string;
  name: string;
  code: string;
  region: AfricanRegion;
  flagEmoji: string;
}
