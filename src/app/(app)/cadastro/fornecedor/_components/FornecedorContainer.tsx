'use client';
import { AppLayout } from '@/components';
import { useFornecedor } from '@/hooks';
import { FornecedorVisualizar } from './FornecedorVisualizar';
import { capitalize } from '@/helpers';
import { FornecedorMenu } from './FornecedorMenu';

interface AfiliadoContainerProps {
  id: string;
}

export function FornecedorContainer({ id }: AfiliadoContainerProps) {
  const { data: fornecedor, isLoading, isSuccess } = useFornecedor(id);

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Visualizar fornecedor" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Fornecedores', href: '/cadastro/fornecedor' },
              {
                label:
                  isSuccess && fornecedor
                    ? capitalize(fornecedor.nome_fantasia)
                    : 'Visualizar fornecedor',
              },
            ]}
          />
        </AppLayout.PageHeaderSection>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageActions>
            {fornecedor && <FornecedorMenu fornecedor={fornecedor} />}
          </AppLayout.PageActions>
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <div className="grid grid-cols-12 gap-4 2xl:gap-6">
        <div className="col-span-12">
          <FornecedorVisualizar
            isLoading={isLoading}
            isSuccess={isSuccess}
            fornecedor={fornecedor || undefined}
          />
        </div>
      </div>
    </>
  );
}
