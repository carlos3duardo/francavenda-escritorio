import { ReactNode } from 'react';

interface DataTableFooterProps {
  children: ReactNode;
}

export function DataTableFooterSection({ children }: DataTableFooterProps) {
  return <div className="flex items-center gap-4">{children}</div>;
}
