'use client';
import { AppLayout, Button } from '@/components';
import { useAfiliado } from '@/hooks';
import { AfiliadoVisualizar } from './AfiliadoVisualizar';
import { capitalize } from '@/helpers';
import Link from 'next/link';
import { AfiliadoCodigos } from './AfiliadoCodigos';

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
            <Link href={`/cadastro/afiliado/${id}/editar`}>
              <Button>Editar</Button>
            </Link>
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
