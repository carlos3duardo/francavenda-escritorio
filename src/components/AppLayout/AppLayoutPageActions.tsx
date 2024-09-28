import { ReactNode } from 'react';

interface PageActionProps {
  children: ReactNode;
}

export function AppLayoutPageActions({ children }: PageActionProps) {
  return <div>{children}</div>;
}
