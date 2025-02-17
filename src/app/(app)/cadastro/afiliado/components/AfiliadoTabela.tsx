'use client';
import { ApiAfiliadoProps } from '@/types';
import { Badge } from '@/components';
import { ColumnProps, DataTable } from '@/components/DataTable';
import Link from 'next/link';

const columns = [
  {
    field: 'usuario.nome',
    label: 'Nome',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ id, usuario }: ApiAfiliadoProps) => {
      return <Link href={`/cadastro/afiliado/${id}`}>{usuario.nome}</Link>;
    },
  },
  {
    field: 'usuario.email',
    label: 'E-mail',
    thClassName: 'text-left',
  },
  {
    field: 'usuario.patrocinador.nome',
    label: 'Patrocinador',
    thClassName: 'text-left',
    content: ({ patrocinador }: ApiAfiliadoProps) => {
      return patrocinador ? patrocinador.apelido : <>&nbsp;</>;
    },
  },
  {
    field: 'situacao.nome',
    label: 'Situação',
    thClassName: 'text-left',
    tdClassName: 'text-left',
    content: ({ situacao }: ApiAfiliadoProps) => {
      return <Badge label={situacao.nome} color={situacao.cor} />;
    },
  },
] as ColumnProps[];

export function AfiliadoTabela() {
  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.Label title="Afiliados" />
      </DataTable.Header>
      <DataTable.Content
        queryId={`afiliados`}
        columns={columns}
        dataSrc="/api/afiliado"
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
