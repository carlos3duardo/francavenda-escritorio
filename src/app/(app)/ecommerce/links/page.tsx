import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { PageContainer } from './_components/PageContainer';

export const metadata: Metadata = {
  title: 'Links de indicação',
};

export default async function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title={`Meus links de indicação`} />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <PageContainer />
      </AppLayout.PageContent>
    </>
  );
}
