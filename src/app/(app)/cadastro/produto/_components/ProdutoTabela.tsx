'use client';
import { ApiProdutoProps } from '@/types';
import { ColumnProps, DataTable } from '@/components/DataTable';
import Link from 'next/link';
import { dateTimeBr } from '@/helpers';

const columns = [
  {
    field: 'nome',
    label: 'Nome',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ id, nome }: ApiProdutoProps) => {
      return <Link href={`/cadastro/produto/${id}`}>{nome}</Link>;
    },
  },
  {
    field: 'ativo',
    label: 'Situação',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ id, ativo }: ApiProdutoProps) => {
      return (
        <Link href={`/cadastro/produto/${id}`}>
          {ativo ? 'Ativo' : 'Inativo'}
        </Link>
      );
    },
  },
  {
    field: 'marca.id',
    label: 'marca',
    thClassName: 'text-left',
    content: ({ id, marca }: ApiProdutoProps) => {
      return <Link href={`/cadastro/produto/${id}`}>{marca.nome}</Link>;
    },
  },
  {
    field: 'created_at',
    label: 'Criação',
    thClassName: 'text-center',
    tdClassName: 'text-center',
    content: ({ id, created_at: createdAt }: ApiProdutoProps) => {
      return (
        <Link href={`/cadastro/produto/${id}`}>{dateTimeBr(createdAt)}</Link>
      );
    },
  },
] as ColumnProps[];

export function ProdutoTabela() {
  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.Label title="Produtos" />
      </DataTable.Header>
      <DataTable.Content
        queryId="produtos"
        columns={columns}
        dataSrc="/api/produto"
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
