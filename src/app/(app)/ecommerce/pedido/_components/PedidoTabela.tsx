'use client';
import Link from 'next/link';
import { ColumnProps, DataTable } from '@/components/DataTable';
import { ApiPedidoProps } from '@/@types';
import { currency, dateTimeBr } from '@/helpers';

const columns = [
  {
    field: 'numero',
    label: 'Número',
    thClassName: 'text-center',
    tdClassName: 'text-center',
    content: ({ id, numero }: ApiPedidoProps) => {
      return <Link href={`/ecommerce/pedido/${id}`}>{numero}</Link>;
    },
  },
  {
    field: 'cliente.nome',
    label: 'Cliente',
    thClassName: 'text-left',
    content: ({ id, cliente }: ApiPedidoProps) => {
      return <Link href={`/ecommerce/pedido/${id}`}>{cliente.nome}</Link>;
    },
  },
  {
    field: 'produto.nome',
    label: 'Produto',
    thClassName: 'text-left',
    content: ({ id, produto }: ApiPedidoProps) => {
      return (
        <Link href={`/ecommerce/pedido/${id}`}>
          {produto.marca.nome.toUpperCase() + ' / ' + produto.nome}
        </Link>
      );
    },
  },
  {
    field: 'valor',
    label: 'Valor',
    thClassName: 'text-right',
    tdClassName: 'text-right',
    content: ({ valor }: ApiPedidoProps) => {
      return `R$ ${currency(valor)}`;
    },
  },
  {
    field: 'situacao.nome',
    label: 'Situação',
    thClassName: 'text-left',
    content: ({ situacao }: ApiPedidoProps) => {
      return (
        <span
          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium"
          style={{
            backgroundColor: `${situacao.cor}22`,
            color: `${situacao.cor}`,
            boxShadow: `0 0 0 1px inset ${situacao.cor}44`,
          }}
        >
          {situacao.nome}
        </span>
      );
    },
  },
  {
    field: 'afiliado.nome',
    label: 'Afiliado',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ afiliado }: ApiPedidoProps) => {
      return afiliado?.nome;
    },
  },
  {
    field: 'data_compra',
    label: 'Data',
    thClassName: 'text-center',
    tdClassName: 'text-center',
    content: ({ data_compra: dataCompra }: ApiPedidoProps) => {
      return dateTimeBr(dataCompra);
    },
  },
] as ColumnProps[];

export function PedidoTabela() {
  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.Label title="Pedidos" />
      </DataTable.Header>
      <DataTable.Content
        queryId={`pedidos`}
        columns={columns}
        dataSrc="/api/pedido"
      />
      <DataTable.Footer>
        <DataTable.FooterSection>
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
