import { Metadata } from 'next';
import { AppLayout } from '@/components';
import { ProfileContent } from './_components/ProfileContent';

export const metadata: Metadata = {
  title: 'Meus dados',
};

export default async function Profile() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle
          title="Meus dados"
          subtitle="Mantenha suas informações atualizadas"
        />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <ProfileContent />
      </AppLayout.PageContent>
    </>
  );
}
