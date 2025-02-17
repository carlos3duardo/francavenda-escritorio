'use client';
import { ApiMarcaProps } from '@/types';
import { Badge } from '@/components';
import { ColumnProps, DataTable } from '@/components/DataTable';
import Link from 'next/link';

const columns = [
  {
    field: 'nome',
    label: 'Nome',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ id, nome }: ApiMarcaProps) => {
      return <Link href={`/cadastro/marca/${id}`}>{nome}</Link>;
    },
  },
  {
    field: 'fornecedor.nome_fantasia',
    label: 'Fornecedor',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ id, fornecedor }: ApiMarcaProps) => {
      return (
        <Link href={`/cadastro/marca/${id}`}>{fornecedor.nome_fantasia}</Link>
      );
    },
  },
  {
    field: 'ativa',
    label: 'Situação',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ ativa }: ApiMarcaProps) => {
      return (
        <Badge
          label={ativa ? 'Ativa' : 'Inativa'}
          color={ativa ? '#4ade80' : '#f87171'}
          withDot
        />
      );
    },
  },
  {
    field: 'id',
    label: '',
    thClassName: 'text-right',
    tdClassName: 'text-right',
    content: () => {
      return <>&nbsp;</>;
    },
  },
] as ColumnProps[];

export function MarcaTabela() {
  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.Label title="Marcas" />
      </DataTable.Header>
      <DataTable.Content
        queryId={`marcaes`}
        columns={columns}
        dataSrc="/api/marca"
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
