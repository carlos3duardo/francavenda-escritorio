import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { PedidoContainer } from '../_components/PedidoContainer';

interface PageProps {
  id: string;
}

export const metadata: Metadata = {
  title: 'Visualizar Pedido',
};

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { id } = await params;

  return (
    <AppLayout.PageContent>
      <PedidoContainer id={id} />
    </AppLayout.PageContent>
  );
}
