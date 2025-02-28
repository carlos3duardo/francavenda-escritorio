'use client';
import Link from 'next/link';
import { ColumnProps, DataTable } from '@/components/DataTable';
import { ApiPedidoProps } from '@/types';
import { currency, dateTimeBr } from '@/helpers';
import { Badge } from '@/components';

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
      return <Badge label={situacao.nome} color={situacao.cor} withBorder />;
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
    content: ({ created_at: dataCompra }: ApiPedidoProps) => {
      return dateTimeBr(dataCompra);
    },
  },
] as ColumnProps[];

export function MeusPedidosTabela() {
  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.Label title="Meus Pedidos" />
        <DataTable.Search />
      </DataTable.Header>
      <DataTable.Content
        queryId={`meus-pedidos`}
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
