import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { FornecedorContainer } from '../_components/FornecedorContainer';

interface PageProps {
  id: string;
}

export const metadata: Metadata = {
  title: 'Visualizar fornecedor',
};

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { id } = await params;

  return (
    <AppLayout.PageContent>
      <FornecedorContainer id={id} />
    </AppLayout.PageContent>
  );
}
