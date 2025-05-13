import { Metadata } from 'next';
import { AppLayout } from '@/components';
import { firstName } from '@/helpers';
import { AfiliadoDashboard } from './components/AfiliadoDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { api } from '@/services';
import { UserCookieProps } from '@/types';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  const user = (await api()
    .get('/me')
    .then((res) => res.data)) as unknown as UserCookieProps;

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle
          title={`Olá, ${firstName({ fullName: user?.nome, ucfirst: true })}. Seja bem vindo.`}
        />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        {user.afiliado ? (
          <AfiliadoDashboard afiliadoId={user.afiliado.id} />
        ) : (
          <AdminDashboard />
        )}
      </AppLayout.PageContent>
    </>
  );
}
