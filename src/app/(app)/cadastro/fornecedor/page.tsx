import { AppLayout, Button } from '@/components';
import { Metadata } from 'next';
import Link from 'next/link';
import { FornecedorTabela } from './_components/FornecedorTabela';

export const metadata: Metadata = {
  title: 'Fornecedores',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Cadastro de fornecedores" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Fornecedores', href: '/cadastro/fornecedor' },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            <Link href="/cadastro/fornecedor/adicionar">
              <Button color="primary">Novo fornecedor</Button>
            </Link>
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <FornecedorTabela />
    </AppLayout.PageContent>
  );
}
