import { Metadata } from 'next';
import { AppLayout } from '@/components';
import { SignOut } from './_components/SignOut';

export const metadata: Metadata = {
  title: 'Sair',
};

export default function Page() {
  return (
    <>
      <AppLayout.PageContent>
        <div className="min-h-full flex justify-center items-center">
          <SignOut />
        </div>
      </AppLayout.PageContent>
    </>
  );
}
