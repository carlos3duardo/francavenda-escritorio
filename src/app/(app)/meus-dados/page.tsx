import { Metadata } from 'next';
import { AppLayout } from '@/components';
import { ProfileContent } from './_components/ProfileContent';
import { Suspense } from 'react';

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
        <Suspense>
          <ProfileContent />
        </Suspense>
      </AppLayout.PageContent>
    </>
  );
}
