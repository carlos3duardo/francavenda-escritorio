'use client';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { TabsProvider } from './TabsContext';

import styles from './Styles.module.css';

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
      className={twMerge(styles.tabsRoot, className)}
      {...rest}
    >
      <TabsProvider>{children}</TabsProvider>
    </div>
  );
}
