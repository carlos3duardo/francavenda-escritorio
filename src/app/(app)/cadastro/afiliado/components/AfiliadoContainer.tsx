'use client';
import { AppLayout, Button } from '@/components';
import { useAfiliado } from '@/hooks';
import { AfiliadoInfo } from './AfiliadoInfo';
import { capitalize } from '@/helpers';
import Link from 'next/link';

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
      <div className="w-full flex flex-col gap-4 2xl:gap-6">
        <AfiliadoInfo
          isLoading={isLoading}
          isSuccess={isSuccess}
          afiliado={afiliado || undefined}
        />
      </div>
    </>
  );
}
