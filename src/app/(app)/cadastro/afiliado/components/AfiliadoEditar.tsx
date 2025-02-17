'use client';
import { AppLayout, Button } from '@/components';
import { useAfiliado } from '@/hooks';
import { capitalize } from '@/helpers';
import Link from 'next/link';
import { AfiliadoFormulario } from './AfiliadoFormulario';

interface AfiliadoEditarProps {
  id: string;
}

export function AfiliadoEditar({ id }: AfiliadoEditarProps) {
  const { data: afiliado, isSuccess } = useAfiliado(id);

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Editar afiliado" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Afiliados', href: '/cadastro/afiliado' },
              {
                label:
                  isSuccess && afiliado
                    ? capitalize(afiliado.usuario.apelido)
                    : 'Visualizar afiliado',
                href: `/cadastro/afiliado/${id}`,
              },
              {
                label: 'Editar',
              },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            <Link href={`/cadastro/afiliado/${id}`}>
              <Button color="primary" variant="outline">
                Voltar
              </Button>
            </Link>
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <div className="w-full flex flex-col gap-4 2xl:gap-6">
        {afiliado && <AfiliadoFormulario afiliado={afiliado} />}
      </div>
    </>
  );
}
