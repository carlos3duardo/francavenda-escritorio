import { AppLayout, Button } from '@/components';
import { Metadata } from 'next';
import { ProdutoTabela } from './_components/ProdutoTabela';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Produtos',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Cadastro de produtos da loja" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Produtos', href: '/cadastro/produto' },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            <Link href="/cadastro/produto/adicionar">
              <Button color="primary">Novo produto</Button>
            </Link>
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <ProdutoTabela />
    </AppLayout.PageContent>
  );
}
