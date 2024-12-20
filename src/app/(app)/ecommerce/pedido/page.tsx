import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { PedidoTabela } from './_components/PedidoTabela';

export const metadata: Metadata = {
  title: 'Pedidos',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Pedidos realizados na loja virtual" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Pedidos', href: '/ecommerce/pedido' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <PedidoTabela />
    </AppLayout.PageContent>
  );
}
