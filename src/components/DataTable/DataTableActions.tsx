import { ReactNode } from 'react';

interface DataTableActionsProps {
  children: ReactNode;
}

export function DataTableActions({ children }: DataTableActionsProps) {
  return <div>{children}</div>;
}
