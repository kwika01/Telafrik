/**
 * Founder domain type
 */

export interface Founder {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  avatarUrl: string | null;
  bio: string | null;
  role: string | null;
  isCurrent: boolean;
}
