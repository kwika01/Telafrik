import AddCompanyModal from './AddCompanyModal';
import AddDealModal from './AddDealModal';
import AddSectorModal from './AddSectorModal';
import { Zap } from 'lucide-react';

interface QuickActionsProps {
  onDataChange?: () => void;
}

const QuickActions = ({ onDataChange }: QuickActionsProps) => {
  return (
    <div className="data-card">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="font-semibold text-foreground">Quick Actions</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Add new data to the platform
      </p>
      <div className="flex flex-wrap gap-2">
        <AddCompanyModal onSuccess={onDataChange} />
        <AddDealModal onSuccess={onDataChange} />
        <AddSectorModal onSuccess={onDataChange} />
      </div>
    </div>
  );
};

export default QuickActions;
