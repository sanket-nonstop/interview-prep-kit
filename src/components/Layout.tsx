import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 w-full lg:w-auto p-4 md:p-6 lg:p-10 overflow-x-hidden mt-[48px] ml-[36px] lg:mt-0 lg:ml-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
