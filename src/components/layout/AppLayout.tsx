import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const AppLayout = ({ children, showSidebar = true }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex relative">
        {showSidebar && (
          <AppSidebar className="hidden lg:flex sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto" />
        )}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
