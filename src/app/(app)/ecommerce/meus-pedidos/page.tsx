import { AppLayout, Button } from '@/components';
import { Metadata } from 'next';
import { MeusPedidosTabela } from './_components/MeusPedidosTabela';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

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
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            <Link href="/ecommerce/pedido/novo">
              <Button color="primary">
                <PlusCircle size={20} /> Novo pedido
              </Button>
            </Link>
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <MeusPedidosTabela />
    </AppLayout.PageContent>
  );
}
