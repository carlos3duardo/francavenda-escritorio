import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { AppLayout, NavigationMenu } from '@/components';
import { primaryMenu, secondaryMenu } from '@/data/menu';
import { UserCookieProps } from '@/types';
import { cookies } from 'next/headers';

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
  const cookieStore = cookies();
  const usuario = cookieStore.get('frv:user')?.value
    ? (JSON.parse(
        cookieStore.get('frv:user')?.value as string,
      ) as UserCookieProps)
    : undefined;

  return (
    <AppLayout.Root>
      <AppLayout.Sidebar>
        <NavigationMenu menu={primaryMenu} user={usuario} />
        <NavigationMenu menu={secondaryMenu} user={usuario} />
      </AppLayout.Sidebar>
      <AppLayout.Main>{children}</AppLayout.Main>
    </AppLayout.Root>
  );
}
