import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { NovoPedidoFormularioCadastro } from '../../_components/NovoPedidoFormularioCadastro';

interface PageProps {
  ofertaId: string;
}

export const metadata: Metadata = {
  title: 'Novo pedido',
};

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { ofertaId } = await params;

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
              {
                label: 'Adicionar',
                href: `/ecommerce/pedido/novo/${ofertaId}`,
              },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <NovoPedidoFormularioCadastro ofertaId={ofertaId} />
      </AppLayout.PageContent>
    </>
  );
}
