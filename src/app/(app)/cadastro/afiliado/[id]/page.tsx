import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { AfiliadoContainer } from '../components/AfiliadoContainer';

export const metadata: Metadata = {
  title: 'Visualizar afiliado',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppLayout.PageContent>
      <AfiliadoContainer id={id} />
    </AppLayout.PageContent>
  );
}
