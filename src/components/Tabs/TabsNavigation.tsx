'use client';
import { HTMLAttributes, useContext, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { TabsContext } from './TabsContext';

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
    <div
      className={twMerge(
        'group-[.nav-position-left]:min-w-[220px] group-[.nav-position-right]:min-w-[220px] group-[.nav-position-top]:border-b group-[.nav-position-top]:border-b-slate-200 group-[.nav-position-bottom]:border-t group-[.nav-position-bottom]:border-t-slate-200 flex',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
