import { AppLayout, Button } from '@/components';
import { Metadata } from 'next';
import { PedidoTabela } from './_components/PedidoTabela';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

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
      <Suspense>
        <PedidoTabela />
      </Suspense>
    </AppLayout.PageContent>
  );
}
