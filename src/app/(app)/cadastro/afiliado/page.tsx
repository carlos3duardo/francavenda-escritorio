import { AppLayout, Button } from '@/components';
import { Metadata } from 'next';
import { AfiliadoTabela } from './components/AfiliadoTabela';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Afiliados',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Cadastro de afiliados da loja" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Afiliados', href: '/cadastro/afiliado' },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            <Link href="/cadastro/afiliado/adicionar">
              <Button color="primary">Novo afiliado</Button>
            </Link>
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <AfiliadoTabela />
    </AppLayout.PageContent>
  );
}
