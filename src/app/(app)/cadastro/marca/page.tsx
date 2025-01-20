import { AppLayout, Button } from '@/components';
import { Metadata } from 'next';
import Link from 'next/link';
import { MarcaTabela } from './_components/MarcaTabela';

export const metadata: Metadata = {
  title: 'Marcas',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Cadastro de marcas" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Marcas', href: '/cadastro/marca' },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            <Link href="/cadastro/marca/adicionar">
              <Button color="primary">Nova marca</Button>
            </Link>
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <MarcaTabela />
    </AppLayout.PageContent>
  );
}
