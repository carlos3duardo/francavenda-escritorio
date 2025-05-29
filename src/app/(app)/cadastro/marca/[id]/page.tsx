import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { MarcaContainer } from '../_components/MarcaContainer';

interface PageProps {
  id: string;
}

export const metadata: Metadata = {
  title: 'Visualizar marca',
};

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { id } = await params;
  return (
    <AppLayout.PageContent>
      <MarcaContainer id={id} />
    </AppLayout.PageContent>
  );
}
