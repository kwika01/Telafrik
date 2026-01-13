import AddCompanyModal from './AddCompanyModal';
import AddDealModal from './AddDealModal';
import AddSectorModal from './AddSectorModal';
import AddFounderModal from './AddFounderModal';
import AddInvestorModal from './AddInvestorModal';
import AddCountryModal from './AddCountryModal';
import AddSourceModal from './AddSourceModal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, ChevronDown } from 'lucide-react';

interface QuickActionsProps {
  onDataChange?: () => void;
}

const QuickActions = ({ onDataChange }: QuickActionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Data
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="end">
        <div className="grid gap-2">
          <p className="text-xs text-muted-foreground font-medium px-2 pb-1">
            Add new data to TelAfrik
          </p>
          <div className="flex flex-col gap-1">
            <AddCompanyModal onSuccess={onDataChange} />
            <AddDealModal onSuccess={onDataChange} />
            <AddFounderModal onSuccess={onDataChange} />
            <AddInvestorModal onSuccess={onDataChange} />
            <AddSectorModal onSuccess={onDataChange} />
            <AddCountryModal onSuccess={onDataChange} />
            <AddSourceModal onSuccess={onDataChange} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuickActions;
