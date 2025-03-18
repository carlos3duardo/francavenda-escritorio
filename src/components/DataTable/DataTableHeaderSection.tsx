import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DataTableHeaderProps {
  className?: string;
  children: ReactNode;
}

export function DataTableHeaderSection({
  className,
  children,
}: DataTableHeaderProps) {
  return (
    <div className={twMerge('flex items-center gap-4', className)}>
      {children}
    </div>
  );
}
