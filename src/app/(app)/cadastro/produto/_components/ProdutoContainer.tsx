'use client';
import { AppLayout } from '@/components';
import { useProduto } from '@/hooks';
import { ProdutoVisualizar } from './ProdutoVisualizar';
import { capitalize } from '@/helpers';

interface ProdutoContainerProps {
  id: string;
}

export function ProdutoContainer({ id }: ProdutoContainerProps) {
  const {
    data: produto,
    isLoading,
    isSuccess,
  } = useProduto(id, ['beneficios']);

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Visualizar produto" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Produtos', href: '/cadastro/produto' },
              {
                label:
                  isSuccess && produto
                    ? capitalize(produto.nome)
                    : 'Visualizar produto',
              },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <div className="grid grid-cols-12 gap-4 2xl:gap-6">
        <div className="col-span-12">
          <ProdutoVisualizar
            isLoading={isLoading}
            isSuccess={isSuccess}
            produto={produto || undefined}
          />
        </div>
      </div>
    </>
  );
}
