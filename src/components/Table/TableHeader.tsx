import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <th
      className={twMerge(
        'text-left text-xs font-semibold uppercase p-2 first:rounded-tl first:pl-4 last:rounded-tr last:pr-4 bg-slate-100 dark:bg-black/10 text-slate-400 dark:text-slate-300/70',
        className,
      )}
    >
      {children}
    </th>
  );
}
