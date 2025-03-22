import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableFootProps extends ComponentProps<'tfoot'> {}

export function TableFoot({ children, className }: TableFootProps) {
  return <tfoot className={twMerge('', className)}>{children}</tfoot>;
}
