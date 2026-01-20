import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { sectors, countries, stages } from '@/lib/mockData';

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  sectors: string[];
  countries: string[];
  stages: string[];
  fundingMin: string;
  fundingMax: string;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>({
    sectors: [],
    countries: [],
    stages: [],
    fundingMin: '',
    fundingMax: '',
  });

  const [openSections, setOpenSections] = useState({
    sectors: true,
    countries: true,
    stages: true,
    funding: false,
  });

  const toggleFilter = (category: keyof Pick<FilterState, 'sectors' | 'countries' | 'stages'>, value: string) => {
    const newFilters = {
      ...filters,
      [category]: filters[category].includes(value)
        ? filters[category].filter((v) => v !== value)
        : [...filters[category], value],
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      sectors: [],
      countries: [],
      stages: [],
      fundingMin: '',
      fundingMax: '',
    };
    setFilters(emptyFilters);
    onFilterChange?.(emptyFilters);
  };

  const activeFilterCount = 
    filters.sectors.length + 
    filters.countries.length + 
    filters.stages.length + 
    (filters.fundingMin ? 1 : 0) + 
    (filters.fundingMax ? 1 : 0);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground h-8"
          >
            <X className="h-3 w-3 mr-1" />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Sectors */}
        <Collapsible
          open={openSections.sectors}
          onOpenChange={(open) => setOpenSections({ ...openSections, sectors: open })}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sector
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.sectors ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {sectors.slice(0, 8).map((sector) => (
              <label key={sector} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.sectors.includes(sector)}
                  onCheckedChange={() => toggleFilter('sectors', sector)}
                />
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {sector}
                </span>
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Countries */}
        <Collapsible
          open={openSections.countries}
          onOpenChange={(open) => setOpenSections({ ...openSections, countries: open })}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Country
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.countries ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {countries.map((country) => (
              <label key={country.name} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.countries.includes(country.name)}
                  onCheckedChange={() => toggleFilter('countries', country.name)}
                />
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {country.flag} {country.name}
                </span>
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Stages */}
        <Collapsible
          open={openSections.stages}
          onOpenChange={(open) => setOpenSections({ ...openSections, stages: open })}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Stage
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.stages ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {stages.map((stage) => (
              <label key={stage} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.stages.includes(stage)}
                  onCheckedChange={() => toggleFilter('stages', stage)}
                />
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {stage}
                </span>
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default FilterPanel;
