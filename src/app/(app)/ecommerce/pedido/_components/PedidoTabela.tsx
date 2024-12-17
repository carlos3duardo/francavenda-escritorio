'use client';
import Link from 'next/link';
import { Button } from '@/components';
import { ColumnProps, DataTable } from '@/components/DataTable';

const columns = [
  {
    field: 'numero',
    label: 'Número',
    thClassName: 'text-center',
    tdClassName: 'text-center',
  },
  {
    field: 'cliente.nome',
    label: 'Cliente',
    thClassName: 'text-left',
  },
  {
    field: 'valor',
    label: 'Valor',
    thClassName: 'text-right',
    tdClassName: 'text-right',
  },
  {
    field: 'situacao.nome',
    label: 'Situação',
    thClassName: 'text-left',
  },
] as ColumnProps[];

export function PedidoTabela() {
  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.Label title="Pedidos" />
        <DataTable.Actions>
          <Link href="/cadastro/colaborador/adicionar">
            <Button size="sm" color="primary">
              Adicionar colaborador
            </Button>
          </Link>
        </DataTable.Actions>
      </DataTable.Header>
      <DataTable.Content
        queryId={`pedidos`}
        columns={columns}
        dataSrc="/api/pedido"
      />
      <DataTable.Footer>
        <DataTable.FooterSection>
          <DataTable.PageSizeControl />
          <DataTable.RowsCount />
        </DataTable.FooterSection>
        <DataTable.FooterSection>
          <DataTable.PageCount />
          <DataTable.Pagination />
        </DataTable.FooterSection>
      </DataTable.Footer>
    </DataTable.Root>
  );
}
