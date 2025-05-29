import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { AfiliadoEditar } from '../../components/AfiliadoEditar';

interface PageProps {
  id: string;
}

export const metadata: Metadata = {
  title: 'Editar afiliado',
};

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { id } = await params;

  return (
    <AppLayout.PageContent>
      <AfiliadoEditar id={id} />
    </AppLayout.PageContent>
  );
}
