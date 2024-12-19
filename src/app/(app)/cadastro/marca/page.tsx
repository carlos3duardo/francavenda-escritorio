import { AppLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marcas',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Cadastro de Marcas" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Lista de Marcas</AppLayout.PageContent>
    </>
  );
}
