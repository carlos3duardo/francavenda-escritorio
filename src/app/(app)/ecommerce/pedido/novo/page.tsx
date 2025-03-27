import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { NovoPedidoFormularioIntroducao } from '../_components/NovoPedidoFormularioIntroducao';

export const metadata: Metadata = {
  title: 'Novo pedido',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Novo pedido" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Pedidos', href: '/ecommerce/pedido' },
              { label: 'Novo', href: '/ecommerce/pedido/novo' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <NovoPedidoFormularioIntroducao />
      </AppLayout.PageContent>
    </>
  );
}
