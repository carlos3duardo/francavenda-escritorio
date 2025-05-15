import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { AppLayout, NavigationMenu } from '@/components';
import { primaryMenu, secondaryMenu } from '@/data/menu';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isTokenActive, isTokenExpired } from '@/helpers';

export const metadata: Metadata = {
  title: {
    template: '%s | Escritório Virtual',
    default: 'Franca Venda | Escritório Virtual',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('frv:token')?.value;

  if (!accessToken) {
    redirect('/entrar?');
  }

  if (isTokenExpired(accessToken)) {
    redirect('/entrar');
  }

  if (!(await isTokenActive(accessToken))) {
    redirect('/entrar?invalidToken');
  }

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
