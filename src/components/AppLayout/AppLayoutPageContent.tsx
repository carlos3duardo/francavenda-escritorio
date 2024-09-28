import { ReactNode } from 'react';

interface PageContentProps {
  children: ReactNode;
}

export function AppLayoutPageContent({ children }: PageContentProps) {
  return <main className="flex-1 px-8 py-3">{children}</main>;
}
