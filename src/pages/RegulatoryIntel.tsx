import { Shield } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

const RegulatoryIntel = () => (
  <ComingSoon
    title="Regulatory Intelligence"
    description="Navigate compliance requirements across 54 African countries and 10 tech sectors before expanding to new markets."
    icon={Shield}
    features={[
      'Licensing requirements by country and sector',
      'Regulatory body directory (2,600+ agencies)',
      'Compliance checklist generator',
      'Real-time regulatory change alerts',
    ]}
  />
);

export default RegulatoryIntel;
