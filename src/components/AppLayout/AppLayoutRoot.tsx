import { ReactNode } from 'react';

interface AppLayoutRootProps {
  children: ReactNode;
}

export function AppLayoutRoot({ children }: AppLayoutRootProps) {
  return <div className="min-h-screen flex items-stretch">{children}</div>;
}
