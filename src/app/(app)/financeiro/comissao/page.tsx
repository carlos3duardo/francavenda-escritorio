import { AppLayout, UnderConstruction } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comissões',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Comissões" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Financeiro', href: '/financeiro' },
              { label: 'Comissões' },
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
