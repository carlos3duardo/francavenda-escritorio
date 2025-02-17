import { AppLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Relatórios',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Relatórios" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Página de relatórios</AppLayout.PageContent>
    </>
  );
}
