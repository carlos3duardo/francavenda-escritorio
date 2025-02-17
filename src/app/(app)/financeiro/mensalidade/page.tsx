import { AppLayout, UnderConstruction } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mensalidades',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Mensalidades" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Financeiro', href: '/financeiro' },
              { label: 'Mensalidades' },
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
