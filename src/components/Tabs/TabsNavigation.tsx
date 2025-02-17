'use client';
import { HTMLAttributes, useContext, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { TabsContext } from './TabsContext';

import styles from './Styles.module.css';

interface TabsNavigationProps extends HTMLAttributes<HTMLDivElement> {
  tabKey: string;
  activeTab: string;
}

export function TabsNavigation({
  children,
  className,
  tabKey,
  activeTab,
  ...rest
}: TabsNavigationProps) {
  const { setTabKey, setActiveTab } = useContext(TabsContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('tab-' + tabKey)) {
      setActiveTab(searchParams.get('tab-' + tabKey) as string);
    } else {
      setActiveTab(activeTab);
    }

    setTabKey('tab-' + tabKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className={twMerge(styles.tabsNavigationMenu, className)} {...rest}>
      {children}
    </div>
  );
}
