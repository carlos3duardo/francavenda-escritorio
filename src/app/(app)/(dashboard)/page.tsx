import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { AppLayout } from '@/components';
import { firstName } from '@/helpers';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  const cookieStore = cookies();

  const userCookie = cookieStore.has('frv:user')
    ? cookieStore.get('frv:user')?.value
    : null;

  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle
          title={`Olá, ${firstName({ fullName: user?.nome, ucfirst: true })}. Seja bem vindo.`}
        />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Conteúdo da página</AppLayout.PageContent>
    </>
  );
}
