import { Users } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

const Founders = () => (
  <ComingSoon
    title="Founders Directory"
    description="Discover and connect with the founding teams behind Africa's most innovative startups."
    icon={Users}
    features={[
      'Detailed founder profiles and career histories',
      'Filter by sector, country, and company stage',
      'Track serial entrepreneurs across ventures',
      'Direct connection requests via KonektAfrik',
    ]}
  />
);

export default Founders;
