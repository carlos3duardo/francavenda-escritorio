import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableCellProps extends ComponentProps<'td'> {}

export function TableCell({ children, className, ...rest }: TableCellProps) {
  return (
    <td
      className={twMerge(
        'text-left text-base p-2 first:rounded-l first:pl-4 last:pr-4 text-slate-600 dark:text-slate-300/80 border-t border-border dark:border-border-dark',
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  );
}
