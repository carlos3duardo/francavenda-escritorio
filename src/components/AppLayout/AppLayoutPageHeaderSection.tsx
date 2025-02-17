import { ReactNode } from 'react';

interface PageHeaderSectionProps {
  children: ReactNode;
}

export function AppLayoutPageHeaderSection({
  children,
}: PageHeaderSectionProps) {
  return <div>{children}</div>;
}
