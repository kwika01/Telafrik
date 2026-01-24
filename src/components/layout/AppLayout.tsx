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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex relative">
        {showSidebar && (
          <AppSidebar className="hidden lg:flex sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto" />
        )}
        <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
