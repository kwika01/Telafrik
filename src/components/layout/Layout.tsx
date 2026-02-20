import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated dot-grid background for the entire site */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.45,
        }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
