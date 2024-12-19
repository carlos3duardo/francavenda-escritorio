import { AppLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fornecedores',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Cadastro de Fornecedores" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Lista de fornecedores</AppLayout.PageContent>
    </>
  );
}
