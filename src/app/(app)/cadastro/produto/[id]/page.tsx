import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { ProdutoContainer } from '../_components/ProdutoContainer';

interface PageProps {
  id: string;
}

export const metadata: Metadata = {
  title: 'Visualizar produto',
};

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { id } = await params;
  return (
    <AppLayout.PageContent>
      <ProdutoContainer id={id} />
    </AppLayout.PageContent>
  );
}
