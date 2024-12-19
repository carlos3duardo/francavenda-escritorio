import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { PedidoInfo } from '../_components/PedidoInfo';

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
      <PedidoInfo id={params.id} />
    </AppLayout.PageContent>
  );
}
