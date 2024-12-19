import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { PedidoTabela } from './_components/PedidoTabela';

export const metadata: Metadata = {
  title: 'Pedidos',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <PedidoTabela />
    </AppLayout.PageContent>
  );
}
