import { FileText } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

const Reports = () => (
  <ComingSoon
    title="TelAfrik Insights"
    description="In-depth research reports and market analysis on African startup ecosystems, sectors, and investment trends."
    icon={FileText}
    features={[
      'Quarterly funding landscape reports across Africa',
      'Sector deep-dives: Fintech, Healthtech, Agritech & more',
      'Country ecosystem profiles and market sizing',
      'Downloadable PDF reports and data exports',
    ]}
  />
);

export default Reports;
