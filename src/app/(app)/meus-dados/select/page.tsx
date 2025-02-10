import { Metadata } from 'next';
import { AppLayout } from '@/components';
import { AsyncSelect } from '@/components/FormElements/AsyncSelect';

export const metadata: Metadata = {
  title: 'Async Select',
};

export default async function Profile() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageTitle title="Async Select" />
      </AppLayout.PageHeader>
      <AppLayout.PageContent>
        <div className="w-1/2">
          <AsyncSelect
            id="naturalidade"
            sourceUrl="/api/select-options/municipio"
          />
        </div>
      </AppLayout.PageContent>
    </>
  );
}
