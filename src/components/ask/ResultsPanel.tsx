import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Users, TrendingUp, Bookmark, Download, 
  ExternalLink, MapPin, Layers, Award, Sparkles,
  ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/lib/toast';
import type { StructuredResponse, EntityResult } from '@/hooks/useAskTelAfrik';

interface ResultsPanelProps {
  response: StructuredResponse | null;
  isLoading: boolean;
  onSaveToCollection?: (results: EntityResult[]) => void;
}

const ITEMS_PER_PAGE = 10;

const EntityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'startup':
      return <Building2 className="h-4 w-4" />;
    case 'investor':
      return <Users className="h-4 w-4" />;
    case 'founder':
      return <Users className="h-4 w-4" />;
    case 'funding':
      return <TrendingUp className="h-4 w-4" />;
    default:
      return <Building2 className="h-4 w-4" />;
  }
};

const getEntityLink = (result: EntityResult): string => {
  switch (result.entity_type) {
    case 'startup':
      return `/startup/${result.id}`;
    case 'investor':
      return `/investor/${result.id}`;
    case 'founder':
      return `/founders/${result.id}`;
    case 'funding':
      return `/deals`;
    default:
      return '#';
  }
};

const ResultCard = ({ result, index }: { result: EntityResult; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Logo/Avatar */}
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {result.logo_url ? (
              <img src={result.logo_url} alt={result.name} className="h-full w-full object-cover" />
            ) : (
              <EntityIcon type={result.entity_type} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {result.name}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {result.headline}
                </p>
              </div>
              
              {/* Score Badge */}
              <Badge 
                variant="outline" 
                className={`flex-shrink-0 ${
                  result.score >= 80 ? 'border-emerald-500 text-emerald-600 bg-emerald-500/10' :
                  result.score >= 60 ? 'border-amber-500 text-amber-600 bg-amber-500/10' :
                  'border-muted-foreground'
                }`}
              >
                {result.score}%
              </Badge>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {result.country && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <MapPin className="h-3 w-3" />
                  {result.country}
                </Badge>
              )}
              {result.sector && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <Layers className="h-3 w-3" />
                  {result.sector}
                </Badge>
              )}
              {result.stage && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <Award className="h-3 w-3" />
                  {result.stage}
                </Badge>
              )}
            </div>
          </div>

          {/* Action */}
          <Link to={getEntityLink(result)}>
            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-24 w-full rounded-xl" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 w-16" />
    </div>
    {[1, 2, 3].map(i => (
      <Skeleton key={i} className="h-28 w-full rounded-lg" />
    ))}
  </div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-16 text-center"
  >
    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="font-semibold text-lg mb-2">No results found</h3>
    <p className="text-muted-foreground max-w-sm">
      Try adjusting your search query or expanding your scope. You can also try different keywords or filters.
    </p>
  </motion.div>
);

export const ResultsPanel = ({ response, isLoading, onSaveToCollection }: ResultsPanelProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="h-full p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!response) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-primary/40 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Ready to explore</h3>
          <p className="text-muted-foreground max-w-sm">
            Ask a question about African startups, investors, or funding rounds to see results here.
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(response.results.length / ITEMS_PER_PAGE);
  const paginatedResults = response.results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleExportCSV = () => {
    const headers = ['Name', 'Type', 'Country', 'Sector', 'Stage', 'Score'];
    const rows = response.results.map(r => [
      r.name, r.entity_type, r.country, r.sector, r.stage, r.score
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'telafrik-results.csv';
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Export complete', {
      description: `Exported ${response.results.length} results to CSV`,
    });
  };

  const handleSave = () => {
    if (onSaveToCollection) {
      onSaveToCollection(response.results);
    } else {
      toast.info('Coming soon', {
        description: 'Save to collection feature is being built',
      });
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm text-primary">AI Summary</span>
                    <Badge variant="outline" className="text-xs">
                      {response.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {response.answer_summary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applied Filters */}
        {Object.keys(response.filters_applied).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            <span className="text-sm text-muted-foreground">Filters:</span>
            {Object.entries(response.filters_applied).map(([key, value]) => (
              value && (
                <Badge key={key} variant="secondary" className="text-xs capitalize">
                  {key}: {Array.isArray(value) ? value.join(', ') : value}
                </Badge>
              )
            ))}
          </motion.div>
        )}

        {/* Results Count & Actions */}
        {response.results.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {response.results.length} result{response.results.length !== 1 ? 's' : ''} found
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleSave}>
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        )}

        {/* Results List */}
        <AnimatePresence mode="wait">
          {response.results.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {paginatedResults.map((result, index) => (
                <ResultCard key={result.id} result={result} index={index} />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
