import { Handshake } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

const Konekt = () => (
  <ComingSoon
    title="KonektAfrik"
    description="AI-powered networking platform connecting founders, investors, and ecosystem players across 54 African countries."
    icon={Handshake}
    features={[
      'AI-powered matching between startups and investors',
      'Warm introduction requests through our network',
      'Curated networking directory by role, sector & country',
      'Deal-flow pipeline management for investors',
    ]}
  />
);

export default Konekt;
