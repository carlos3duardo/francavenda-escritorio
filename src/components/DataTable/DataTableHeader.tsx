import { ReactNode } from 'react';

interface DataTableHeaderProps {
  children: ReactNode;
}

export function DataTableHeader({ children }: DataTableHeaderProps) {
  return (
    <div className="px-4 xl:px-6 pt-4 xl:pt-4 pb-4 xl:pb-4 flex flex-row items-center justify-between first:rounded-t-md last:rounded-b-md">
      {children}
    </div>
  );
}
