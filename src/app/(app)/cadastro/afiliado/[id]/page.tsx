import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { AfiliadoContainer } from '../components/AfiliadoContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Visualizar afiliado',
};

export default function Page({ params }: PageProps) {
  return (
    <AppLayout.PageContent>
      <AfiliadoContainer id={params.id} />
    </AppLayout.PageContent>
  );
}
