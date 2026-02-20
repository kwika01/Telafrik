import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Link } from 'react-router-dom';
import { Shield, FileText, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RegulatoryIntel = () => {
  const regions = [
    { name: 'West Africa', countries: ['Nigeria', 'Ghana', 'Senegal'], count: 16 },
    { name: 'East Africa', countries: ['Kenya', 'Rwanda', 'Tanzania'], count: 14 },
    { name: 'Southern Africa', countries: ['South Africa', 'Botswana'], count: 9 },
    { name: 'North Africa', countries: ['Egypt', 'Morocco'], count: 6 },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-indigo/10 border border-indigo/20">
              <Shield className="h-4 w-4 text-indigo" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Regulatory Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Regulatory Intelligence</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Track regulatory frameworks, compliance requirements, and policy developments across African markets for startups and investors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h2 className="font-bold text-foreground tracking-tight mb-4">Coverage by Region</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region) => (
              <div
                key={region.name}
                className="p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-indigo" />
                  <span className="font-semibold text-foreground">{region.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {region.countries.slice(0, 3).join(', ')} +{region.count - 3} more
                </p>
                <p className="text-xs text-muted-foreground mt-1">{region.count} countries</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h2 className="font-bold text-foreground tracking-tight mb-4">Key Topics</h2>
          <div className="flex flex-wrap gap-3">
            {['Fintech regulation', 'Data protection', 'Tax incentives', 'Company registration', 'Foreign ownership', 'Labor laws', 'Licensing'].map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-full bg-muted/60 border border-border text-sm font-medium text-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-between rounded-xl border border-border bg-surface-alt/60 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo/10 border border-indigo/20">
              <FileText className="h-5 w-5 text-indigo" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Related Reports</h3>
              <p className="text-sm text-muted-foreground">Country and sector reports include regulatory analysis.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/reports">
              View Reports
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default RegulatoryIntel;
