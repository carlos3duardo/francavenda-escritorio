import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { PedidoContainer } from '../_components/PedidoContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Visualizar Pedido',
};

export default function Page({ params }: PageProps) {
  return (
    <AppLayout.PageContent>
      <PedidoContainer id={params.id} />
    </AppLayout.PageContent>
  );
}
