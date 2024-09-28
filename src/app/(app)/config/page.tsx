import { Metadata } from 'next';
import { AppLayout } from '@/components';

export const metadata: Metadata = {
  title: 'Configurações',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Configurações" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Página de configurações</AppLayout.PageContent>
    </>
  );
}
