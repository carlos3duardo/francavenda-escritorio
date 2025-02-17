import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { AppLayout, NavigationMenu } from '@/components';
import { primaryMenu, secondaryMenu } from '@/data/menu';

export const metadata: Metadata = {
  title: {
    template: '%s | Escritório Virtual',
    default: 'Franca Venda | Escritório Virtual',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AppLayout.Root>
      <AppLayout.Sidebar>
        <NavigationMenu menu={primaryMenu} />
        <NavigationMenu menu={secondaryMenu} />
      </AppLayout.Sidebar>
      <AppLayout.Main>{children}</AppLayout.Main>
    </AppLayout.Root>
  );
}
