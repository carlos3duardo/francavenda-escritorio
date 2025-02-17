'use client';
import { usePedido } from '@/hooks';
import { PedidoHistorico } from './PedidoHistorico';
import { PedidoComentarios } from './PedidoComentarios';
import { PedidoComposicao } from './PedidoComposicao';
import { AppLayout } from '@/components';
import { PedidoInfo } from './PedidoInfo';

interface PedidoContainerProps {
  id: string;
}

export function PedidoContainer({ id }: PedidoContainerProps) {
  const {
    data: pedido,
    isLoading,
    isSuccess,
  } = usePedido(id, [
    'historico',
    'composicao',
    'comentarios',
    'endereco',
    'comentarios',
  ]);

  return (
    <>
      <AppLayout.PageHeader>
        <AppLayout.PageHeaderSection>
          <AppLayout.PageTitle title="Visualizar pedido" />
          <AppLayout.PageBreadcrumbs
            breadcrumbs={[
              { label: 'Início', href: '/dashboard' },
              { label: 'Pedidos', href: '/ecommerce/pedido' },
              {
                label:
                  isSuccess && pedido
                    ? `Pedido ${pedido.numero}`
                    : 'Visualizar pedido',
              },
            ]}
          />
        </AppLayout.PageHeaderSection>
      </AppLayout.PageHeader>
      <div className="w-full flex flex-col gap-4 2xl:gap-6">
        <PedidoInfo
          isLoading={isLoading}
          isSuccess={isSuccess}
          pedido={pedido || undefined}
        />

        <div className="grid grid-cols-12 gap-4 2xl:gap-6">
          <div className="col-span-6 flex flex-col gap-4 2xl:gap-6">
            <PedidoComposicao
              pedidoId={id}
              isLoading={isLoading}
              isSuccess={isSuccess}
              composicao={pedido ? pedido.composicao : []}
            />

            <PedidoComentarios
              isLoading={isLoading}
              isSuccess={isSuccess}
              comentarios={pedido ? pedido.comentarios : []}
            />
          </div>
          <div className="col-span-6 flex flex-col gap-4 2xl:gap-6">
            <PedidoHistorico
              isLoading={isLoading}
              isSuccess={isSuccess}
              historico={pedido ? pedido.historico : []}
            />
          </div>
        </div>
      </div>
    </>
  );
}
