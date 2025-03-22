import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableHeadProps extends ComponentProps<'thead'> {}

export function TableHead({ children, className }: TableHeadProps) {
  return <thead className={twMerge('w-full', className)}>{children}</thead>;
}
