import { ReactNode } from 'react';

interface AlertDescriptionProps {
  children: ReactNode;
}

export function AlertDescription({ children }: AlertDescriptionProps) {
  return <div className="font-medium text-sm opacity-80">{children}</div>;
}
