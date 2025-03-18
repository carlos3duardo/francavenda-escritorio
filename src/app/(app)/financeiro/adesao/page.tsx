import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { AdesaoContainer } from './_components/AdesaoContainer';

export const metadata: Metadata = {
  title: 'Adesão',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Adesão" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Financeiro', href: '/financeiro' },
              { label: 'Adesão' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <AdesaoContainer />
      </AppLayout.PageContent>
    </>
  );
}
