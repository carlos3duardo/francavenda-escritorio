import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { ProdutoContainer } from '../_components/ProdutoContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Visualizar produto',
};

export default function Page({ params }: PageProps) {
  return (
    <AppLayout.PageContent>
      <ProdutoContainer id={params.id} />
    </AppLayout.PageContent>
  );
}
