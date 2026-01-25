import { Link } from 'react-router-dom';
import { Sparkles, Users, ArrowRight, Target, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';

const KonektAfrikLanding = () => {
  const features = [
    {
      icon: Target,
      title: 'AI-Powered Matching',
      description: 'Our algorithm scores investors based on sector focus, stage fit, geographic coverage, and investment history.',
    },
    {
      icon: Zap,
      title: 'Explainable Fit Scores',
      description: 'See exactly why each investor is a good match with transparent scoring and personalized insights.',
    },
    {
      icon: Shield,
      title: 'Curated Introductions',
      description: 'Request warm intros through our network. We facilitate quality connections, not cold emails.',
    },
  ];

  const steps = [
    { step: 1, title: 'Select Your Startup', description: 'Choose from your existing startup profiles or create a new one.' },
    { step: 2, title: 'Complete Match Profile', description: 'Tell us your raise stage, target amount, and preferences.' },
    { step: 3, title: 'Get AI Matches', description: 'Receive a ranked list of investors with fit scores and explanations.' },
    { step: 4, title: 'Request Intros', description: 'Select investors and request introductions through our platform.' },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                AI-Powered Investor Matching
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Find Your Perfect Investor Match
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                KonektAfrik AI analyzes your startup profile against our database of African-focused investors 
                to find the best matches based on sector, stage, geography, and investment history.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/konekt/match">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Find Investors with AI
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/konekt/intros">
                    <Users className="mr-2 h-5 w-5" />
                    View My Intro Requests
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">How KonektAfrik AI Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-sm">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">Get Matched in 4 Simple Steps</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {steps.map((item, index) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mx-auto mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Ideal Investors?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of African founders who have used KonektAfrik AI to connect with the right investors for their stage and sector.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/konekt/match">
                Start Matching Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default KonektAfrikLanding;
