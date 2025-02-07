import { AppLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Dashboard() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Dashboard" subtitle="Olá, como vai" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Conteúdo da página</AppLayout.PageContent>
    </>
  );
}
