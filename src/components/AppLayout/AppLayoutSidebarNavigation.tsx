import { ReactNode } from 'react';

interface SidebarNavigationProps {
  children: ReactNode;
}

export function AppLayoutSidebarNavigation({
  children,
}: SidebarNavigationProps) {
  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto scrollbar scrollbar-w-1 scrollbar-thumb-slate-400 scrollbar-track-white">
      {children}
    </div>
  );
}
