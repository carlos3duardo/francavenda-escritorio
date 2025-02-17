'use client';
import { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownMenuContentProps {
  hasArrow?: boolean;
  children: ReactNode;
}

export function DropdownMenuContent({
  hasArrow = false,
  children,
}: DropdownMenuContentProps) {
  return (
    <DropdownMenu.Content
      align="end"
      style={{ zIndex: 99 }}
      className="min-w-[12rem] py-2 rounded-md shadow origin-top-right bg-white dark:bg-slate-800"
    >
      {hasArrow && (
        <DropdownMenu.Arrow
          width={14}
          height={8}
          className="fill-white dark:fill-slate-800"
        />
      )}
      {children}
    </DropdownMenu.Content>
  );
}
