import { AppLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Afiliados',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Cadastro de Afiliados" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>Lista de afiliados</AppLayout.PageContent>
    </>
  );
}
