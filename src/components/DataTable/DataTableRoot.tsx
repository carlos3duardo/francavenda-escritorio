'use client';
import { ReactNode } from 'react';
import { DataTableProvider } from './DataTableContext';

interface DataTableRootProps {
  children: ReactNode;
}

export function DataTableRoot({ children }: DataTableRootProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg relative shadow">
      <DataTableProvider>{children}</DataTableProvider>
    </div>
  );
}
