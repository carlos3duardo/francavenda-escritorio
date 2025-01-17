import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { FornecedorContainer } from '../_components/FornecedorContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Visualizar fornecedor',
};

export default function Page({ params }: PageProps) {
  return (
    <AppLayout.PageContent>
      <FornecedorContainer id={params.id} />
    </AppLayout.PageContent>
  );
}
