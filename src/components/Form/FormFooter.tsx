'use client';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FooterProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function FormFooter({ children, className, ...rest }: FooterProps) {
  return (
    <div
      className={twMerge(
        'flex items-center justify-between p-4 xl:p-6',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/*

'use client';
import { ReactNode, useContext } from 'react';
import { DataTableContext } from './DataTableContext';

interface DataTableFooterProps {
  children: ReactNode;
}

export function DataTableFooter({ children }: DataTableFooterProps) {
  const { rowsCount } = useContext(DataTableContext);

  if (!rowsCount) return null;

  return (
    <div className=" p-4 gap-2 bg-slate-100 dark:bg-black/10 last:rounded-b-md">
      {children}
    </div>
  );
}

*/
