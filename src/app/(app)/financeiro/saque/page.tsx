import { AppLayout, UnderConstruction } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saques',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Saques" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Financeiro', href: '/financeiro' },
              { label: 'Saques' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <UnderConstruction />
      </AppLayout.PageContent>
    </>
  );
}
