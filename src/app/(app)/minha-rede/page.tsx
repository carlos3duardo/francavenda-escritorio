import { AppLayout, UnderConstruction } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha rede',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Minha rede" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Minha rede' },
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
