import { ReactNode } from 'react';
import { AppLayout } from '.';

interface AppLayoutMainProps {
  children: ReactNode;
}

export function AppLayoutMain({ children }: AppLayoutMainProps) {
  return (
    <div className="flex-1 flex flex-col justify-between lg:ml-[240px] xl:ml-[260px] 2xl:ml-[300px]">
      <AppLayout.Header />
      <main className="flex-1 flex flex-col px-8 py-3">{children}</main>
      <AppLayout.Footer />
    </div>
  );
}
