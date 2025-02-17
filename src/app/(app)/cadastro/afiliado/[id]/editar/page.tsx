import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { AfiliadoEditar } from '../../components/AfiliadoEditar';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Editar afiliado',
};

export default function Page({ params }: PageProps) {
  return (
    <AppLayout.PageContent>
      <AfiliadoEditar id={params.id} />
    </AppLayout.PageContent>
  );
}
