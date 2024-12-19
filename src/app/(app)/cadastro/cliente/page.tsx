import { AppLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clientes',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Cadastro de Clientes" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Lista de Clientes</AppLayout.PageContent>
    </>
  );
}
