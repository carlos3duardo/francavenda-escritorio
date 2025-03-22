import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={twMerge('w-full', className)}>{children}</tbody>;
}
