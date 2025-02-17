'use client';
import { ElementType, HTMLAttributes, useCallback, useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TabsContext } from './TabsContext';

import styles from './Styles.module.css';

interface TabsNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ElementType;
  label: string;
  target: string;
}

export function TabsNavigationItem({
  icon: Icon,
  label,
  target,
}: TabsNavigationItemProps) {
  const { activeTab, setActiveTab, tabKey } = useContext(TabsContext);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleNavigationClick = useCallback(
    (target: string) => {
      setActiveTab(target);
      router.push(pathname + '?' + createQueryString(tabKey, target));
    },
    [createQueryString, pathname, router, setActiveTab, tabKey],
  );

  return (
    <button
      role="tab"
      type="button"
      data-active={activeTab === target}
      className={styles.tabsNavigationItem}
      onClick={() => handleNavigationClick(target)}
    >
      {Icon && <Icon size={20} />} {label}
    </button>
  );
}
