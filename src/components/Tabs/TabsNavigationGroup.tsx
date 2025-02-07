'use client';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabsNavigationGroupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function TabsNavigationGroup({
  children,
  className,
  title,
  ...rest
}: TabsNavigationGroupProps) {
  return (
    <div className={twMerge('', className)} {...rest}>
      {title && (
        <div className="grop-title px-4 pt-4 uppercase text-xs text-slate-400 dark:text-slate-500 font-semibold">
          {title}
        </div>
      )}
      <div
        role="tablist"
        className="p-2 text-slate-600 dark:text-slate-300 flex group-[.nav-position-bottom]:flex-row"
      >
        {children}
      </div>
    </div>
  );
}
