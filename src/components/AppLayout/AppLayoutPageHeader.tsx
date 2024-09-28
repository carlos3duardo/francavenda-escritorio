import { ReactNode } from 'react';

interface PageHeaderProps {
  children: ReactNode;
}

export function AppLayoutPageHeader({ children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-3">
      {children}
    </div>
  );
}
