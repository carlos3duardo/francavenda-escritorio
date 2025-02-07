'use client';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { TabsProvider } from './TabsContext';

interface TabsRootProps extends HTMLAttributes<HTMLDivElement> {
  navigatonPosition?: 'top' | 'left' | 'right' | 'bottom';
}

export function TabsRoot({
  children,
  className,
  navigatonPosition = 'top',
  ...rest
}: TabsRootProps) {
  return (
    <div
      data-nav-position={navigatonPosition}
      className={twMerge(
        `group nav-position-${navigatonPosition} rounded-lg shadow flex flex-col data-[nav-position=top]:flex-col data-[nav-position=bottom]:flex-col-reverse data-[nav-position=left]:flex-row data-[nav-position=right]:flex-row-reverse gap-6 bg-white dark:bg-slate-900`,
        className,
      )}
      {...rest}
    >
      <TabsProvider>{children}</TabsProvider>
    </div>
  );
}
