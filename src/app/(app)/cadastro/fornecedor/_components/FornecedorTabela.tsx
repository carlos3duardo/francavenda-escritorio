'use client';
import { ApiFornecedorProps } from '@/types';
import { Badge } from '@/components';
import { ColumnProps, DataTable } from '@/components/DataTable';
import Link from 'next/link';
import { maskCnpj } from '@/helpers';

const columns = [
  {
    field: 'nome_fantasia',
    label: 'Nome',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ id, nome_fantasia: nome }: ApiFornecedorProps) => {
      return <Link href={`/cadastro/fornecedor/${id}`}>{nome}</Link>;
    },
  },
  {
    field: 'cnpj',
    label: 'CNPJ',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ id, cnpj }: ApiFornecedorProps) => {
      return <Link href={`/cadastro/fornecedor/${id}`}>{maskCnpj(cnpj)}</Link>;
    },
  },
  {
    field: 'ativo',
    label: 'Situação',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ ativo }: ApiFornecedorProps) => {
      return (
        <Badge
          label={ativo ? 'Ativo' : 'Inativo'}
          color={ativo ? '#4ade80' : '#f87171'}
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

export function FornecedorTabela() {
  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.Label title="Fornecedores" />
      </DataTable.Header>
      <DataTable.Content
        queryId={`fornecedores`}
        columns={columns}
        dataSrc="/api/fornecedor"
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
