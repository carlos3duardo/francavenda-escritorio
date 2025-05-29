import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { RedeEmbaixadores } from './components/RedeEmbaixadores';
import { api } from '@/services';
import { UserCookieProps } from '@/types';

export const metadata: Metadata = {
  title: 'Minha rede',
};

export default async function Page() {
  const user = (await (await api())
    .get('/me')
    .then((res) => res.data)) as unknown as UserCookieProps;

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Minha rede" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Minha rede' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        {user.afiliado ? (
          <RedeEmbaixadores afiliadoId={user.afiliado.id} />
        ) : (
          <>...</>
        )}
      </AppLayout.PageContent>
    </>
  );
}
