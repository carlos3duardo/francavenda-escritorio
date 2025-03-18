import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { MeusPedidosTabela } from './_components/MeusPedidosTabela';

export const metadata: Metadata = {
  title: 'Pedidos',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Seus pedidos realizados na loja virtual" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Peus pedidos', href: '/ecommerce/meus-pedidos' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <MeusPedidosTabela />
    </AppLayout.PageContent>
  );
}
