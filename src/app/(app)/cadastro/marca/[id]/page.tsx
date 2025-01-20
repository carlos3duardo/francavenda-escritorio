import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { MarcaContainer } from '../_components/MarcaContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Visualizar marca',
};

export default function Page({ params }: PageProps) {
  return (
    <AppLayout.PageContent>
      <MarcaContainer id={params.id} />
    </AppLayout.PageContent>
  );
}
