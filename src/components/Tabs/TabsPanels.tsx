import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabsPanelsProps extends HTMLAttributes<HTMLDivElement> {}

export function TabsPanels({ children, className, ...rest }: TabsPanelsProps) {
  return (
    <div className={twMerge('w-full flex flex-col', className)} {...rest}>
      {children}
    </div>
  );
}
