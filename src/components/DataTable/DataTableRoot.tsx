'use client';
import { ReactNode, Suspense } from 'react';
import { DataTableProvider } from './DataTableContext';

interface DataTableRootProps {
  children: ReactNode;
}

export function DataTableRoot({ children }: DataTableRootProps) {
  return (
    <div className="bg-component-background dark:bg-component-background-dark rounded-lg relative shadow">
      <Suspense>
        <DataTableProvider>{children}</DataTableProvider>
      </Suspense>
    </div>
  );
}
