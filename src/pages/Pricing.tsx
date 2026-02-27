import { CreditCard } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

const Pricing = () => (
  <ComingSoon
    title="Pricing & Plans"
    description="We're finalising our pricing tiers to make sure you get the best value. TelAfrik will offer free, pro, and enterprise plans to suit every investor and founder."
    icon={CreditCard}
    features={[
      'Free tier with core company intelligence and basic search',
      'Pro plan with full funding history, valuation estimates, and unlimited filters',
      'Enterprise API access, bulk exports, and custom datasets',
      'Special rates for academic institutions and early-stage founders',
    ]}
    backLink="/"
  />
);

export default Pricing;
