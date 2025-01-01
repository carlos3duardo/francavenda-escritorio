import { AppLayout } from '@/components';
import { Metadata } from 'next';
import { AfiliadoAdicionar } from '../components/AfiliadoAdicionar';

export const metadata: Metadata = {
  title: 'Novo afiliado',
};

export default function Page() {
  return (
    <AppLayout.PageContent>
      <AfiliadoAdicionar />
    </AppLayout.PageContent>
  );
}
