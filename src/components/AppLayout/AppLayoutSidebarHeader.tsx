import { ReactNode } from 'react';

interface SidebarHeaderProps {
  children: ReactNode;
}

export function AppLayoutSidebarHeader({ children }: SidebarHeaderProps) {
  return <header>{children}</header>;
}
