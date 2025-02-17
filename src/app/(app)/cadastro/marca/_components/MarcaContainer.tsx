'use client';
import { AppLayout } from '@/components';
import { useMarca } from '@/hooks';
import { MarcaVisualizar } from './MarcaVisualizar';
import { capitalize } from '@/helpers';
import { MarcaMenu } from './MarcaMenu';

interface AfiliadoContainerProps {
  id: string;
}

export function MarcaContainer({ id }: AfiliadoContainerProps) {
  const { data: marca, isLoading, isSuccess } = useMarca(id);

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Visualizar marca" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Marcas', href: '/cadastro/marca' },
              {
                label:
                  isSuccess && marca
                    ? capitalize(marca.nome)
                    : 'Visualizar marca',
              },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            {marca && <MarcaMenu marca={marca} />}
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <div className="grid grid-cols-12 gap-4 2xl:gap-6">
        <div className="col-span-12">
          <MarcaVisualizar
            isLoading={isLoading}
            isSuccess={isSuccess}
            marca={marca || undefined}
          />
        </div>
      </div>
    </>
  );
}
