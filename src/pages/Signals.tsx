import { Activity } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

const Signals = () => (
  <ComingSoon
    title="TelAfrik Signals"
    description="Track momentum indicators, growth signals, and market trends across the African startup ecosystem in real-time."
    icon={Activity}
    features={[
      'Momentum scoring based on hiring, news, and web traffic',
      'Customizable alert notifications for your watchlist',
      'Historical trend analysis and growth tracking',
      'AI-powered signal detection for early-stage opportunities',
    ]}
  />
);

export default Signals;
