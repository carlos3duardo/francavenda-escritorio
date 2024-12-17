import { AppLayout } from '@/components';
import { Metadata } from 'next';

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
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title={`Pedido ${params.id}`} />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Visualizar pedido</AppLayout.PageContent>
    </>
  );
}
