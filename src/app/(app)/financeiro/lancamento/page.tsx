import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { LancamentoTabela } from './_components/LancamentoTabela';

export const metadata: Metadata = {
  title: 'Lançamentos',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Lançamentos" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Financeiro', href: '/financeiro' },
              { label: 'Lançamentos' },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <LancamentoTabela />
      </AppLayout.PageContent>
    </>
  );
}
