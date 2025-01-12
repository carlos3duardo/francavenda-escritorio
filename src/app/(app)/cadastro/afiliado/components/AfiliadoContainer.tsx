'use client';
import { AppLayout } from '@/components';
import { useAfiliado } from '@/hooks';
import { AfiliadoVisualizar } from './AfiliadoVisualizar';
import { capitalize } from '@/helpers';
import { AfiliadoCodigos } from './AfiliadoCodigos';
import { AfiliadoMenu } from './AfiliadoMenu';

interface AfiliadoContainerProps {
  id: string;
}

export function AfiliadoContainer({ id }: AfiliadoContainerProps) {
  const { data: afiliado, isLoading, isSuccess } = useAfiliado(id);

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Visualizar afiliado" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Afiliados', href: '/cadastro/afiliado' },
              {
                label:
                  isSuccess && afiliado
                    ? capitalize(afiliado.usuario.apelido)
                    : 'Visualizar afiliado',
              },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            {afiliado && <AfiliadoMenu afiliado={afiliado} />}
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <div className="grid grid-cols-12 gap-4 2xl:gap-6">
        <div className="col-span-12">
          <AfiliadoVisualizar
            isLoading={isLoading}
            isSuccess={isSuccess}
            afiliado={afiliado || undefined}
          />
        </div>
        <div className="col-span-4">
          <AfiliadoCodigos afiliadoId={id} />
        </div>
      </div>
    </>
  );
}
