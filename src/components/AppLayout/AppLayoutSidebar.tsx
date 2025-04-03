import { ReactNode } from 'react';
import { CompanyLogo } from './ext/CompanyLogo';
import { AppLayoutSidebarHeader } from './AppLayoutSidebarHeader';
import { AppLayoutSidebarNavigation } from './AppLayoutSidebarNavigation';

interface SidebarProps {
  children: ReactNode;
}

export function AppLayoutSidebar({ children }: SidebarProps) {
  return (
    <aside className="fixed hidden lg:flex flex-col gap-2 top-0 bottom-0 pb-4 lg:w-[240px] xl:w-[260px] 2xl:w-[300px] text-white bg-primary-600 dark:bg-primary-800">
      <AppLayoutSidebarHeader>
        <CompanyLogo />
      </AppLayoutSidebarHeader>
      <AppLayoutSidebarNavigation>{children}</AppLayoutSidebarNavigation>
    </aside>
  );
}
