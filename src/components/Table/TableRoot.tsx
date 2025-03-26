import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableRootProps extends ComponentProps<'table'> {}

export function TableRoot({ children, className }: TableRootProps) {
  return <table className={twMerge('w-full', className)}>{children}</table>;
}
