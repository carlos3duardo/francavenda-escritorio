'use client';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from './Styles.module.css';

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
    <div className={twMerge(styles.tabsNavigationGroup, className)} {...rest}>
      {title && (
        <div className="grop-title px-4 pt-4 uppercase text-xs text-slate-400 dark:text-slate-500 font-semibold">
          {title}
        </div>
      )}
      <div role="tablist" className={styles.tabNavigationList}>
        {children}
      </div>
    </div>
  );
}
