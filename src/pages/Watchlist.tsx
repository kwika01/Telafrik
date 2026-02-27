import { Bookmark } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

const Watchlist = () => (
  <ComingSoon
    title="Watchlist"
    description="Build and manage custom watchlists to track the startups and investors that matter most to you."
    icon={Bookmark}
    features={[
      'Create multiple custom watchlists',
      'Real-time notifications on funding rounds and news',
      'Portfolio tracking with valuation changes',
      'Shareable watchlists for team collaboration',
    ]}
  />
);

export default Watchlist;
