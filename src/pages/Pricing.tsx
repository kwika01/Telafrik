import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Get started with basic access to African company data.',
      cta: 'Start Free',
      ctaVariant: 'outline' as const,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$49',
      period: 'per month',
      description: 'Full access for professionals tracking African markets.',
      cta: 'Upgrade to Pro',
      ctaVariant: 'default' as const,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'API access, bulk exports, and custom solutions for teams.',
      cta: 'Contact Sales',
      ctaVariant: 'outline' as const,
      popular: false,
    },
  ];

  const features = [
    { name: 'Company profiles', free: 'Limited', pro: 'Full', enterprise: 'Full + API' },
    { name: 'Search queries', free: '10/day', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Filters (sector, country, stage)', free: true, pro: true, enterprise: true },
    { name: 'Funding round data', free: 'Last 3 months', pro: 'Full history', enterprise: 'Full history' },
    { name: 'Valuation estimates', free: false, pro: true, enterprise: true },
    { name: 'Revenue estimates', free: false, pro: true, enterprise: true },
    { name: 'Compare companies', free: false, pro: 'Up to 3', enterprise: 'Unlimited' },
    { name: 'Saved lists / Watchlists', free: '1 list', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Export to CSV', free: false, pro: '100/month', enterprise: 'Unlimited' },
    { name: 'API access', free: false, pro: false, enterprise: true },
    { name: 'Custom reports', free: false, pro: false, enterprise: true },
    { name: 'Team accounts', free: false, pro: false, enterprise: true },
    { name: 'Priority support', free: false, pro: 'Email', enterprise: 'Dedicated' },
    { name: 'SLA', free: false, pro: false, enterprise: true },
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-4 w-4 text-success" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      );
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <Layout>
      <div className="py-16 lg:py-24">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-semibold text-foreground mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you need more. All plans include our core company intelligence.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`data-card relative ${
                  plan.popular ? 'border-primary/50 ring-1 ring-primary/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{plan.description}</p>
                </div>
                <Button variant={plan.ctaVariant} className="w-full" asChild>
                  <Link to={plan.name === 'Enterprise' ? '/contact' : '/auth'}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Compare features
            </h2>
            <div className="data-card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 table-header">Feature</th>
                    <th className="text-center py-4 px-4 table-header">Free</th>
                    <th className="text-center py-4 px-4 table-header bg-primary/5">Pro</th>
                    <th className="text-center py-4 px-4 table-header">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr 
                      key={feature.name} 
                      className={index < features.length - 1 ? 'border-b border-border/50' : ''}
                    >
                      <td className="py-4 px-4 text-sm text-foreground">{feature.name}</td>
                      <td className="py-4 px-4 text-center">{renderFeatureValue(feature.free)}</td>
                      <td className="py-4 px-4 text-center bg-primary/5">{renderFeatureValue(feature.pro)}</td>
                      <td className="py-4 px-4 text-center">{renderFeatureValue(feature.enterprise)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ or CTA */}
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Questions about pricing?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contact us for custom enterprise solutions, academic pricing, or to discuss your specific needs.
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Contact Sales <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
