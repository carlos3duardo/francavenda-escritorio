import { Metadata } from 'next';
import { AppLayout } from '@/components';

export const metadata: Metadata = {
  title: 'Ofertas',
};

export default async function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title={`Ofertas do e-commerce`} />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Ofertas do e-commerce</AppLayout.PageContent>
    </>
  );
}
