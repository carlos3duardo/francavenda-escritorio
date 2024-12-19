import { AppLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produtos',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Cadastro de Produtos" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Lista de Produtos</AppLayout.PageContent>
    </>
  );
}
