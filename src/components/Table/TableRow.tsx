import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableRowProps extends ComponentProps<'tr'> {}

export function TableRow({ children, className }: TableRowProps) {
  return <tr className={twMerge('', className)}>{children}</tr>;
}
