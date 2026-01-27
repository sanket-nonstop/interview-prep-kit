import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { SearchBar } from './SearchBar';
import { Breadcrumbs } from './Breadcrumbs';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 w-full lg:w-auto p-4 md:p-6 lg:p-10 overflow-x-hidden mt-[48px] ml-[36px] lg:mt-0 lg:ml-0">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center gap-3">
            <SearchBar />
            <ThemeToggle />
          </div>
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </div>
  );
};
