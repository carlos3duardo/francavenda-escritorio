'use client';
import Link from 'next/link';
import { ColumnProps, DataTable } from '@/components/DataTable';
import { ApiPedidoProps } from '@/types';
import { currency, dateTimeBr } from '@/helpers';
import { Badge, Button, DateInput, Dialog, Input, Select } from '@/components';
import { useAfiliadoList } from '@/hooks';
import { usePedidoSituacaoList } from '@/hooks/usePedidoSituacaoList';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { MicrosoftExcelLogo } from '@phosphor-icons/react/dist/ssr';

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
        <Badge
          label={situacao.nome}
          color={situacao.cor}
          withBorder
          tooltip={situacao.descricao}
        />
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
    content: ({ created_at: dataCompra }: ApiPedidoProps) => {
      return dateTimeBr(dataCompra);
    },
  },
] as ColumnProps[];

export function PedidoTabela() {
  const [isProcessingExport, setIsProcessingExport] = useState(false);

  const searchParams = useSearchParams();

  const { data: afiliados } = useAfiliadoList();
  const { data: situacoes } = usePedidoSituacaoList();

  const [inicio, setInicio] = useState(
    searchParams.get('inicio') ||
      dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
  );

  const [fim, setFim] = useState(
    searchParams.get('fim') || dayjs().format('YYYY-MM-DD'),
  );

  const [afiliadoId, setAfiliadoId] = useState(
    searchParams.get('afiliado_id') || '',
  );

  const [situacaoId, setSituacaoId] = useState(
    searchParams.get('situacao_id') || '',
  );

  const [search, setSearch] = useState(searchParams.get('search') || '');

  const [filters, setFilters] = useState({
    inicio,
    fim,
    afiliadoId,
    situacaoId,
    search,
  });

  const handleFilter = useCallback(() => {
    setFilters({ ...filters, inicio, fim, afiliadoId, situacaoId, search });
  }, [filters, inicio, fim, afiliadoId, situacaoId, search]);

  const handleExport = useCallback(async () => {
    setIsProcessingExport(true);

    try {
      const response = await fetch('/api/pedido/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });

      if (!response.ok) throw new Error('Erro ao gerar o relatório');

      const data = await response.json();

      if (data.url) window.open(data.url, '_blank');
    } catch (error) {
      Dialog.Error.fire({
        title: 'Erro ao gerar o relatório',
        text: (error as Error).message,
      });
    } finally {
      setIsProcessingExport(false);
    }
  }, [filters]);

  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.HeaderSection className="w-full grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label
              htmlFor="inicio"
              className="text-sm text-slate-400 font-medium"
            >
              Início:
            </label>
            <DateInput
              id="inicio"
              label="Inicio"
              allowEmpty={false}
              defaultValue={dayjs().subtract(30, 'days').format('YYYY-MM-DD')}
              onChange={(date) => setInicio(date?.format('YYYY-MM-DD'))}
            />
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label htmlFor="fim" className="text-sm text-slate-400 font-medium">
              Fim:
            </label>
            <DateInput
              id="fim"
              label="Fim"
              defaultValue={dayjs().format('YYYY-MM-DD')}
              onChange={(date) => setFim(date?.format('YYYY-MM-DD'))}
            />
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label
              htmlFor="inicio"
              className="text-sm text-slate-400 font-medium"
            >
              Afiliado:
            </label>
            <Select
              id="afiliado_id"
              label="Afiliado"
              placeholder="Todos"
              options={
                afiliados
                  ? afiliados.map((afiliado) => ({
                      label: afiliado.usuario.apelido,
                      value: afiliado.id,
                    }))
                  : []
              }
              onChange={(e) => setAfiliadoId(e.target.value)}
            />
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label
              htmlFor="situacao_id"
              className="text-sm text-slate-400 font-medium"
            >
              Situação:
            </label>
            <Select
              id="situacao_id"
              placeholder="Todas"
              options={
                situacoes
                  ? situacoes.map((situacao) => ({
                      label: situacao.nome,
                      value: situacao.id.toString(),
                    }))
                  : []
              }
              onChange={(e) => setSituacaoId(e.target.value)}
            />
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label
              htmlFor="search"
              className="text-sm text-slate-400 font-medium"
            >
              Busca:
            </label>
            <Input id="search" onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2 self-end">
            <div className="flex gap-2">
              <Button color="primary" fullWidth onClick={handleFilter}>
                Filtrar
              </Button>

              <Button
                color="primary"
                variant="outline"
                title="Exportar para Excel"
                onClick={handleExport}
                isLoading={isProcessingExport}
              >
                <MicrosoftExcelLogo size={20} />
              </Button>
            </div>
          </div>
        </DataTable.HeaderSection>
      </DataTable.Header>
      <DataTable.Content
        queryId={`pedidos`}
        columns={columns}
        dataSrc={`/api/pedido`}
        defaultParams={filters}
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
