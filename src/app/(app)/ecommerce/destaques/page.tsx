import { Metadata } from 'next';
import { AppLayout } from '@/components';

export const metadata: Metadata = {
  title: 'Destaques',
};

export default async function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title={`Destaques do e-commerce`} />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Destaques do e-commerce</AppLayout.PageContent>
    </>
  );
}
