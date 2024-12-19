import { ReactNode } from 'react';

interface PageContentProps {
  children: ReactNode;
}

export function AppLayoutPageContent({ children }: PageContentProps) {
  return (
    <>
      <header className="mb-4">
        <div className="w-full flex items-center justify-between">
          <div id="app-page-header" />
          <div id="app-page-actions" />
        </div>
      </header>
      {children}
    </>
  );
}
