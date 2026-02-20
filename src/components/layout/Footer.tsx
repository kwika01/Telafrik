import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerLinks = {
    Platform: [
      { label: 'Companies', path: '/directory' },
      { label: 'Founders', path: '/founders' },
      { label: 'Investors', path: '/investors' },
      { label: 'Sectors', path: '/sectors' },
      { label: 'Deals', path: '/deals' },
    ],
    Network: [
      { label: 'KonektAfrik', path: '/konekt' },
      { label: 'Matches', path: '/konekt/matches' },
      { label: 'Introductions', path: '/konekt/intros' },
      { label: 'Connections', path: '/konekt/connections' },
    ],
    Resources: [
      { label: 'Reports', path: '/reports' },
      { label: 'Signals', path: '/signals' },
      { label: 'Methodology', path: '/methodology' },
    ],
    Company: [
      { label: 'About', path: '/about' },
      { label: 'Pricing', path: '/pricing' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
  };

  const socialLinks = [
    { 
      name: 'X', 
      href: 'https://twitter.com/TelAfrik',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/telafrik',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="relative border-t border-primary/20 overflow-hidden">
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      
      {/* Colorful animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-wide py-12 md:py-16 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="TelAfrik by Ennylytics"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
              The definitive intelligence platform for African markets.
            </p>
            
            {/* Newsletter with colorful button */}
            <div className="flex gap-2 max-w-xs">
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="h-9 text-sm bg-background/80 border-primary/20 focus:border-primary/50"
              />
              <Button size="sm" className="h-9 px-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md shadow-primary/20">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>

          {/* Links with colored category indicators */}
          {Object.entries(footerLinks).map(([category, links], idx) => {
            const colors = ['text-primary', 'text-violet-400', 'text-orange-400', 'text-emerald-400'];
            return (
              <motion.div key={category} variants={itemVariants}>
                <h4 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${colors[idx]} bg-current`} />
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="group text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom bar with gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-foreground font-medium">TelAfrik</span> by Ennylytics
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((social, idx) => {
              const hoverColors = ['hover:text-primary hover:bg-primary/10', 'hover:text-blue-400 hover:bg-blue-400/10'];
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg text-muted-foreground transition-colors ${hoverColors[idx]}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
