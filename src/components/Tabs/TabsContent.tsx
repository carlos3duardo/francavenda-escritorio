'use client';
import { HTMLAttributes, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { TabsContext } from './TabsContext';

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title?: string;
}

export function TabsContent({
  id,
  title,
  children,
  className,
  ...rest
}: TabsContentProps) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== id) return null;

  return (
    <div
      className={twMerge(
        'flex-1 p-6 text-slate-700 dark:text-slate-200',
        className,
      )}
      {...rest}
    >
      {title && (
        <h4 className="pb-2 mb-4 text-2xl font-semibold border-b text-slate-600 border-b-slate-200 dark:text-slate-200 dark:border-b-slate-600">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}
