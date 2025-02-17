'use client';
import { AppLayout, Button } from '@/components';
import Link from 'next/link';
import { AfiliadoFormulario } from './AfiliadoFormulario';

export function AfiliadoAdicionar() {
  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Adicionar afiliado" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Afiliados', href: '/cadastro/afiliado' },
              { label: 'Adicionar' },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            <Link href={`/cadastro/afiliado`}>
              <Button color="primary" variant="outline">
                Voltar
              </Button>
            </Link>
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <div className="w-full flex flex-col gap-4 2xl:gap-6">
        <AfiliadoFormulario />
      </div>
    </>
  );
}
